"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { ANALYTICS_API } from "@/config/api";

export default function Tracker() {
  const pathname = usePathname();
  const activeSessionRef = useRef({ sessionId: "", path: "", lastPingTime: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Generate or retrieve Visitor ID & Session ID
    const getOrCreateId = (key, isSession = false) => {
      const storage = isSession ? sessionStorage : localStorage;
      let id = storage.getItem(key);
      if (!id) {
        id = "v_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        storage.setItem(key, id);
      }
      return id;
    };

    const visitorId = getOrCreateId("inext_analytics_visitor_id", false);
    const sessionId = getOrCreateId("inext_analytics_session_id", true);

    // 2. Parse UTM Parameters
    const searchParams = new URLSearchParams(window.location.search);
    const utm = {
      source: searchParams.get("utm_source") || "",
      medium: searchParams.get("utm_medium") || "",
      campaign: searchParams.get("utm_campaign") || "",
      term: searchParams.get("utm_term") || "",
      content: searchParams.get("utm_content") || "",
    };

    // 3. Detect Device, OS and Browser details
    const getBrowserOSDevice = () => {
      const ua = navigator.userAgent;
      let browser = "Unknown";
      let os = "Unknown";
      let deviceType = "Desktop";

      // Browser detection
      if (ua.indexOf("Firefox") > -1) browser = "Firefox";
      else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Browser";
      else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera";
      else if (ua.indexOf("Trident") > -1) browser = "Internet Explorer";
      else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) browser = "Edge";
      else if (ua.indexOf("Chrome") > -1) browser = "Chrome";
      else if (ua.indexOf("Safari") > -1) browser = "Safari";

      // OS detection
      if (ua.indexOf("Windows NT") > -1) os = "Windows";
      else if (ua.indexOf("Macintosh") > -1) os = "MacOS";
      else if (ua.indexOf("Android") > -1) os = "Android";
      else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) os = "iOS";
      else if (ua.indexOf("Linux") > -1) os = "Linux";

      // Device Type detection
      if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
        deviceType = "Mobile";
        if (/iPad|tablet/i.test(ua)) {
          deviceType = "Tablet";
        }
      } else if (window.innerWidth < 768) {
        deviceType = "Mobile";
      } else if (window.innerWidth < 1024) {
        deviceType = "Tablet";
      }

      return { browser, os, deviceType };
    };

    const { browser, os, deviceType } = getBrowserOSDevice();

    // 4. Retrieve logged in user info (if any)
    const getLoggedInUser = () => {
      try {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          return {
            id: user.id || user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }
      } catch (e) {
        // fail silently
      }
      return null;
    };

    const user = getLoggedInUser();

    // Send ping function
    const sendPing = async (timeSpent) => {
      console.log(`[INext Tracker] Sending heartbeat ping for ${timeSpent}s`);
      activeSessionRef.current.lastPingTime = Date.now();
      try {
        await axios.post(ANALYTICS_API.PING, {
          sessionId,
          path: pathname,
          timeSpent,
        });
      } catch (e) {
        console.warn("[INext Tracker] Heartbeat ping failed:", e.message);
      }
    };

    // Unload / route change ping to capture accurate final dwell time
    const sendUnloadPing = () => {
      const { lastPingTime, path } = activeSessionRef.current;
      if (!lastPingTime) return;

      const elapsed = Math.round((Date.now() - lastPingTime) / 1000);
      if (elapsed > 0) {
        console.log(`[INext Tracker] Sending unload ping for ${elapsed}s`);
        activeSessionRef.current.lastPingTime = 0; // Prevent duplicate
        
        // Use Beacon API for reliability during unload, fallback to Fetch
        const payload = JSON.stringify({ sessionId, path, timeSpent: elapsed });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(ANALYTICS_API.PING, payload);
        } else {
          fetch(ANALYTICS_API.PING, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload,
            keepalive: true
          }).catch(() => {});
        }
      }
    };

    // 5. Track current page view
    const trackPage = async () => {
      // Send previous page's remaining dwell time before switching
      sendUnloadPing();

      activeSessionRef.current = {
        sessionId,
        path: pathname,
        lastPingTime: Date.now()
      };

      console.log(`[INext Tracker] Logging pageview: ${pathname}`);
      try {
        const payload = {
          visitorId,
          sessionId,
          path: pathname,
          title: document.title,
          referrer: document.referrer,
          utm,
          user,
          browser,
          os,
          deviceType,
        };
        console.log("[INext Tracker] Sending track payload:", payload);
        const res = await axios.post(ANALYTICS_API.TRACK, payload);
        console.log("[INext Tracker] Tracking successful:", res.data);
      } catch (error) {
        console.error("[INext Tracker] PageView tracking failed:", error);
      }
    };

    trackPage();

    // 6. Set up periodic heartbeat ping for dwell time tracking (every 10 seconds)
    const heartbeatInterval = setInterval(() => {
      const { lastPingTime } = activeSessionRef.current;
      if (!lastPingTime) return;
      const elapsed = Math.round((Date.now() - lastPingTime) / 1000);
      
      if (elapsed >= 9) {
        sendPing(elapsed);
      }
    }, 10000);

    // Listen to tab visibility changes & unload events
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        sendUnloadPing();
      } else {
        activeSessionRef.current.lastPingTime = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", sendUnloadPing);

    return () => {
      clearInterval(heartbeatInterval);
      sendUnloadPing();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", sendUnloadPing);
    };
  }, [pathname]);

  return null; // This component registers listeners in the background and has no UI
}
