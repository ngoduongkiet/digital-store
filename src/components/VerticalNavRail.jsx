'use client';

import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';

export default function VerticalNavRail() {
  return (
    <aside 
      className="hidden lg:flex fixed left-0 top-0 bottom-0 w-16 xl:w-20 bg-[#f8f9fa] border-r border-slate-200/80 z-50 flex-col items-center justify-between py-8 select-none"
      aria-label="Side Navigation"
    >
      {/* Top: Brand Logo (Vertical Text Serif) */}
      <Link 
        href="/" 
        className="font-editorial text-2xl font-black text-slate-900 tracking-tight transition hover:text-slate-700 [writing-mode:vertical-rl] rotate-180"
        title="Kiệt Digital Store"
      >
        Kiệt Digital
      </Link>

      {/* Center: Minimalist Vertical Nav Links (Chuẩn Slide 1 Focal) */}
      <nav className="flex flex-col items-center gap-10 text-xs font-semibold text-slate-500 tracking-wide">
        <a 
          href="#products" 
          className="transition hover:text-slate-900 [writing-mode:vertical-rl] rotate-180 hover:scale-105"
        >
          Tool & Bots
        </a>
        <a 
          href="#standards" 
          className="transition hover:text-slate-900 [writing-mode:vertical-rl] rotate-180 hover:scale-105"
        >
          Tiêu Chuẩn
        </a>
        <a 
          href="#guarantee" 
          className="transition hover:text-slate-900 [writing-mode:vertical-rl] rotate-180 hover:scale-105"
        >
          Về Kiệt
        </a>
        <a 
          href="#reviews" 
          className="transition hover:text-slate-900 [writing-mode:vertical-rl] rotate-180 hover:scale-105"
        >
          Đánh Giá
        </a>
      </nav>

      {/* Bottom: Sign In / Tra Cứu Pill Button (Vertical Pill) */}
      <div className="flex flex-col items-center gap-3">
        <Link
          href="/my-orders"
          className="py-4 px-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-[11px] font-bold tracking-wider transition shadow-sm [writing-mode:vertical-rl] rotate-180 flex items-center justify-center gap-1"
          title="Tra cứu đơn hàng đã mua"
        >
          <span>Tra Cứu</span>
        </Link>
      </div>
    </aside>
  );
}
