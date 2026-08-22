const { PageView, VisitorSession } = require("../models/analyticsModel");
const axios = require("axios");

// In-Memory Caches
let pageViewsCache = []; // PageView objects for the last 30 days
let sessionsCache = []; // VisitorSession objects for the last 30 days
const activeSessions = new Map(); // sessionId -> active session details (in-memory only, active in last 30m)
const ipLocations = new Map(); // ip -> { country, state, city }

// Mock locations for localhost / private IPs to enable beautiful local testing
const mockLocations = [
  { country: "India", state: "Madhya Pradesh", city: "Bhopal" },
  { country: "India", state: "Madhya Pradesh", city: "Indore" },
  { country: "India", state: "Madhya Pradesh", city: "Jabalpur" },
  { country: "India", state: "Maharashtra", city: "Mumbai" },
  { country: "India", state: "Maharashtra", city: "Pune" },
  { country: "India", state: "Delhi", city: "New Delhi" },
  { country: "India", state: "Karnataka", city: "Bengaluru" },
  { country: "India", state: "Uttar Pradesh", city: "Noida" },
  { country: "India", state: "Uttar Pradesh", city: "Lucknow" },
  { country: "India", state: "Gujarat", city: "Ahmedabad" },
  { country: "India", state: "Rajasthan", city: "Jaipur" },
  { country: "India", state: "Telangana", city: "Hyderabad" },
];

// Helper to determine bot traffic from User-Agent
function detectBot(userAgent) {
  if (!userAgent) return false;
  const botRegex = /bot|spider|crawl|lighthouse|pingdom|gtmetrix|slurp|yahoo|bing|google|baidu|yandex/i;
  return botRegex.test(userAgent);
}

// Get deterministic mock location for a visitor based on visitorId or IP
function getMockLocation(seed) {
  let hash = 0;
  const str = seed || "default";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % mockLocations.length;
  return mockLocations[index];
}

// Geolocation resolver
async function resolveIpLocation(ip, visitorId) {
  if (!ip) return getMockLocation(visitorId);
  
  // Clean IP
  let cleanIp = ip.trim();
  if (cleanIp.startsWith("::ffff:")) {
    cleanIp = cleanIp.replace("::ffff:", "");
  }

  // Check memory cache
  if (ipLocations.has(cleanIp)) {
    return ipLocations.get(cleanIp);
  }

  // Local / private IP check
  const isLocal = 
    cleanIp === "127.0.0.1" || 
    cleanIp === "::1" || 
    cleanIp.startsWith("10.") || 
    cleanIp.startsWith("192.168.") || 
    cleanIp.startsWith("172.16.") || 
    cleanIp.startsWith("localhost");

  if (isLocal) {
    try {
      // Try to fetch the local machine's public IP to resolve actual developer location
      const ipifyRes = await axios.get("https://api.ipify.org?format=json", { timeout: 1500 });
      if (ipifyRes.data && ipifyRes.data.ip) {
        const publicIp = ipifyRes.data.ip;
        const geoRes = await axios.get(`http://ip-api.com/json/${publicIp}`, { timeout: 1500 });
        if (geoRes.data && geoRes.data.status === "success") {
          const loc = {
            country: geoRes.data.country || "India",
            state: geoRes.data.regionName || "Madhya Pradesh",
            city: geoRes.data.city || "Bhopal"
          };
          ipLocations.set(cleanIp, loc);
          return loc;
        }
      }
    } catch (e) {
      console.log("Could not resolve local public IP, using default MP location:", e.message);
    }

    // Default loopback fallback is Madhya Pradesh, Bhopal
    const loc = { country: "India", state: "Madhya Pradesh", city: "Bhopal" };
    ipLocations.set(cleanIp, loc);
    return loc;
  }

  // Live IP geolocation lookup using ip-api.com (rate limited to 45 req/min)
  try {
    const res = await axios.get(`http://ip-api.com/json/${cleanIp}`, { timeout: 2000 });
    if (res.data && res.data.status === "success") {
      const loc = {
        country: res.data.country || "India",
        state: res.data.regionName || "Madhya Pradesh",
        city: res.data.city || "Bhopal"
      };
      ipLocations.set(cleanIp, loc);
      return loc;
    }
  } catch (err) {
    console.error(`IP Geolocation failed for ${cleanIp}:`, err.message);
  }

  // Fallback
  const fallbackLoc = getMockLocation(visitorId || cleanIp);
  ipLocations.set(cleanIp, fallbackLoc);
  return fallbackLoc;
}

