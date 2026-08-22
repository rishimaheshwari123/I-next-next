const analyticsCache = require("../utils/analyticsCache");

// Track a new Page View
exports.trackPageView = async (req, res) => {
  try {
    const data = req.body;
    
    // Extract IP address from request headers or Express default
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    
    // Extract User Agent
    const userAgent = req.headers["user-agent"] || "";

    // Record view asynchronously in cache and DB
    analyticsCache.trackPageView(data, ip, userAgent);

    return res.status(200).json({
      success: true,
      message: "PageView recorded successfully"
    });
  } catch (error) {
    console.error("Error in trackPageView controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to track page view",
      error: error.message
    });
  }
};

// Track Session Dwell Heartbeat Ping
exports.trackPing = async (req, res) => {
  try {
    const data = req.body;

    // Record ping asynchronously in cache and DB
    analyticsCache.trackPing(data);

    return res.status(200).json({
      success: true,
      message: "Dwell ping recorded successfully"
    });
  } catch (error) {
    console.error("Error in trackPing controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to record dwell ping",
      error: error.message
    });
  }
};

// Fetch Analytics Stats for Admin Panel
exports.getAnalyticsStats = async (req, res) => {
  try {
    const filters = {
      range: req.query.range || "1month",
      startDate: req.query.startDate || null,
      endDate: req.query.endDate || null,
      state: req.query.state || null,
      city: req.query.city || null,
      cohort: req.query.cohort || "all",
      includeBots: req.query.includeBots === "true",
      path: req.query.path || null
    };

    const stats = await analyticsCache.getAnalyticsStats(filters);

    return res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error("Error in getAnalyticsStats controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load website analytics data",
      error: error.message
    });
  }
};
