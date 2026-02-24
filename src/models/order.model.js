import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  code: { type: String},
  //referencias
  
  total: Number,
});
export default model("Orders", orderSchema);
