import Link from 'next/link';
import { Shield, Zap, RefreshCw, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      {/* Value props */}
      <div className="border-b border-slate-100 py-10 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900">Giao hàng tức thì</h4>
              <p className="text-xs text-slate-500">Nhận file sau 3s chuyển khoản</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900">Bảo mật & Hợp pháp</h4>
              <p className="text-xs text-slate-500">100% công cụ & data an toàn</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900">Cập nhật trọn đời</h4>
              <p className="text-xs text-slate-500">Nhận bản update mới miễn phí</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900">Hỗ trợ kỹ thuật</h4>
              <p className="text-xs text-slate-500">Kèm video hướng dẫn từ A-Z</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © 2026 <strong>Kiệt Digital Store</strong>. Nền tảng bán tài nguyên số & công cụ tự động hóa MMO.
        </div>
        <div className="flex flex-wrap items-center gap-5 font-medium">
          <Link href="/terms" className="hover:text-indigo-600 transition">Điều khoản dịch vụ</Link>
          <Link href="/privacy" className="hover:text-indigo-600 transition">Chính sách bảo mật</Link>
          <Link href="/refund" className="hover:text-indigo-600 transition">Chính sách hoàn tiền</Link>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            VietQR Napas 24/7
          </span>
        </div>
      </div>
    </footer>
  );
}
