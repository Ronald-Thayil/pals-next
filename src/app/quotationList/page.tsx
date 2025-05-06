"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import HeaderAdmin from "@/components/HeaderAdmin";
import FooterAdmin from "@/components/FooterAdmin";
import QuotationFormPage from "@/components/QuotationForm";

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

type Quotation = {
  _id: string;
  quotationId: string;
  date: string;
  name: string;
  address: string;
  companyName: string;
  productList: (Product & { Amount: number; _id: string })[];
  gstAmount: number;
  netBasicAmount: number;
  timestamp: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function QuotationPage() {
  const [quotationList, setQuotationList] = useState<Quotation[]>([]);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof Quotation | "">("");
  const [asc, setAsc] = useState(true);
  const [isModelOpen, setModelOpen] = useState(false);
  const [selected, setSelected] = useState<FormData | null>(null);

  const transformQuotationData = (data: Quotation) => {
    const transformed: FormData = {
      quotationId: data.quotationId,
      date: data.date,
      name: data.name,
      companyName: data.companyName,
      address: data.address,
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

  const filteredData = quotationList
    .filter((item) =>
      [item.quotationId, item.date, item.name]
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

  const handleSort = (column: keyof Quotation) => {
    if (sortColumn === column) {
      setAsc(!asc);
    } else {
      setSortColumn(column);
      setAsc(true);
    }
  };

  const fetchQuotationList = useCallback(async () => {
    try {
      const response = await fetch("/api/quotations", { cache: "no-store" });
      const result = await response.json();
      if (result.success && Array.isArray(result.quotations)) {
        setQuotationList(result.quotations);
      }
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  }, []);

  useEffect(() => {
    fetchQuotationList();
  }, [fetchQuotationList]);

  const onCloseModal = useCallback(
    (fromModal: boolean) => {
      setSelected(null);
      setModelOpen(false);
      if (fromModal) {
        fetchQuotationList();
      }
    },
    [fetchQuotationList]
  );

  return (
    <>
      <HeaderAdmin />
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Quotation List
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
            Add Quotation
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
                    { key: "quotationId", label: "Quotation ID" },
                    { key: "date", label: "Date" },
                    { key: "name", label: "Name" },
                    { key: "netBasicAmount", label: "Amount" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key as keyof Quotation)}
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
                      <td className="px-5 py-3">{item.quotationId}</td>
                      <td className="px-5 py-3">{item.date}</td>
                      <td className="px-5 py-3">{item.name}</td>
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
                      No quotations found.
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
                <QuotationFormPage data={selected} onClose={onCloseModal} />
              </div>
            </div>
          </div>
        )}
      </div>
      <FooterAdmin />
    </>
  );
}
