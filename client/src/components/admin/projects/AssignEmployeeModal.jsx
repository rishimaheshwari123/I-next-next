"use client";
import { useState, useEffect } from "react";
import { FaTimes, FaUser } from "react-icons/fa";

export default function AssignEmployeeModal({
  show,
  project,
  employees,
  submitting,
  onSubmit,
  onClose,
}) {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    if (project && project.assignedEmployees) {
      setSelectedEmployees(
        project.assignedEmployees.map((emp) => emp._id || emp)
      );
    }
  }, [project]);

  const handleToggle = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedEmployees);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 relative flex-shrink-0">
          <h2 className="text-2xl font-bold">
            Assign Employees - {project?.projectName}
          </h2>
          <p className="text-sm opacity-90 mt-1">
            {selectedEmployees.length} employee(s) selected
          </p>
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all disabled:opacity-50"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="p-6 overflow-y-auto flex-1">
            {employees.length === 0 ? (
              <div className="text-center py-12">
                <FaUser className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No employees available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {employees.map((employee) => (
                  <label
                    key={employee._id}
                    className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      selectedEmployees.includes(employee._id)
                        ? "bg-green-50 border-green-500"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    } ${submitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee._id)}
                      onChange={() => handleToggle(employee._id)}
                      disabled={submitting}
                      className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                    />
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {employee.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {employee.name}
                      </p>
                      <p className="text-sm text-gray-600">{employee.email}</p>
                      {employee.designation && (
                        <p className="text-xs text-gray-500">
                          {employee.designation}
                        </p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 border-t bg-gray-50 flex justify-end gap-4 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Assigning..." : "Assign Employees"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
