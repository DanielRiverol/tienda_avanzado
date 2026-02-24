import express from "express";
import customerRouter from "./routes/customer.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import dbConnect from "./config/db.js";
//settings
const app = express();
app.set("PORT", 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});
app.use("/api/customers", customerRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

//listeners
dbConnect();
app.listen(app.get("PORT"), () => {
  console.log(`Server on port http://localhost:${app.get("PORT")}`);
});
