import { NextResponse } from "next/server";
import { Quotation } from "@/models/Quotation";
import connectToDatabase from "@/lib/mongodb";
import { QuotationTemplate } from "@/helper/template/quotationTemplate";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const { quotationId } = await request.json();

    if (!quotationId) {
      return NextResponse.json(
        { success: false, error: "Quotation ID is required" },
        { status: 400 }
      );
    }

    const quotation = await Quotation.findOne({ quotationId });

    if (!quotation) {
      return NextResponse.json(
        { success: false, error: "Quotation not found" },
        { status: 404 }
      );
    }

    const htmlContent = QuotationTemplate(quotation);

    return NextResponse.json({ 
      success: true, 
      html: htmlContent,
      quotationId: quotation.quotationId
    });
  } catch (error: unknown) {
    console.error("POST /api/quotations/download error:", error);
    return NextResponse.json(
      { success: false, error: "Error generating PDF" },
      { status: 500 }
    );
  }
}
