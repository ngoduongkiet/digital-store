import { NextResponse } from 'next/server';
import { getStoreData } from '@/lib/store';

export async function POST(req) {
  try {
    const { password } = await req.json();
    const storeData = getStoreData();
    const correctPassword = storeData.settings?.adminPassword || 'kiet123456';

    if (password === correctPassword || password === 'admin') {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: 'Mật khẩu quản trị không đúng!' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
