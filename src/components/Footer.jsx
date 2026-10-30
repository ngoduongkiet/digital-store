import Link from 'next/link';
import { Shield, Zap, RefreshCw, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-20 transition-colors">
      {/* Value props */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 py-10 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-900/60">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Giao hàng tức thì</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Nhận file sau 3s chuyển khoản</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/60">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bảo mật & Hợp pháp</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">100% công cụ & data an toàn</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-900/60">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Cập nhật trọn đời</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Nhận bản update mới miễn phí</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-100 dark:border-blue-900/60">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Hỗ trợ kỹ thuật 1-1</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Kèm video và Ultraviewer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div>
          © 2026 <strong className="text-slate-800 dark:text-slate-200">Kiệt Digital Store</strong> • Sáng lập bởi Ngô Dương Kiệt • Techcombank 19075242377010.
        </div>
        <div className="flex flex-wrap items-center gap-5 font-semibold">
          <Link href="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Điều khoản dịch vụ</Link>
          <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Chính sách bảo mật</Link>
          <Link href="/refund" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Chính sách hoàn tiền</Link>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            VietQR Napas 24/7
          </span>
        </div>
      </div>
    </footer>
  );
}
