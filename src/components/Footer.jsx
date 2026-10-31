import Link from 'next/link';
import { Mail, Phone, Send, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#02050e] text-slate-400 font-sans border-t border-white/10 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        {/* Main Grid: 4 Cột gọn gàng, cân đối chuẩn Cruip/Linear */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 pb-8 border-b border-white/5">
          
          {/* Cột 1: Brand & Sáng lập (5 Cột) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black text-xs shadow-md">
                K
              </div>
              <span className="font-bold text-sm text-white tracking-tight">
                Kiệt Digital Store
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-semibold border border-purple-500/20">
                MMO 2026
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              Kho tài nguyên & kịch bản tự động hóa MMO bản quyền thực chiến. Tự động gửi link tải sau 3 giây quét mã VietQR Napas 24/7.
            </p>

            <div className="space-y-1 text-slate-400 text-[11px] leading-normal pt-1">
              <div>
                <strong className="text-slate-300">Sáng lập:</strong> Ngô Dương Kiệt{' '}
                <span className="text-emerald-400 font-medium">✓ Chính chủ</span>
              </div>
              <div>
                <strong className="text-slate-300">Trụ sở:</strong> Tổ 11, thôn Thanh Ly 2, xã Thăng Bình, TP. Đà Nẵng
              </div>
              <div>
                <strong className="text-slate-300">Techcombank:</strong>{' '}
                <span className="font-mono text-purple-300 font-bold">19075242377010</span>{' '}
                <span className="text-slate-500">(NGO DUONG KIET)</span>
              </div>
            </div>

            {/* Social Icons Mini Bar */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Ngô Dương Kiệt"
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 border border-white/10 hover:border-blue-500/30 text-slate-400 flex items-center justify-center transition text-xs font-bold"
              >
                f
              </a>
              <a
                href="https://zalo.me/0352279413"
                target="_blank"
                rel="noopener noreferrer"
                title="Zalo 0352.279.413"
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-emerald-600/20 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 text-slate-400 flex items-center justify-center transition text-xs font-bold"
              >
                Z
              </a>
              <a
                href="https://t.me/kiet_mmo"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram @kiet_mmo"
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-sky-600/20 hover:text-sky-400 border border-white/10 hover:border-sky-500/30 text-slate-400 flex items-center justify-center transition"
              >
                <Send className="w-3 h-3" />
              </a>
              <a
                href="mailto:ngoduongkiet53006@gmail.com"
                title="Email ngoduongkiet53006@gmail.com"
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-purple-600/20 hover:text-purple-400 border border-white/10 hover:border-purple-500/30 text-slate-400 flex items-center justify-center transition"
              >
                <Mail className="w-3 h-3" />
              </a>
              <a
                href="tel:0352279413"
                title="Hotline 0352.279.413"
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-amber-600/20 hover:text-amber-400 border border-white/10 hover:border-amber-500/30 text-slate-400 flex items-center justify-center transition"
              >
                <Phone className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Cột 2: Sản Phẩm (2 Cột) */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Sản Phẩm
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products" className="hover:text-white transition">
                  Tool Shopee & Telegram
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
                <a href="#products" className="text-purple-400 hover:text-purple-300 transition">
                  Giảm Giá 50% Hôm Nay
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ Trợ (3 Cột) */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Hỗ Trợ & Bảo Hành
            </h4>
            <ul className="space-y-2 text-xs">
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
                  <span>Cài Ultraviewer 1-1 Miễn Phí</span>
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
                  Kiểm Định VirusTotal (0/72)
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên Hệ (2 Cột) */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Liên Hệ & Pháp Lý
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="tel:0352279413" className="hover:text-white transition font-medium text-slate-300">
                  0352.279.413 (24/7)
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
                <Link href="/admin" className="text-slate-600 hover:text-slate-400 transition text-[11px]">
                  Cổng Quản Trị
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Tối Giản, Cân Đối */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-slate-400">Kiệt Digital Store</strong>. Sáng lập bởi Ngô Dương Kiệt. Mọi quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400/90 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              VietQR Napas 24/7 Online
            </span>
            <span className="text-slate-700">•</span>
            <Link href="/terms" className="hover:text-slate-400 transition">Điều khoản</Link>
            <span className="text-slate-700">•</span>
            <Link href="/privacy" className="hover:text-slate-400 transition">Bảo mật</Link>
            <span className="text-slate-700">•</span>
            <Link href="/refund" className="hover:text-slate-400 transition">Hoàn tiền</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
