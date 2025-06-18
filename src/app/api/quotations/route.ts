import { NextResponse } from "next/server";
import { Quotation } from "@/models/Quotation";
import connectToDatabase from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // 👈 prevents caching
export async function GET() {
  try {
    await connectToDatabase();

    const quotations = await Quotation.find().sort({ timestamp: -1 });
    return NextResponse.json({ success: true, quotations });
  } catch (error: unknown) {
    console.error("GET /api/quotations error:", error);
    return NextResponse.json(
      { success: false, error: "Error" },
      { status: 500 }
    );
  }
}
