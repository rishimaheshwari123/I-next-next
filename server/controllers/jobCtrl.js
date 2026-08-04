const Job = require("../models/jobModel");

// Create Job (Admin / Authorized Staff)
exports.createJobCtrl = async (req, res) => {
  try {
    const { title, experience, skills, budget, description, isActive } = req.body;

    if (!title || !experience || !skills || !budget || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (title, experience, skills, budget, description)",
      });
    }

    const job = await Job.create({
      title: title.trim(),
      experience: experience.trim(),
      skills: skills.trim(),
      budget: budget.trim(),
      description, // Keep exact spacing/formatting
      isActive: isActive !== undefined ? isActive : true,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({
      success: false,
      message: "Error creating job",
      error: error.message,
    });
  }
};

// Get All Jobs (Public & Admin)
exports.getAllJobsCtrl = async (req, res) => {
  try {
    const query = {};
    // If activeOnly is true (for public page), filter active jobs
    if (req.query.activeOnly === "true") {
      query.isActive = true;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching jobs",
      error: error.message,
    });
  }
};

// Get Single Job
exports.getSingleJobCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error("Error fetching single job:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching job details",
      error: error.message,
    });
  }
};

// Update Job (Admin / Authorized Staff)
exports.updateJobCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, experience, skills, budget, description, isActive } = req.body;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        title: title !== undefined ? title.trim() : job.title,
        experience: experience !== undefined ? experience.trim() : job.experience,
        skills: skills !== undefined ? skills.trim() : job.skills,
        budget: budget !== undefined ? budget.trim() : job.budget,
        description: description !== undefined ? description : job.description,
        isActive: isActive !== undefined ? isActive : job.isActive,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({
      success: false,
      message: "Error updating job",
      error: error.message,
    });
  }
};

// Delete Job (Admin / Authorized Staff)
exports.deleteJobCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting job",
      error: error.message,
    });
  }
};
