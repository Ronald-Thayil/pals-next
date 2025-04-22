import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  description: String,
  rate: Number,
  quantity: Number,
  unit: String,
  Amount: Number,
  hsnCode: String,
});

const QuotationSchema = new Schema(
  {
    quotationId: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    productList: [ProductSchema],
    gstAmount: Number,
    netBasicAmount: Number,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Quotation =
  models.Quotation || model("Quotation", QuotationSchema);
