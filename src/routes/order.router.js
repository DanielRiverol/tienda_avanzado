import { Router } from "express";
import Order from "../models/order.model.js";
const router = Router();

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const order = await Order.findOne({ code: code })
      .populate("customer", "first_name email")
      .populate("products", "name price");

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/admin/stats", async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalVendido: { $sum: "$total" },
          cantidadDeOrdenes: { $sum: 1 },
        },
      },
    ]);
// prueben hacer con reduce

    res.json(stats[0])


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
