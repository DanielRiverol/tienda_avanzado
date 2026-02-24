import { Router } from "express";
import Order from "../models/order.model.js";
const router = Router();

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const order = await Order.findOne({ code: code });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/admin/stats", async (req, res) => {
  try {

    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
