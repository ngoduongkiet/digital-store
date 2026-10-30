import { NextResponse } from 'next/server';
import { createOrder, getOrders, getStoreData } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { productId, customerEmail, customerPhone, couponCode } = body;
    if (!productId || !customerEmail) {
      return NextResponse.json({ success: false, error: 'Vui lòng cung cấp email và sản phẩm' }, { status: 400 });
    }

    const order = createOrder({ productId, customerEmail, customerPhone, couponCode });
    const storeData = getStoreData();
    const { bankName, bankAccount, bankOwner } = storeData.settings;

    // Map bank name to VietQR bank code (Techcombank = TCB)
    let bankCode = 'TCB';
    const lower = bankName.toLowerCase();
    if (lower.includes('techcom')) bankCode = 'TCB';
    else if (lower.includes('vietcom')) bankCode = 'VCB';
    else if (lower.includes('mbbank') || lower === 'mb') bankCode = 'MB';
    const qrUrl = `https://img.vietqr.io/image/${bankCode}-${bankAccount}-compact2.png?amount=${order.productPrice}&addInfo=${order.id}&accountName=${encodeURIComponent(bankOwner)}`;

    return NextResponse.json({
      success: true,
      order,
      paymentInfo: {
        qrUrl,
        bankName,
        bankAccount,
        bankOwner,
        amount: order.productPrice,
        content: order.id
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
