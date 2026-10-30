import { NextResponse } from 'next/server';
import { markOrderAsPaid } from '@/lib/store';

export async function POST(req, { params }) {
  try {
    const order = markOrderAsPaid(params.id);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
