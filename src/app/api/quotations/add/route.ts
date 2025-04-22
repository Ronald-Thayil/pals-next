import { NextResponse } from 'next/server';
import { Quotation } from '@/models/Quotation';
import connectToDatabase from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { quotationId } = body;

    if (quotationId) {
      // Update existing quotation
      const updatedQuotation = await Quotation.findOneAndUpdate(
        { quotationId },
        { ...body },
        { new: true }
      );

      if (updatedQuotation) {
        return NextResponse.json({ success: true, quotation: updatedQuotation });
      } else {
        return NextResponse.json({ success: false, error: 'Quotation not found for update' }, { status: 404 });
      }
    } else {
      // Create new quotation with new quotationId
      const latestQuotation = await Quotation.findOne().sort({ timestamp: -1 }).lean() as { quotationId?: string };

      let nextNumber = 1;
      if (latestQuotation?.quotationId) {
        const match = latestQuotation.quotationId.match(/(\d{3})$/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      const formattedNumber = String(nextNumber).padStart(3, '0');
      const newQuotationId = `FVPL/Q/24-25/${formattedNumber}`;

      const quotation = await Quotation.create({
        ...body,
        quotationId: newQuotationId,
      });

      return NextResponse.json({ success: true, quotation });
    }
  } catch (error: unknown) {
    console.error('POST /api/quotations/add error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
