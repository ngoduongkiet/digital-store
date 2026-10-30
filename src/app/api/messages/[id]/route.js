import { NextResponse } from 'next/server';
import { deleteMessage } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function DELETE(req, { params }) {
  try {
    deleteMessage(params.id);
    return NextResponse.json({ success: true, message: 'Đã xóa tin nhắn thành công' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
