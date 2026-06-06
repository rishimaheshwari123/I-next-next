const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "employee",
      immutable: true, // Cannot be changed after creation
    },
    phone: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      enum: ["IT", "HR", "Sales", "Marketing", "Finance", "Operations", "Other"],
    },
    joiningDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    profileImage: {
      type: String,
      default: "",
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
        default: "India",
      },
    },
    aadharNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 12,
      maxlength: 12,
    },
    panNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      minlength: 10,
      maxlength: 10,
    },
    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },
    salary: {
      basicSalary: {
        type: Number,
        required: true,
        default: 0,
      },
      allowances: {
        hra: { type: Number, default: 0 },
        da: { type: Number, default: 0 },
        ta: { type: Number, default: 0 },
        other: { type: Number, default: 0 },
      },
      deductions: {
        pf: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        insurance: { type: Number, default: 0 },
        other: { type: Number, default: 0 },
      },
      netSalary: {
        type: Number,
        default: 0,
      },
      paymentMode: {
        type: String,
        enum: ["Bank Transfer", "Cash", "Cheque"],
        default: "Bank Transfer",
      },
      bankDetails: {
        accountHolderName: {
          type: String,
          required: true,
          trim: true,
        },
        accountNumber: {
          type: String,
          required: true,
          trim: true,
        },
        ifscCode: {
          type: String,
          required: true,
          trim: true,
          uppercase: true,
        },
        bankName: {
          type: String,
          required: true,
          trim: true,
        },
        branchName: {
          type: String,
          required: true,
          trim: true,
        },
        accountType: {
          type: String,
          enum: ["Savings", "Current"],
          default: "Savings",
        },
      },
      lastHike: {
        amount: { type: Number, default: 0 },
        date: { type: Date },
        percentage: { type: Number, default: 0 }
      },
      hikeHistory: [
        {
          amount: Number,
          date: Date,
          percentage: Number,
          remarks: String
        }
      ]
    },
    leaveBalance: {
      casual: { type: Number, default: 12 },
      sick: { type: Number, default: 12 },
      earned: { type: Number, default: 15 },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    documents: {
      aadharCard: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      panCard: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      bankPassbook: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      tenthCertificate: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      twelfthCertificate: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      graduationCertificate: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      mastersCertificate: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      experienceLetter: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      relievingLetter: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      offerLetter: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      salarySlip1: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      salarySlip2: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      salarySlip3: {
        url: { type: String, default: "" },
        status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
        remarks: { type: String, default: "" }
      },
      salarySlips: [
        {
          url: { type: String, default: "" },
          month: { type: String, default: "" },
          status: { type: String, enum: ["Pending", "Verified", "Rejected"], default: "Pending" },
          remarks: { type: String, default: "" }
        }
      ]
    }
  },
  { timestamps: true }
);

// Calculate net salary before saving
employeeSchema.pre("save", function (next) {
  const totalAllowances =
    this.salary.allowances.hra +
    this.salary.allowances.da +
    this.salary.allowances.ta +
    this.salary.allowances.other;

  const totalDeductions =
    this.salary.deductions.pf +
    this.salary.deductions.tax +
    this.salary.deductions.insurance +
    this.salary.deductions.other;

  this.salary.netSalary =
    this.salary.basicSalary + totalAllowances - totalDeductions;

  next();
});

module.exports = mongoose.model("Employee", employeeSchema);
