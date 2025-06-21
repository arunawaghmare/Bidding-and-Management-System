"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api";

type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
  budget: number;
  deadline: string;
};

export default function SellerPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [form, setForm] = useState({
    sellerName: "",
    amount: "",
    timeFrame: "",
    message: "",
    file: null as File | null,
  });
  const [reviewForm, setReviewForm] = useState({ rating: 0, comment: "" });
  const [showReviewForm, setShowReviewForm] = useState<number | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleBidSubmit = async () => {
    if (!selectedProjectId) return alert("❗ Select a project to bid on.");
    const { sellerName, amount, timeFrame, message } = form;
    if (!sellerName || !amount || !timeFrame || !message) {
      return alert("⚠️ Please fill in all fields.");
    }

    try {
      await axios.post("/bids", {
        sellerName,
        amount: parseFloat(amount),
        completionTime: timeFrame,
        message,
        projectId: selectedProjectId,
      });
      alert("✅ Bid submitted!");
      setForm({ ...form, amount: "", timeFrame: "", message: "" });
      setSelectedProjectId(null);
      fetchProjects();
    } catch (err) {
      alert("❌ Failed to submit bid.");
    }
  };

  const handleFileUpload = async () => {
    if (!form.file || !selectedProjectId)
      return alert("Select file and project.");

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("projectId", selectedProjectId.toString());
    formData.append("file", form.file);

    try {
      await axios.post("/projects/complete", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("✅ Project marked completed!");
      fetchProjects();
    } catch (err) {
      alert("❌ Upload failed.");
    }
  };

  const handleReviewSubmit = async (projectId: number) => {
    try {
      await axios.post(`/projects/${projectId}/review`, reviewForm);
      alert("✅ Review submitted!");
      setReviewForm({ rating: 0, comment: "" });
      setShowReviewForm(null);
      fetchProjects();
    } catch {
      alert("❌ Could not submit review.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        Seller Dashboard
      </h1>

      {/* IN_PROGRESS Projects */}
      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold text-green-700 mb-2">
          🛠 In-Progress Projects
        </h2>
        {projects
          .filter((p) => p.status === "IN_PROGRESS")
          .map((proj) => (
            <div key={proj.id} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-blue-800">
                {proj.title}
              </h3>
              <p className="text-gray-700 mt-1">{proj.description}</p>
              <p className="text-sm text-gray-600 mt-2">
                💰 ₹{proj.budget} | ⏳ {new Date(proj.deadline).toDateString()}
              </p>
              <input
                type="file"
                className="mt-4 block"
                onChange={(e) =>
                  setForm({ ...form, file: e.target.files?.[0] || null })
                }
              />
              <button
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  handleFileUpload();
                }}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                ✅ Upload Deliverable
              </button>
            </div>
          ))}
      </section>

      {/* COMPLETED Projects for Review */}
      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold text-yellow-600 mb-2">
          🌟 Completed Projects (Leave Review)
        </h2>
        {projects
          .filter((p) => p.status === "COMPLETED")
          .map((proj) => (
            <div key={proj.id} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold text-blue-800">
                {proj.title}
              </h3>
              <p className="text-gray-600 text-sm">
                Leave a review for this project
              </p>
              <button
                onClick={() => setShowReviewForm(proj.id)}
                className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                ✍️ Write Review
              </button>

              {showReviewForm === proj.id && (
                <div className="mt-4 space-y-2">
                  <select
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm({
                        ...reviewForm,
                        rating: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value={0}>Select Rating</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>
                        {r} Star{r > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Write your review here..."
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, comment: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleReviewSubmit(proj.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    ✅ Submit Review
                  </button>
                </div>
              )}
            </div>
          ))}
      </section>

      {/* PENDING Projects to Bid On */}
      <section className="space-y-6 mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">
          📢 Open Projects (Bid Now)
        </h2>
        {projects.filter((p) => p.status === "PENDING").length === 0 ? (
          <p className="text-gray-600">No open projects currently.</p>
        ) : (
          projects
            .filter((p) => p.status === "PENDING")
            .map((proj) => (
              <div key={proj.id} className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-semibold text-blue-800">
                  {proj.title}
                </h3>
                <p className="text-gray-700 mt-1">{proj.description}</p>
                <p className="text-sm text-gray-600 mt-2">
                  💰 ₹{proj.budget} | ⏳{" "}
                  {new Date(proj.deadline).toDateString()}
                </p>
                <button
                  onClick={() => setSelectedProjectId(proj.id)}
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  📤 Place Bid
                </button>
              </div>
            ))
        )}
      </section>

      {/* Bid Submission Form */}
      {selectedProjectId && (
        <section className="bg-white p-6 rounded-xl shadow max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-green-700 mb-4">
            📩 Submit Your Bid
          </h2>
          <input
            type="text"
            placeholder="Your Name"
            className="border p-2 w-full mb-2 rounded"
            value={form.sellerName}
            onChange={(e) => setForm({ ...form, sellerName: e.target.value })}
          />
          <input
            type="number"
            placeholder="Bid Amount (₹)"
            className="border p-2 w-full mb-2 rounded"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Estimated Completion Time (e.g., 5 days)"
            className="border p-2 w-full mb-2 rounded"
            value={form.timeFrame}
            onChange={(e) => setForm({ ...form, timeFrame: e.target.value })}
          />
          <textarea
            placeholder="Why are you the right fit?"
            className="border p-2 w-full mb-2 rounded"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={handleBidSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              ✅ Submit Bid
            </button>
            <button
              onClick={() => {
                setSelectedProjectId(null);
                setForm({ ...form, amount: "", timeFrame: "", message: "" });
              }}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              ❌ Cancel
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
