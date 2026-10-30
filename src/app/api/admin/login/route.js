import { NextResponse } from 'next/server';
import { getStoreData } from '@/lib/store';

export async function POST(req) {
  try {
    const { password } = await req.json();
    const correctPassword = 'Ngoduongkiet123@';

    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: 'Mật khẩu quản trị không đúng!' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
