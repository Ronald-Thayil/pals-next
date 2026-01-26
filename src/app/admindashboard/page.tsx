'use client';

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import {
  FileText,
  Receipt,
  ClipboardList,
  ArrowRight,
  Calendar,
  IndianRupee
} from "lucide-react";

const categories = [
  {
    name: "Quotation Orders",
    path: "/quotationList",
    description: "Create and manage price quotations for customers",
    icon: FileText,
    bgLight: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    name: "Purchase Orders",
    path: "/admindashboard",
    description: "Track and manage purchase orders",
    icon: ClipboardList,
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600"
  },
  {
    name: "Invoices",
    path: "/invoiceList",
    description: "Generate and manage customer invoices",
    icon: Receipt,
    bgLight: "bg-purple-50",
    textColor: "text-purple-600"
  },
];

interface Stats {
  invoiceCount: number;
  quotationCount: number;
  totalInvoiceAmount: number;
  totalQuotationAmount: number;
}

export default function AdminDashboard() {
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [stats, setStats] = useState<Stats>({
    invoiceCount: 0,
    quotationCount: 0,
    totalInvoiceAmount: 0,
    totalQuotationAmount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async (year: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/stats?year=${year}`, { cache: "no-store" });
      const result = await response.json();

      if (result.success) {
        setStats(result.stats);
        if (result.availableYears && result.availableYears.length > 0) {
          setAvailableYears(result.availableYears);
        }
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats(selectedYear);
  }, [selectedYear, fetchStats]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const statsCards = [
    {
      label: "Total Quotations",
      value: isLoading ? "..." : stats.quotationCount.toString(),
      icon: FileText,
      bgLight: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      label: "Total Invoices",
      value: isLoading ? "..." : stats.invoiceCount.toString(),
      icon: Receipt,
      bgLight: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      label: "Quotation Value",
      value: isLoading ? "..." : formatCurrency(stats.totalQuotationAmount),
      icon: IndianRupee,
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      label: "Invoice Value",
      value: isLoading ? "..." : formatCurrency(stats.totalInvoiceAmount),
      icon: IndianRupee,
      bgLight: "bg-amber-50",
      textColor: "text-amber-600"
    },
  ];

  return (
    <AdminLayout
      title="Dashboard"
      description="Welcome back! Here's an overview of your business."
    >
      {/* Year Filter */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-400" />
            <label htmlFor="year-select" className="text-sm font-medium text-slate-700">
              Filter by Year
            </label>
          </div>
          <select
            id="year-select"
            value={selectedYear}
            onChange={handleYearChange}
            className="px-3.5 py-2.5 border border-slate-300 rounded-lg bg-white text-slate-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer min-w-[150px]"
          >
            <option value="all">All Years</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <span className="text-sm text-slate-500">
            Showing data for {selectedYear === "all" ? "all years" : selectedYear}
          </span>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className={`text-2xl font-semibold text-slate-900 mt-1 ${isLoading ? 'animate-pulse' : ''}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 ${stat.bgLight} rounded-lg`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.name} href={category.path} className="group">
                <Card hover className="p-6 h-full transition-all duration-200 group-hover:border-primary-200">
                  <div className="flex flex-col h-full">
                    <div className={`w-12 h-12 ${category.bgLight} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${category.textColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 flex-grow">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
                      <span>Manage</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
        <Card className="p-6">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <ClipboardList className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-base font-medium text-slate-900 mb-1">
              Recent activity will appear here
            </h3>
            <p className="text-sm text-slate-500 max-w-sm">
              Create quotations, invoices, or purchase orders to see your recent activity.
            </p>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
