import { NextResponse } from 'next/server';
import {  Quotation } from '@/models/Quotation';
import connectToDatabase from '@/lib/mongodb';


export async function POST(req: Request) {
  try {
    await connectToDatabase();


    const body = await req.json();

    const latestQuotation = await Quotation.findOne().sort({ timestamp: -1 }).lean() as { quotationId?: string };;

    let nextNumber = 1;
    if (latestQuotation?.quotationId) {
      const match = latestQuotation.quotationId.match(/(\d{3})$/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    const formattedNumber = String(nextNumber).padStart(3, '0');
    const quotationId = `FVPL/Q/24-25/${formattedNumber}`;

    const quotation = await Quotation.create({
      ...body,
      quotationId,
    });

    return NextResponse.json({ success: true, quotation });
  } catch (error: unknown) {
    console.error('POST /api/quotations/add error:', error);
    return NextResponse.json({ success: false, error: "Check" }, { status: 500 });
  }
}
