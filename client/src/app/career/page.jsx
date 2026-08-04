"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaRocket,
  FaUsers,
  FaAward,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { BASE_URL } from "@/config/api";

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/job/getAll?activeOnly=true`);
        const data = await response.json();
        if (data.success) {
          setJobs(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const toggleExpandJob = (id) => {
    if (expandedJobId === id) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <br />
      <br />
      <br />
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent)]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/20 mb-6 uppercase tracking-wider">
            We are hiring
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-6">
            Shape the Future
            With I Next ETS
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Join a dynamic team of developers, designers, and innovators. We build premium digital products, AI services, and custom enterprise software that drive real impact.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#openings"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              Explore Openings
            </a>
            <Link
              href="/apply"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/25 backdrop-blur-sm transition-all"
            >
              Submit General Profile
            </Link>
          </div>
        </div>
      </section>



      {/* Openings Section */}
      <section id="openings" className="py-20 bg-slate-50 scroll-mt-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Current Open Positions
            </h2>
            <p className="text-lg text-gray-600">
              Find the perfect role that matches your passion and expertise.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-md">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-gray-950 mb-2">No Openings at the Moment</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We don't have any specific jobs posted right now, but we are always looking for stellar talent to join our network.
              </p>
              <Link
                href="/apply"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-750 text-white font-semibold rounded-xl inline-block shadow-md transition-all"
              >
                Send General Application
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => {
                const isExpanded = expandedJobId === job._id;
                return (
                  <div
                    key={job._id}
                    className="bg-white rounded-2xl border border-gray-150 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Job Card Header */}
                    <div
                      onClick={() => toggleExpandJob(job._id)}
                      className="p-6 sm:p-8 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {job.title}
                          </h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Remote / Onsite
                          </span>
                        </div>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-1.5">
                            <FaBriefcase className="text-blue-500 text-base" />
                            {job.experience}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaMoneyBillWave className="text-green-500 text-base" />
                            {job.budget}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FaMapMarkerAlt className="text-red-500 text-base" />
                            India
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-4 sm:pt-0">
                        <Link
                          href={`/apply?job=${encodeURIComponent(job.title)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow transition-all text-center"
                        >
                          Apply Now
                        </Link>
                        <button className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none transition-all">
                          {isExpanded ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Job Details Expansion */}
                    {isExpanded && (
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 border-t border-gray-100 bg-slate-50/50">
                        <div className="py-6">
                          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Key Skills Needed
                          </h4>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {job.skills.split(",").map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                          </div>

                          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Job Description
                          </h4>
                          {/* preserved format via pre-wrap styling */}
                          <div className="text-gray-700 leading-relaxed font-sans text-sm whitespace-pre-wrap bg-white p-5 rounded-2xl border border-gray-200 shadow-inner">
                            {job.description}
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-250/20">
                          <Link
                            href={`/apply?job=${encodeURIComponent(job.title)}`}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow hover:shadow-lg transition-all"
                          >
                            Apply for this Position
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
