"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, ChangeEvent } from "react";
import { BillingTemplate } from "./billingTemplate";
import { formateDate, numberToWords } from "@/helper/common";

type Product = {
  description: string;
  hnsCode: string;
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
    debugger;
    const htmlContent = BillingTemplate(payload);

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
