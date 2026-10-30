'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Send, X, ShieldAlert } from 'lucide-react';

export default function FloatingSupport() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
      {/* Expanded menu */}
      {open && (
        <div className="mb-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl w-64 space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Hỗ Trợ Trực Tiếp 24/7</h4>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">● Đang trực tuyến phản hồi ngay</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <a
            href="https://zalo.me/0352279413"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-bold transition"
          >
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
              Z
            </div>
            <div>
              <div>Chat Zalo Official</div>
              <div className="text-[10px] font-normal text-blue-500">0352.279.413</div>
            </div>
          </a>

          <a
            href="https://t.me/kiet_mmo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 text-xs font-bold transition"
          >
            <div className="w-7 h-7 rounded-xl bg-sky-500 text-white flex items-center justify-center">
              <Send className="w-3.5 h-3.5" />
            </div>
            <div>
              <div>Chat Telegram</div>
              <div className="text-[10px] font-normal text-sky-500">@kiet_mmo</div>
            </div>
          </a>

          <div className="pt-1 text-[10px] text-slate-400 text-center">
            Cam kết hỗ trợ cài đặt 1-1 qua Ultraviewer
          </div>
        </div>
      )}

      {/* Main floating pill */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-xs shadow-xl shadow-indigo-500/25 transition transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Hỗ trợ kỹ thuật</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
      </button>
    </div>
  );
}
