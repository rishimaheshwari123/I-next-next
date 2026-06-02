"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  FaBriefcase,
} from "react-icons/fa";
import EmployeeModal from "@/components/admin/EmployeeModal";
import Swal from "sweetalert2";

export default function EmployeesPage() {
  const router = useRouter();
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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FaUserTie className="text-3xl" />
              Employee Management
            </h1>
            <p className="text-cyan-100 text-lg">
              Manage your workforce
            </p>
          </div>
          <button
            onClick={() => openModal("add")}
            className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:shadow-lg transition-all transform hover:scale-105"
          >
            <FaPlus /> Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
            <p className="text-gray-600 text-sm font-semibold">Total Employees</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalEmployees}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
            <p className="text-gray-600 text-sm font-semibold">Active</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalEmployees}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-600">
            <p className="text-gray-600 text-sm font-semibold">Inactive</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalInactive}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-600">
            <p className="text-gray-600 text-sm font-semibold">Monthly Salary</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              ₹{stats.totalSalaryExpense?.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={fetchEmployees}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all"
          />
        </div>
        <select
          value={filterDepartment}
          onChange={(e) => {
            setFilterDepartment(e.target.value);
            fetchEmployees();
          }}
          className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all bg-white"
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
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max border-collapse">
            <thead className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Employee ID</th>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Designation</th>
                <th className="px-6 py-4 text-left font-semibold">Department</th>
                <th className="px-6 py-4 text-left font-semibold">Salary</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-cyan-600">
                    {employee.employeeId}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 text-gray-600">{employee.email}</td>
                  <td className="px-6 py-4 text-gray-600">{employee.designation}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ₹{employee.salary?.netSalary?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${employee.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                        }`}
                    >
                      {employee.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">

                      <button
                        onClick={() => router.push(`/admin/employees/${employee._id}/projects`)}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
                        title="See Projects"
                      >
                        <FaBriefcase /> See Project
                      </button>
                      <button
                        onClick={() => openModal("view", employee)}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="View"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => openModal("edit", employee)}
                        className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id, employee.name)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
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
        </div>

        {employees.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-medium">
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
