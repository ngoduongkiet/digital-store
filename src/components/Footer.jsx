import Link from 'next/link';
import { Shield, Zap, RefreshCw, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#02050c] mt-20 transition-colors">
      {/* 4 Symmetrical Value Prop Cards */}
      <div className="border-b border-white/10 py-10 bg-[#060a14]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-2xl bg-[#0b0f19] border border-white/10 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30 shadow-inner">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Giao hàng tức thì</h4>
              <p className="text-xs text-slate-400 mt-0.5">Nhận file sau 3s VietQR</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b0f19] border border-white/10 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 shadow-inner">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Bảo mật & Hợp pháp</h4>
              <p className="text-xs text-slate-400 mt-0.5">100% tài nguyên sạch</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b0f19] border border-white/10 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 shadow-inner">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Cập nhật trọn đời</h4>
              <p className="text-xs text-slate-400 mt-0.5">Cập nhật thuật toán free</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0b0f19] border border-white/10 shadow-sm flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30 shadow-inner">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white">Hỗ trợ kỹ thuật 1-1</h4>
              <p className="text-xs text-slate-400 mt-0.5">Ultraviewer qua Zalo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links - Symmetrical Flex Bar */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="text-center md:text-left">
          © 2026 <strong className="text-white">Kiệt Digital Store</strong> • Sáng lập bởi Ngô Dương Kiệt • Techcombank: 19075242377010
        </div>
        <div className="flex flex-wrap items-center justify-center gap-5 font-semibold">
          <Link href="/terms" className="hover:text-purple-400 transition">Điều khoản dịch vụ</Link>
          <Link href="/privacy" className="hover:text-purple-400 transition">Chính sách bảo mật</Link>
          <Link href="/refund" className="hover:text-purple-400 transition">Chính sách hoàn tiền</Link>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            VietQR Napas 24/7
          </span>
        </div>
      </div>
    </footer>
  );
}
