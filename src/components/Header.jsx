'use client';

import Link from 'next/link';
import { ShoppingBag, Search, ShieldCheck, UserCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-slate-900 tracking-tight">Kiệt Digital Store</span>
            <span className="block text-[11px] font-semibold text-indigo-600 -mt-1">Tự động hoá & Tài nguyên MMO</span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-indigo-600 transition">Sản phẩm</Link>
          <Link href="/my-orders" className="hover:text-indigo-600 transition">Kiểm tra đơn hàng</Link>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            Nhả hàng tự động 24/7
          </div>
        </nav>

        {/* Right action */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-orders"
            className="text-xs md:text-sm font-medium px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Đơn của tôi
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs md:text-sm font-medium px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition"
          >
            <UserCheck className="w-4 h-4" />
            <span>Quản trị (Admin)</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
