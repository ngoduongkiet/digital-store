'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Trang Chủ', href: '/' },
    { label: 'Bộ Sưu Tập Tool', href: '/tools' },
    { label: 'Quy Trình 3 Bước', href: '/#quy-trinh-4-buoc' },
    { label: 'Tiêu Chuẩn Vàng', href: '/#tieu-chuan-vang' },
    { label: 'Đánh Giá', href: '/#danh-gia' },
    { label: 'Tra Cứu Đơn', href: '/my-orders' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f8f9fa]/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_1px_10px_rgba(0,0,0,0.02)] transition-all">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          {/* Custom Luxury Monogram & Tech Emblem */}
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-[1px] shadow-md group-hover:scale-105 transition-all duration-300 shrink-0">
            <div className="w-full h-full rounded-[15px] bg-slate-950/90 flex items-center justify-center relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-emerald-400/20 pointer-events-none"></div>

              {/* Bespoke Geometric Emblem */}
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 relative z-10">
                <defs>
                  <linearGradient id="emblem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                  <linearGradient id="dot-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                {/* Stem of K */}
                <path d="M9 7v18" stroke="url(#emblem-grad)" strokeWidth="2.8" strokeLinecap="round" />
                {/* Upper arm of K */}
                <path d="M10 16l10-9" stroke="url(#emblem-grad)" strokeWidth="2.8" strokeLinecap="round" />
                {/* Lower arm of K */}
                <path d="M14 13l9 12" stroke="url(#emblem-grad)" strokeWidth="2.8" strokeLinecap="round" />
                {/* Glowing status dot */}
                <circle cx="23" cy="8" r="2.2" fill="url(#dot-grad)" />
              </svg>
            </div>
          </div>

          {/* Typography */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-slate-900 uppercase">
                KIỆT DIGITAL
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black tracking-wide uppercase">
                PRO
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-0.5">
              MMO AUTOMATION SUITE
            </span>
          </div>
        </Link>

        {/* Center Floating Navigation Pill (Whitespace No-Wrap, Zero Line-Breaks) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 border border-slate-200/90 shadow-2xs">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Zalo Button */}
          <a
            href="https://zalo.me/0352279413"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all whitespace-nowrap"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Zalo: 0352.279.413</span>
          </a>

          {/* Primary CTA Button */}
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs uppercase tracking-wider font-extrabold shadow-sm hover:bg-black hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap"
          >
            <span>Khám Phá Tool</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-6 py-5 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <a
              href="https://zalo.me/0352279413"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Zalo Kiệt: 0352.279.413</span>
            </a>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs uppercase tracking-wider font-bold"
            >
              Khám Phá Toàn Bộ Tool
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