// Preload the last 30 days of data from database on server startup
async function preloadCache() {
  try {
    console.log("Preloading website analytics cache from database...");
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Fetch views and sessions
    const [views, sessions] = await Promise.all([
      PageView.find({ timestamp: { $gte: thirtyDaysAgo } }).lean(),
      VisitorSession.find({ createdAt: { $gte: thirtyDaysAgo } }).lean()
    ]);

    pageViewsCache = views.map(v => ({ ...v, _id: v._id.toString(), userId: v.userId ? v.userId.toString() : null }));
    sessionsCache = sessions.map(s => ({ ...s, _id: s._id.toString(), userId: s.userId ? s.userId.toString() : null }));

    console.log(`Preloaded ${pageViewsCache.length} pageviews and ${sessionsCache.length} sessions.`);
  } catch (err) {
    console.error("Error preloading analytics cache:", err);
  }
}

// Periodic cleanup to keep only the last 30 days in memory
setInterval(() => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  pageViewsCache = pageViewsCache.filter(pv => new Date(pv.timestamp) >= thirtyDaysAgo);
  sessionsCache = sessionsCache.filter(s => new Date(s.createdAt) >= thirtyDaysAgo);

  // Clean inactive sessions from activeSessions map (older than 30 mins)
  const thirtyMinsAgo = Date.now() - 30 * 60 * 1000;
  for (const [sid, sess] of activeSessions.entries()) {
    if (sess.lastActive < thirtyMinsAgo) {
      activeSessions.delete(sid);
    }
  }
}, 10 * 60 * 1000); // run every 10 minutes

// Track a Page View
async function trackPageView(data, reqIp, userAgent) {
  try {
    const isBot = detectBot(userAgent);
    const loc = await resolveIpLocation(reqIp, data.visitorId);

    const pvDoc = {
      visitorId: data.visitorId,
      sessionId: data.sessionId,
      path: data.path || "/",
      title: data.title || "",
      referrer: data.referrer || "",
      utm: {
        source: data.utm?.source || "",
        medium: data.utm?.medium || "",
        campaign: data.utm?.campaign || "",
        term: data.utm?.term || "",
        content: data.utm?.content || "",
      },
      dwellTime: 0,
      userId: data.user?.id || null,
      userEmail: data.user?.email || "",
      userName: data.user?.name || "",
      ip: reqIp || "127.0.0.1",
      country: loc.country,
      state: loc.state,
      city: loc.city,
      browser: data.browser || "Unknown",
      os: data.os || "Unknown",
      deviceType: data.deviceType || "Desktop",
      isBot,
      timestamp: new Date(),
    };

    // Save PageView to MongoDB asynchronously
    const pv = new PageView(pvDoc);
    pv.save().then(savedDoc => {
      pvDoc._id = savedDoc._id.toString();
      pageViewsCache.push(pvDoc);
    }).catch(err => console.error("Error saving pageview to DB:", err));

    // Manage Session
    let session = sessionsCache.find(s => s.sessionId === data.sessionId);
    const now = new Date();

    const sessionDoc = {
      sessionId: data.sessionId,
      visitorId: data.visitorId,
      userId: data.user?.id || null,
      userEmail: data.user?.email || "",
      userName: data.user?.name || "",
      ip: reqIp || "127.0.0.1",
      country: loc.country,
      state: loc.state,
      city: loc.city,
      browser: data.browser || "Unknown",
      os: data.os || "Unknown",
      deviceType: data.deviceType || "Desktop",
      referrer: data.referrer || "",
      utm: {
        source: data.utm?.source || "",
        medium: data.utm?.medium || "",
        campaign: data.utm?.campaign || "",
        term: data.utm?.term || "",
        content: data.utm?.content || "",
      },
      isConversion: false,
      conversionType: "",
      isBot,
      createdAt: session ? new Date(session.createdAt) : now,
      lastActive: now,
    };

    // Check for conversion paths (if they hit a successful submit/lead generation)
    // We can also trigger conversions explicitly from other models, but let's check path matches
    if (data.path && (data.path.includes("success") || data.path.includes("thank-you") || data.path.includes("inquiry-submitted"))) {
      sessionDoc.isConversion = true;
      sessionDoc.conversionType = "Form Submission Page View";
    }

    // Save/Update session in DB and memory
    VisitorSession.findOneAndUpdate(
      { sessionId: data.sessionId },
      sessionDoc,
      { upsert: true, new: true, lean: true }
    ).then(savedSession => {
      const idx = sessionsCache.findIndex(s => s.sessionId === data.sessionId);
      const formattedSession = { ...savedSession, _id: savedSession._id.toString(), userId: savedSession.userId ? savedSession.userId.toString() : null };
      if (idx !== -1) {
        sessionsCache[idx] = formattedSession;
      } else {
        sessionsCache.push(formattedSession);
      }
    }).catch(err => console.error("Error upserting session in DB:", err));

    // Update activeSessions map for real-time tracking
    activeSessions.set(data.sessionId, {
      sessionId: data.sessionId,
      visitorId: data.visitorId,
      userId: data.user?.id || null,
      userEmail: data.user?.email || "",
      userName: data.user?.name || "",
      ip: reqIp || "127.0.0.1",
      city: loc.city,
      state: loc.state,
      browser: data.browser || "Unknown",
      os: data.os || "Unknown",
      deviceType: data.deviceType || "Desktop",
      currentPath: data.path || "/",
      lastActive: Date.now(),
    });

  } catch (err) {
    console.error("Error in trackPageView cache handler:", err);
  }
}

