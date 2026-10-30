import { NextResponse } from 'next/server';
import { addMessage } from '@/lib/store';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Vui lòng điền đủ họ tên, email và nội dung' }, { status: 400 });
    }

    const saved = addMessage({ name, email, phone, message });
    return NextResponse.json({ success: true, message: 'Đã gửi phản hồi thành công!', data: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
