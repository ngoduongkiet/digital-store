'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo with Glowing Icon */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg text-white tracking-tight leading-tight">
                Kiệt Digital Store
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                PRO 2026
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-400 block -mt-0.5">
              Kho Tool & Tài Nguyên Số MMO
            </span>
          </div>
        </Link>

        {/* Navigation links - Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold text-slate-300">
          <Link href="/" className="hover:text-white transition">Sản phẩm</Link>
          <a href="#simulation" className="hover:text-purple-400 transition flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Xem Demo</span>
          </a>
          <Link href="/about" className="hover:text-white transition">Giới thiệu</Link>
          <Link href="/contact" className="hover:text-white transition">Liên hệ & Hỗ trợ</Link>
          <Link href="/my-orders" className="hover:text-indigo-400 transition">Tra cứu đơn hàng</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/my-orders"
            className="text-xs font-bold px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/10 transition hidden sm:inline-block shadow-sm"
          >
            Đơn của tôi
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#030712] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-slate-200 hover:text-white py-1"
          >
            Sản phẩm
          </Link>
          <a
            href="#simulation"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-purple-400 py-1"
          >
            ⚡ Chạy thử bot tự động
          </a>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-slate-200 hover:text-white py-1"
          >
            Giới thiệu
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-slate-200 hover:text-white py-1"
          >
            Liên hệ & Hỗ trợ
          </Link>
          <Link
            href="/my-orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-indigo-400 py-1"
          >
            Tra cứu đơn hàng của tôi
          </Link>
        </div>
      )}
    </header>
  );
}
