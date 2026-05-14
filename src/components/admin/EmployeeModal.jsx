"use client";

export default function EmployeeModal({
  showModal,
  setShowModal,
  modalMode,
  selectedEmployee,
  formData,
  setFormData,
  handleSubmit,
  resetForm,
  submitting,
}) {
  const calculateNetSalary = () => {
    const basic = parseFloat(formData.salary.basicSalary) || 0;
    const totalAllowances =
      (parseFloat(formData.salary.allowances.hra) || 0) +
      (parseFloat(formData.salary.allowances.da) || 0) +
      (parseFloat(formData.salary.allowances.ta) || 0) +
      (parseFloat(formData.salary.allowances.other) || 0);
    const totalDeductions =
      (parseFloat(formData.salary.deductions.pf) || 0) +
      (parseFloat(formData.salary.deductions.tax) || 0) +
      (parseFloat(formData.salary.deductions.insurance) || 0) +
      (parseFloat(formData.salary.deductions.other) || 0);

    return basic + totalAllowances - totalDeductions;
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl my-8">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-t-xl">
          <h2 className="text-2xl font-bold">
            {modalMode === "add"
              ? "Add New Employee"
              : modalMode === "edit"
              ? "Edit Employee"
              : "Employee Details"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto">
          {modalMode === "view" ? (
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Employee ID</p>
                    <p className="font-semibold text-lg">{selectedEmployee?.employeeId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Full Name</p>
                    <p className="font-semibold text-lg">{selectedEmployee?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email Address</p>
                    <p className="font-semibold text-lg">{selectedEmployee?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone Number</p>
                    <p className="font-semibold text-lg">{selectedEmployee?.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Designation</p>
                    <p className="font-semibold text-lg">{selectedEmployee?.designation}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Department</p>
                    <p className="font-semibold text-lg">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {selectedEmployee?.department}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Joining Date</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.joiningDate
                        ? new Date(selectedEmployee.joiningDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <p className="font-semibold text-lg">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedEmployee?.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {selectedEmployee?.isActive ? "Active" : "Inactive"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Address Details
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-3">
                    <p className="text-gray-600 text-sm">Street Address</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.address?.street || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">City</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.address?.city || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">State</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.address?.state || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">PIN Code</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.address?.pincode || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Country</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.address?.country || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Government ID Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Government ID Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Aadhar Number</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.aadharNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">PAN Number</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.panNumber || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {selectedEmployee?.emergencyContact?.name && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-600 text-sm">Contact Name</p>
                      <p className="font-semibold text-lg">
                        {selectedEmployee?.emergencyContact?.name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Contact Phone</p>
                      <p className="font-semibold text-lg">
                        {selectedEmployee?.emergencyContact?.phone || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Relation</p>
                      <p className="font-semibold text-lg">
                        {selectedEmployee?.emergencyContact?.relation || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Account Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Bank Account Details
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Account Holder Name</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.salary?.bankDetails?.accountHolderName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Account Number</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.salary?.bankDetails?.accountNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">IFSC Code</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.salary?.bankDetails?.ifscCode || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Bank Name</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.salary?.bankDetails?.bankName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Branch Name</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.salary?.bankDetails?.branchName || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Account Type</p>
                    <p className="font-semibold text-lg">
                      {selectedEmployee?.salary?.bankDetails?.accountType || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Salary Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Salary Information
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4">
                    <p className="text-gray-600 text-sm">Basic Salary</p>
                    <p className="font-semibold text-2xl text-blue-600">
                      ₹{selectedEmployee?.salary?.basicSalary?.toLocaleString()}
                    </p>
                  </div>

                  {/* Allowances */}
                  <div className="col-span-4 mt-2">
                    <p className="text-gray-700 font-semibold mb-2">Allowances</p>
                    <div className="grid grid-cols-4 gap-4 bg-green-50 p-4 rounded-lg">
                      <div>
                        <p className="text-gray-600 text-sm">HRA</p>
                        <p className="font-semibold text-lg text-green-700">
                          +₹{selectedEmployee?.salary?.allowances?.hra?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">DA</p>
                        <p className="font-semibold text-lg text-green-700">
                          +₹{selectedEmployee?.salary?.allowances?.da?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">TA</p>
                        <p className="font-semibold text-lg text-green-700">
                          +₹{selectedEmployee?.salary?.allowances?.ta?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Other</p>
                        <p className="font-semibold text-lg text-green-700">
                          +₹{selectedEmployee?.salary?.allowances?.other?.toLocaleString() || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div className="col-span-4 mt-2">
                    <p className="text-gray-700 font-semibold mb-2">Deductions</p>
                    <div className="grid grid-cols-4 gap-4 bg-red-50 p-4 rounded-lg">
                      <div>
                        <p className="text-gray-600 text-sm">PF</p>
                        <p className="font-semibold text-lg text-red-700">
                          -₹{selectedEmployee?.salary?.deductions?.pf?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Tax</p>
                        <p className="font-semibold text-lg text-red-700">
                          -₹{selectedEmployee?.salary?.deductions?.tax?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Insurance</p>
                        <p className="font-semibold text-lg text-red-700">
                          -₹{selectedEmployee?.salary?.deductions?.insurance?.toLocaleString() || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Other</p>
                        <p className="font-semibold text-lg text-red-700">
                          -₹{selectedEmployee?.salary?.deductions?.other?.toLocaleString() || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Net Salary */}
                  <div className="col-span-4 mt-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                      <p className="text-sm opacity-90">Net Monthly Salary</p>
                      <p className="font-bold text-4xl mt-2">
                        ₹{selectedEmployee?.salary?.netSalary?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leave Balance */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Leave Balance
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Casual Leave</p>
                    <p className="font-semibold text-2xl text-blue-600">
                      {selectedEmployee?.leaveBalance?.casual || 0} days
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Sick Leave</p>
                    <p className="font-semibold text-2xl text-yellow-600">
                      {selectedEmployee?.leaveBalance?.sick || 0} days
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Earned Leave</p>
                    <p className="font-semibold text-2xl text-purple-600">
                      {selectedEmployee?.leaveBalance?.earned || 0} days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  {modalMode === "add" && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Designation *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Full Stack Developer"
                      value={formData.designation}
                      onChange={(e) =>
                        setFormData({ ...formData, designation: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    >
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      value={formData.joiningDate}
                      onChange={(e) =>
                        setFormData({ ...formData, joiningDate: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Address Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Address Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
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
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      City *
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
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      State *
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
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      PIN Code *
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
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
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
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Government IDs */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Government ID Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Aadhar Number *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter 12-digit Aadhar number"
                      maxLength="12"
                      value={formData.aadharNumber || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, aadharNumber: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      PAN Number *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter PAN number"
                      maxLength="10"
                      value={formData.panNumber || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          panNumber: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Bank Account Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Account Holder Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account holder name"
                      value={formData.salary?.bankDetails?.accountHolderName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            bankDetails: {
                              ...formData.salary.bankDetails,
                              accountHolderName: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter account number"
                      value={formData.salary?.bankDetails?.accountNumber || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            bankDetails: {
                              ...formData.salary.bankDetails,
                              accountNumber: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      IFSC Code *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter IFSC code"
                      maxLength="11"
                      value={formData.salary?.bankDetails?.ifscCode || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            bankDetails: {
                              ...formData.salary.bankDetails,
                              ifscCode: e.target.value.toUpperCase(),
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter bank name"
                      value={formData.salary?.bankDetails?.bankName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            bankDetails: {
                              ...formData.salary.bankDetails,
                              bankName: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Branch Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter branch name"
                      value={formData.salary?.bankDetails?.branchName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            bankDetails: {
                              ...formData.salary.bankDetails,
                              branchName: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Account Type
                    </label>
                    <select
                      value={formData.salary?.bankDetails?.accountType || "Savings"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            bankDetails: {
                              ...formData.salary.bankDetails,
                              accountType: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="Savings">Savings</option>
                      <option value="Current">Current</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Salary Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                  Salary Information
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Basic Salary *
                    </label>
                    <input
                      type="number"
                      placeholder="Enter basic salary"
                      value={formData.salary.basicSalary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            basicSalary: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      HRA (House Rent Allowance)
                    </label>
                    <input
                      type="number"
                      placeholder="Enter HRA"
                      value={formData.salary.allowances.hra}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            allowances: {
                              ...formData.salary.allowances,
                              hra: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      DA (Dearness Allowance)
                    </label>
                    <input
                      type="number"
                      placeholder="Enter DA"
                      value={formData.salary.allowances.da}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            allowances: {
                              ...formData.salary.allowances,
                              da: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      PF Deduction
                    </label>
                    <input
                      type="number"
                      placeholder="Enter PF deduction"
                      value={formData.salary.deductions.pf}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            deductions: {
                              ...formData.salary.deductions,
                              pf: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Tax Deduction
                    </label>
                    <input
                      type="number"
                      placeholder="Enter tax deduction"
                      value={formData.salary.deductions.tax}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: {
                            ...formData.salary,
                            deductions: {
                              ...formData.salary.deductions,
                              tax: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <div className="w-full bg-green-50 p-3 rounded-lg border-2 border-green-200">
                      <p className="text-gray-700 font-bold text-base">
                        Net Salary: ₹{calculateNetSalary().toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
            >
              {modalMode === "view" ? "Close" : "Cancel"}
            </button>
            {modalMode !== "view" && (
              <button
                type="submit"
                disabled={submitting}
                className={`px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all ${
                  submitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {submitting
                  ? "Processing..."
                  : modalMode === "add"
                  ? "Add Employee"
                  : "Update Employee"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
