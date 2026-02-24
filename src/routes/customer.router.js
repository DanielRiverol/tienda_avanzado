import { Router } from "express";
import Customer from "../models/customer.model.js";
const router = Router();

router.get("/", async (req, res) => {
  const { email } = req.query;
  try {
    const info = await Customer.find({ email: email?.toLowerCase() }).explain(
      "executionStats",
    );

    // data relevante
    const reporte = {
      busqueda: email,
      estrategia: info.queryPlanner.winningPlan.stage,
      docs_revisados: info.executionStats.totalDocsExamined,
      resultados_encontrados: info.executionStats.nReturned,
      tiempo_ms: info.executionStats.executionTimeMillis,
    };
    res.status(200).json({
      status: "success",
      reporte,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});
router.get("/test-perf-name", async (req, res) => {
  const { name } = req.query;
  try {
    const info = await Customer.find({ first_name: name?.toLowerCase() }).explain(
      "executionStats",
    );

    const reporte = {
      busqueda: name,
      estrategia: info.queryPlanner.winningPlan.stage,
      docs_revisados: info.executionStats.totalDocsExamined,
      resultados_encontrados: info.executionStats.nReturned,
      tiempo_ms: info.executionStats.executionTimeMillis,
    };
    res.status(200).json({
      status: "success",
      reporte,
    });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;

//then() => await => catch reject
