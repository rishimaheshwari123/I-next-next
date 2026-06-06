const Employee = require("../models/employeeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Employee Login
exports.employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find employee by email
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if employee is active
    if (!employee.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account has been deactivated. Please contact admin.",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: employee._id,
        email: employee.email,
        role: "employee",
        employeeId: employee._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: "employee",
        employeeId: employee.employeeId,
        designation: employee.designation,
        department: employee.department,
      },
    });
  } catch (error) {
    console.error("Employee login error:", error);
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};

// Generate unique employee ID
const generateEmployeeId = async () => {
  const lastEmployee = await Employee.findOne().sort({ createdAt: -1 });
  if (!lastEmployee) {
    return "EMP001";
  }
  const lastId = parseInt(lastEmployee.employeeId.replace("EMP", ""));
  const newId = lastId + 1;
  return `EMP${newId.toString().padStart(3, "0")}`;
};

// Validate Aadhar Number (12 digits)
const validateAadhar = (aadhar) => {
  const aadharRegex = /^\d{12}$/;
  return aadharRegex.test(aadhar);
};

// Validate PAN Number (10 characters: 5 letters, 4 digits, 1 letter)
const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

// Validate IFSC Code (11 characters)
const validateIFSC = (ifsc) => {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc);
};

// Register new employee
exports.registerEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      designation,
      department,
      joiningDate,
      address,
      aadharNumber,
      panNumber,
      emergencyContact,
      salary,
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !password || !designation || !department) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Validate address
    if (!address || !address.city || !address.state || !address.pincode) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete address (city, state, pincode)",
      });
    }

    // Validate Aadhar
    if (!aadharNumber || !validateAadhar(aadharNumber)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 12-digit Aadhar number",
      });
    }

    // Validate PAN
    if (!panNumber || !validatePAN(panNumber.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid PAN number (e.g., ABCDE1234F)",
      });
    }

    // Validate Bank Details
    if (
      !salary?.bankDetails?.accountHolderName ||
      !salary?.bankDetails?.accountNumber ||
      !salary?.bankDetails?.ifscCode ||
      !salary?.bankDetails?.bankName ||
      !salary?.bankDetails?.branchName
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete bank details",
      });
    }

    // Validate IFSC Code
    if (!validateIFSC(salary.bankDetails.ifscCode.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid IFSC code",
      });
    }

    // Check if email already exists in Employee table
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Check if Aadhar already exists
    const existingAadhar = await Employee.findOne({ aadharNumber });
    if (existingAadhar) {
      return res.status(400).json({
        success: false,
        message: "Aadhar number already registered",
      });
    }

    // Check if PAN already exists
    const existingPAN = await Employee.findOne({
      panNumber: panNumber.toUpperCase(),
    });
    if (existingPAN) {
      return res.status(400).json({
        success: false,
        message: "PAN number already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate employee ID
    const employeeId = await generateEmployeeId();

    // Create employee entry (no Auth user needed)
    const employee = await Employee.create({
      employeeId,
      name,
      email,
      password: hashedPassword,
      phone,
      designation,
      department,
      joiningDate: joiningDate || Date.now(),
      address: {
        street: address.street || "",
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country || "India",
      },
      aadharNumber,
      panNumber: panNumber.toUpperCase(),
      emergencyContact,
      salary: {
        ...salary,
        bankDetails: {
          ...salary.bankDetails,
          ifscCode: salary.bankDetails.ifscCode.toUpperCase(),
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Employee registered successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).json({
      success: false,
      message: "Error registering employee",
      error: error.message,
    });
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const { status, department, search } = req.query;

    let query = {};

    if (status) {
      query.isActive = status === "active";
    }

    if (department) {
      query.department = department;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
        { aadharNumber: { $regex: search, $options: "i" } },
        { panNumber: { $regex: search, $options: "i" } },
      ];
    }

    const employees = await Employee.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching employees",
      error: error.message,
    });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching employee",
      error: error.message,
    });
  }
};

// Get employee profile (for logged-in employee)
exports.getMyProfile = async (req, res) => {
  try {
    const employeeId = req.user.id; // From auth middleware - this is employee._id

    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching profile",
      error: error.message,
    });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow updating employeeId and password through this endpoint
    delete updateData.employeeId;
    delete updateData.password;

    // If updating email, check uniqueness
    if (updateData.email) {
      const existingEmail = await Employee.findOne({
        email: updateData.email,
        _id: { $ne: id },
      });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already registered with another employee",
        });
      }
    }

    // If updating PAN, validate and check uniqueness
    if (updateData.panNumber) {
      const panUpper = updateData.panNumber.toUpperCase();
      if (!validatePAN(panUpper)) {
        return res.status(400).json({
          success: false,
          message: "Invalid PAN number format",
        });
      }

      const existingPAN = await Employee.findOne({
        panNumber: panUpper,
        _id: { $ne: id },
      });
      if (existingPAN) {
        return res.status(400).json({
          success: false,
          message: "PAN number already registered with another employee",
        });
      }
      updateData.panNumber = panUpper;
    }

    // If updating Aadhar, validate and check uniqueness
    if (updateData.aadharNumber) {
      if (!validateAadhar(updateData.aadharNumber)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Aadhar number. Must be 12 digits",
        });
      }

      const existingAadhar = await Employee.findOne({
        aadharNumber: updateData.aadharNumber,
        _id: { $ne: id },
      });
      if (existingAadhar) {
        return res.status(400).json({
          success: false,
          message: "Aadhar number already registered with another employee",
        });
      }
    }

    // If updating IFSC code, validate it
    if (updateData.salary?.bankDetails?.ifscCode) {
      const ifscUpper = updateData.salary.bankDetails.ifscCode.toUpperCase();
      if (!validateIFSC(ifscUpper)) {
        return res.status(400).json({
          success: false,
          message: "Invalid IFSC code format",
        });
      }
      updateData.salary.bankDetails.ifscCode = ifscUpper;
    }

    const employee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      success: false,
      message: "Error updating employee",
      error: error.message,
    });
  }
};

