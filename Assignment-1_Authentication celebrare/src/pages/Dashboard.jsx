import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DashboardHome from "../components/DashboardHome";

const Dashboard = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <DashboardHome />

      <Footer />
    </div>
  );
};

export default Dashboard;
