"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaUserTie,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import EmployeeModal from "@/components/admin/EmployeeModal";
import Swal from "sweetalert2";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [stats, setStats] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    designation: "",
    department: "IT",
    joiningDate: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    aadharNumber: "",
    panNumber: "",
    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },
    salary: {
      basicSalary: 0,
      allowances: {
        hra: 0,
        da: 0,
        ta: 0,
        other: 0,
      },
      deductions: {
        pf: 0,
        tax: 0,
        insurance: 0,
        other: 0,
      },
      paymentMode: "Bank Transfer",
      bankDetails: {
        accountHolderName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        branchName: "",
        accountType: "Savings",
      },
    },
  });

  useEffect(() => {
    fetchEmployees();
    fetchStats();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_ALL, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: searchTerm, department: filterDepartment },
      });

      if (response.data.success) {
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_STATS, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const loadingToast = toast.loading(
      modalMode === "add" ? "Creating employee..." : "Updating employee..."
    );

    try {
      const token = localStorage.getItem("token");

      if (modalMode === "add") {
        const response = await axios.post(EMPLOYEE_API.REGISTER, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          toast.update(loadingToast, {
            render: "Employee created successfully! 🎉",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          fetchEmployees();
          fetchStats();
          setShowModal(false);
          resetForm();
        }
      } else if (modalMode === "edit") {
        const response = await axios.put(
          EMPLOYEE_API.UPDATE(selectedEmployee._id),
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.success) {
          toast.update(loadingToast, {
            render: "Employee updated successfully! ✅",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          fetchEmployees();
          setShowModal(false);
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Operation failed! ❌",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, employeeName) => {
    // SweetAlert2 confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `Do you want to deactivate <strong>${employeeName}</strong>?<br><small>This employee will be marked as inactive.</small>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, deactivate!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const loadingToast = toast.loading("Deactivating employee...");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(EMPLOYEE_API.DELETE(id), {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          toast.update(loadingToast, {
            render: "Employee deactivated successfully! ✅",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          fetchEmployees();
          fetchStats();
        }
      } catch (error) {
        console.error("Error:", error);
        toast.update(loadingToast, {
          render: "Failed to deactivate employee! ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  const openModal = (mode, employee = null) => {
    setModalMode(mode);
    setSelectedEmployee(employee);

    if (mode === "edit" && employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        password: "",
        designation: employee.designation,
        department: employee.department,
        joiningDate: employee.joiningDate?.split("T")[0] || "",
        address: employee.address || {
          street: "",
          city: "",
          state: "",
          pincode: "",
          country: "India",
        },
        aadharNumber: employee.aadharNumber || "",
        panNumber: employee.panNumber || "",
        emergencyContact: employee.emergencyContact || {
          name: "",
          phone: "",
          relation: "",
        },
        salary: employee.salary || formData.salary,
      });
    } else if (mode === "add") {
      resetForm();
    }

    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      designation: "",
      department: "IT",
      joiningDate: "",
      address: {
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
      },
      aadharNumber: "",
      panNumber: "",
      emergencyContact: { name: "", phone: "", relation: "" },
      salary: {
        basicSalary: 0,
        allowances: { hra: 0, da: 0, ta: 0, other: 0 },
        deductions: { pf: 0, tax: 0, insurance: 0, other: 0 },
        paymentMode: "Bank Transfer",
        bankDetails: {
          accountHolderName: "",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
          branchName: "",
          accountType: "Savings",
        },
      },
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaUserTie className="text-cyan-600" />
            Employee Management
          </h1>
          <p className="text-gray-600 mt-1">Manage your workforce</p>
        </div>
        <button
          onClick={() => openModal("add")}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <FaPlus /> Add Employee
        </button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Total Employees</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalEmployees}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Active</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalEmployees}</p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Inactive</h3>
            <p className="text-4xl font-bold mt-2">{stats.totalInactive}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold">Monthly Salary</h3>
            <p className="text-4xl font-bold mt-2">
              ₹{stats.totalSalaryExpense?.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={fetchEmployees}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <select
          value={filterDepartment}
          onChange={(e) => {
            setFilterDepartment(e.target.value);
            fetchEmployees();
          }}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">All Departments</option>
          <option value="IT">IT</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Operations">Operations</option>
        </select>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Employee ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Designation</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Salary</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-cyan-600">
                  {employee.employeeId}
                </td>
                <td className="px-6 py-4">{employee.name}</td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.designation}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {employee.department}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">
                  ₹{employee.salary?.netSalary?.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      employee.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {employee.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openModal("view", employee)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => openModal("edit", employee)}
                      className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id, employee.name)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No employees found
          </div>
        )}
      </div>

      {/* Employee Modal Component */}
      <EmployeeModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalMode={modalMode}
        selectedEmployee={selectedEmployee}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        submitting={submitting}
      />
    </div>
  );
}
