import { Schema, model } from "mongoose";
const productSchema = new Schema({
  name: { type: String, lowercase: true },
  price: { type: Number, index: true },
});
export default model("Products", productSchema);
