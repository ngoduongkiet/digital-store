'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, Send, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="relative bg-[#0b132b] text-slate-300 font-sans overflow-hidden border-t border-slate-800 text-xs">
      
      {/* Background Subtle Watermark (Tối Giản, Không Che Chữ) */}
      <div 
        className="absolute bottom-2 left-0 right-0 overflow-hidden pointer-events-none select-none opacity-[0.03] text-center"
        aria-hidden="true"
      >
        <span className="font-editorial text-5xl sm:text-7xl lg:text-9xl font-black tracking-[0.25em] uppercase text-white block">
          KIỆT DIGITAL STORE
        </span>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-8">
        
        {/* Top Newsletter / Resource Signup Bar (Gọn Gàng & Thanh Lịch) */}
        <div className="pb-8 border-b border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-tight">
              Nhận Kịch Bản & Tool MMO Mới Nhất
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Đăng ký để nhận thông báo khi có tool mới và cập nhật thuật toán miễn phí từ Kiệt.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-md">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn..."
              className="flex-1 h-10 px-4 rounded-full bg-slate-900/90 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400 transition"
              required
            />
            <button
              type="submit"
              className="h-10 px-5 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 shrink-0"
            >
              <span>{subscribed ? 'Đã Đăng Ký!' : 'Đăng Ký'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* 4 Main Columns: Căn Chỉnh Đều Tăm Tắp, Không Bị Tràn Hay Rớt Chữ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 py-10 border-b border-slate-800/80">
          
          {/* Cột 1: Thương hiệu & Sáng lập (Chiếm 2/5 độ rộng = 40%) */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white text-slate-950 flex items-center justify-center font-black text-xs">
                K
              </div>
              <span className="font-editorial text-lg sm:text-xl font-bold text-white tracking-tight">
                Kiệt Digital Store
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                Chính Chủ
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              Hệ thống phân phối kịch bản tự động hóa, tool MMO và tài nguyên số bản quyền thực chiến hàng đầu Việt Nam. Tự động gửi link tải sau 3 giây quét mã VietQR Napas 24/7.
            </p>

            <div className="space-y-1.5 text-slate-400 text-[11px] pt-1">
              <p>
                <strong className="text-slate-200">Sáng lập & Phát triển:</strong> Ngô Dương Kiệt{' '}
                <span className="text-emerald-400 font-semibold">✓ Đã xác minh</span>
              </p>
              <p>
                <strong className="text-slate-200">Trụ sở:</strong> Tổ 11, thôn Thanh Ly 2, xã Thăng Bình, TP. Đà Nẵng
              </p>
              <p>
                <strong className="text-slate-200">Techcombank:</strong>{' '}
                <span className="font-mono text-purple-300 font-bold">19075242377010</span>{' '}
                <span className="text-slate-400">(NGO DUONG KIET)</span>
              </p>
            </div>

            {/* Social Icons Bar */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook Ngô Dương Kiệt"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-blue-600 hover:text-white border border-slate-700 text-slate-400 flex items-center justify-center transition text-xs font-bold"
              >
                f
              </a>
              <a
                href="https://zalo.me/0352279413"
                target="_blank"
                rel="noopener noreferrer"
                title="Zalo 0352.279.413"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-emerald-600 hover:text-white border border-slate-700 text-slate-400 flex items-center justify-center transition text-xs font-bold"
              >
                Z
              </a>
              <a
                href="https://t.me/kiet_mmo"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram @kiet_mmo"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-sky-500 hover:text-white border border-slate-700 text-slate-400 flex items-center justify-center transition"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:ngoduongkiet53006@gmail.com"
                title="Email: ngoduongkiet53006@gmail.com"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-purple-600 hover:text-white border border-slate-700 text-slate-400 flex items-center justify-center transition"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href="tel:0352279413"
                title="Hotline: 0352.279.413"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-600 hover:text-white border border-slate-700 text-slate-400 flex items-center justify-center transition"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Cột 2: Sản Phẩm (Chiếm 1/5 = 20%, đủ rộng cho text) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Bộ Sưu Tập Tool
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <a href="#products" className="hover:text-white transition whitespace-nowrap block">
                  Tool Shopee Flash Sale
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition whitespace-nowrap block">
                  Telegram Bot AI 24/7
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition whitespace-nowrap block">
                  Data 25.000+ Khách B2B
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition whitespace-nowrap block">
                  Prompt AI Viết Content
                </a>
              </li>
              <li>
                <a href="#products" className="text-purple-400 hover:text-purple-300 transition whitespace-nowrap block font-medium">
                  Ưu Đãi Giảm Giá 50%
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ Trợ & Bảo Hành (Chiếm 1/5 = 20%) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hỗ Trợ & Bảo Hành
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <Link href="/my-orders" className="text-purple-300 hover:text-white transition whitespace-nowrap block font-medium">
                  Tra Cứu Đơn Hàng Đã Mua
                </Link>
              </li>
              <li>
                <a 
                  href="https://zalo.me/0352279413" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1 whitespace-nowrap"
                >
                  <span>Cài Đặt Ultraviewer 1-1</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white transition whitespace-nowrap block">
                  Chính Sách Hoàn Tiền 100%
                </Link>
              </li>
              <li>
                <a href="#standards" className="hover:text-white transition whitespace-nowrap block">
                  Kiểm Định VirusTotal (0/72)
                </a>
              </li>
              <li>
                <a href="#guarantee" className="hover:text-white transition whitespace-nowrap block">
                  Câu Hỏi Thường Gặp (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Liên Hệ & Trụ Sở (Chiếm 1/5 = 20%) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Liên Hệ & Pháp Lý
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>
                <a href="tel:0352279413" className="hover:text-white transition font-medium text-slate-300 whitespace-nowrap block">
                  Hotline: 0352.279.413
                </a>
              </li>
              <li>
                <a href="mailto:ngoduongkiet53006@gmail.com" className="hover:text-white transition truncate block text-[11px]">
                  ngoduongkiet53006@gmail.com
                </a>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition whitespace-nowrap block">
                  Điều Khoản Dịch Vụ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition whitespace-nowrap block">
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-600 hover:text-slate-400 transition text-[11px] whitespace-nowrap block">
                  Cổng Quản Trị Hệ Thống
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & System Status */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong className="text-slate-300">Kiệt Digital Store</strong>. Phát triển & Vận hành bởi Ngô Dương Kiệt. Mọi quyền được bảo lưu.
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              VietQR Napas 24/7 Tự Động
            </span>
            <span className="text-slate-700">•</span>
            <Link href="/terms" className="hover:text-slate-400 transition">Điều khoản</Link>
            <span className="text-slate-700">•</span>
            <Link href="/privacy" className="hover:text-slate-400 transition">Bảo mật</Link>
            <span className="text-slate-700">•</span>
            <Link href="/refund" className="hover:text-slate-400 transition">Hoàn tiền 100%</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
