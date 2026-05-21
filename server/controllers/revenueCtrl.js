const Lead = require("../models/leadModel");
const Project = require("../models/projectModel");
const ServiceInquiry = require("../models/serviceInquiryModel");

// Get Revenue Statistics
exports.getRevenueStats = async (req, res) => {
  try {
    const { startDate, endDate, period = "all" } = req.query;

    // Build date filter
    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    } else if (period !== "all") {
      const now = new Date();
      let start = new Date();

      switch (period) {
        case "today":
          start.setHours(0, 0, 0, 0);
          break;
        case "week":
          start.setDate(now.getDate() - 7);
          break;
        case "month":
          start.setMonth(now.getMonth() - 1);
          break;
        case "year":
          start.setFullYear(now.getFullYear() - 1);
          break;
      }

      dateFilter = { createdAt: { $gte: start, $lte: now } };
    }

    // Get Won Leads Revenue
    const wonLeads = await Lead.find({
      leadStatus: "Won",
      ...dateFilter,
    });

    const leadsRevenue = wonLeads.reduce(
      (sum, lead) => sum + (lead.budget || 0),
      0
    );

    // Get Completed Projects Revenue
    const completedProjects = await Project.find({
      status: "Completed",
      ...dateFilter,
    });

    const projectsRevenue = completedProjects.reduce(
      (sum, project) => sum + (project.budget || 0),
      0
    );

    // Get Converted Service Inquiries Revenue
    const convertedServices = await ServiceInquiry.find({
      status: "converted",
      ...dateFilter,
    });

    const servicesRevenue = convertedServices.reduce(
      (sum, service) => sum + (service.variantAmount || 0),
      0
    );

    // Calculate Total Revenue
    const totalRevenue = leadsRevenue + projectsRevenue + servicesRevenue;

    // Get Monthly Revenue Trend (Last 6 months)
    const monthlyRevenue = await getMonthlyRevenueTrend();

    // Get Revenue by Source
    const revenueBySource = [
      {
        source: "Leads",
        amount: leadsRevenue,
        count: wonLeads.length,
        percentage: totalRevenue > 0 ? (leadsRevenue / totalRevenue) * 100 : 0,
      },
      {
        source: "Projects",
        amount: projectsRevenue,
        count: completedProjects.length,
        percentage:
          totalRevenue > 0 ? (projectsRevenue / totalRevenue) * 100 : 0,
      },
      {
        source: "Services",
        amount: servicesRevenue,
        count: convertedServices.length,
        percentage:
          totalRevenue > 0 ? (servicesRevenue / totalRevenue) * 100 : 0,
      },
    ];

    // Get Top Revenue Sources Details
    const topLeads = wonLeads
      .sort((a, b) => (b.budget || 0) - (a.budget || 0))
      .slice(0, 5)
      .map((lead) => ({
        id: lead._id,
        title: lead.leadTitle,
        client: lead.clientName,
        amount: lead.budget || 0,
        date: lead.actualClosingDate || lead.createdAt,
        type: "Lead",
      }));

    const topProjects = completedProjects
      .sort((a, b) => (b.budget || 0) - (a.budget || 0))
      .slice(0, 5)
      .map((project) => ({
        id: project._id,
        title: project.projectName,
        client: project.client?.name || "N/A",
        amount: project.budget || 0,
        date: project.actualEndDate || project.createdAt,
        type: "Project",
      }));

    const topServices = convertedServices
      .sort((a, b) => (b.variantAmount || 0) - (a.variantAmount || 0))
      .slice(0, 5)
      .map((service) => ({
        id: service._id,
        title: service.variantName,
        client: service.clientName,
        amount: service.variantAmount || 0,
        date: service.updatedAt,
        type: "Service",
      }));

    const topRevenueSources = [...topLeads, ...topProjects, ...topServices]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        leadsRevenue,
        projectsRevenue,
        servicesRevenue,
        revenueBySource,
        monthlyRevenue,
        topRevenueSources,
        counts: {
          wonLeads: wonLeads.length,
          completedProjects: completedProjects.length,
          convertedServices: convertedServices.length,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching revenue stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch revenue statistics",
      error: error.message,
    });
  }
};

// Helper function to get monthly revenue trend
async function getMonthlyRevenueTrend() {
  const months = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

    const dateFilter = {
      createdAt: { $gte: monthStart, $lte: monthEnd },
    };

    const wonLeads = await Lead.find({
      leadStatus: "Won",
      ...dateFilter,
    });

    const completedProjects = await Project.find({
      status: "Completed",
      ...dateFilter,
    });

    const convertedServices = await ServiceInquiry.find({
      status: "converted",
      ...dateFilter,
    });

    const leadsRevenue = wonLeads.reduce(
      (sum, lead) => sum + (lead.budget || 0),
      0
    );
    const projectsRevenue = completedProjects.reduce(
      (sum, project) => sum + (project.budget || 0),
      0
    );
    const servicesRevenue = convertedServices.reduce(
      (sum, service) => sum + (service.variantAmount || 0),
      0
    );

    months.push({
      month: monthStart.toLocaleString("default", { month: "short" }),
      year: monthStart.getFullYear(),
      leads: leadsRevenue,
      projects: projectsRevenue,
      services: servicesRevenue,
      total: leadsRevenue + projectsRevenue + servicesRevenue,
    });
  }

  return months;
}

// Get Revenue Details by Type
exports.getRevenueDetails = async (req, res) => {
  try {
    const { type, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    let data = [];
    let total = 0;

    if (type === "leads") {
      const wonLeads = await Lead.find({ leadStatus: "Won" })
        .populate("assignedTo", "name email")
        .sort({ actualClosingDate: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      total = await Lead.countDocuments({ leadStatus: "Won" });

      data = wonLeads.map((lead) => ({
        id: lead._id,
        title: lead.leadTitle,
        client: lead.clientName,
        amount: lead.budget || 0,
        date: lead.actualClosingDate || lead.createdAt,
        assignedTo: lead.assignedTo?.name || "N/A",
        source: lead.leadSource,
        type: lead.leadType,
      }));
    } else if (type === "projects") {
      const completedProjects = await Project.find({ status: "Completed" })
        .populate("client", "name email")
        .populate("assignedEmployees", "name")
        .sort({ actualEndDate: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      total = await Project.countDocuments({ status: "Completed" });

      data = completedProjects.map((project) => ({
        id: project._id,
        title: project.projectName,
        client: project.client?.name || "N/A",
        amount: project.budget || 0,
        date: project.actualEndDate || project.createdAt,
        category: project.category,
        employees: project.assignedEmployees?.map((emp) => emp.name) || [],
      }));
    } else if (type === "services") {
      const convertedServices = await ServiceInquiry.find({
        status: "converted",
      })
        .populate("serviceId", "name")
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      total = await ServiceInquiry.countDocuments({ status: "converted" });

      data = convertedServices.map((service) => ({
        id: service._id,
        title: service.variantName,
        client: service.clientName,
        amount: service.variantAmount || 0,
        date: service.updatedAt,
        service: service.serviceId?.name || "N/A",
        email: service.clientEmail,
      }));
    }

    res.status(200).json({
      success: true,
      data,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching revenue details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch revenue details",
      error: error.message,
    });
  }
};
