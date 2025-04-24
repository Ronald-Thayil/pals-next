"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { BillingTemplate } from "../helper/template/billingTemplate";
import { formateDate, numberToWords } from "@/helper/common";

type Product = {
  description: string;
  hsnCode: string;
  rate: number;
  quantity: number;
  unit: "KG" | "Piece"; // Allow dynamic keys like 'unit-0', 'unit-1', etc.
};

type FormData = {
  invoiceId: string;
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
type PropsTypeValue = {
  data: FormData | null;
  onClose: (fromModal: boolean) => void;
};

export default function InvoiceFormPage(props: PropsTypeValue) {
  const [loading, setLoading] = useState(false);
  const defaultProduct: Product = {
    description: "",
    hsnCode: "",
    rate: 0,
    quantity: 0,
    unit: "KG",
  };
  const defaultFormData: FormData = {
    invoiceId: "",
    invoiceDate: "",
    buyerInfo: "",
    shipInfo: "",
    buyerPanNo: "",
    buyerState: "",
    buyerStateCode: "",
    shipPanNo: "",
    shipState: "",
    shipStateCode: "",
    products: [defaultProduct],
  };
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number | null = null
  ) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedProducts = [...formData.products];
      const updatedProduct = { ...updatedProducts[index] }; // clone the specific product

      if (name.startsWith("unit")) {
        updatedProduct.unit = value as "KG" | "Piece";
      } else if (name === "rate" || name === "quantity") {
        updatedProduct[name as keyof Product] = Number(value) as never;
      } else {
        updatedProduct[name as keyof Product] = value as never;
      }

      updatedProducts[index] = updatedProduct; // replace with updated clone
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
        (_, i) => formData.products[i] || defaultProduct
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

    return {
      invoiceId: formData.invoiceId,
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
        const htmlContent = BillingTemplate(result.invoice);

        // Generate PDF with filename
        const invoiceId = result.invoice.invoiceId;
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

        setTimeout(() => {
          html2pdf().from(htmlContent).set(opt).save();
        }, 2000);

        // ✅ Corrected
        props.onClose(true);
      } else {
        alert("Failed to add invoice: " + result.error);
      }
    } catch (error) {
      console.error("Error", error);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (props.data) {
      const [day, month, year] = props.data.invoiceDate.split("/");
      const formattedDate = `${year}-${month}-${day}`; // Convert to YYYY-MM-DD

      setFormData({
        ...props.data,
        invoiceDate: formattedDate,
      });
    }
  }, [props.data]);

  return (
    <>
      <div className="bg-gray-100 p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Invoice Order Form{" "}
          {formData?.invoiceId ? `(${formData?.invoiceId})` : ""}
        </h2>
      </div>
      <div className="p-6">
        <div className="overflow-auto max-h-[70vh] pr-2 -mr-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="invoiceDate"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Invoice Date
              </label>
              <input
                type="date"
                id="invoiceDate"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="buyerPanNo"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Buyer PAN No.
              </label>
              <input
                type="text"
                id="buyerPanNo"
                name="buyerPanNo"
                value={formData.buyerPanNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="buyerState"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Buyer State Name
              </label>
              <input
                type="text"
                id="buyerState"
                name="buyerState"
                value={formData.buyerState}
                onChange={handleChange}
                placeholder="Enter Buyer State Name"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="buyerStateCode"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Buyer State Code
              </label>
              <input
                type="text"
                id="buyerStateCode"
                name="buyerStateCode"
                value={formData.buyerStateCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="buyerInfo"
              className="block text-sm font-medium mb-1 text-gray-600"
            >
              SOLD TO PARTY / BUYER&apos;S NAME & ADDRESS
            </label>
            <textarea
              id="buyerInfo"
              name="buyerInfo"
              value={formData.buyerInfo}
              onChange={handleChange}
              rows={4}
              placeholder="Enter Buyer Info"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="shipPanNo"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Party PAN No.
              </label>
              <input
                type="text"
                id="shipPanNo"
                name="shipPanNo"
                value={formData.shipPanNo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="shipState"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Party State Name
              </label>
              <input
                type="text"
                id="shipState"
                name="shipState"
                value={formData.shipState}
                onChange={handleChange}
                placeholder="Enter Buyer State Name"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="shipStateCode"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Party State Code
              </label>
              <input
                type="text"
                id="shipStateCode"
                name="shipStateCode"
                value={formData.shipStateCode}
                onChange={handleChange}
                placeholder="Enter Buyer State Code"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="shipInfo"
              className="block text-sm font-medium mb-1 text-gray-600"
            >
              SHIP TO PARTY / DELIVERY ADDRESS
            </label>
            <textarea
              id="shipInfo"
              name="shipInfo"
              value={formData.shipInfo}
              onChange={handleChange}
              rows={4}
              placeholder="Enter Party Info"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>

          <div className="mb-6 w-48">
            <label
              htmlFor="products"
              className="block text-sm font-medium mb-1 text-gray-600"
            >
              Number of Products
            </label>
            <input
              type="number"
              id="products"
              min="1"
              value={formData.products.length}
              onChange={handleProductCountChange}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>

          {formData.products.map((product, index) => (
            <div
              key={`products-${index}`}
              className="border border-gray-200 rounded-md p-4 mb-5 bg-gray-50"
            >
              <h2 className="text-md font-medium mb-3 text-gray-700">
                Product {index + 1}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm mb-1 text-gray-600">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-600">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    name="hsnCode"
                    value={product.hsnCode}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-600">
                    Rate
                  </label>
                  <input
                    type="number"
                    name="rate"
                    value={product.rate}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 text-gray-600">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1 text-gray-600">
                    Unit
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name={`unit-${index}`}
                        value="KG"
                        checked={product.unit === "KG"}
                        onChange={(e) => handleChange(e, index)}
                        className="mr-2"
                      />
                      KG
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name={`unit-${index}`}
                        value="Piece"
                        checked={product.unit === "Piece"}
                        onChange={(e) => handleChange(e, index)}
                        className="mr-2"
                      />
                      Piece
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 p-4 text-right rounded-b-lg">
        <button
          onClick={handleSubmit}
          className="primary-btn"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Invoice"}
        </button>
      </div>
    </>
  );
}
