const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    punchIn: {
      type: Date,
      default: null,
    },
    punchOut: {
      type: Date,
      default: null,
    },
    totalHours: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["present", "absent", "half-day", "late", "on-leave"],
      default: "absent",
    },
    remarks: {
      type: String,
      default: "",
    },
    location: {
      punchInLocation: String,
      punchOutLocation: String,
    },
  },
  { timestamps: true }
);

// Create compound index for employee and date
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

// Calculate total hours before saving
attendanceSchema.pre("save", function (next) {
  if (this.punchIn && this.punchOut) {
    const diffMs = this.punchOut - this.punchIn;
    this.totalHours = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;

    // Determine status based on hours
    if (this.totalHours >= 8) {
      this.status = "present";
    } else if (this.totalHours >= 4) {
      this.status = "half-day";
    }

    // Check if late (after 10 AM)
    const punchInHour = this.punchIn.getHours();
    if (punchInHour >= 10 && this.status === "present") {
      this.status = "late";
    }
  }
  next();
});

module.exports = mongoose.model("Attendance", attendanceSchema);
