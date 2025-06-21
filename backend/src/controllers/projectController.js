import prisma from "../utils/prisma.js";
import sendMail from "../utils/mailer.js";

// ✅ CREATE PROJECT
export const createProject = async (req, res) => {
  const { title, description, budget, deadline } = req.body;

  if (!title || !description || !budget || !deadline) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const parsedBudget = Number(budget);
  const parsedDeadline = new Date(deadline);

  if (isNaN(parsedBudget) || isNaN(parsedDeadline.getTime())) {
    return res
      .status(400)
      .json({ message: "Invalid budget or deadline format" });
  }

  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        budget: parsedBudget,
        deadline: parsedDeadline,
        buyerId: req.user.id,
        status: "PENDING",
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create Project Error:", error);
    res
      .status(500)
      .json({ message: "Failed to create project", error: error.message });
  }
};

// ✅ SELECT SELLER
export const selectSeller = async (req, res) => {
  const { projectId, sellerId } = req.body;

  if (!projectId || !sellerId) {
    return res
      .status(400)
      .json({ message: "projectId and sellerId are required" });
  }

  try {
    const project = await prisma.project.update({
      where: { id: Number(projectId) },
      data: { sellerId, status: "IN_PROGRESS" },
    });

    const seller = await prisma.user.findUnique({ where: { id: sellerId } });

    if (seller?.email) {
      await sendMail(
        seller.email,
        "You've been selected for a project!",
        `Congrats! You've been selected for project: ${project.title}`
      );
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Select Seller Error:", error);
    res
      .status(500)
      .json({ message: "Failed to select seller", error: error.message });
  }
};

// ✅ COMPLETE PROJECT + UPLOAD FILE
export const completeProject = async (req, res) => {
  const { projectId } = req.params;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const project = await prisma.project.update({
      where: { id: Number(projectId) },
      data: {
        status: "COMPLETED",
        deliverable: file.filename,
      },
    });

    const seller = await prisma.user.findUnique({
      where: { id: project.sellerId },
    });
    const buyer = await prisma.user.findUnique({
      where: { id: project.buyerId },
    });

    if (buyer?.email) {
      await sendMail(
        buyer.email,
        "Project Marked as Completed",
        `Please review the deliverables submitted for project: ${project.title}`
      );
    }

    if (seller?.email) {
      await sendMail(
        seller.email,
        "Project Successfully Completed",
        `You have submitted your deliverables for: ${project.title}`
      );
    }

    res.status(200).json({ message: "Project marked as completed", project });
  } catch (error) {
    console.error("Complete Project Error:", error);
    res
      .status(500)
      .json({ message: "Failed to complete project", error: error.message });
  }
};

// ✅ GET ALL PROJECTS
export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        bids: { include: { seller: true } },
        buyer: true,
        seller: true,
        reviews: true,
      },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Get All Projects Error:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch projects", error: error.message });
  }
};
