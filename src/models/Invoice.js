import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  description: String,
  rate: Number,
  quantity: Number,
  unit: String,
  Amount: Number,
  hsnCode: String,
});

const invoiceSchema = new Schema(
  {
    invoiceId: { type: String, required: true, unique: true },
    invoiceDate: String,
    buyerInfo: String,
    shipInfo: String,
    buyerPanNo: String,
    buyerState: String,
    buyerStateCode: String,
    shipPanNo: String,
    shipState: String,
    shipStateCode: String,
    productList: [ProductSchema],
    totalAmount: Number,
    gstAmount: Number,
    netBasicAmount: Number,
    roundNetBasicAmount: Number,
    amountToWords: String,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Invoice = models.Invoice || model("Invoice", invoiceSchema);
