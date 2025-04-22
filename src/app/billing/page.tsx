"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, ChangeEvent } from "react";
import { BillingTemplate } from "./billingTemplate";
import { formateDate, numberToWords } from "@/helper/common";

type Product = {
  description: string;
  hsnCode: string;
  rate: string;
  quantity: string;
  [key: string]: string | "KG" | "Piece"; // Allow dynamic keys like 'unit-0', 'unit-1', etc.
};

type FormData = {
  invoiceNo: string;
  invoiceDate: string;
  buyerInfo: string;
  shipInfo: string;
  buyerPanNo: string;
  buyerState: string;
  buyerStateCode: string;
  shipPanNo: string;
  shipState: string;
  shipStateCode: string;
  products: Product[];
};

export default function QuotationFormPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    invoiceNo: "",
    invoiceDate: "",
    buyerInfo: "",
    shipInfo: "",
    buyerPanNo: "",
    buyerState: "",
    buyerStateCode: "",
    shipPanNo: "",
    shipState: "",
    shipStateCode: "",
    products: [
      { description: "", hsnCode: "", rate: "", quantity: "", unit: "KG" },
    ],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number | null = null
  ) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedProducts = [...formData.products];
      if (name.startsWith("unit")) {
        updatedProducts[index]["unit"] = value;
      } else {
        updatedProducts[index][name as keyof Product] = value;
      }

      setFormData({ ...formData, products: updatedProducts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleProductCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    setFormData({
      ...formData,
      products: Array.from(
        { length: count },
        (_, i) =>
          formData.products[i] || {
            description: "",
            hsnCode: "",
            rate: "",
            quantity: "",
            unit: "KG",
          }
      ),
    });
  };

  const genratePayload = () => {
    let totalAmount = 0;
    const productList = formData.products.map((product) => {
      const Amount = Number(product.quantity) * Number(product.rate); // Fix: Use * instead of +
      totalAmount += Amount;
      return {
        ...product,
        Amount,
      };
    });

    const gstAmount = totalAmount * 0.18;
    const netBasicAmount = totalAmount + gstAmount;
    const roundNetBasicAmount = Math.round(netBasicAmount);

    const payload = {
      invoiceNo: formData.invoiceNo,
      invoiceDate: formateDate(formData.invoiceDate),
      buyerInfo: formData.buyerInfo,
      shipInfo: formData.shipInfo,
      buyerPanNo: formData.buyerPanNo,
      buyerState: formData.buyerState,
      buyerStateCode: formData.buyerStateCode,
      shipPanNo: formData.shipPanNo,
      shipState: formData.shipState,
      shipStateCode: formData.shipStateCode,
      productList,
      totalAmount,
      gstAmount,
      netBasicAmount,
      roundNetBasicAmount,
      amountToWords: numberToWords(roundNetBasicAmount),
    };
    return payload;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = genratePayload();
      const response = await fetch("/api/invoice/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        const htmlContent = BillingTemplate(payload);

        // Generate PDF with filename
        const invoiceId = result.invoice.invoiceId.replace(/\//g, "-");
        const fileName = `Invoice-${invoiceId}.pdf`;

        // ✅ Dynamically import html2pdf on the client
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const html2pdf = (await import("html2pdf.js")).default;
        const opt = {
          margin: [0.3, 0.5, 0, 0.5],
          filename: fileName,
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        // New Promise-based usage:
        html2pdf().from(htmlContent).set(opt).save();
      } else {
        alert("Failed to add quotation: " + result.error);
      }
    } catch (error) {
      console.error("Error", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="p-5 max-w-3xl mx-auto">
        <div className="border border-gray-300 rounded-lg p-5">
          <h1 className="text-2xl font-bold mb-5">Invoice Receipt Form</h1>

          <div className="mb-5">
            <label htmlFor="invoiceNo" className="block mb-2">
              Invoice No.
            </label>
            <input
              type="text"
              id="invoiceNo"
              name="invoiceNo"
              placeholder="Enter Invoice No."
              value={formData.invoiceNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="invoiceDate" className="block mb-2">
              Invoice Date
            </label>
            <input
              type="date"
              id="invoiceDate"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="buyerPanNo" className="block mb-2">
              Buyer PAN No.
            </label>
            <input
              type="text"
              id="buyerPanNo"
              name="buyerPanNo"
              placeholder="Enter Buyer PAN No."
              value={formData.buyerPanNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="buyerState" className="block mb-2">
              Buyer State Name
            </label>
            <input
              type="text"
              id="buyerState"
              name="buyerState"
              placeholder="Enter Buyer State Name"
              value={formData.buyerState}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="buyerStateCode" className="block mb-2">
              Buyer State Code
            </label>
            <input
              type="text"
              id="buyerStateCode"
              name="buyerStateCode"
              placeholder="Enter Buyer State Code"
              value={formData.buyerStateCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="buyerInfo" className="block mb-2">
              SOLD TO PARTY / BUYER&apos;S NAME & ADDRESS
            </label>
            <textarea
              id="buyerInfo"
              name="buyerInfo"
              placeholder="Enter Buyer Info"
              value={formData.buyerInfo}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="shipPanNo" className="block mb-2">
              Party PAN No.
            </label>
            <input
              type="text"
              id="shipPanNo"
              name="shipPanNo"
              placeholder="Enter Party PAN No."
              value={formData.shipPanNo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="shipState" className="block mb-2">
              Party State Name
            </label>
            <input
              type="text"
              id="shipState"
              name="shipState"
              placeholder="Enter Buyer State Name"
              value={formData.shipState}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="shipStateCode" className="block mb-2">
              Party State Code
            </label>
            <input
              type="text"
              id="shipStateCode"
              name="shipStateCode"
              placeholder="Enter Buyer State Code"
              value={formData.shipStateCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="shipInfo" className="block mb-2">
              SHIP TO PARTY / DELIVERY ADDRESS
            </label>
            <textarea
              id="shipInfo"
              name="shipInfo"
              placeholder="Enter Party Info"
              value={formData.shipInfo}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="products" className="block mb-2">
              Number of Products
            </label>
            <input
              type="number"
              id="products"
              min="1"
              value={formData.products.length}
              onChange={handleProductCountChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {formData.products.map((product, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 mb-5"
            >
              <h2 className="text-lg font-bold mb-4">Product {index + 1}</h2>
              <div className="mb-4">
                <label htmlFor={`description-${index}`} className="block mb-2">
                  Description
                </label>
                <input
                  type="text"
                  id={`description-${index}`}
                  name="description"
                  value={product.description}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label htmlFor={`hsnCode-${index}`} className="block mb-2">
                  HSN Code
                </label>
                <input
                  type="text"
                  id={`hsnCode-${index}`}
                  name="hsnCode"
                  value={product.hsnCode}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label htmlFor={`rate-${index}`} className="block mb-2">
                  Rate
                </label>
                <input
                  type="number"
                  id={`rate-${index}`}
                  name="rate"
                  value={product.rate}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label htmlFor={`quantity-${index}`} className="block mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleChange(e, index)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Unit</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      id={`unit-kg-${index}`}
                      type="radio"
                      name={`unit-${index}`} // unique name per product
                      value="KG"
                      checked={product.unit === "KG"}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <span className="ml-2">KG</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      id={`unit-pc-${index}`}
                      type="radio"
                      name={`unit-${index}`} // unique name per product
                      value="Piece"
                      checked={product.unit === "Piece"}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <span className="ml-2">Piece</span>
                  </label>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Invoice"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
