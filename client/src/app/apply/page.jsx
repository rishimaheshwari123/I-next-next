"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CareerForm from "@/components/CareerForm";

const ApplyPageContent = () => {
  const searchParams = useSearchParams();
  const job = searchParams.get("job") || "";
  
  return <CareerForm defaultJob={job} />;
};

const ApplyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <br />
      <br />
      <br />

      {/* Application Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Join Us</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the application form below and take the first step towards an exciting career
            </p>
          </div>

          <Suspense fallback={
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          }>
            <ApplyPageContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default ApplyPage;
