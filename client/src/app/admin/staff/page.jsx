"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaSearch } from "react-icons/fa";
import StaffStats from "@/components/admin/staff/StaffStats";
import StaffCard from "@/components/admin/staff/StaffCard";
import StaffFormModal from "@/components/admin/staff/StaffFormModal";
import PermissionModal from "@/components/admin/staff/PermissionModal";
import { EMPLOYEE_API } from "@/config/api";

export default function StaffManagement() {
  const [staffList, setStaffList] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFormModal, setShowFormModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    fetchStaffData();
  }, []);

  const fetchStaffData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Fetch staff list
      const staffResponse = await fetch(EMPLOYEE_API.GET_ALL_STAFF, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const staffData = await staffResponse.json();

      // Fetch stats
      const statsResponse = await fetch(EMPLOYEE_API.GET_STAFF_STATS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const statsData = await statsResponse.json();

      if (staffData.success) {
        setStaffList(staffData.data);
      }

      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
      toast.error("Failed to load staff data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = () => {
    setModalMode("add");
    setSelectedStaff(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
    });
    setShowFormModal(true);
  };

  const handleEditStaff = (staff) => {
    setModalMode("edit");
    setSelectedStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      phone: staff.phone || "",
      password: "",
    });
    setShowFormModal(true);
  };

  const handleEditPermissions = (staff) => {
    setSelectedStaff(staff);
    setShowPermissionModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const url =
        modalMode === "add"
          ? EMPLOYEE_API.CREATE_STAFF
          : EMPLOYEE_API.UPDATE_STAFF(selectedStaff._id);

      const method = modalMode === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          `✅ Staff ${modalMode === "add" ? "created" : "updated"} successfully!`
        );
        setShowFormModal(false);
        fetchStaffData();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePermissionSubmit = async (permissions) => {
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        EMPLOYEE_API.UPDATE_STAFF_PERMISSIONS(selectedStaff._id),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ permissions }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("✅ Permissions updated successfully!");
        setShowPermissionModal(false);
        fetchStaffData();
      } else {
        toast.error(data.message || "Failed to update permissions");
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteStaff = async (id) => {
    if (!confirm("Are you sure you want to delete this staff member?")) {
      return;
    }

    const loadingToast = toast.loading("Deleting staff...");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(EMPLOYEE_API.DELETE_STAFF(id), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        toast.update(loadingToast, {
          render: "🗑️ Staff deleted successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        fetchStaffData();
      } else {
        toast.update(loadingToast, {
          render: data.message || "Failed to delete staff",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.update(loadingToast, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading staff data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Staff Management
          </h1>
          <p className="text-gray-600">
            Manage staff members and their permissions
          </p>
        </div>

        {/* Stats */}
        <StaffStats stats={stats} />

        {/* Actions Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full md:w-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={handleAddStaff}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <FaPlus /> Add New Staff
          </button>
        </div>

        {/* Staff List */}
        {filteredStaff.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Staff Members Found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "No staff members match your search"
                : "Get started by adding your first staff member"}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddStaff}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all"
              >
                Add First Staff Member
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredStaff.map((staff) => (
              <StaffCard
                key={staff._id}
                staff={staff}
                onEditPermissions={handleEditPermissions}
                onEdit={handleEditStaff}
                onDelete={handleDeleteStaff}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <StaffFormModal
        show={showFormModal}
        mode={modalMode}
        formData={formData}
        setFormData={setFormData}
        submitting={submitting}
        onSubmit={handleFormSubmit}
        onClose={() => setShowFormModal(false)}
      />

      <PermissionModal
        show={showPermissionModal}
        staff={selectedStaff}
        submitting={submitting}
        onSubmit={handlePermissionSubmit}
        onClose={() => setShowPermissionModal(false)}
      />
    </div>
  );
}
