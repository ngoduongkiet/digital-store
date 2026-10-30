import { NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/store';

export async function POST(req) {
  try {
    const { code, amount } = await req.json();
    if (!code || !amount) {
      return NextResponse.json({ success: false, error: 'Vui lòng nhập mã giảm giá' }, { status: 400 });
    }

    const result = validateCoupon(code, amount);
    if (!result.valid) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
