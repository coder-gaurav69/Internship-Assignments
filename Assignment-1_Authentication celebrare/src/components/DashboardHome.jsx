import React, { useContext } from "react";
import EventGrid from "./EventGrid";
import { AuthContext } from "../context/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Hello, {user?.name || "there"} 👋
        </h1>
        <p className="text-xl text-gray-600 mt-3 font-medium">
          Ready to explore today's events? Search, filter, and track your favorites!
        </p>
      </div>

      <div className="mb-12 bg-blue-50 border-l-4 border-blue-400 p-5 rounded-r-xl shadow-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-blue-100 p-2 rounded-lg">
            <svg
              className="h-6 w-6 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-bold text-blue-900">Your Session Data</h3>
            <p className="text-sm text-blue-800 mt-1 opacity-90">
              Authenticated email: <span className="font-semibold underline decoration-blue-300">{user?.email}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-100 pb-5 mb-8">
            Upcoming Events Worldwide
        </h2>
        <EventGrid />
      </div>
    </main>
  );
};

export default DashboardHome;
