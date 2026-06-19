"use client";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function ProgressUpdateModal({
  show,
  project,
  submitting,
  onSubmit,
  onClose,
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (project) {
      setProgress(project.progress || 0);
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(progress);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-t-xl relative">
          <h2 className="text-2xl font-bold">Update Progress</h2>
          <p className="text-sm opacity-90 mt-1">{project?.projectName}</p>
          <button
            onClick={onClose}
            disabled={submitting}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-all disabled:opacity-50"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Progress Display */}
          <div className="text-center">
            <div className="text-6xl font-bold text-indigo-600 mb-2">
              {progress}%
            </div>
            <p className="text-gray-600">Project Completion</p>
          </div>

          {/* Progress Slider */}
          <div>
            <label className="block text-gray-700 font-semibold mb-4">
              Adjust Progress
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              disabled={submitting}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Progress Bar Preview */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Preview</p>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="grid grid-cols-5 gap-2">
            {[0, 25, 50, 75, 100].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setProgress(value)}
                disabled={submitting}
                className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                  progress === value
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } disabled:opacity-50`}
              >
                {value}%
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4 border-t">
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
              className={`px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting ? "Updating..." : "Update Progress"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
