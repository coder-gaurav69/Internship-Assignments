import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GlobalContext } from "../Global/GlobalState";

const Dashboard = () => {
  const { user } = useContext(GlobalContext);

  return (
    <div className="w-screen min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || "User"}</h2>
        <p className="text-gray-600 mt-2">You are logged in with Google Authentication.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border">
            <p className="text-sm text-gray-500">User Name</p>
            <p className="text-lg font-semibold mt-1">{user?.name || "N/A"}</p>
          </div>

          <div className="bg-white rounded-xl p-5 border">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-semibold mt-1 break-all">{user?.email || "N/A"}</p>
          </div>

          <div className="bg-white rounded-xl p-5 border">
            <p className="text-sm text-gray-500">Status</p>
            <p className="text-lg font-semibold mt-1 text-green-600">Authenticated</p>
          </div>
        </div>
      </main>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