// Delete employee (soft delete)
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee deactivated successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting employee",
      error: error.message,
    });
  }
};

// Update own profile (for logged-in employee)
exports.updateMyProfile = async (req, res) => {
  try {
    const employeeId = req.user.id; // From auth middleware - this is employee._id
    let { phone, address, emergencyContact } = req.body;

    // Parse JSON strings if they come from FormData
    if (typeof address === "string") {
      address = JSON.parse(address);
    }
    if (typeof emergencyContact === "string") {
      emergencyContact = JSON.parse(emergencyContact);
    }

    // Only allow updating specific fields
    const updateData = {};

    if (phone) {
      updateData.phone = phone;
    }

    if (address) {
      updateData.address = address;
    }

    if (emergencyContact) {
      updateData.emergencyContact = emergencyContact;
    }

    // Handle profile image upload
    if (req.files && req.files.profileImage) {
      const { uploadImageToCloudinary } = require("../config/imageUploader");
      const profileImage = req.files.profileImage;

      // Upload to Cloudinary
      const uploadedImage = await uploadImageToCloudinary(
        profileImage,
        process.env.FOLDER_NAME || "employee-profiles"
      );

      updateData.profileImage = uploadedImage.secure_url;
    }

    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    });
  }
};

// Get employee statistics
exports.getEmployeeStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments({ isActive: true });
    const totalInactive = await Employee.countDocuments({ isActive: false });

    const departmentWise = await Employee.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$department", count: { $sum: 1 } } },
    ]);

    const totalSalaryExpense = await Employee.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, total: { $sum: "$salary.netSalary" } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        totalInactive,
        departmentWise,
        totalSalaryExpense: totalSalaryExpense[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

// Upload employee documents
exports.uploadEmployeeDocuments = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const { uploadImageToCloudinary } = require("../config/imageUploader");
    const folder = `employee-documents/${employee.employeeId}`;
    const updateData = { documents: { ...employee.documents } };

    const docTypes = [
      "aadharCard",
      "panCard",
      "bankPassbook",
      "tenthCertificate",
      "twelfthCertificate",
      "graduationCertificate",
      "mastersCertificate",
      "experienceLetter",
      "relievingLetter",
      "offerLetter",
      "salarySlip1",
      "salarySlip2",
      "salarySlip3",
    ];

    for (const type of docTypes) {
      if (req.files[type]) {
        const result = await uploadImageToCloudinary(req.files[type], folder);
        updateData.documents[type] = {
          url: result.secure_url,
          status: "Pending",
          remarks: ""
        };
      }
    }

    // Handle salary slips (multiple)
    if (req.files.salarySlips) {
      const slips = Array.isArray(req.files.salarySlips)
        ? req.files.salarySlips
        : [req.files.salarySlips];

      const uploadedSlips = [];
      for (const slip of slips) {
        const result = await uploadImageToCloudinary(slip, `${folder}/salary-slips`);
        uploadedSlips.push({
          url: result.secure_url,
          status: "Pending",
          remarks: ""
        });
      }
      updateData.documents.salarySlips = [...(employee.documents?.salarySlips || []), ...uploadedSlips];
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      updateData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Documents uploaded successfully",
      data: updatedEmployee.documents,
    });
  } catch (error) {
    console.error("Error uploading documents:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading documents",
      error: error.message,
    });
  }
};

// Verify employee document (Admin)
exports.verifyEmployeeDocument = async (req, res) => {
  try {
    const { id } = req.params; // Employee ID
    const { docType, status, remarks, slipId } = req.body;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (docType === "salarySlips" && slipId) {
      const slip = employee.documents.salarySlips.id(slipId);
      if (slip) {
        slip.status = status;
        slip.remarks = remarks || "";
      }
    } else if (employee.documents[docType]) {
      employee.documents[docType].status = status;
      employee.documents[docType].remarks = remarks || "";
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid document type",
      });
    }

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Document status updated successfully",
      data: employee.documents,
    });
  } catch (error) {
    console.error("Error verifying document:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying document",
      error: error.message,
    });
  }
};
