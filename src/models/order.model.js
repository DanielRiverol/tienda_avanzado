import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  code: { type: String},
  customer: { type: Schema.Types.ObjectId, ref: "Customers" },
  products: [{ type: Schema.Types.ObjectId, ref: "Products" }],
  total: Number,
});
export default model("Orders", orderSchema);
