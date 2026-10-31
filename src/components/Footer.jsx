import Link from 'next/link';
import { 
  Zap, ShieldCheck, Lock, CreditCard, Mail, Phone, 
  Send, ExternalLink, CheckCircle2, HeartHandshake
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#030712] text-slate-400 font-sans border-t border-white/10 overflow-hidden">
      {/* Top Ambient Glow (Chuẩn phong cách Cruip & Linear) */}
      <div 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[180px] bg-purple-600/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12 pb-14">
          
          {/* Cột 1: Thương Hiệu & Thông Tin Founder (lg:col-span-5) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-purple-500/25">
                K
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg text-white tracking-tight block">
                  Kiệt Digital Store
                </span>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider block -mt-0.5">
                  Kho Vũ Khí Số & Tool MMO
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Nền tảng phân phối kịch bản tự động hóa, tool MMO thực chiến và tài nguyên số bản quyền. Tự động giao file tải ngay sau 3 giây quét mã VietQR Napas 24/7.
            </p>

            <div className="pt-1 space-y-1.5 text-xs text-slate-400">
              <p>
                <span className="text-slate-300 font-semibold">Sáng lập & Điều hành:</span>{' '}
                <span className="text-white font-medium">Ngô Dương Kiệt</span>{' '}
                <span className="inline-flex items-center text-emerald-400 text-[11px] font-medium ml-1">
                  ✓ Chính chủ
                </span>
              </p>
              <p>
                <span className="text-slate-300 font-semibold">Trụ sở:</span> Tổ 11, thôn Thanh Ly 2, xã Thăng Bình, TP. Đà Nẵng
              </p>
              <p>
                <span className="text-slate-300 font-semibold">Thụ hưởng:</span> Techcombank{' '}
                <span className="font-mono text-purple-300 font-bold">19075242377010</span>{' '}
                <span className="text-slate-500">(NGO DUONG KIET)</span>
              </p>
            </div>

            {/* Social Icons Bar (Chuẩn GitHub / Cruip) */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Cá Nhân Ngô Dương Kiệt"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 border border-white/10 hover:border-blue-500/30 text-slate-400 flex items-center justify-center transition-all duration-150 text-xs font-bold"
              >
                f
              </a>
              <a
                href="https://zalo.me/0352279413"
                target="_blank"
                rel="noopener noreferrer"
                title="Chat Zalo 0352.279.413"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-emerald-600/20 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 text-slate-400 flex items-center justify-center transition-all duration-150 text-xs font-bold"
              >
                Z
              </a>
              <a
                href="https://t.me/kiet_mmo"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram @kiet_mmo"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-sky-600/20 hover:text-sky-400 border border-white/10 hover:border-sky-500/30 text-slate-400 flex items-center justify-center transition-all duration-150"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:ngoduongkiet53006@gmail.com"
                title="Email: ngoduongkiet53006@gmail.com"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-purple-600/20 hover:text-purple-400 border border-white/10 hover:border-purple-500/30 text-slate-400 flex items-center justify-center transition-all duration-150"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:0352279413"
                title="Hotline: 0352.279.413"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-600/20 hover:text-amber-400 border border-white/10 hover:border-amber-500/30 text-slate-400 flex items-center justify-center transition-all duration-150"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Cột 2: Sản Phẩm (lg:col-span-2) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Sản Phẩm & Tool
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#products" className="hover:text-white transition">
                  Tool Shopee & Bot Telegram
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Kịch Bản & Prompt AI
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Data Khách Hàng B2B
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition">
                  Source Code Tự Động Hóa
                </a>
              </li>
              <li>
                <a href="#products" className="text-purple-400 hover:text-purple-300 transition font-medium">
                  Ưu Đãi Flash Sale 50%
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ Trợ & Bảo Hành (lg:col-span-3) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hỗ Trợ & Dịch Vụ
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/my-orders" className="text-purple-300 hover:text-white transition font-medium">
                  Tra Cứu Đơn Hàng Đã Mua
                </Link>
              </li>
              <li>
                <a 
                  href="https://zalo.me/0352279413" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  <span>Cài Đặt Ultraviewer 1-1</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition">
                  Chính Sách Hoàn Tiền 100%
                </Link>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-white transition">
                  Kiểm Định Mã Độc VirusTotal
                </a>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-white transition">
                  Câu Hỏi Thường Gặp (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên Hệ Trực Tiếp (lg:col-span-2) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Liên Hệ & Pháp Lý
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="tel:0352279413" className="hover:text-white transition">
                  Hotline: 0352.279.413
                </a>
              </li>
              <li>
                <a href="mailto:ngoduongkiet53006@gmail.com" className="hover:text-white transition truncate block">
                  ngoduongkiet53006@gmail.com
                </a>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Điều Khoản Dịch Vụ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-600 hover:text-slate-400 transition text-xs">
                  Cổng Quản Trị Admin
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Thanh Bảo Mật & Chứng Nhận (Chuẩn Stripe & Shadcn) */}
        <div className="pt-8 pb-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="font-semibold text-slate-300 text-xs">Thanh toán & Bảo mật:</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium flex items-center gap-1.5 text-[11px]">
              <Zap className="w-3 h-3 text-amber-400" /> VietQR Napas 24/7
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium flex items-center gap-1.5 text-[11px]">
              <CreditCard className="w-3 h-3 text-red-400" /> Techcombank
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium flex items-center gap-1.5 text-[11px]">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> VirusTotal 0/72 Clean
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-medium flex items-center gap-1.5 text-[11px]">
              <Lock className="w-3 h-3 text-purple-400" /> SSL 256-Bit
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Hệ thống VietQR & Nhả File: ONLINE 100%</span>
          </div>
        </div>

        {/* Copyright Bar Cuối Cùng */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} <strong className="text-slate-400 font-bold">Kiệt Digital Store</strong>. Sáng lập bởi Ngô Dương Kiệt. Toàn bộ bản quyền được bảo lưu.
          </p>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/terms" className="hover:text-slate-300 transition">Điều khoản</Link>
            <span className="text-slate-800">•</span>
            <Link href="/privacy" className="hover:text-slate-300 transition">Bảo mật</Link>
            <span className="text-slate-800">•</span>
            <Link href="/refund" className="hover:text-slate-300 transition">Hoàn tiền 100%</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
