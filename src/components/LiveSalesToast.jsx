'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, X, Zap } from 'lucide-react';

const recentSales = [
  {
    name: 'Anh Nam (Hà Nội)',
    product: 'Bot Săn Deal Shopee Telegram',
    time: '2 phút trước',
    price: '199.000 đ'
  },
  {
    name: 'Anh Tuấn (Đà Nẵng)',
    product: 'Tệp 25.000 Khách Hàng B2B F&B',
    time: '5 phút trước',
    price: '299.000 đ'
  },
  {
    name: 'Chị Mai (TP. Hồ Chí Minh)',
    product: 'Bộ Prompt AI GPT-4o Đỉnh Cao',
    time: '9 phút trước',
    price: '149.000 đ'
  },
  {
    name: 'Anh Hoàng (Hải Phòng)',
    product: 'Tool Quét & Gửi Tin Nhắn Zalo',
    time: '14 phút trước',
    price: '249.000 đ'
  },
  {
    name: 'Anh Đức (Cần Thơ)',
    product: 'Bot Săn Deal Shopee Telegram',
    time: '18 phút trước',
    price: '199.000 đ'
  }
];

export default function LiveSalesToast() {
  const [currentSaleIndex, setCurrentSaleIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show first toast after 4 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    // Loop through notifications
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrentSaleIndex((prev) => (prev + 1) % recentSales.length);
        setVisible(true);
      }, 1000);
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const sale = recentSales[currentSaleIndex];

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm w-auto animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 border border-slate-200 shadow-xl shadow-slate-900/5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 fill-emerald-500 text-emerald-500" />
        </div>
        <div className="text-xs pr-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <span>{sale.name}</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium border border-emerald-200/50">
              ✓ Đã mua
            </span>
          </div>
          <p className="text-slate-600 font-medium text-[11px] truncate max-w-[200px] mt-0.5">
            {sale.product}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
            <span>{sale.time}</span>
            <span>•</span>
            <span className="font-semibold text-slate-700">{sale.price}</span>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="w-6 h-6 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition shrink-0 ml-auto"
          aria-label="Đóng thông báo"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
