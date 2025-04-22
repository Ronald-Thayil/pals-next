"use client";

import React, { useState, ChangeEvent, useEffect } from "react";

import { QuotationTemplate } from "../helper/template/quotationTemplate";
import { formateDate } from "@/helper/common";

type Product = {
  description: string;
  hsnCode: string;
  rate: number;
  quantity: number;
  unit: "KG" | "Piece";
};

type FormData = {
  quotationId: string;
  date: string;
  name: string;
  companyName: string;
  address: string;
  products: Product[];
};

type PropsTypeValue = {
  data: FormData | null;
  onClose: (fromModal: boolean) => void;
};

export default function QuotationFormPage(props: PropsTypeValue) {
  const [loading, setLoading] = useState(false);

  const defaultProduct: Product = {
    description: "",
    hsnCode: "",
    rate: 0,
    quantity: 0,
    unit: "KG",
  };

  const defaultFormData: FormData = {
    quotationId: "",
    date: "",
    name: "",
    companyName: "",
    address: "",
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

      if (name.startsWith("unit")) {
        updatedProducts[index].unit = value as "KG" | "Piece";
      } else if (name === "rate" || name === "quantity") {
        updatedProducts[index][name as keyof Product] = Number(value) as never;
      } else {
        updatedProducts[index][name as keyof Product] = value as never;
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
        (_, i) => formData.products[i] || defaultProduct
      ),
    });
  };

  const genratePayload = () => {
    let totalAmount = 0;
    const productList = formData.products.map((product) => {
      const Amount = product.quantity * product.rate;
      totalAmount += Amount;
      return {
        ...product,
        Amount,
      };
    });

    const gstAmount = totalAmount * 0.18;
    const netBasicAmount = totalAmount + gstAmount;

    return {
      quotationId: formData.quotationId,
      date: formateDate(formData.date),
      name: formData.name,
      address: formData.address,
      companyName: formData.companyName,
      productList,
      totalAmount,
      gstAmount,
      netBasicAmount,
    };
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
        const quotationId = result.quotation.quotationId.replace(/\//g, "-");
        const fileName = `Quotation-${quotationId}.pdf`;

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
        alert("Failed to add quotation: " + result.error);
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
      const [day, month, year] = props.data.date.split("/");
      const formattedDate = `${year}-${month}-${day}`; // Convert to YYYY-MM-DD

      setFormData({
        ...props.data,
        date: formattedDate,
      });
    }
  }, [props.data]);

  return (
    <>
      <div className="bg-gray-100 p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Quotation Order Form
        </h2>
      </div>
      <div className="p-6">
        <div className="overflow-auto max-h-[70vh] pr-2 -mr-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium mb-1 text-gray-600"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium mb-1 text-gray-600"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="Enter address"
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
          {loading ? "Adding..." : "Add Quotation"}
        </button>
      </div>
    </>
  );
}
