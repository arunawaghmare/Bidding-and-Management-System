"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const steps = [
    {
      step: "1",
      action: "Register/Login",
      actor: "Buyer/Seller",
      route: "/api/auth/signup & /login",
      status: "-",
    },
    {
      step: "2",
      action: "Create Project",
      actor: "Buyer",
      route: "POST /api/projects",
      status: "-",
    },
    {
      step: "3",
      action: "Place Bid",
      actor: "Seller",
      route: "POST /api/bids",
      status: "-",
    },
    {
      step: "4",
      action: "Select Seller",
      actor: "Buyer",
      route: "POST /api/projects/select-seller",
      status: "PENDING → IN_PROGRESS",
    },
    {
      step: "5",
      action: "Upload Deliverable",
      actor: "Seller",
      route: "POST /api/projects/complete",
      status: "IN_PROGRESS → COMPLETED",
    },
    {
      step: "6",
      action: "Review + Rating (Opt.)",
      actor: "Buyer",
      route: "POST /api/review",
      status: "Final",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-4 sm:p-6 flex flex-col items-center">
      {/* Intro Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-4xl text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
          Seller-Buyer Project Bidding System
        </h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Buyers can post projects, sellers can bid, and the system manages
          everything from bidding to deliverables with status tracking.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 w-full"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-900 w-full"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 w-full"
            onClick={() => router.push("/dashboard/buyer")}
          >
            Buyer Dashboard
          </button>
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 w-full"
            onClick={() => router.push("/dashboard/seller")}
          >
            Seller Dashboard
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-xl overflow-hidden">
        <h2 className="text-xl sm:text-2xl font-semibold text-center text-blue-700 py-4">
          📈 Project Workflow Overview
        </h2>
        <div className="w-full overflow-x-auto">
          <table className="min-w-[600px] sm:min-w-full table-auto text-sm">
            <thead className="bg-blue-600 text-white whitespace-nowrap">
              <tr>
                <th className="px-4 py-3 border">Step</th>
                <th className="px-4 py-3 border">Action</th>
                <th className="px-4 py-3 border">Actor</th>
                <th className="px-4 py-3 border">API Route</th>
                <th className="px-4 py-3 border">Status Transition</th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2 border text-center whitespace-nowrap">
                    {step.step}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap">
                    {step.action}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap">
                    {step.actor}
                  </td>
                  <td className="px-4 py-2 border font-mono text-xs sm:text-sm whitespace-nowrap">
                    {step.route}
                  </td>
                  <td className="px-4 py-2 border text-green-700 font-semibold text-center whitespace-nowrap">
                    {step.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
