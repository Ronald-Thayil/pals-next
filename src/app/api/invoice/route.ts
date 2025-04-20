import { NextResponse } from 'next/server';
import {  Invoice} from '@/models/Invoice';
import connectToDatabase from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();

    const invoices = await Invoice.find().sort({ timestamp: -1 });
    return NextResponse.json({ success: true, invoices });
  } catch (error: unknown) {
    console.error('GET /api/invoice error:', error);
    return NextResponse.json({ success: false, error: "Error" }, { status: 500 });
  }
}