// Track a Dwell Time Ping
async function trackPing(data) {
  try {
    const { sessionId, path, timeSpent } = data;
    if (!sessionId || !timeSpent) return;

    // 1. Update in activeSessions
    const active = activeSessions.get(sessionId);
    if (active) {
      active.lastActive = Date.now();
      active.currentPath = path || active.currentPath;
    }

    // 2. Find and update pageview in memory & DB
    // We find the latest pageview for this session & path
    const matchViewIndex = [...pageViewsCache].reverse().findIndex(pv => pv.sessionId === sessionId && pv.path === path);
    if (matchViewIndex !== -1) {
      const actualIndex = pageViewsCache.length - 1 - matchViewIndex;
      pageViewsCache[actualIndex].dwellTime = (pageViewsCache[actualIndex].dwellTime || 0) + Number(timeSpent);
      
      // Update DB
      PageView.updateOne(
        { _id: pageViewsCache[actualIndex]._id },
        { $inc: { dwellTime: Number(timeSpent) } }
      ).catch(err => console.error("Error updating PageView dwellTime in DB:", err));
    }

    // 3. Update session lastActive in memory & DB
    const sessionIndex = sessionsCache.findIndex(s => s.sessionId === sessionId);
    if (sessionIndex !== -1) {
      sessionsCache[sessionIndex].lastActive = new Date();
      
      VisitorSession.updateOne(
        { sessionId },
        { $set: { lastActive: new Date() } }
      ).catch(err => console.error("Error updating session lastActive in DB:", err));
    }
  } catch (err) {
    console.error("Error in trackPing cache handler:", err);
  }
}

// Track external conversions (e.g. from lead creation, form submits, plans purchases)
async function trackExternalConversion(sessionId, conversionType) {
  if (!sessionId) return;
  try {
    const sessionIndex = sessionsCache.findIndex(s => s.sessionId === sessionId);
    if (sessionIndex !== -1) {
      sessionsCache[sessionIndex].isConversion = true;
      sessionsCache[sessionIndex].conversionType = conversionType;
    }

    await VisitorSession.updateOne(
      { sessionId },
      { $set: { isConversion: true, conversionType } }
    );
  } catch (err) {
    console.error("Error in trackExternalConversion:", err);
  }
}

