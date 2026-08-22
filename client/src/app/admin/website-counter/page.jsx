"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ANALYTICS_API } from "@/config/api";
import { toast } from "react-toastify";
import {
  FaGlobe,
  FaDesktop,
  FaMobileAlt,
  FaTabletAlt,
  FaSyncAlt,
  FaSearch,
  FaUser,
  FaClock,
  FaFilter,
  FaChevronRight,
  FaChevronDown,
  FaChrome,
  FaFirefox,
  FaSafari,
  FaEdge,
  FaOpera,
  FaWindows,
  FaApple,
  FaAndroid,
  FaLinux,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaInfoCircle
} from "react-icons/fa";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// Helper for Browser Icons
const getBrowserIcon = (browser) => {
  const b = browser?.toLowerCase() || "";
  if (b.includes("chrome")) return <FaChrome className="text-amber-500" />;
  if (b.includes("firefox")) return <FaFirefox className="text-orange-500" />;
  if (b.includes("safari")) return <FaSafari className="text-blue-500" />;
  if (b.includes("edge")) return <FaEdge className="text-blue-600" />;
  if (b.includes("opera")) return <FaOpera className="text-red-600" />;
  return <FaGlobe className="text-gray-400" />;
};

// Helper for OS Icons
const getOSIcon = (os) => {
  const o = os?.toLowerCase() || "";
  if (o.includes("win")) return <FaWindows className="text-blue-500" />;
  if (o.includes("mac") || o.includes("ios") || o.includes("iphone") || o.includes("ipad")) return <FaApple className="text-gray-600" />;
  if (o.includes("android")) return <FaAndroid className="text-green-500" />;
  if (o.includes("linux")) return <FaLinux className="text-orange-600" />;
  return <FaDesktop className="text-gray-400" />;
};

// Helper for Device Icons
const getDeviceIcon = (device) => {
  const d = device?.toLowerCase() || "";
  if (d === "mobile") return <FaMobileAlt className="text-purple-500" />;
  if (d === "tablet") return <FaTabletAlt className="text-indigo-500" />;
  return <FaDesktop className="text-blue-500" />;
};

// Helper for Dwell Time formatting
const formatDuration = (seconds) => {
  if (!seconds || seconds <= 0) return "0s";
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
};

