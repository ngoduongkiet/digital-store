'use client';

import { useState } from 'react';
import Link from 'next/link';

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
    <footer className="relative w-full bg-surface-container-lowest overflow-hidden pt-20 pb-12 z-10 border-t border-surface-container">
      {/* Big Architectural Background Text Watermark (Luxestate style) */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[100px] sm:text-[170px] lg:text-[240px] text-surface-container-high/40 font-black tracking-widest leading-none uppercase select-none">
          KIỆT DIGITAL
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Information & Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10 mb-16">
          {/* Column 1: VŨ KHÍ SỐ */}
          <div>
            <h5 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider mb-4">
              Vũ Khí Số
            </h5>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link href="/" className="hover:text-on-surface transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-on-surface transition-colors">
                  Bộ Sưu Tập Tool
                </Link>
              </li>
              <li>
                <Link href="/product/workflow-shopee" className="hover:text-on-surface transition-colors">
                  Bot Shopee API
                </Link>
              </li>
              <li>
                <Link href="/product/data-cafe-hcm" className="hover:text-on-surface transition-colors">
                  Tệp Data B2B F&B
                </Link>
              </li>
              <li>
                <Link href="/product/bot-telegram-affiliate" className="hover:text-on-surface transition-colors">
                  Bot Telegram VIP
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: TIÊU CHUẨN */}
          <div>
            <h5 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider mb-4">
              Tiêu Chuẩn
            </h5>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <a href="/#tieu-chuan-vang" className="hover:text-on-surface transition-colors">
                  Mã Sạch 0/72 Clean
                </a>
              </li>
              <li>
                <a href="https://zalo.me/0352279413" target="_blank" rel="noopener noreferrer" className="hover:text-on-surface transition-colors">
                  UltraViewer 1-1
                </a>
              </li>
              <li>
                <a href="/#tieu-chuan-vang" className="hover:text-on-surface transition-colors">
                  Hoàn Tiền 100%
                </a>
              </li>
              <li>
                <a href="/#quy-trinh-4-buoc" className="hover:text-on-surface transition-colors">
                  Quy Trình 3 Bước
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: HỖ TRỢ */}
          <div>
            <h5 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider mb-4">
              Hỗ Trợ
            </h5>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <Link href="/my-orders" className="hover:text-on-surface transition-colors">
                  Tra Cứu Đơn Hàng
                </Link>
              </li>
              <li>
                <a href="/#quy-trinh-4-buoc" className="hover:text-on-surface transition-colors">
                  Hướng Dẫn Cài Đặt
                </a>
              </li>
              <li>
                <a href="/#tieu-chuan-vang" className="hover:text-on-surface transition-colors">
                  Cập Nhật API 2026
                </a>
              </li>
              <li>
                <a href="https://zalo.me/0352279413" target="_blank" rel="noopener noreferrer" className="hover:text-on-surface transition-colors">
                  Hỗ Trợ Zalo 24/7
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: LIÊN HỆ */}
          <div>
            <h5 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider mb-4">
              Liên Hệ
            </h5>
            <ul className="space-y-2.5 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <span className="text-on-surface font-semibold">Ngô Dương Kiệt</span>
              </li>
              <li>
                <span>Sơn Trà, Đà Nẵng</span>
              </li>
              <li>
                <a href="tel:0352279413" className="hover:text-on-surface transition-colors">
                  Hotline: 0352.279.413
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-on-surface transition-colors"
                >
                  Facebook Cá Nhân
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5 & 6: NEWSLETTER & TECHCOMBANK BADGE */}
          <div className="col-span-2 space-y-4">
            <div>
              <h5 className="font-label-md text-label-md font-bold text-on-surface uppercase tracking-wider mb-2">
                Bản Quyền &amp; Cập Nhật Kịch Bản
              </h5>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-3 leading-relaxed">
                Nhận thông báo kịch bản tự động hóa mới và cập nhật thuật toán miễn phí trực tiếp qua email.
              </p>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <div className="relative w-full">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-secondary text-xs">
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    placeholder="email@cuaban.com"
                    className="w-full pl-11 pr-28 py-2.5 bg-surface-container-low border border-surface-container rounded-full font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-4 bg-primary text-on-primary font-label-md text-xs font-semibold rounded-full hover:bg-primary-container transition-all"
                  >
                    {subscribed ? 'Đã Nhận!' : 'Đăng Ký'}
                  </button>
                </div>
              </form>
            </div>

            {/* Bank Telemetry Badge */}
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="font-medium text-on-surface">Techcombank Napas 24/7:</span>
              </div>
              <span className="font-mono font-bold text-on-surface">19075242377010</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Legal Links and Copyright */}
        <div className="border-t border-surface-container pt-8 flex flex-col sm:flex-row items-center justify-between font-body-sm text-body-sm text-on-surface-variant gap-4">
          <p>© 2026 KIỆT DIGITAL STORE. Phát triển bởi Ngô Dương Kiệt (Đà Nẵng).</p>
          <div className="flex items-center gap-6 font-label-sm text-label-sm">
            <Link href="/privacy" className="hover:text-on-surface transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-on-surface transition-colors">
              Điều khoản dịch vụ
            </Link>
            <Link href="/my-orders" className="hover:text-on-surface transition-colors">
              Tra cứu đơn hàng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
