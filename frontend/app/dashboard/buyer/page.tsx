"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api";
import { useRouter } from "next/navigation";

type Project = {
  id: number;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  status: string;
};

type Bid = {
  id: number;
  sellerName: string;
  amount: number;
  completionTime: string;
  message: string;
  sellerId: number;
};

export default function BuyerDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [bids, setBids] = useState<Bid[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/projects", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Project posted successfully");
      setFormData({ title: "", description: "", budget: "", deadline: "" });
      fetchProjects();
    } catch (err: any) {
      alert(err?.response?.data?.message || "❌ Failed to post project");
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  };

  const fetchBids = async (projectId: number) => {
    try {
      const res = await axios.get(`/bids/${projectId}`);
      setSelectedProjectId(projectId);
      setBids(res.data);
    } catch (err) {
      console.error("Failed to fetch bids", err);
      alert("❌ Could not load bids for this project.");
    }
  };

  const selectSeller = async (projectId: number, sellerId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/projects/select",
        { projectId, sellerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Seller selected successfully!");
      fetchProjects();
      setBids([]);
      setSelectedProjectId(null);
    } catch (err: any) {
      alert(err?.response?.data?.message || "❌ Failed to select seller");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
          Buyer Dashboard
        </h1>

        {/* Post Project Form */}
        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            📌 Post a New Project
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              name="budget"
              placeholder="Budget (₹)"
              value={formData.budget}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              🚀 Post Project
            </button>
          </form>
        </section>

        {/* Project List */}
        <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            📁 Your Projects
          </h2>
          {projects.length === 0 ? (
            <p className="text-gray-500">No projects posted yet.</p>
          ) : (
            <div className="space-y-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-blue-800">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {project.description}
                  </p>
                  <div className="text-sm text-gray-700 mt-2 flex flex-wrap gap-4">
                    <span>💰 Budget: ₹{project.budget}</span>
                    <span>
                      📅 Deadline:{" "}
                      {new Date(project.deadline).toLocaleDateString()}
                    </span>
                    <span className="text-blue-600 font-medium">
                      Status: {project.status}
                    </span>
                  </div>
                  <button
                    onClick={() => fetchBids(project.id)}
                    className="mt-3 inline-block text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Bids →
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bids Display */}
        {selectedProjectId && (
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-green-700 mb-6">
              💼 Bids for Project #{selectedProjectId}
            </h2>
            {bids.length === 0 ? (
              <p className="text-gray-500">No bids submitted yet.</p>
            ) : (
              <div className="space-y-6">
                {bids.map((bid) => (
                  <div
                    key={bid.id}
                    className="border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm"
                  >
                    <p className="font-semibold text-lg">👤 {bid.sellerName}</p>
                    <div className="text-sm text-gray-700 mt-1 flex flex-wrap gap-4">
                      <span>💰 Amount: ₹{bid.amount}</span>
                      <span>⏱ Duration: {bid.completionTime}</span>
                    </div>
                    <p className="italic text-sm mt-2">💬 {bid.message}</p>
                    <button
                      onClick={() =>
                        selectSeller(selectedProjectId, bid.sellerId)
                      }
                      className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition text-sm font-medium"
                    >
                      ✅ Select Seller
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