// Formatting Time/Date
const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function WebsiteAnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // Filter States
  const [range, setRange] = useState("1month"); // today, yesterday, 1week, 1month, all, custom
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, citySetFilter] = useState("");
  const [cohort, setCohort] = useState("all"); // all, guest, logged-in
  const [pathFilter, setPathFilter] = useState("");
  const [includeBots, setIncludeBots] = useState(false);

  // Search inside tables states
  const [searchState, setSearchState] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchPage, setSearchPage] = useState("");
  const [searchUser, setSearchUser] = useState("");
  
  // UI Tabs State
  const [activeTab, setActiveTab] = useState("overview"); // overview, locations, pages, funnel, utm, journeys, logs

  // Modal / Drawer state for Journey & Click Paths
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [selectedLogPath, setSelectedLogPath] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(ANALYTICS_API.GET_STATS, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          range,
          startDate: range === "custom" ? startDate : undefined,
          endDate: range === "custom" ? endDate : undefined,
          state: stateFilter || undefined,
          city: cityFilter || undefined,
          cohort,
          path: pathFilter || undefined,
          includeBots
        }
      });

      if (response.data.success) {
        setData(response.data.data);
      } else {
        toast.error("Failed to load analytics statistics.");
      }
    } catch (error) {
      console.error("Error loading analytics:", error);
      toast.error(error.response?.data?.message || "Internal server error fetching stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isMounted) {
      fetchStats();
    }
  }, [isMounted, range, stateFilter, cityFilter, cohort, pathFilter, includeBots]);

  // Handle custom date queries
  const handleCustomDateApply = (e) => {
    e.preventDefault();
    if (!startDate) {
      toast.warning("Please choose a start date.");
      return;
    }
    fetchStats();
  };

  // Memoized Search Filter Computations for Tables
  const filteredStates = useMemo(() => {
    if (!data?.locations?.states) return [];
    return data.locations.states.filter(s =>
      s.name?.toLowerCase().includes(searchState.toLowerCase())
    );
  }, [data, searchState]);

  const filteredCities = useMemo(() => {
    if (!data?.locations?.cities) return [];
    return data.locations.cities.filter(c =>
      c.name?.toLowerCase().includes(searchCity.toLowerCase()) ||
      c.state?.toLowerCase().includes(searchCity.toLowerCase())
    );
  }, [data, searchCity]);

  const filteredPages = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.filter(p =>
      p.path?.toLowerCase().includes(searchPage.toLowerCase()) ||
      p.title?.toLowerCase().includes(searchPage.toLowerCase())
    );
  }, [data, searchPage]);

  const filteredJourneys = useMemo(() => {
    if (!data?.registeredJourneys) return [];
    return data.registeredJourneys.filter(j =>
      j.userName?.toLowerCase().includes(searchUser.toLowerCase()) ||
      j.userEmail?.toLowerCase().includes(searchUser.toLowerCase())
    );
  }, [data, searchUser]);

  if (!isMounted) return null;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text mr-2">Visits & Web Analytics</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium text-sm">
            Real-time visitor tracking, state/city location report, dwell time, and conversion funnels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center space-x-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-150">
            <input
              type="checkbox"
              checked={includeBots}
              onChange={(e) => setIncludeBots(e.target.checked)}
              className="w-4 h-4 rounded text-teal-600 border-gray-300 focus:ring-teal-500"
            />
            <span className="text-xs font-semibold text-gray-700">Include Bot Traffic</span>
          </label>

          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center space-x-2 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 transition duration-200"
          >
            <FaSyncAlt className={`text-sm ${loading ? "animate-spin" : ""}`} />
            <span className="text-xs">Refresh</span>
          </button>
        </div>
      </div>

      {/* Date Filter Buttons */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {["today", "yesterday", "1week", "1month", "all", "custom"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setRange(item);
                if (item !== "custom") {
                  setStartDate("");
                  setEndDate("");
                }
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition duration-150 ${
                range === item
                  ? "bg-teal-500 text-white shadow-sm"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {item === "1week" ? "1 Week" : item === "1month" ? "1 Month" : item === "custom" ? "Custom Date" : item === "all" ? "All Time" : item}
            </button>
          ))}
        </div>

        {/* Custom Date Form */}
        {range === "custom" && (
          <form onSubmit={handleCustomDateApply} className="flex flex-wrap items-end gap-3 p-3 bg-gray-50 rounded-xl border border-gray-150 animate-fadeIn">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">End Date (Optional)</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-teal-500"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Apply Filter
            </button>
          </form>
        )}
      </div>

      {/* Advanced Filter Fields */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
          <FaFilter className="mr-1.5" /> Filters
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* State Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Filter by State</label>
            <input
              type="text"
              placeholder="e.g. Madhya Pradesh..."
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
            />
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Filter by City</label>
            <input
              type="text"
              placeholder="e.g. Bhopal..."
              value={cityFilter}
              onChange={(e) => citySetFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
            />
          </div>

          {/* Cohort Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">User Cohort</label>
            <select
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white transition cursor-pointer"
            >
              <option value="all">All Users (Guests + Logged-in)</option>
              <option value="guest">Guests Only</option>
              <option value="logged-in">Logged-in Users Only</option>
            </select>
          </div>

          {/* Path Filter */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Filter by Page Path</label>
            <input
              type="text"
              placeholder="e.g. /services..."
              value={pathFilter}
              onChange={(e) => setPathFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:bg-white transition"
            />
          </div>
        </div>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Total Visits / Views</span>
          {loading ? (
            <div className="h-8 bg-gray-100 animate-pulse rounded w-16"></div>
          ) : (
            <span className="text-2xl font-black text-gray-900">{data?.cards?.totalViews || 0}</span>
          )}
          <span className="text-[9px] text-gray-400 mt-2">Pageview events</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Unique Devices</span>
          {loading ? (
            <div className="h-8 bg-gray-100 animate-pulse rounded w-16"></div>
          ) : (
            <span className="text-2xl font-black text-gray-900">{data?.cards?.uniqueDevices || 0}</span>
          )}
          <span className="text-[9px] text-gray-400 mt-2">Unique Visitor IDs</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Total Sessions</span>
          {loading ? (
            <div className="h-8 bg-gray-100 animate-pulse rounded w-16"></div>
          ) : (
            <span className="text-2xl font-black text-gray-900">{data?.cards?.totalSessions || 0}</span>
          )}
          <span className="text-[9px] text-gray-400 mt-2">Active sessions</span>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Avg Session Stay</span>
          {loading ? (
            <div className="h-8 bg-gray-100 animate-pulse rounded w-16"></div>
          ) : (
            <span className="text-2xl font-black text-gray-900">
              {formatDuration(data?.cards?.avgSessionStay)}
            </span>
          )}
          <span className="text-[9px] text-gray-400 mt-2">Active dwell time</span>
        </div>

        {/* Metric 5 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Bounce Rate</span>
          {loading ? (
            <div className="h-8 bg-gray-100 animate-pulse rounded w-16"></div>
          ) : (
            <span className="text-2xl font-black text-gray-900">{data?.cards?.bounceRate || 0}%</span>
          )}
          <span className="text-[9px] text-gray-400 mt-2">Single-page exits</span>
        </div>

        {/* Metric 6 */}
        <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white p-5 rounded-2xl shadow-sm border border-emerald-800 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-2 right-2 flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          </div>
          <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-2">Live Active</span>
          {loading ? (
            <div className="h-8 bg-emerald-800 animate-pulse rounded w-16"></div>
          ) : (
            <span className="text-2xl font-black text-white">{data?.cards?.liveActive || 0}</span>
          )}
          <span className="text-[9px] text-emerald-300 mt-2">Active in last 90s</span>
        </div>
      </div>

      {/* Tabs Menu Navigation */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-1">
        {[
          { id: "overview", label: "Overview & Trends" },
          { id: "locations", label: "State & City Location" },
          { id: "pages", label: "Pages & Dwell Time" },
          { id: "funnel", label: "Conversion Funnel" },
          { id: "utm", label: "Traffic Sources (UTM)" },
          { id: "journeys", label: "Registered User Journeys" },
          { id: "logs", label: "Live Visitor Logs" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition duration-200 ${
              activeTab === tab.id
                ? "bg-teal-500 text-white shadow-md shadow-teal-100"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tab Panels Content */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <FaSyncAlt className="text-4xl text-teal-500 animate-spin" />
            <span className="text-sm font-semibold text-gray-500">Loading website analytics...</span>
          </div>
        ) : (
          <>
            {/* 1. OVERVIEW & TRENDS TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-black text-gray-800">Daily Visit Trend</h2>
                  <p className="text-xs text-gray-400 font-medium">Daily breakdowns of total visits and page views</p>
                </div>
                
                {data?.trends?.length > 0 ? (
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} tickLine={false} tickFormatter={(val) => formatDate(val)} />
                        <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                        <Tooltip
                          contentStyle={{ backgroundColor: "#fff", border: "1px solid #f3f4f6", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" }}
                          labelFormatter={(label) => formatDate(label)}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Area type="monotone" name="Pageviews" dataKey="views" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                        <Area type="monotone" name="Sessions" dataKey="sessions" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSessions)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <FaInfoCircle className="text-3xl text-gray-300 mb-2" />
                    <span className="text-xs font-semibold text-gray-500">No trend data available for this range.</span>
                  </div>
                )}
              </div>
            )}

            {/* 2. STATE & CITY LOCATION TAB */}
            {activeTab === "locations" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* State Table */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="text-base font-black text-gray-800">Traffic by State</h2>
                      <p className="text-[11px] text-gray-400 font-medium">Session count distribution per Indian state</p>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search states..."
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white w-full sm:w-44 transition"
                      />
                      <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-[10px]" />
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold uppercase tracking-wider">
                          <th className="px-5 py-3.5">State</th>
                          <th className="px-5 py-3.5 text-right">Sessions</th>
                          <th className="px-5 py-3.5 text-right">Views</th>
                          <th className="px-5 py-3.5 text-right">Percentage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredStates.length > 0 ? (
                          filteredStates.map((st, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition duration-150 font-medium text-gray-700">
                              <td className="px-5 py-3.5 flex items-center font-bold text-gray-850">
                                <FaMapMarkerAlt className="text-teal-500 mr-2" />
                                {st.name}
                              </td>
                              <td className="px-5 py-3.5 text-right font-semibold">{st.sessions}</td>
                              <td className="px-5 py-3.5 text-right">{st.views}</td>
                              <td className="px-5 py-3.5 text-right">
                                <span className="inline-block bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-md text-[10px]">{st.percentage}%</span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center py-8 text-gray-400">No states found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* City Table */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h2 className="text-base font-black text-gray-800">Traffic by City</h2>
                      <p className="text-[11px] text-gray-400 font-medium">Session count distribution per city</p>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search cities..."
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white w-full sm:w-44 transition"
                      />
                      <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-[10px]" />
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold uppercase tracking-wider">
                          <th className="px-5 py-3.5">City</th>
                          <th className="px-5 py-3.5">State</th>
                          <th className="px-5 py-3.5 text-right">Sessions</th>
                          <th className="px-5 py-3.5 text-right">Views</th>
                          <th className="px-5 py-3.5 text-right">Percentage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredCities.length > 0 ? (
                          filteredCities.map((ct, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition duration-150 font-medium text-gray-700">
                              <td className="px-5 py-3.5 font-bold text-gray-850">{ct.name}</td>
                              <td className="px-5 py-3.5 text-gray-400">{ct.state}</td>
                              <td className="px-5 py-3.5 text-right font-semibold">{ct.sessions}</td>
                              <td className="px-5 py-3.5 text-right">{ct.views}</td>
                              <td className="px-5 py-3.5 text-right">
                                <span className="inline-block bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-md text-[10px]">{ct.percentage}%</span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center py-8 text-gray-400">No cities found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 3. PAGES & DWELL TIME TAB */}
            {activeTab === "pages" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-base font-black text-gray-800">Most Visited Pages</h2>
                    <p className="text-xs text-gray-400 font-medium">Pageviews and average dwell time per route</p>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search path/title..."
                      value={searchPage}
                      onChange={(e) => setSearchPage(e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white w-full sm:w-60 transition"
                    />
                    <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-[10px]" />
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="px-5 py-3.5">Page Path</th>
                        <th className="px-5 py-3.5">Page Title</th>
                        <th className="px-5 py-3.5 text-right">Views</th>
                        <th className="px-5 py-3.5 text-right">Unique Visitors</th>
                        <th className="px-5 py-3.5 text-right">Avg Dwell Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredPages.length > 0 ? (
                        filteredPages.map((pg, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition duration-150 font-medium text-gray-700">
                            <td className="px-5 py-3.5 font-bold text-teal-600 font-mono tracking-tight select-all">{pg.path}</td>
                            <td className="px-5 py-3.5 max-w-[200px] truncate text-gray-400" title={pg.title}>{pg.title}</td>
                            <td className="px-5 py-3.5 text-right font-semibold">{pg.views}</td>
                            <td className="px-5 py-3.5 text-right">{pg.uniqueVisitors}</td>
                            <td className="px-5 py-3.5 text-right">
                              <span className="inline-flex items-center bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded-md text-[10px]">
                                <FaClock className="mr-1" />
                                {formatDuration(pg.avgDwellTime)}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-8 text-gray-400">No pages recorded.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. CONVERSION FUNNEL TAB */}
            {activeTab === "funnel" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-black text-gray-800">Conversion Funnel Analysis</h2>
                  <p className="text-xs text-gray-400 font-medium">User path progression and drop-off analysis</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                  {data?.funnel?.map((step, i) => {
                    const nextStep = data.funnel[i + 1];
                    const dropoff = nextStep ? 100 - Math.round((nextStep.count / step.count) * 100) : null;
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-150 shadow-sm text-center flex flex-col justify-between min-h-[160px] relative">
                          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">{step.step}</span>
                          <span className="text-3xl font-black text-gray-900 mt-3">{step.count}</span>
                          <div className="mt-4">
                            <span className="text-[10px] font-bold text-gray-500">Conv. Rate: </span>
                            <span className="inline-block bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-md text-[10px]">{step.rate}%</span>
                          </div>
                        </div>

                        {nextStep && (
                          <div className="flex flex-col items-center my-3 md:my-0 md:absolute md:left-[24%] md:translate-y-16">
                            <FaChevronRight className="hidden md:block text-2xl text-gray-300" />
                            <FaChevronDown className="block md:hidden text-2xl text-gray-300" />
                            {step.count > 0 && (
                              <span className="text-[9px] font-bold text-red-500 mt-1" title="Users who dropped off at this stage">
                                -{dropoff}% Drop
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Helpful funnel info alert */}
                <div className="bg-teal-50/50 border border-teal-150 p-4 rounded-xl flex items-start space-x-3 mt-6">
                  <FaInfoCircle className="text-teal-600 mt-0.5 shrink-0" />
                  <p className="text-[11px] leading-relaxed text-teal-800 font-medium">
                    The funnel displays session counts progressing sequentially from landing to form submissions. 
                    <strong> Home Page View</strong> tracks root page visits. 
                    <strong> Services Visited</strong> aggregates views on all `/service` routes. 
                    <strong> Form View</strong> aggregates pageviews on forms (Contact, Careers, etc.). 
                    <strong> Inquiry Completed</strong> registers conversions like chatbot inquiries, client project tasks, or form submits.
                  </p>
                </div>
              </div>
            )}

            {/* 5. TRAFFIC SOURCES (UTM) TAB */}
            {activeTab === "utm" && (
              <div className="space-y-8">
                {/* Referrers */}
                <div className="space-y-4">
                  <h2 className="text-base font-black text-gray-800">Top Referring Domains</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold uppercase tracking-wider">
                            <th className="px-5 py-3.5">Referrer</th>
                            <th className="px-5 py-3.5 text-right">Visitor Sessions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {data?.traffic?.referrers?.length > 0 ? (
                            data.traffic.referrers.map((ref, i) => (
                              <tr key={i} className="hover:bg-gray-50 transition duration-150 font-medium text-gray-700">
                                <td className="px-5 py-3.5 flex items-center font-bold text-gray-850">
                                  <FaExternalLinkAlt className="text-gray-400 mr-2 text-[10px]" />
                                  {ref.name}
                                </td>
                                <td className="px-5 py-3.5 text-right font-semibold">{ref.count}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="text-center py-8 text-gray-400">Direct traffic / No referrers found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* UTM Parameters Grid */}
                <div className="space-y-4">
                  <h2 className="text-base font-black text-gray-800">UTM Campaign Traffic</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* UTM Source */}
                    <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-150">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">UTM Sources</span>
                      </div>
                      <table className="w-full text-left text-xs border-collapse">
                        <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                          {data?.traffic?.utmSources?.length > 0 ? (
                            data.traffic.utmSources.map((utm, i) => (
                              <tr key={i} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-semibold">{utm.name}</td>
                                <td className="px-4 py-3 text-right font-bold text-teal-600">{utm.count}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td className="text-center py-4 text-gray-400 text-xs">No campaign sources.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* UTM Medium */}
                    <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-150">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">UTM Mediums</span>
                      </div>
                      <table className="w-full text-left text-xs border-collapse">
                        <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                          {data?.traffic?.utmMediums?.length > 0 ? (
                            data.traffic.utmMediums.map((utm, i) => (
                              <tr key={i} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-semibold">{utm.name}</td>
                                <td className="px-4 py-3 text-right font-bold text-teal-600">{utm.count}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td className="text-center py-4 text-gray-400 text-xs">No campaign mediums.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* UTM Campaign */}
                    <div className="border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-150">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">UTM Campaigns</span>
                      </div>
                      <table className="w-full text-left text-xs border-collapse">
                        <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                          {data?.traffic?.utmCampaigns?.length > 0 ? (
                            data.traffic.utmCampaigns.map((utm, i) => (
                              <tr key={i} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-semibold">{utm.name}</td>
                                <td className="px-4 py-3 text-right font-bold text-teal-600">{utm.count}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td className="text-center py-4 text-gray-400 text-xs">No campaign names.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. REGISTERED USER JOURNEYS TAB */}
            {activeTab === "journeys" && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h2 className="text-base font-black text-gray-800">Registered Client Journeys</h2>
                    <p className="text-xs text-gray-400 font-medium">Session click trails of logged-in portal users</p>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search user name/email..."
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:border-teal-500 focus:bg-white w-full sm:w-60 transition"
                    />
                    <FaSearch className="absolute left-3 top-2.5 text-gray-400 text-[10px]" />
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="px-5 py-3.5">Client Details</th>
                        <th className="px-5 py-3.5">Location</th>
                        <th className="px-5 py-3.5">Device</th>
                        <th className="px-5 py-3.5 text-right">Session Duration</th>
                        <th className="px-5 py-3.5 text-center">Click History</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredJourneys.length > 0 ? (
                        filteredJourneys.map((j, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition duration-150 font-medium text-gray-700">
                            <td className="px-5 py-3.5">
                              <div className="font-bold text-gray-850">{j.userName}</div>
                              <div className="text-[10px] text-gray-400 font-medium font-mono select-all">{j.userEmail}</div>
                            </td>
                            <td className="px-5 py-3.5">
                              <div>{j.city}</div>
                              <div className="text-[10px] text-gray-400">{j.state}</div>
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center space-x-2">
                                {getDeviceIcon(j.deviceType)}
                                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md flex items-center space-x-1">
                                  {getBrowserIcon(j.browser)} <span>{j.browser}</span>
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <span className="inline-flex items-center bg-blue-50 text-blue-700 font-bold px-2 py-1 rounded-md text-[10px]">
                                <FaClock className="mr-1" />
                                {formatDuration(j.sessionDuration)}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-center">
                              <button
                                onClick={() => setSelectedJourney(j)}
                                className="bg-teal-50 text-teal-700 hover:bg-teal-100 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-teal-200 transition"
                              >
                                View Click Trail ({j.history?.length || 0})
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-8 text-gray-400">No registered client activity recorded.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. LIVE VISITOR LOGS TAB */}
            {activeTab === "logs" && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-base font-black text-gray-800">Real-Time Visitor Log</h2>
                  <p className="text-xs text-gray-400 font-medium">Activity list of active/idle sessions in the last 30 minutes</p>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-150 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5">Visitor IP</th>
                        <th className="px-5 py-3.5">Geographic Location</th>
                        <th className="px-5 py-3.5">Device & Environment</th>
                        <th className="px-5 py-3.5">Current Page Path</th>
                        <th className="px-5 py-3.5 text-right">Stay Duration</th>
                        <th className="px-5 py-3.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {data?.liveLogs?.length > 0 ? (
                        data.liveLogs.map((log, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition duration-150 font-medium text-gray-700">
                            <td className="px-5 py-3.5">
                              {log.status === "Active" ? (
                                <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                                  Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-1.5"></span>
                                  Idle
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3.5 font-bold font-mono text-gray-850 select-all">
                              {log.ip}
                              {log.userName && (
                                <div className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1 py-0.2 rounded-md mt-1 w-max">
                                  User: {log.userName}
                                </div>
                              )}
                            </td>
                            <td className="px-5 py-3.5">
                              <div>{log.city}</div>
                              <div className="text-[10px] text-gray-400">{log.state}</div>
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center space-x-2">
                                {getDeviceIcon(log.deviceType)}
                                <span className="inline-flex items-center bg-gray-50 border border-gray-150 px-1.5 py-0.5 rounded text-[10px] space-x-1 font-semibold text-gray-600">
                                  {getBrowserIcon(log.browser)}
                                  <span className="pl-1">{log.browser}</span>
                                </span>
                                <span className="inline-flex items-center bg-gray-50 border border-gray-150 px-1.5 py-0.5 rounded text-[10px] space-x-1 font-semibold text-gray-600">
                                  {getOSIcon(log.os)}
                                  <span className="pl-1">{log.os}</span>
                                </span>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 font-mono text-teal-600 max-w-[150px] truncate select-all" title={log.currentPath}>
                              {log.currentPath}
                            </td>
                            <td className="px-5 py-3.5 text-right font-semibold">
                              {formatDuration(log.sessionDuration)}
                            </td>
                            <td className="px-5 py-3.5 text-center">
                              <button
                                onClick={() => setSelectedLogPath(log)}
                                className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-gray-200 transition"
                              >
                                Path Details ({log.history?.length || 0})
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-8 text-gray-400">No active visitors. Make sure to visit the client website to create active logs!</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* REGISTERED USER Click path modal details */}
      {selectedJourney && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
            <div className="p-6 bg-gradient-to-r from-teal-500 to-emerald-600 text-white flex justify-between items-start">
              <div>
                <h3 className="text-base font-black">User Session Click Trail</h3>
                <p className="text-[11px] text-teal-50 font-medium mt-1 font-mono">{selectedJourney.userEmail}</p>
              </div>
              <button
                onClick={() => setSelectedJourney(null)}
                className="bg-black/15 hover:bg-black/35 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-150">
                <div>IP: <span className="font-bold font-mono text-gray-800">{selectedJourney.ip}</span></div>
                <div>Location: <span className="font-bold text-gray-800">{selectedJourney.city}, {selectedJourney.state}</span></div>
                <div>Browser: <span className="font-bold text-gray-800">{selectedJourney.browser} / {selectedJourney.os}</span></div>
                <div>Created: <span className="font-bold text-gray-800">{formatDate(selectedJourney.createdAt)} {formatTime(selectedJourney.createdAt)}</span></div>
              </div>

              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">Visitor Navigation Steps</h4>
              <div className="relative border-l border-teal-200 ml-4 py-2 space-y-5">
                {selectedJourney.history?.map((step, i) => (
                  <div key={i} className="relative pl-6">
                    {/* Pulsing indicator marker */}
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-teal-500 border-2 border-white ring-4 ring-teal-100"></span>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-teal-700 font-mono tracking-tight">{step.path}</div>
                        <div className="text-[10px] text-gray-400 font-semibold">{step.title}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-gray-700 flex items-center justify-end"><FaClock className="mr-1 text-[9px] text-gray-400" /> Dwell: {formatDuration(step.dwellTime)}</div>
                        <div className="text-[9px] text-gray-400 mt-0.5">{formatTime(step.timestamp)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end">
              <button
                onClick={() => setSelectedJourney(null)}
                className="bg-gray-200 text-gray-800 text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIVE LOG Click path modal details */}
      {selectedLogPath && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh]">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex justify-between items-start">
              <div>
                <h3 className="text-base font-black">Live Visitor Session click trail</h3>
                <p className="text-[11px] text-blue-50 font-medium mt-1 font-mono">Session ID: {selectedLogPath.sessionId}</p>
              </div>
              <button
                onClick={() => setSelectedLogPath(null)}
                className="bg-black/15 hover:bg-black/35 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs font-medium text-gray-600 bg-gray-50 p-4 rounded-2xl border border-gray-150">
                <div>Visitor IP: <span className="font-bold font-mono text-gray-800">{selectedLogPath.ip}</span></div>
                <div>Location: <span className="font-bold text-gray-800">{selectedLogPath.city}, {selectedLogPath.state}</span></div>
                <div>System: <span className="font-bold text-gray-800">{selectedLogPath.browser} ({selectedLogPath.os} - {selectedLogPath.deviceType})</span></div>
                <div>Last Active: <span className="font-bold text-gray-800">{formatTime(selectedLogPath.lastActive)}</span></div>
              </div>

              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">Session Click-Path Timeline</h4>
              <div className="relative border-l border-blue-200 ml-4 py-2 space-y-5">
                {selectedLogPath.history?.map((step, i) => (
                  <div key={i} className="relative pl-6">
                    {/* Pulsing indicator marker */}
                    <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white ring-4 ring-blue-100"></span>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-blue-700 font-mono tracking-tight">{step.path}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-gray-750 flex items-center justify-end"><FaClock className="mr-1 text-[9px] text-gray-400" /> Stayed: {formatDuration(step.dwellTime)}</div>
                        <div className="text-[9px] text-gray-400 mt-0.5">{formatTime(step.timestamp)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-150 flex justify-end">
              <button
                onClick={() => setSelectedLogPath(null)}
                className="bg-gray-200 text-gray-800 text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
