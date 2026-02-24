import { Router } from "express";
import Product from "../models/product.model.js";
const router = Router();


router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
});

router.get("/filter", async (req, res) => {
  const { maxPrice } = req.query;
  try {
    const info = await Product.find({ price: { $lte: maxPrice } }).explain(
      "executionStats",
    );

    const reporte = {
      estrategia: info.queryPlanner.winningPlan.stage,
      documentos_revisados: info.executionStats.totalDocsExamined,
      tiempo_ms: info.executionStats.executionTimeMillis,
    };

    res.json(reporte);
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
});


export default router;