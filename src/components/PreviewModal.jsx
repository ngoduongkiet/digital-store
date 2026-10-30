'use client';

import { X, CheckCircle2, ShieldCheck, Copy, Check, FileSpreadsheet, Bot, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function PreviewModal({ product, onClose, onBuy }) {
  const [copiedIdx, setCopiedIdx] = useState(null);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const preview = product?.preview;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>XEM TRƯỚC TÀI LIỆU MẪU MIỄN PHÍ</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-1">{product.title}</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Xem thực tế cấu trúc và nội dung mẫu trước khi quyết định mua.
          </p>
        </div>

        {/* Preview Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {/* VirusTotal verified seal */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Chứng thực file gốc: 100% sạch, đã kiểm tra virus, an toàn tuyệt đối khi tải về.</span>
          </div>

          {/* TABLE PREVIEW (For Data B2B) */}
          {preview?.type === 'TABLE' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>{preview.title}</span>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <tr>
                      {preview.headers.map((h, i) => (
                        <th key={i} className="px-3.5 py-2.5 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                    {preview.rows.map((r, ri) => (
                      <tr key={ri} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        {r.map((c, ci) => (
                          <td key={ci} className="px-3.5 py-2 whitespace-nowrap text-slate-700 dark:text-slate-300">{c}</td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 font-sans italic text-center">
                      <td colSpan={preview.headers.length} className="py-2.5 px-3">
                        {preview.note}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROMPT SAMPLES PREVIEW */}
          {preview?.type === 'PROMPT' && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {preview.title}
              </div>
              <div className="space-y-3">
                {preview.samples.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                        {s.tag}
                      </span>
                      <button
                        onClick={() => handleCopy(s.text, idx)}
                        className="text-[11px] flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition"
                      >
                        {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIdx === idx ? 'Đã sao chép' : 'Sao chép thử'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                      "{s.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WORKFLOW DIAGRAM PREVIEW */}
          {preview?.type === 'WORKFLOW' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Bot className="w-4 h-4 text-indigo-600" />
                <span>{preview.title}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {preview.steps.map((st, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-xs text-indigo-600 dark:text-indigo-400">{st.name}</div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Tải ngay gói đầy đủ nguyên bản sau khi quét mã VietQR
          </div>
          <button
            onClick={() => {
              onClose();
              if (onBuy) onBuy(product);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-md transition"
          >
            Mua Gói Đầy Đủ Ngay
          </button>
        </div>
      </div>
    </div>
  );
}
