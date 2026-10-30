import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.title || !body.price) {
      return NextResponse.json({ success: false, error: 'Thiếu thông tin sản phẩm' }, { status: 400 });
    }
    const product = addProduct(body);
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
