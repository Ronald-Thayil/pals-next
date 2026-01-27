import { NextResponse } from 'next/server';
import { PurchaseOrder } from '@/models/PurchaseOrder';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { purchaseOrderId } = body;

    if (purchaseOrderId) {
      // Update existing purchase order
      const updatedPurchaseOrder = await PurchaseOrder.findOneAndUpdate(
        { purchaseOrderId },
        { ...body },
        { new: true }
      );

      if (updatedPurchaseOrder) {
        return NextResponse.json({ success: true, purchaseOrder: updatedPurchaseOrder });
      } else {
        return NextResponse.json({ success: false, error: 'Purchase Order not found for update' }, { status: 404 });
      }
    } else {
      // Create new purchase order with new purchaseOrderId
      const latestPurchaseOrder = await PurchaseOrder.findOne().sort({ timestamp: -1 }).lean() as { purchaseOrderId?: string };

      let nextNumber = 1;
      if (latestPurchaseOrder?.purchaseOrderId) {
        const match = latestPurchaseOrder.purchaseOrderId.match(/(\d{3})$/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      const formattedNumber = String(nextNumber).padStart(3, '0');
      const newPurchaseOrderId = `FVPL/PO/24-25/${formattedNumber}`;

      const purchaseOrder = await PurchaseOrder.create({
        ...body,
        purchaseOrderId: newPurchaseOrderId,
      });

      return NextResponse.json({ success: true, purchaseOrder });
    }
  } catch (error: unknown) {
    console.error('POST /api/purchaseorders/add error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
