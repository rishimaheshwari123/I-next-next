"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPLOYEE_API } from "@/config/api";
import { toast } from "react-toastify";
import { FaUser, FaEdit, FaSave, FaTimes, FaIdCard, FaUniversity, FaMapMarkerAlt, FaPhone, FaCamera } from "react-icons/fa";

export default function EmployeeProfilePage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [formData, setFormData] = useState({
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "India",
    },
    emergencyContact: {
      name: "",
      phone: "",
      relation: "",
    },
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(EMPLOYEE_API.GET_MY_PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setProfile(response.data.data);
        setProfileImagePreview(response.data.data.profileImage || null);
        setFormData({
          phone: response.data.data.phone || "",
          address: response.data.data.address || {
            street: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
          },
          emergencyContact: response.data.data.emergencyContact || {
            name: "",
            phone: "",
            relation: "",
          },
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setProfileImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      
      // Add profile image if selected
      if (profileImageFile) {
        formDataToSend.append("profileImage", profileImageFile);
      }

      // Add other fields as JSON string
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", JSON.stringify(formData.address));
      formDataToSend.append("emergencyContact", JSON.stringify(formData.emergencyContact));

      const response = await axios.put(
        EMPLOYEE_API.UPDATE_MY_PROFILE,
        formDataToSend,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully! 🎉");
        setProfileImageFile(null);
        fetchProfile();
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  const formatAddress = (address) => {
    if (!address) return "Not provided";
    const parts = [
      address.street,
      address.city,
      address.state,
      address.pincode,
      address.country,
    ].filter(Boolean);
    return parts.join(", ") || "Not provided";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaUser className="text-purple-600" />
            My Profile
          </h1>
          <p className="text-gray-600 mt-1">View and update your profile</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={uploading}
              className={`bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-all ${
                uploading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FaSave /> {uploading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setProfileImageFile(null);
                setProfileImagePreview(profile?.profileImage || null);
                fetchProfile();
              }}
              disabled={uploading}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-all"
            >
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8">
          <div className="flex items-center gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUser className="text-5xl text-purple-600" />
                )}
              </div>
              
              {/* Camera Icon for Upload */}
              {isEditing && (
                <label
                  htmlFor="profileImageInput"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-all"
                  title="Change profile photo"
                >
                  <FaCamera className="text-purple-600 text-lg" />
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div>
              <h2 className="text-3xl font-bold">{profile?.name}</h2>
              <p className="text-lg opacity-90">{profile?.designation}</p>
              <p className="text-sm opacity-80 mt-1">
                Employee ID: {profile?.employeeId}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Information - Read Only */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaUser className="text-blue-600" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm mb-1">Full Name</p>
            <p className="text-lg font-semibold">{profile?.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Email</p>
            <p className="text-lg font-semibold">{profile?.email}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Phone</p>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p className="text-lg font-semibold">{profile?.phone}</p>
            )}
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Designation</p>
            <p className="text-lg font-semibold">{profile?.designation}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Department</p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {profile?.department}
            </span>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Joining Date</p>
            <p className="text-lg font-semibold">
              {profile?.joiningDate
                ? new Date(profile.joiningDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Status</p>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                profile?.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {profile?.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {/* Address Information - Editable */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaMapMarkerAlt className="text-green-600" />
          Address Information
          {isEditing && (
            <span className="text-sm text-green-600 font-normal ml-2">
              (Editable)
            </span>
          )}
        </h3>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Street Address
              </label>
              <input
                type="text"
                placeholder="Enter street address"
                value={formData.address?.street || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={formData.address?.city || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, city: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  State
                </label>
                <input
                  type="text"
                  placeholder="Enter state"
                  value={formData.address?.state || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, state: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  PIN Code
                </label>
                <input
                  type="text"
                  placeholder="Enter PIN code"
                  maxLength="6"
                  value={formData.address?.pincode || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, pincode: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Enter country"
                  value={formData.address?.country || "India"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      address: { ...formData.address, country: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-lg">{formatAddress(profile?.address)}</p>
          </div>
        )}
      </div>

      {/* Government ID Details - Read Only */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaIdCard className="text-orange-600" />
          Government ID Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Aadhar Number</p>
            <p className="text-xl font-bold text-blue-700">
              {profile?.aadharNumber || "Not provided"}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">PAN Number</p>
            <p className="text-xl font-bold text-purple-700">
              {profile?.panNumber || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contact - Editable */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaPhone className="text-red-600" />
          Emergency Contact
          {isEditing && (
            <span className="text-sm text-green-600 font-normal ml-2">
              (Editable)
            </span>
          )}
        </h3>
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Contact Name
              </label>
              <input
                type="text"
                placeholder="Enter contact name"
                value={formData.emergencyContact.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: {
                      ...formData.emergencyContact,
                      name: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Contact Phone
              </label>
              <input
                type="tel"
                placeholder="Enter contact phone"
                value={formData.emergencyContact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: {
                      ...formData.emergencyContact,
                      phone: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Relation
              </label>
              <input
                type="text"
                placeholder="Enter relation"
                value={formData.emergencyContact.relation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: {
                      ...formData.emergencyContact,
                      relation: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">Name</p>
              <p className="text-lg font-semibold">
                {profile?.emergencyContact?.name || "Not provided"}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">Phone</p>
              <p className="text-lg font-semibold">
                {profile?.emergencyContact?.phone || "Not provided"}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">Relation</p>
              <p className="text-lg font-semibold">
                {profile?.emergencyContact?.relation || "Not provided"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bank Account Details - Read Only */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaUniversity className="text-indigo-600" />
          Bank Account Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm mb-1">Account Holder Name</p>
            <p className="text-lg font-semibold">
              {profile?.salary?.bankDetails?.accountHolderName || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Account Number</p>
            <p className="text-lg font-semibold">
              {profile?.salary?.bankDetails?.accountNumber || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">IFSC Code</p>
            <p className="text-lg font-semibold">
              {profile?.salary?.bankDetails?.ifscCode || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Bank Name</p>
            <p className="text-lg font-semibold">
              {profile?.salary?.bankDetails?.bankName || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Branch Name</p>
            <p className="text-lg font-semibold">
              {profile?.salary?.bankDetails?.branchName || "Not provided"}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Account Type</p>
            <p className="text-lg font-semibold">
              {profile?.salary?.bankDetails?.accountType || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Leave Balance */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Leave Balance</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-2">Casual Leave</p>
            <p className="text-4xl font-bold text-blue-600">
              {profile?.leaveBalance?.casual || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">days remaining</p>
          </div>

          <div className="bg-red-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-2">Sick Leave</p>
            <p className="text-4xl font-bold text-red-600">
              {profile?.leaveBalance?.sick || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">days remaining</p>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-2">Earned Leave</p>
            <p className="text-4xl font-bold text-purple-600">
              {profile?.leaveBalance?.earned || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">days remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}
