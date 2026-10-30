'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 dark:shadow-none">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-lg text-slate-900 dark:text-white tracking-tight block leading-tight">
              Kiệt Digital Store
            </span>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block -mt-0.5">
              Tự Động Hoá & Tài Nguyên MMO
            </span>
          </div>
        </Link>

        {/* Navigation links - Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Sản phẩm</Link>
          <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Giới thiệu</Link>
          <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Liên hệ & Hỗ trợ</Link>
          <Link href="/my-orders" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Tra cứu đơn hàng</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/my-orders"
            className="text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition hidden sm:inline-block"
          >
            Đơn của tôi
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1"
          >
            Sản phẩm
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1"
          >
            Giới thiệu
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1"
          >
            Liên hệ & Hỗ trợ
          </Link>
          <Link
            href="/my-orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-indigo-600 dark:text-indigo-400 py-1"
          >
            Tra cứu đơn hàng của tôi
          </Link>
        </div>
      )}
    </header>
  );
}
