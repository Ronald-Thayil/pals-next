"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, ChangeEvent } from "react";
import { QuotationTemplate } from "./quotationTemplate";
import { formateDate } from "@/helper/common";

type Product = {
  description: string;
  hnsCode: string;
  rate: string;
  quantity: string;
  [key: string]: string | "KG" | "Piece"; // Allow dynamic keys like 'unit-0', 'unit-1', etc.
};

type FormData = {
  date: string;
  name: string;
  companyName: string;
  qoNo: string;
  address: string;
  products: Product[];
};

export default function QuotationFormPage() {
  const [formData, setFormData] = useState<FormData>({
    date: "",
    name: "",
    companyName: "",
    qoNo: "",
    address: "",
    products: [
      { description: "", hnsCode: "", rate: "", quantity: "", "unit-0": "KG" },
    ],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number | null = null
  ) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedProducts = [...formData.products];

      updatedProducts[index][name as keyof Product] = value;

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
            hnsCode: "",
            rate: "",
            quantity: "",
            [`unit-${i}`]: "KG",
          }
      ),
    });
  };

  const handleSubmit = () => {
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
      qoNo: formData.qoNo,
      productList,
      totalAmount,
      gstAmount,
      netBasicAmount,
    };

    const htmlContent = QuotationTemplate(payload);

    // Create a hidden iframe to load the HTML content
    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0px";
    iframe.style.height = "0px";
    iframe.style.border = "none";
    iframe.srcdoc = htmlContent;

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Fix: Use an explicit if-statement instead of optional chaining with &&
    if (iframe.contentWindow) {
      iframe.contentWindow.print();
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
              Quotation No.
            </label>
            <input
              type="text"
              id="qoNo"
              name="qoNo"
              placeholder="Enter Quotation No."
              value={formData.qoNo}
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
                <label htmlFor={`hnsCode-${index}`} className="block mb-2">
                  HNS Code
                </label>
                <input
                  type="text"
                  id={`hnsCode-${index}`}
                  name="hnsCode"
                  value={product.hnsCode}
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
                      type="radio"
                      name={`unit-${index}`} // Ensure unique name per product
                      value="KG"
                      checked={product[`unit-${index}`] === "KG"}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <span className="ml-2">KG</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`unit-${index}`} // Ensure unique name per product
                      value="Piece"
                      checked={product[`unit-${index}`] === "Piece"}
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
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
