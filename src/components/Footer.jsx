'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="relative w-full bg-white overflow-hidden pt-20 pb-12 z-10 border-t border-slate-200">
      {/* Big Architectural Background Text Watermark (Clean, no overflow) */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[80px] sm:text-[140px] lg:text-[200px] text-slate-100 font-black tracking-widest leading-none uppercase select-none opacity-80 whitespace-nowrap">
          KIỆT DIGITAL
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Information & Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10 mb-16">
          {/* Column 1: VŨ KHÍ SỐ */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Vũ Khí Số
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link href="/" className="hover:text-slate-900 transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-slate-900 transition-colors">
                  Bộ Sưu Tập Tool
                </Link>
              </li>
              <li>
                <Link href="/product/workflow-shopee" className="hover:text-slate-900 transition-colors">
                  Bot Shopee API
                </Link>
              </li>
              <li>
                <Link href="/product/data-cafe-hcm" className="hover:text-slate-900 transition-colors">
                  Tệp Data B2B F&amp;B
                </Link>
              </li>
              <li>
                <Link href="/product/bot-telegram-affiliate" className="hover:text-slate-900 transition-colors">
                  Bot Telegram VIP
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: TIÊU CHUẨN */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Tiêu Chuẩn
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a href="/#tieu-chuan-vang" className="hover:text-slate-900 transition-colors">
                  Mã Sạch 0/72 Clean
                </a>
              </li>
              <li>
                <a href="https://zalo.me/0352279413" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
                  UltraViewer 1-1
                </a>
              </li>
              <li>
                <a href="/#tieu-chuan-vang" className="hover:text-slate-900 transition-colors">
                  Hoàn Tiền 100%
                </a>
              </li>
              <li>
                <a href="/#quy-trinh-4-buoc" className="hover:text-slate-900 transition-colors">
                  Quy Trình 3 Bước
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: HỖ TRỢ */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Hỗ Trợ
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <Link href="/my-orders" className="hover:text-slate-900 transition-colors">
                  Tra Cứu Đơn Hàng
                </Link>
              </li>
              <li>
                <a href="/#quy-trinh-4-buoc" className="hover:text-slate-900 transition-colors">
                  Hướng Dẫn Cài Đặt
                </a>
              </li>
              <li>
                <a href="/#tieu-chuan-vang" className="hover:text-slate-900 transition-colors">
                  Cập Nhật API 2026
                </a>
              </li>
              <li>
                <a href="https://zalo.me/0352279413" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors">
                  Hỗ Trợ Zalo 24/7
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: LIÊN HỆ */}
          <div>
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
              Liên Hệ
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <span className="text-slate-900 font-semibold">Ngô Dương Kiệt</span>
              </li>
              <li>
                <span>Sơn Trà, Đà Nẵng</span>
              </li>
              <li>
                <a href="tel:0352279413" className="hover:text-slate-900 transition-colors font-medium">
                  Hotline: 0352.279.413
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                >
                  Facebook Cá Nhân
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5 & 6: NEWSLETTER & TECHCOMBANK BADGE */}
          <div className="col-span-2 space-y-4">
            <div>
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Bản Quyền &amp; Cập Nhật Kịch Bản
              </h5>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                Nhận thông báo kịch bản tự động hóa mới và cập nhật thuật toán miễn phí trực tiếp qua email.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="email@cuaban.com"
                    className="w-full pl-10 pr-28 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 transition"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-4 bg-slate-900 text-white text-xs font-semibold rounded-full hover:bg-black transition-all"
                  >
                    {subscribed ? 'Đã Nhận!' : 'Đăng Ký'}
                  </button>
                </div>
              </form>
            </div>

            {/* Bank Telemetry Badge */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-slate-700">Techcombank Napas 24/7:</span>
              </div>
              <span className="font-mono font-bold text-slate-900">19075242377010</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal Links and Copyright */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 KIỆT DIGITAL STORE. Phát triển bởi Ngô Dương Kiệt (Sơn Trà, Đà Nẵng).</p>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Điều khoản dịch vụ
            </Link>
            <Link href="/my-orders" className="hover:text-slate-900 transition-colors">
              Tra cứu đơn hàng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
