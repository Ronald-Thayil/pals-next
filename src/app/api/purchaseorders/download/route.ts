import { NextResponse } from "next/server";
import { PurchaseOrder } from "@/models/PurchaseOrder";
import connectToDatabase from "@/lib/mongodb";
import { PurchaseOrderTemplate } from "@/helper/template/purchaseOrderTemplate";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const { purchaseOrderId } = await request.json();

    if (!purchaseOrderId) {
      return NextResponse.json(
        { success: false, error: "Purchase Order ID is required" },
        { status: 400 }
      );
    }

    const purchaseOrder = await PurchaseOrder.findOne({ purchaseOrderId });

    if (!purchaseOrder) {
      return NextResponse.json(
        { success: false, error: "Purchase Order not found" },
        { status: 404 }
      );
    }

    const htmlContent = PurchaseOrderTemplate(purchaseOrder);

    return NextResponse.json({ 
      success: true, 
      html: htmlContent,
      purchaseOrderId: purchaseOrder.purchaseOrderId
    });
  } catch (error: unknown) {
    console.error("POST /api/purchaseorders/download error:", error);
    return NextResponse.json(
      { success: false, error: "Error generating PDF" },
      { status: 500 }
    );
  }
}
