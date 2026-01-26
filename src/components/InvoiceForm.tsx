"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { BillingTemplate } from "../helper/template/billingTemplate";
import { formateDate, numberToWords } from "@/helper/common";
import { Button } from "@/components/ui/Button";
import { Plus, Minus, Package } from "lucide-react";

type Product = {
  description: string;
  hsnCode: string;
  rate: number;
  quantity: number;
  unit: "KG" | "Piece";
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
      const updatedProduct = { ...updatedProducts[index] };

      if (name.startsWith("unit")) {
        updatedProduct.unit = value as "KG" | "Piece";
      } else if (name === "rate" || name === "quantity") {
        updatedProduct[name as keyof Product] = Number(value) as never;
      } else {
        updatedProduct[name as keyof Product] = value as never;
      }

      updatedProducts[index] = updatedProduct;
      setFormData({ ...formData, products: updatedProducts });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, defaultProduct],
    });
  };

  const removeProduct = (index: number) => {
    if (formData.products.length > 1) {
      const updatedProducts = formData.products.filter((_, i) => i !== index);
      setFormData({ ...formData, products: updatedProducts });
    }
  };

  const genratePayload = () => {
    let totalAmount = 0;
    const productList = formData.products.map((product) => {
      const Amount = Number(product.quantity) * Number(product.rate);
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
        const invoiceId = result.invoice.invoiceId;
        const fileName = `Invoice-${invoiceId}.pdf`;

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
      const formattedDate = `${year}-${month}-${day}`;

      setFormData({
        ...props.data,
        invoiceDate: formattedDate,
      });
    }
  }, [props.data]);

  const inputClass = "w-full px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 text-sm placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

  return (
    <>
      {/* Form Content */}
      <div className="p-6 overflow-auto max-h-[calc(90vh-140px)] scrollbar-thin">
        {/* Invoice Details Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded flex items-center justify-center text-xs font-bold">1</span>
            Invoice Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="invoiceDate" className={labelClass}>
                Invoice Date <span className="text-error-500">*</span>
              </label>
              <input
                type="date"
                id="invoiceDate"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="buyerPanNo" className={labelClass}>
                Buyer PAN No.
              </label>
              <input
                type="text"
                id="buyerPanNo"
                name="buyerPanNo"
                value={formData.buyerPanNo}
                onChange={handleChange}
                placeholder="AAAAA0000A"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="buyerState" className={labelClass}>
                Buyer State
              </label>
              <input
                type="text"
                id="buyerState"
                name="buyerState"
                value={formData.buyerState}
                onChange={handleChange}
                placeholder="Enter state"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="buyerStateCode" className={labelClass}>
                State Code
              </label>
              <input
                type="text"
                id="buyerStateCode"
                name="buyerStateCode"
                value={formData.buyerStateCode}
                onChange={handleChange}
                placeholder="e.g. 27"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Buyer Info Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded flex items-center justify-center text-xs font-bold">2</span>
            Buyer Information
          </h3>
          <div>
            <label htmlFor="buyerInfo" className={labelClass}>
              Buyer Name & Address <span className="text-error-500">*</span>
            </label>
            <textarea
              id="buyerInfo"
              name="buyerInfo"
              value={formData.buyerInfo}
              onChange={handleChange}
              rows={3}
              placeholder="Enter complete buyer name and address"
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Shipping Info Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded flex items-center justify-center text-xs font-bold">3</span>
            Shipping Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="shipPanNo" className={labelClass}>
                Party PAN No.
              </label>
              <input
                type="text"
                id="shipPanNo"
                name="shipPanNo"
                value={formData.shipPanNo}
                onChange={handleChange}
                placeholder="AAAAA0000A"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="shipState" className={labelClass}>
                Party State
              </label>
              <input
                type="text"
                id="shipState"
                name="shipState"
                value={formData.shipState}
                onChange={handleChange}
                placeholder="Enter state"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="shipStateCode" className={labelClass}>
                State Code
              </label>
              <input
                type="text"
                id="shipStateCode"
                name="shipStateCode"
                value={formData.shipStateCode}
                onChange={handleChange}
                placeholder="e.g. 27"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="shipInfo" className={labelClass}>
              Delivery Address
            </label>
            <textarea
              id="shipInfo"
              name="shipInfo"
              value={formData.shipInfo}
              onChange={handleChange}
              rows={3}
              placeholder="Enter complete delivery address"
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded flex items-center justify-center text-xs font-bold">4</span>
              Products
            </h3>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={addProduct}
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Add Product
            </Button>
          </div>

          <div className="space-y-4">
            {formData.products.map((product, index) => (
              <div
                key={`products-${index}`}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4 text-slate-500" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">Product {index + 1}</span>
                  </div>
                  {formData.products.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="p-1.5 text-slate-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-2">
                    <label className={labelClass}>Description</label>
                    <input
                      type="text"
                      name="description"
                      value={product.description}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="Product description"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>HSN Code</label>
                    <input
                      type="text"
                      name="hsnCode"
                      value={product.hsnCode}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="HSN"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Rate (₹)</label>
                    <input
                      type="number"
                      name="rate"
                      value={product.rate}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="0.00"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={product.quantity}
                      onChange={(e) => handleChange(e, index)}
                      placeholder="0"
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-5">
                    <label className={labelClass}>Unit</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`unit-${index}`}
                          value="KG"
                          checked={product.unit === "KG"}
                          onChange={(e) => handleChange(e, index)}
                          className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                        />
                        <span className="text-sm text-slate-700">KG</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`unit-${index}`}
                          value="Piece"
                          checked={product.unit === "Piece"}
                          onChange={(e) => handleChange(e, index)}
                          className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-500"
                        />
                        <span className="text-sm text-slate-700">Piece</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Product Amount Preview */}
                {product.rate > 0 && product.quantity > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600">
                      Amount: <span className="font-medium text-slate-900">₹{(product.rate * product.quantity).toLocaleString('en-IN')}</span>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
        <Button
          type="button"
          variant="secondary"
          onClick={() => props.onClose(false)}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          isLoading={loading}
        >
          {props.data ? "Update Invoice" : "Create Invoice"}
        </Button>
      </div>
    </>
  );
}
