'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

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
      <div className="h-16 sm:h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 uppercase">
                KIỆT DIGITAL STORE
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-wider">
                ENTERPRISE MMO SUITE
              </span>
            </div>
          </Link>
          <span className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] uppercase tracking-wider font-semibold border border-slate-200">
            <Sparkles className="w-3 h-3 text-amber-500" />
            MMO Automation 2026
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/90 border border-slate-200/80">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://zalo.me/0352279413"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Zalo Kiệt (0352.279.413)</span>
          </a>

          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-900 text-white text-xs uppercase tracking-wider font-bold shadow-sm hover:bg-black hover:scale-[1.02] transition-all"
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
