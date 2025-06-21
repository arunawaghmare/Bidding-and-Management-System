import prisma from "../utils/prisma.js";

export const placeBid = async (req, res) => {
  const { projectId, sellerName, amount, completionTime, message } = req.body;
  const bid = await prisma.bid.create({
    data: {
      sellerName,
      amount: Number(amount),
      completionTime,
      message,
      projectId: Number(projectId),
      sellerId: req.user.id,
    },
  });
  res.json(bid);
};

export const getBids = async (req, res) => {
  const { projectId } = req.params;
  const bids = await prisma.bid.findMany({
    where: { projectId: Number(projectId) },
  });
  res.json(bids);
};
