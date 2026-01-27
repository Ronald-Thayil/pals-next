import { NextResponse } from "next/server";
import { Invoice } from "@/models/Invoice";
import connectToDatabase from "@/lib/mongodb";
import { BillingTemplate } from "@/helper/template/billingTemplate";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const { invoiceId } = await request.json();

    if (!invoiceId) {
      return NextResponse.json(
        { success: false, error: "Invoice ID is required" },
        { status: 400 }
      );
    }

    const invoice = await Invoice.findOne({ invoiceId });

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: "Invoice not found" },
        { status: 404 }
      );
    }

    const htmlContent = BillingTemplate(invoice);

    return NextResponse.json({ 
      success: true, 
      html: htmlContent,
      invoiceId: invoice.invoiceId
    });
  } catch (error: unknown) {
    console.error("POST /api/invoice/download error:", error);
    return NextResponse.json(
      { success: false, error: "Error generating PDF" },
      { status: 500 }
    );
  }
}
