import { Schema, model } from "mongoose";
const productSchema = new Schema({
  name: { type: String, lowercase: true },
  price: Number,
});
export default model("Products", productSchema);
