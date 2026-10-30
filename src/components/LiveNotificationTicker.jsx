'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, CheckCircle, X } from 'lucide-react';

const NOTIFICATIONS = [
  { name: 'Anh Tuấn', city: 'Hà Nội', product: 'Kịch bản Bot Săn Deal Shopee', time: '2 phút trước' },
  { name: 'Chị Mai Lan', city: 'TP.HCM', product: 'Bộ Data 1.500 Quán Cafe Sài Gòn', time: '6 phút trước' },
  { name: 'Hoàng Quân', city: 'Đà Nẵng', product: 'Bộ 500+ Prompt AI & Bảng Tính Lãi', time: '11 phút trước' },
  { name: 'Lê Hữu Đạt', city: 'Cần Thơ', product: 'Kịch bản Bot Săn Deal Shopee', time: '15 phút trước' },
  { name: 'Minh Trang', city: 'Hải Phòng', product: 'Bộ Data 1.500 Quán Cafe Sài Gòn', time: '19 phút trước' }
];

export default function LiveNotificationTicker() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (closed) return;

    // Show after 4s
    const initialTimeout = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Rotate every 9s
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % NOTIFICATIONS.length);
        setVisible(true);
      }, 800);
    }, 9000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [closed]);

  if (closed || !visible) return null;

  const notif = NOTIFICATIONS[currentIdx];

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm">
        <CheckCircle className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center justify-between gap-1">
          <p className="text-xs font-bold text-slate-900 truncate">
            {notif.name} <span className="text-slate-400 font-normal">({notif.city})</span>
          </p>
          <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
        </div>
        <p className="text-[11px] text-indigo-600 font-semibold truncate mt-0.5">
          Vừa thanh toán: {notif.product}
        </p>
      </div>

      <button
        onClick={() => setClosed(true)}
        className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
        title="Đóng thông báo"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
