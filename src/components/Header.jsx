'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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
    <header className="fixed top-0 inset-x-0 z-50 bg-surface-container-lowest/85 backdrop-blur-xl border-b border-surface-container/80 shadow-[0_1px_12px_rgba(0,0,0,0.03)] transition-all">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3.5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <span className="material-symbols-outlined text-[20px]">terminal</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-base sm:text-lg font-bold tracking-tight text-on-surface uppercase">
                KIỆT DIGITAL STORE
              </span>
              <span className="font-label-sm text-[11px] text-on-surface-variant font-medium tracking-wider">
                ENTERPRISE MMO SUITE
              </span>
            </div>
          </Link>
          <span className="hidden xl:inline-flex items-center px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider font-semibold">
            MMO AUTOMATION 2026
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-surface-container-low border border-surface-container">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-semibold transition-all ${
                  active
                    ? 'bg-primary-container text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="https://zalo.me/0352279413"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full font-label-md text-xs font-semibold text-on-surface bg-surface-container-low hover:bg-surface-container border border-surface-container transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Zalo Kiệt (0352.279.413)</span>
          </a>

          <Link
            href="/tools"
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:scale-[1.02] hover:bg-primary-container transition-all"
          >
            Khám Phá Tool
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-container bg-surface-container-lowest/95 backdrop-blur-xl px-6 py-5 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-surface-container flex flex-col gap-2.5">
            <a
              href="https://zalo.me/0352279413"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-label-md text-xs font-semibold text-on-surface bg-surface-container-low border border-surface-container"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Zalo Kiệt: 0352.279.413</span>
            </a>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold"
            >
              Khám Phá Toàn Bộ Tool
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
