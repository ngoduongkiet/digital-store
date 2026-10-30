import { NextResponse } from 'next/server';
import { getStoreData, updateSettings } from '@/lib/store';

export async function GET() {
  try {
    const data = getStoreData();
    // Do not return password to public
    const { adminPassword, ...safeSettings } = data.settings || {};
    return NextResponse.json({ success: true, settings: safeSettings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const updated = updateSettings(body);
    const { adminPassword, ...safeSettings } = updated;
    return NextResponse.json({ success: true, settings: safeSettings });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
