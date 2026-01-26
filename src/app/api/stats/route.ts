import { NextResponse } from "next/server";
import { Invoice } from "@/models/Invoice";
import { Quotation } from "@/models/Quotation";
import connectToDatabase from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const year = searchParams.get("year");

        // Build date filter based on year
        let invoiceDateFilter = {};
        let quotationDateFilter = {};

        if (year && year !== "all") {
            // Filter by year in the date string (format: DD/MM/YYYY)
            const yearRegex = new RegExp(`/${year}$`);
            invoiceDateFilter = { invoiceDate: { $regex: yearRegex } };
            quotationDateFilter = { date: { $regex: yearRegex } };
        }

        // Get counts
        const invoiceCount = await Invoice.countDocuments(invoiceDateFilter);
        const quotationCount = await Quotation.countDocuments(quotationDateFilter);

        // Get total amounts for the year
        const invoices = await Invoice.find(invoiceDateFilter).select("netBasicAmount");
        const quotations = await Quotation.find(quotationDateFilter).select("netBasicAmount");

        const totalInvoiceAmount = invoices.reduce((sum, inv) => sum + (inv.netBasicAmount || 0), 0);
        const totalQuotationAmount = quotations.reduce((sum, quot) => sum + (quot.netBasicAmount || 0), 0);

        // Get available years from both collections
        const allInvoices = await Invoice.find().select("invoiceDate");
        const allQuotations = await Quotation.find().select("date");

        const yearsSet = new Set<string>();

        allInvoices.forEach((inv) => {
            if (inv.invoiceDate) {
                const parts = inv.invoiceDate.split("/");
                if (parts.length === 3) {
                    yearsSet.add(parts[2]);
                }
            }
        });

        allQuotations.forEach((quot) => {
            if (quot.date) {
                const parts = quot.date.split("/");
                if (parts.length === 3) {
                    yearsSet.add(parts[2]);
                }
            }
        });

        const availableYears = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));

        return NextResponse.json({
            success: true,
            stats: {
                invoiceCount,
                quotationCount,
                totalInvoiceAmount,
                totalQuotationAmount,
            },
            availableYears,
        });
    } catch (error: unknown) {
        console.error("GET /api/stats error:", error);
        return NextResponse.json(
            { success: false, error: "Error fetching stats" },
            { status: 500 }
        );
    }
}
