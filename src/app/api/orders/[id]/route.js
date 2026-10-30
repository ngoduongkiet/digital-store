import { NextResponse } from 'next/server';
import { getOrderById, deleteOrder } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    const order = getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ success: false, error: 'Không tìm thấy đơn hàng' }, { status: 404 });
    }
    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    deleteOrder(params.id);
    return NextResponse.json({ success: true, message: 'Đã xóa đơn hàng thành công' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
