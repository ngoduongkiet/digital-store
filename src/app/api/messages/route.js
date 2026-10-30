import { NextResponse } from 'next/server';
import { getMessages } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const messages = getMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