// Retrieve pre-compiled stats from the cache based on filters
async function getAnalyticsStats(filters) {
  const {
    range = "1month",
    startDate,
    endDate,
    state,
    city,
    cohort = "all",
    includeBots = false,
    path
  } = filters;

  // 1. Establish date range filter
  let minDate = new Date();
  let maxDate = new Date();

  if (range === "today") {
    minDate.setHours(0, 0, 0, 0);
  } else if (range === "yesterday") {
    minDate.setDate(minDate.getDate() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setDate(maxDate.getDate() - 1);
    maxDate.setHours(23, 59, 59, 999);
  } else if (range === "1week") {
    minDate.setDate(minDate.getDate() - 7);
  } else if (range === "1month") {
    minDate.setDate(minDate.getDate() - 30);
  } else if (range === "custom" && startDate) {
    minDate = new Date(startDate);
    if (endDate) {
      maxDate = new Date(endDate);
    }
  } else {
    // "all" or fallback - load all from cache
    minDate = new Date(0); // Epoch start
  }

  // Filter pageviews and sessions from memory cache
  let filteredViews = pageViewsCache.filter(pv => {
    const ts = new Date(pv.timestamp);
    if (ts < minDate || ts > maxDate) return false;
    if (!includeBots && pv.isBot) return false;
    if (state && pv.state?.toLowerCase() !== state.toLowerCase()) return false;
    if (city && pv.city?.toLowerCase() !== city.toLowerCase()) return false;
    if (path && pv.path?.toLowerCase() !== path.toLowerCase()) return false;

    if (cohort === "guest" && pv.userId) return false;
    if (cohort === "logged-in" && !pv.userId) return false;

    return true;
  });

  let filteredSessions = sessionsCache.filter(s => {
    const created = new Date(s.createdAt);
    if (created < minDate || created > maxDate) return false;
    if (!includeBots && s.isBot) return false;
    if (state && s.state?.toLowerCase() !== state.toLowerCase()) return false;
    if (city && s.city?.toLowerCase() !== city.toLowerCase()) return false;
    
    if (cohort === "guest" && s.userId) return false;
    if (cohort === "logged-in" && !s.userId) return false;

    // Filter sessions by page path if path filter is applied
    if (path) {
      const sessViews = filteredViews.filter(v => v.sessionId === s.sessionId);
      if (sessViews.length === 0) return false;
    }

    return true;
  });

  // Calculate stats cards
  const totalViews = filteredViews.length;
  const totalSessions = filteredSessions.length;
  const uniqueDevices = new Set(filteredViews.map(v => v.visitorId)).size;

  // Dwell times
  const totalDwellTime = filteredViews.reduce((sum, v) => sum + (v.dwellTime || 0), 0);
  const avgSessionStay = totalSessions > 0 ? Math.round(totalDwellTime / totalSessions) : 0; // in seconds

  // Bounce rate (sessions with exactly 1 pageview in the filtered set)
  const sessionPageviewCounts = {};
  filteredViews.forEach(v => {
    sessionPageviewCounts[v.sessionId] = (sessionPageviewCounts[v.sessionId] || 0) + 1;
  });
  let bounces = 0;
  filteredSessions.forEach(s => {
    const cnt = sessionPageviewCounts[s.sessionId] || 0;
    if (cnt === 1) bounces++;
  });
  const bounceRate = totalSessions > 0 ? Number(((bounces / totalSessions) * 100).toFixed(1)) : 0;

  // Live active (active in the last 90 seconds in activeSessions)
  const ninetySecsAgo = Date.now() - 90 * 1000;
  let liveActive = 0;
  for (const sess of activeSessions.values()) {
    // Apply filters to live active list
    if (sess.lastActive >= ninetySecsAgo) {
      if (state && sess.state?.toLowerCase() !== state.toLowerCase()) continue;
      if (city && sess.city?.toLowerCase() !== city.toLowerCase()) continue;
      if (cohort === "guest" && sess.userId) continue;
      if (cohort === "logged-in" && !sess.userId) continue;
      liveActive++;
    }
  }

  // Compile Daily Trend chart data
  const trendMap = {};
  // Initialize date buckets for the last X days to prevent empty spaces in charts
  const bucketDate = new Date(minDate);
  const todayDate = new Date();
  // limit initialized days to 30 for performance
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() - 30);
  const startInit = bucketDate > limitDate ? bucketDate : limitDate;
  
  while (startInit <= todayDate) {
    const key = startInit.toISOString().split("T")[0];
    trendMap[key] = { date: key, views: 0, sessions: 0 };
    startInit.setDate(startInit.getDate() + 1);
  }

  // Populated trend map
  filteredViews.forEach(v => {
    const key = new Date(v.timestamp).toISOString().split("T")[0];
    if (!trendMap[key]) {
      trendMap[key] = { date: key, views: 0, sessions: 0 };
    }
    trendMap[key].views++;
  });
  filteredSessions.forEach(s => {
    const key = new Date(s.createdAt).toISOString().split("T")[0];
    if (!trendMap[key]) {
      trendMap[key] = { date: key, views: 0, sessions: 0 };
    }
    trendMap[key].sessions++;
  });
  const trendsChart = Object.values(trendMap).sort((a, b) => a.date.localeCompare(b.date));

  // Geolocation ranking (State and City tables)
  const stateCounts = {};
  const cityCounts = {};
  filteredSessions.forEach(s => {
    const st = s.state || "Unknown";
    const ct = s.city || "Unknown";
    stateCounts[st] = (stateCounts[st] || 0) + 1;
    cityCounts[`${ct}, ${st}`] = (cityCounts[`${ct}, ${st}`] || 0) + 1;
  });

  const statesList = Object.entries(stateCounts)
    .map(([name, sessions]) => ({
      name,
      sessions,
      views: filteredViews.filter(v => v.state === name).length,
      percentage: totalSessions > 0 ? Number(((sessions / totalSessions) * 100).toFixed(1)) : 0
    }))
    .sort((a, b) => b.sessions - a.sessions);

  const citiesList = Object.entries(cityCounts)
    .map(([combined, sessions]) => {
      const [name, stateName] = combined.split(", ");
      return {
        name,
        state: stateName,
        sessions,
        views: filteredViews.filter(v => v.city === name).length,
        percentage: totalSessions > 0 ? Number(((sessions / totalSessions) * 100).toFixed(1)) : 0
      };
    })
    .sort((a, b) => b.sessions - a.sessions);

  // Pages ranking
  const pageMap = {};
  filteredViews.forEach(v => {
    const p = v.path || "/";
    if (!pageMap[p]) {
      pageMap[p] = { path: p, title: v.title || p, views: 0, visitors: new Set(), totalDwell: 0 };
    }
    pageMap[p].views++;
    pageMap[p].visitors.add(v.visitorId);
    pageMap[p].totalDwell += v.dwellTime || 0;
  });

  const pagesList = Object.values(pageMap)
    .map(p => ({
      path: p.path,
      title: p.title,
      views: p.views,
      uniqueVisitors: p.visitors.size,
      avgDwellTime: p.views > 0 ? Math.round(p.totalDwell / p.views) : 0 // average per view
    }))
    .sort((a, b) => b.views - a.views);

  // Conversion Funnel steps
  // Step 1: Landing Page (Views of '/')
  const step1Count = new Set(filteredViews.filter(v => v.path === "/").map(v => v.sessionId)).size;
  // Step 2: Product/Service View (Views of /service or other service paths)
  const step2Count = new Set(filteredViews.filter(v => 
    v.path.startsWith("/service") || 
    v.path.startsWith("/ai-services") || 
    v.path.startsWith("/web-development") || 
    v.path.startsWith("/digital-marketing") || 
    v.path.startsWith("/mobile-app-development") ||
    v.path.startsWith("/ecomdev") ||
    v.path.startsWith("/cmsdev") ||
    v.path.startsWith("/seomarket") ||
    v.path.startsWith("/social-media-marketing") ||
    v.path.startsWith("/softwaredev") ||
    v.path.startsWith("/uiuxdesign") ||
    v.path.startsWith("/webdesign")
  ).map(v => v.sessionId)).size;
  // Step 3: Contact / Lead Form Visited (/contact, /apply, /prework, etc.)
  const step3Count = new Set(filteredViews.filter(v => 
    v.path.startsWith("/contact") || 
    v.path.startsWith("/apply") || 
    v.path.startsWith("/career") || 
    v.path.startsWith("/prework") || 
    v.path.startsWith("/support")
  ).map(v => v.sessionId)).size;
  // Step 4: Submission Completed (Any sessions with an inquiry submission / conversion flag)
  const step4Count = filteredSessions.filter(s => s.isConversion).length;

  const funnelSteps = [
    { step: "1. Home Page View", count: step1Count, rate: 100 },
    { step: "2. Services Visited", count: step2Count, rate: step1Count > 0 ? Math.round((step2Count / step1Count) * 100) : 0 },
    { step: "3. Contact/Apply Form View", count: step3Count, rate: step2Count > 0 ? Math.round((step3Count / step2Count) * 100) : 0 },
    { step: "4. Inquiry Completed", count: step4Count, rate: step3Count > 0 ? Math.round((step4Count / step3Count) * 100) : 0 },
  ];

  // UTM Sources & Traffic Channels
  const referrerMap = {};
  const utmSourceMap = {};
  const utmMediumMap = {};
  const utmCampaignMap = {};

  filteredSessions.forEach(s => {
    // Referrers
    let ref = s.referrer || "Direct";
    if (ref.includes("localhost")) ref = "Localhost Development";
    else if (ref.includes("google.com")) ref = "Google Search";
    else if (ref.includes("facebook.com")) ref = "Facebook";
    else if (ref.includes("linkedin.com")) ref = "LinkedIn";
    else if (ref.includes("instagram.com")) ref = "Instagram";
    else if (ref.includes("t.co") || ref.includes("twitter.com")) ref = "X / Twitter";
    else if (ref !== "Direct") {
      try {
        const url = new URL(ref);
        ref = url.hostname;
      } catch (e) {
        ref = "External Referral";
      }
    }
    referrerMap[ref] = (referrerMap[ref] || 0) + 1;

    // UTM params
    if (s.utm?.source) utmSourceMap[s.utm.source] = (utmSourceMap[s.utm.source] || 0) + 1;
    if (s.utm?.medium) utmMediumMap[s.utm.medium] = (utmMediumMap[s.utm.medium] || 0) + 1;
    if (s.utm?.campaign) utmCampaignMap[s.utm.campaign] = (utmCampaignMap[s.utm.campaign] || 0) + 1;
  });

  const referrersList = Object.entries(referrerMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  const utmSourcesList = Object.entries(utmSourceMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  const utmMediumsList = Object.entries(utmMediumMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
  const utmCampaignsList = Object.entries(utmCampaignMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  // Registered User Journeys
  // Load sessions of registered clients
  const registeredJourneys = filteredSessions
    .filter(s => s.userId)
    .map(s => {
      // Find full click path for this session
      const sessionPath = filteredViews
        .filter(v => v.sessionId === s.sessionId)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .map(v => ({
          path: v.path,
          title: v.title || v.path,
          timestamp: v.timestamp,
          dwellTime: v.dwellTime || 0
        }));

      const sessionDuration = sessionPath.reduce((sum, p) => sum + p.dwellTime, 0);

      return {
        sessionId: s.sessionId,
        userName: s.userName || "Registered Client",
        userEmail: s.userEmail || "",
        ip: s.ip,
        city: s.city,
        state: s.state,
        deviceType: s.deviceType,
        browser: s.browser,
        os: s.os,
        createdAt: s.createdAt,
        lastActive: s.lastActive,
        sessionDuration,
        history: sessionPath
      };
    })
    .sort((a, b) => new Date(b.lastActive) - new Date(a.lastActive));

  // Live Visitor Logs (Active & Idle in the last 30 minutes)
  const thirtyMinsAgo = Date.now() - 30 * 60 * 1000;
  const liveLogs = [];

  for (const sess of activeSessions.values()) {
    if (sess.lastActive >= thirtyMinsAgo) {
      // Apply filters
      if (state && sess.state?.toLowerCase() !== state.toLowerCase()) continue;
      if (city && sess.city?.toLowerCase() !== city.toLowerCase()) continue;
      if (cohort === "guest" && sess.userId) continue;
      if (cohort === "logged-in" && !sess.userId) continue;

      const isLiveActive = sess.lastActive >= ninetySecsAgo;
      const status = isLiveActive ? "Active" : "Idle";

      // Find views in this session to build history
      const sessViews = pageViewsCache
        .filter(v => v.sessionId === sess.sessionId)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      const pathHistory = sessViews.map(v => ({
        path: v.path,
        timestamp: v.timestamp,
        dwellTime: v.dwellTime || 0
      }));

      const sessionDwellSum = pathHistory.reduce((sum, p) => sum + p.dwellTime, 0);

      liveLogs.push({
        sessionId: sess.sessionId,
        visitorId: sess.visitorId,
        userName: sess.userName || null,
        userEmail: sess.userEmail || null,
        ip: sess.ip,
        city: sess.city,
        state: sess.state,
        deviceType: sess.deviceType,
        browser: sess.browser,
        os: sess.os,
        currentPath: sess.currentPath,
        lastActive: new Date(sess.lastActive),
        sessionDuration: sessionDwellSum,
        status,
        history: pathHistory
      });
    }
  }

  // Sort live logs: Active first, then by last active desc
  liveLogs.sort((a, b) => {
    if (a.status === "Active" && b.status !== "Active") return -1;
    if (a.status !== "Active" && b.status === "Active") return 1;
    return b.lastActive - a.lastActive;
  });

  return {
    cards: {
      totalViews,
      totalSessions,
      uniqueDevices,
      avgSessionStay,
      bounceRate,
      liveActive
    },
    trends: trendsChart,
    locations: {
      states: statesList,
      cities: citiesList
    },
    pages: pagesList,
    funnel: funnelSteps,
    traffic: {
      referrers: referrersList,
      utmSources: utmSourcesList,
      utmMediums: utmMediumsList,
      utmCampaigns: utmCampaignsList
    },
    registeredJourneys,
    liveLogs
  };
}

module.exports = {
  preloadCache,
  trackPageView,
  trackPing,
  trackExternalConversion,
  getAnalyticsStats,
  resolveIpLocation
};
