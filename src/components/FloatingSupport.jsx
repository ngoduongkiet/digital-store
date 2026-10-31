'use client';

import { useState } from 'react';
import { MessageCircle, Phone, Send, X, ExternalLink } from 'lucide-react';

export default function FloatingSupport() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40">
      {/* Expanded menu */}
      {open && (
        <div className="mb-3 bg-[#0b0f19] p-4 rounded-3xl border border-white/15 shadow-2xl w-64 space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <h4 className="font-bold text-xs text-white">Kiệt Hỗ Trợ Trực Tiếp 24/7</h4>
              <p className="text-[10px] text-emerald-400 font-semibold">● Đang trực tuyến phản hồi ngay</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-300 text-xs font-bold transition border border-blue-500/20"
          >
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xs">
              f
            </div>
            <div>
              <div>Facebook Chính Chủ</div>
              <div className="text-[10px] font-normal text-blue-400">Ngô Dương Kiệt</div>
            </div>
          </a>

          {/* Zalo Link */}
          <a
            href="https://zalo.me/0352279413"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-emerald-600/15 hover:bg-emerald-600/25 text-emerald-300 text-xs font-bold transition border border-emerald-500/20"
          >
            <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
              Z
            </div>
            <div>
              <div>Chat Zalo Trực Tiếp</div>
              <div className="text-[10px] font-normal text-emerald-400">0352.279.413</div>
            </div>
          </a>

          {/* Telegram Link */}
          <a
            href="https://t.me/kiet_mmo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-sky-600/15 hover:bg-sky-600/25 text-sky-300 text-xs font-bold transition border border-sky-500/20"
          >
            <div className="w-7 h-7 rounded-xl bg-sky-500 text-white flex items-center justify-center">
              <Send className="w-3.5 h-3.5" />
            </div>
            <div>
              <div>Chat Telegram</div>
              <div className="text-[10px] font-normal text-sky-400">@kiet_mmo</div>
            </div>
          </a>

          <div className="pt-1 text-[10px] text-slate-400 text-center">
            Cam kết Ultraviewer hỗ trợ cài đặt 1-1
          </div>
        </div>
      )}

      {/* Main floating pill */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 transition transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Hỗ trợ kỹ thuật</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
      </button>
    </div>
  );
}
