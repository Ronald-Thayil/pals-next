"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, ChangeEvent } from "react";

import { QuotationTemplate } from "./quotationTemplate";
import { formateDate } from "@/helper/common";

type Product = {
  description: string;
  hsnCode: string;
  rate: string;
  quantity: string;
  [key: string]: string | "KG" | "Piece"; // Allow dynamic keys like 'unit-0', 'unit-1', etc.
};

type FormData = {
  date: string;
  name: string;
  companyName: string;
  address: string;
  products: Product[];
};

export default function QuotationFormPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    date: "",
    name: "",
    companyName: "",
    address: "",
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

    const payload = {
      date: formateDate(formData.date),
      name: formData.name,
      address: formData.address,
      companyName: formData.companyName,
      productList,
      totalAmount,
      gstAmount,
      netBasicAmount,
    };
    return payload;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = genratePayload();
      const response = await fetch("/api/quotations/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        const htmlContent = QuotationTemplate(result.quotation);

        // Generate PDF with filename
        const quotationId = result.quotation.quotationId.replace(/\//g, "-");
        const fileName = `Quotation-${quotationId}.pdf`;

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
          <h1 className="text-2xl font-bold mb-5">Quotation Order Form</h1>

          <div className="mb-5">
            <label htmlFor="date" className="block mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="name" className="block mb-2">
              Name of Person
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="companyName" className="block mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
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
              key={"products" + index}
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
            {loading ? "Adding..." : "Add Quotation"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
