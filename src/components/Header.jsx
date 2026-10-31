'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, Search, PhoneCall } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#f8f9fa]/90 backdrop-blur-md border-b border-slate-200/70 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo in Editorial Serif */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            K
          </div>
          <div>
            <span className="font-editorial text-xl sm:text-2xl font-bold text-slate-900 tracking-tight block leading-tight">
              Kiệt Digital Store
            </span>
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold border border-slate-200">
            Automations 2026
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
          <a href="#products" className="hover:text-slate-900 transition">
            Bộ Sưu Tập Tool
          </a>
          <a href="#standards" className="hover:text-slate-900 transition">
            4 Tiêu Chuẩn Vàng
          </a>
          <a href="#guarantee" className="hover:text-slate-900 transition">
            Cam Kết Từ Kiệt
          </a>
          <a href="#reviews" className="hover:text-slate-900 transition">
            Đánh Giá Khách Hàng
          </a>
        </nav>

        {/* Right Action Buttons (Pill buttons chuẩn Focal) */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/my-orders"
            className="text-xs font-semibold px-4 py-2 rounded-full border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 transition hidden sm:inline-flex items-center gap-1"
          >
            <span>Tra Cứu Đơn</span>
          </Link>

          <a
            href="https://zalo.me/0352279413"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-900 hover:bg-black text-white transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Zalo Kiệt</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-slate-200 text-slate-700 hover:text-slate-900 transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-[#f8f9fa] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-black py-1"
          >
            Bộ Sưu Tập Tool
          </a>
          <a
            href="#standards"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-black py-1"
          >
            4 Tiêu Chuẩn Vàng
          </a>
          <a
            href="#guarantee"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-black py-1"
          >
            Cam Kết Từ Kiệt (Đà Nẵng)
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-800 hover:text-black py-1"
          >
            Đánh Giá Khách Hàng
          </a>
          <Link
            href="/my-orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-purple-700 py-1"
          >
            Tra Cứu Đơn Hàng Đã Mua
          </Link>
        </div>
      )}
    </header>
  );
}
