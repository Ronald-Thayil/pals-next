import { NextResponse } from "next/server";
import { PurchaseOrder } from "@/models/PurchaseOrder";
import connectToDatabase from "@/lib/mongodb";

export const dynamic = "force-dynamic"; // 👈 prevents caching
export async function GET() {
  try {
    await connectToDatabase();

    const purchaseOrders = await PurchaseOrder.find().sort({ timestamp: -1 });
    return NextResponse.json({ success: true, purchaseOrders });
  } catch (error: unknown) {
    console.error("GET /api/purchaseorders error:", error);
    return NextResponse.json(
      { success: false, error: "Error" },
      { status: 500 }
    );
  }
}
