import { NextResponse } from "next/server";
import { Invoice } from "@/models/Invoice";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { invoiceId } = body;

    if (invoiceId) {
      // Update existing invoice
      const updatedInvoice = await Invoice.findOneAndUpdate(
        { invoiceId },
        { ...body },
        { new: true }
      );

      if (updatedInvoice) {
        return NextResponse.json({ success: true, invoice: updatedInvoice });
      } else {
        return NextResponse.json(
          { success: false, error: "Invoice not found for update" },
          { status: 404 }
        );
      }
    } else {
      const latestInvoice = (await Invoice.findOne()
        .sort({ timestamp: -1 })
        .lean()) as { invoiceId?: string };

      let nextNumber = 1;
      if (latestInvoice?.invoiceId) {
        const match = latestInvoice.invoiceId.match(/(\d{3})$/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      const formattedNumber = String(nextNumber).padStart(3, "0");
      const invoiceId = `FVPL/B/24-25/${formattedNumber}`;

      const invoice = await Invoice.create({
        ...body,
        invoiceId,
      });

      return NextResponse.json({ success: true, invoice });
    }
  } catch (error: unknown) {
    console.error("POST /api/invoice/add error:", error);
    return NextResponse.json(
      { success: false, error: "Check" },
      { status: 500 }
    );
  }
}
