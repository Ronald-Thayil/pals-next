"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import HeaderAdmin from "@/components/HeaderAdmin";
import FooterAdmin from "@/components/FooterAdmin";
import InvoiceFormPage from "@/components/InvoiceForm";

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

type Invoice = {
  _id: string;
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
  productList: (Product & { Amount: number; _id: string })[];
  totalAmount: number;
  gstAmount: number;
  netBasicAmount: number;
  roundNetBasicAmount: number;
  amountToWords: string;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function BillingPage() {
  const [billingList, setBillingList] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Invoice | "">("");
  const [asc, setAsc] = useState(true);
  const [isModelOpen, setModelOpen] = useState(false);
  const [selected, setSelected] = useState<FormData | null>(null);

  const transformQuotationData = (data: Invoice) => {
    const transformed: FormData = {
      invoiceId: data.invoiceId,
      invoiceDate: data.invoiceDate,
      buyerInfo: data.buyerInfo,
      shipInfo: data.shipInfo,
      buyerPanNo: data.buyerPanNo,
      buyerState: data.buyerState,
      buyerStateCode: data.buyerStateCode,
      shipPanNo: data.shipPanNo,
      shipState: data.shipState,
      shipStateCode: data.shipStateCode,
      products: data.productList.map((product) => ({
        description: product.description,
        hsnCode: product.hsnCode,
        rate: product.rate,
        quantity: product.quantity,
        unit: product.unit as "KG" | "Piece", // Enforcing allowed units
      })),
    };

    setSelected(transformed);
    setModelOpen(true);
  };

  const filteredData = billingList
    .filter((item) =>
      [item.invoiceId, item.invoiceDate, item.buyerPanNo, item.shipPanNo]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;
      if (a[sortColumn]! < b[sortColumn]!) return asc ? -1 : 1;
      if (a[sortColumn]! > b[sortColumn]!) return asc ? 1 : -1;
      return 0;
    });

  const handleSort = (column: keyof Invoice) => {
    if (sortColumn === column) {
      setAsc(!asc);
    } else {
      setSortColumn(column);
      setAsc(true);
    }
  };

  const fetchInvoiceList = useCallback(async () => {
    try {
      const response = await fetch("/api/invoice");
      const result = await response.json();
      if (result.success && Array.isArray(result.invoices)) {
        setBillingList(result.invoices);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  }, []);

  useEffect(() => {
    fetchInvoiceList();
  }, [fetchInvoiceList]);

  const onCloseModal = useCallback(
    (fromModal: boolean) => {
      setSelected(null);
      setModelOpen(false);
      if (fromModal) {
        fetchInvoiceList();
      }
    },
    [fetchInvoiceList]
  );

  return (
    <>
      <HeaderAdmin />
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Invoice List
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-xs border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button onClick={() => setModelOpen(true)} className="primary-btn">
            Add Invoice
          </button>
        </div>

        <div
          className="overflow-x-auto bg-white shadow rounded-lg"
          style={{ height: "calc(100vh - 287px)" }}
        >
          <div className="h-full overflow-y-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="sticky top-0 bg-slate-800 text-white z-10">
                <tr className="border-b border-gray-200">
                  {[
                    { key: "invoiceId", label: "Invoice ID" },
                    { key: "invoiceDate", label: "Invoice Date" },
                    { key: "buyerPanNo", label: "Buyer PanNo." },
                    { key: "netBasicAmount", label: "Amount" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key as keyof Invoice)}
                      className="px-5 py-3 text-left cursor-pointer"
                    >
                      <span>{col.label}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        className="inline-block ml-2 h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15 12 18.75 15.75 15M6 9l6-6 6 6"
                        />
                      </svg>
                    </th>
                  ))}
                  <th className="px-5 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-3">{item.invoiceId}</td>
                      <td className="px-5 py-3">{item.invoiceDate}</td>
                      <td className="px-5 py-3">{item.buyerPanNo}</td>
                      <td className="px-5 py-3">₹ {item.netBasicAmount}</td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => transformQuotationData(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-gray-500"
                    >
                      No invoice found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {isModelOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white max-w-5xl w-full max-h-[90vh] rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <button
                  onClick={() => onCloseModal(false)}
                  className="absolute right-3 top-4 transition-transform duration-500 hover:rotate-[180deg]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    fill="none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <InvoiceFormPage data={selected} onClose={onCloseModal} />
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterAdmin />
    </>
  );
}
