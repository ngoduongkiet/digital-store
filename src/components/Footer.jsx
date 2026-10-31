'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Zap, RefreshCw, Laptop, MapPin, Mail, Phone, 
  ExternalLink, Copy, Check, CheckCircle2, Lock, Sparkles, 
  CreditCard, ArrowUpRight, HeartHandshake
} from 'lucide-react';

export default function Footer() {
  const [copiedBank, setCopiedBank] = useState(false);

  const handleCopyBank = () => {
    navigator.clipboard.writeText('19075242377010');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  return (
    <footer className="relative bg-[#02040a] text-slate-300 font-sans overflow-hidden border-t border-purple-900/30">
      {/* Top Ambient Light Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-32 bg-purple-600/15 blur-[120px] pointer-events-none"></div>

      {/* Top Luminous Gradient Border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"></div>

      {/* 1. Sleek Trust & Value Strip (Thay thế 4 ô đen thô kệch bằng dải bảo chứng sang trọng) */}
      <div className="border-b border-white/5 bg-[#050814]/60 backdrop-blur-md py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-white">Giao File 3 Giây</div>
              <div className="text-[11px] text-slate-400">VietQR Napas tự động 24/7</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-white">100% Sạch Mã Độc</div>
              <div className="text-[11px] text-slate-400">VirusTotal 0/72 kiểm định</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-white">Update Trọn Đời</div>
              <div className="text-[11px] text-slate-400">Tải lại bản mới miễn phí</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 p-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-xs sm:text-sm text-white">Ultraviewer 1-1</div>
              <div className="text-[11px] text-slate-400">Kiệt hỗ trợ cài từ A-Z</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Modern SaaS Structure */}
      <div className="max-w-6xl mx-auto px-4 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
        
        {/* Col 1: Brand & Founder Identity Card (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(168,85,247,0.35)]">
              K
            </div>
            <div>
              <span className="font-black text-lg text-white tracking-tight block">Kiệt Digital Store</span>
              <span className="text-[10px] text-purple-400 font-bold tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Kho Vũ Khí Số & Tool MMO
              </span>
            </div>
          </div>

          {/* Founder Mini Card */}
          <div className="p-3.5 rounded-2xl bg-[#080d1a] border border-white/10 flex items-center gap-3.5 shadow-md">
            <div className="relative shrink-0">
              <img
                src="/images/founder-kiet.jpg"
                alt="Ngô Dương Kiệt"
                className="w-12 h-12 rounded-xl object-cover object-top border border-purple-500/40"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#080d1a]" title="Trực tuyến hỗ trợ"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-xs text-white truncate">Ngô Dương Kiệt</h4>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">Sáng lập & Điều hành hệ thống</p>
              <span className="text-[10px] text-emerald-400 font-semibold block">● Đang trực tuyến phản hồi ngay</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Hệ sinh thái phân phối kịch bản tự động hóa, tool MMO và tài nguyên số bản quyền thực chiến hàng đầu Việt Nam.
          </p>

          {/* Bank Account Glassmorphism Mini Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/20 via-[#0d1322] to-[#080d1a] border border-red-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-red-400">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Techcombank</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                Napas 24/7
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div>
                <div className="font-mono font-bold text-sm text-white tracking-wider">19075242377010</div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase">NGO DUONG KIET</div>
              </div>
              <button
                type="button"
                onClick={handleCopyBank}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-purple-300 transition flex items-center gap-1 border border-white/10 shrink-0"
                title="Sao chép số tài khoản"
              >
                {copiedBank ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[10px]">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Sao chép</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Col 2: Categories & Resources (lg:col-span-2) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-extrabold text-sm text-white tracking-wide uppercase text-[11px] text-purple-400">
            Danh Mục & Tool
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li>
              <a href="#products" className="hover:text-white transition flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                <span>Tool Tự Động Hóa</span>
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-white transition flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>Kịch Bản / Prompt AI</span>
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-white transition flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Data Khách Hàng B2B</span>
              </a>
            </li>
            <li>
              <Link href="/my-orders" className="hover:text-white transition flex items-center gap-1.5 text-purple-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Tra Cứu Đơn Hàng</span>
              </Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-white transition flex items-center gap-1.5 text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                <span>Quản Trị Admin</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Address & Headquarters (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-extrabold text-sm text-white tracking-wide uppercase text-[11px] text-purple-400">
            Trụ Sở & Liên Hệ
          </h4>
          <div className="space-y-3 text-xs text-slate-400">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="text-slate-200">Trụ sở hoạt động:</strong>
                <p className="mt-0.5 text-slate-400">Tổ 11, thôn Thanh Ly 2, xã Thăng Bình, TP. Đà Nẵng</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-purple-400 shrink-0" />
              <a href="mailto:ngoduongkiet53006@gmail.com" className="hover:text-purple-300 transition truncate text-slate-300">
                ngoduongkiet53006@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-purple-400 shrink-0" />
              <a href="https://zalo.me/0352279413" target="_blank" rel="noopener noreferrer" className="hover:text-purple-300 transition text-slate-300 font-bold">
                Hotline / Zalo: 0352.279.413
              </a>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-[11px] text-purple-300 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 shrink-0 text-purple-400" />
              <span>Hỗ trợ Ultraviewer 1-1 cài đặt trọn đời cho mọi khách hàng.</span>
            </div>
          </div>
        </div>

        {/* Col 4: Verified Channels & Trust Badges (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-3.5">
          <h4 className="font-extrabold text-sm text-white tracking-wide uppercase text-[11px] text-purple-400">
            Kênh Mạng Xã Hội Chính Chủ
          </h4>

          <div className="space-y-2">
            {/* Facebook Card Button */}
            <a
              href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 flex items-center justify-between text-blue-300 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                  f
                </div>
                <div>
                  <div className="font-extrabold text-xs text-white group-hover:text-blue-300">Facebook Cá Nhân</div>
                  <div className="text-[10px] text-blue-400">Ngô Dương Kiệt • Chính chủ</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Zalo Card Button */}
            <a
              href="https://zalo.me/0352279413"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-between text-emerald-300 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm">
                  Z
                </div>
                <div>
                  <div className="font-extrabold text-xs text-white group-hover:text-emerald-300">Zalo Hỗ Trợ 1-1</div>
                  <div className="text-[10px] text-emerald-400">0352.279.413 • Nhắn tin ngay</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Security & Payment Badges */}
          <div className="pt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Chứng Nhận & Bảo Mật
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" /> SSL 256-Bit
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-purple-400" /> VirusTotal 0/72
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> VietQR Napas
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Bottom Bar: Grand Finale Ending Bar */}
      <div className="border-t border-white/5 bg-[#010308] py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-slate-500">
          <div className="text-center md:text-left space-y-1">
            <p>
              © 2026 <strong className="text-slate-300 font-bold">Kiệt Digital Store</strong>. Phát triển & Vận hành bởi <strong className="text-white">Ngô Dương Kiệt</strong>.
            </p>
            <p className="text-[11px] text-slate-600">
              Mã nguồn, kịch bản tự động và cơ sở dữ liệu đã được đăng ký và bảo hộ bản quyền.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <Link href="/terms" className="hover:text-purple-400 transition">Điều khoản</Link>
            <span className="text-slate-800">•</span>
            <Link href="/privacy" className="hover:text-purple-400 transition">Bảo mật</Link>
            <span className="text-slate-800">•</span>
            <Link href="/refund" className="hover:text-purple-400 transition">Chính sách hoàn tiền</Link>
          </div>

          {/* System Uptime Status Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hệ thống VietQR & Nhả File: ONLINE 100%</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
