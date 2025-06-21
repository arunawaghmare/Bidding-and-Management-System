import prisma from "../utils/prisma.js";

export const submitReview = async (req, res) => {
  const { projectId } = req.params;
  const { rating, comment } = req.body;

  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
    });
    if (!project) return res.status(404).json({ message: "Project not found" });

    const review = await prisma.review.create({
      data: {
        projectId: Number(projectId),
        rating: Number(rating),
        comment,
      },
    });

    res.status(200).json(review);
  } catch (err) {
    console.error("Review submission failed:", err);
    res.status(500).json({ message: "Server error" });
  }
};
