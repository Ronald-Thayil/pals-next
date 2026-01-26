"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Search } from "lucide-react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Card } from "@/components/ui/Card";
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
  const [isLoading, setIsLoading] = useState(true);

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
        unit: product.unit as "KG" | "Piece",
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
      setIsLoading(true);
      const response = await fetch("/api/invoice", { cache: "no-store" });
      const result = await response.json();
      if (result.success && Array.isArray(result.invoices)) {
        setBillingList(result.invoices);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
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

  const columns = [
    { key: "invoiceId" as keyof Invoice, label: "Invoice ID" },
    { key: "invoiceDate" as keyof Invoice, label: "Date" },
    { key: "buyerPanNo" as keyof Invoice, label: "Buyer PAN" },
    { key: "netBasicAmount" as keyof Invoice, label: "Amount" },
  ];

  return (
    <AdminLayout
      title="Invoices"
      description="Manage and track all your invoices"
      action={
        <Button
          onClick={() => setModelOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Invoice
        </Button>
      }
    >
      {/* Search and Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 text-sm placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="text-sm text-slate-500">
            {filteredData.length} invoice{filteredData.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-12 bg-slate-100 border-b border-slate-200" />
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 border-b border-slate-100 flex items-center px-6 gap-4">
                <div className="h-4 bg-slate-200 rounded w-1/5" />
                <div className="h-4 bg-slate-200 rounded w-1/5" />
                <div className="h-4 bg-slate-200 rounded w-1/5" />
                <div className="h-4 bg-slate-200 rounded w-1/5" />
                <div className="h-4 bg-slate-200 rounded w-1/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer select-none hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span>{col.label}</span>
                        <svg
                          className={`w-4 h-4 transition-colors ${sortColumn === col.key ? 'text-primary-600' : 'text-slate-400'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr
                      key={item._id}
                      className="transition-colors hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {item.invoiceId}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.invoiceDate}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.buyerPanNo}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        ₹{item.netBasicAmount?.toLocaleString('en-IN')}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => transformQuotationData(item)}
                          className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <svg className="w-12 h-12 text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm font-medium text-slate-900">No invoices found</p>
                        <p className="text-sm text-slate-500 mt-1">Create your first invoice to get started</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModelOpen}
        onClose={() => onCloseModal(false)}
        title={selected ? "Edit Invoice" : "Create Invoice"}
        size="xl"
      >
        <InvoiceFormPage data={selected} onClose={onCloseModal} />
      </Modal>
    </AdminLayout>
  );
}
