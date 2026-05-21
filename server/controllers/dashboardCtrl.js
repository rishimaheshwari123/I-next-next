const Lead = require("../models/leadModel");
const Project = require("../models/projectModel");
const ServiceInquiry = require("../models/serviceInquiryModel");
const Service = require("../models/serviceModel");
const Employee = require("../models/employeeModel");
const Auth = require("../models/authModel");

// Get Complete Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Fetch all data in parallel
    const [
      leads,
      projects,
      services,
      employees,
      clients,
      wonLeads,
      completedProjects,
      convertedServices,
    ] = await Promise.all([
      // All Leads
      Lead.find(),
      
      // All Projects
      Project.find(),
      
      // All Services
      Service.find({ isActive: true }),
      
      // All Employees
      Employee.find(),
      
      // All Clients
      Auth.find({ role: "client" }),
      
      // Won Leads for revenue
      Lead.find({ leadStatus: "Won" }),
      
      // Completed Projects for revenue
      Project.find({ status: "Completed" }),
      
      // Converted Services for revenue
      ServiceInquiry.find({ status: "converted" }),
    ]);

    // Calculate Lead Stats
    const leadStats = {
      total: leads.length,
      active: leads.filter(l => 
        ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation'].includes(l.leadStatus)
      ).length,
      won: leads.filter(l => l.leadStatus === 'Won').length,
      lost: leads.filter(l => l.leadStatus === 'Lost').length,
      byStatus: {},
    };

    // Group leads by status
    leads.forEach(lead => {
      leadStats.byStatus[lead.leadStatus] = (leadStats.byStatus[lead.leadStatus] || 0) + 1;
    });

    // Calculate Project Stats
    const projectStats = {
      total: projects.length,
      running: projects.filter(p => p.status === 'In Progress').length,
      completed: projects.filter(p => p.status === 'Completed').length,
      planning: projects.filter(p => p.status === 'Planning').length,
      testing: projects.filter(p => p.status === 'Testing').length,
      onHold: projects.filter(p => p.status === 'On Hold').length,
      active: projects.filter(p => 
        ['In Progress', 'Planning', 'Testing'].includes(p.status)
      ).length,
      byStatus: {},
    };

    // Group projects by status
    projects.forEach(project => {
      projectStats.byStatus[project.status] = (projectStats.byStatus[project.status] || 0) + 1;
    });

    // Calculate Employee Stats
    const employeeStats = {
      total: employees.length,
      active: employees.filter(e => e.isActive).length,
      inactive: employees.filter(e => !e.isActive).length,
    };

    // Calculate Client Stats
    const clientStats = {
      total: clients.length,
      active: clients.filter(c => c.isActive !== false).length,
    };

    // Calculate Service Stats
    const serviceStats = {
      total: services.length,
      active: services.length,
    };

    // Calculate Revenue
    const leadsRevenue = wonLeads.reduce((sum, lead) => sum + (lead.budget || 0), 0);
    const projectsRevenue = completedProjects.reduce((sum, project) => sum + (project.budget || 0), 0);
    const servicesRevenue = convertedServices.reduce((sum, service) => sum + (service.variantAmount || 0), 0);
    const totalRevenue = leadsRevenue + projectsRevenue + servicesRevenue;

    const revenueStats = {
      total: totalRevenue,
      fromLeads: leadsRevenue,
      fromProjects: projectsRevenue,
      fromServices: servicesRevenue,
      breakdown: {
        leads: {
          amount: leadsRevenue,
          count: wonLeads.length,
          percentage: totalRevenue > 0 ? (leadsRevenue / totalRevenue) * 100 : 0,
        },
        projects: {
          amount: projectsRevenue,
          count: completedProjects.length,
          percentage: totalRevenue > 0 ? (projectsRevenue / totalRevenue) * 100 : 0,
        },
        services: {
          amount: servicesRevenue,
          count: convertedServices.length,
          percentage: totalRevenue > 0 ? (servicesRevenue / totalRevenue) * 100 : 0,
        },
      },
    };

    // Prepare chart data for leads
    const leadsChartData = Object.keys(leadStats.byStatus).map(status => ({
      status,
      count: leadStats.byStatus[status],
    }));

    // Prepare chart data for projects
    const projectsChartData = Object.keys(projectStats.byStatus).map(status => ({
      status,
      count: projectStats.byStatus[status],
    }));

    // Send complete dashboard data
    res.status(200).json({
      success: true,
      data: {
        leads: leadStats,
        projects: projectStats,
        employees: employeeStats,
        clients: clientStats,
        services: serviceStats,
        revenue: revenueStats,
        charts: {
          leads: leadsChartData,
          projects: projectsChartData,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};
