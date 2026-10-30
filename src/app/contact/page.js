'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, CheckCircle2, Phone, Mail, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(false);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </Link>

      <div className="text-center max-w-xl mx-auto">
        <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
          Kênh Hỗ Trợ Khách Hàng
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Liên Hệ & Hỗ Trợ Kỹ Thuật</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Bạn cần hỗ trợ cài đặt kịch bản, kiểm tra mã đơn hàng hoặc có câu hỏi trước khi mua? Chúng tôi luôn sẵn sàng lắng nghe 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column (5 Cols): Direct Contacts */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div>
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white">Kênh Trực Tuyến Nhanh</h2>
              <p className="text-xs text-slate-400 mt-0.5">Phản hồi ngay trong 5 - 15 phút</p>
            </div>

            <div className="space-y-3 text-xs">
              <a
                href="https://zalo.me/0352279413"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold transition border border-blue-200/50 dark:border-blue-900/50 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-sm">
                  Z
                </div>
                <div>
                  <div className="font-bold text-xs text-blue-950 dark:text-blue-200">Zalo Hỗ Trợ Kỹ Thuật</div>
                  <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">0352.279.413 (Ngô Dương Kiệt)</div>
                </div>
              </a>

              <a
                href="https://t.me/kiet_mmo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 font-bold transition border border-sky-200/50 dark:border-sky-900/50 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-sky-950 dark:text-sky-200">Kênh Telegram Hỗ Trợ</div>
                  <div className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">@kiet_mmo (Trực tuyến 24/7)</div>
                </div>
              </a>
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Thời gian trực tuyến: 08:00 - 23:30 (Cả Thứ 7 & CN)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bảo hành và hoàn tiền trong 24 giờ làm việc</span>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">Gửi Tin Nhắn Cho Chúng Tôi</h2>
            <p className="text-xs text-slate-400 mb-6">Chúng tôi sẽ nhận được tin nhắn và phản hồi lại bạn qua Email/SĐT sớm nhất.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Họ và tên của bạn <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email của bạn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vidu@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Số điện thoại / Zalo
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nội dung yêu cầu hoặc thắc mắc <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tôi cần hỗ trợ về sản phẩm..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                ></textarea>
              </div>

              {success && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ phản hồi sớm.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-indigo-500/25 transition disabled:opacity-70 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{sending ? 'Đang gửi...' : 'Gửi Yêu Cầu Hỗ Trợ'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
