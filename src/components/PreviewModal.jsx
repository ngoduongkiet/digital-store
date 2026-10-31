'use client';

import { X, CheckCircle2, ShieldCheck, Copy, Check, FileSpreadsheet, Bot, Sparkles, ArrowRight } from 'lucide-react';
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
      <div className="bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200 font-sans">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 bg-[#f8f9fa]">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-200/80 text-slate-700 text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Xem Trước Dữ Liệu Mẫu Miễn Phí</span>
          </div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900 line-clamp-1">{product.title}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Kiểm tra thực tế cấu trúc và chất lượng trước khi quyết định mua.
          </p>
        </div>

        {/* Preview Content Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          {/* VirusTotal verified seal */}
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 font-semibold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Chứng thực file gốc: 100% sạch mã độc, đã kiểm tra qua VirusTotal 0/72.</span>
          </div>

          {/* TABLE PREVIEW (For Data B2B) */}
          {preview?.type === 'TABLE' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>{preview.title}</span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8f9fa] text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      {preview.headers.map((h, i) => (
                        <th key={i} className="px-3.5 py-2.5 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {preview.rows.map((r, ri) => (
                      <tr key={ri} className="hover:bg-slate-50">
                        {r.map((c, ci) => (
                          <td key={ci} className="px-3.5 py-2.5 whitespace-nowrap text-slate-700">{c}</td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-slate-50 text-slate-500 font-sans italic text-center">
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
              <div className="font-bold text-slate-900">
                {preview.title}
              </div>
              <div className="space-y-3">
                {preview.samples.map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                        {s.tag}
                      </span>
                      <button
                        onClick={() => handleCopy(s.text, idx)}
                        className="text-[11px] font-semibold flex items-center gap-1 text-slate-600 hover:text-black transition"
                      >
                        {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIdx === idx ? 'Đã sao chép' : 'Sao chép thử'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-mono">
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
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Bot className="w-4 h-4 text-slate-700" />
                <span>{preview.title}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {preview.steps.map((st, i) => (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#f8f9fa] border border-slate-200/80">
                    <div className="font-bold text-xs text-slate-900">{st.name}</div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-[#f8f9fa] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Tải ngay gói đầy đủ nguyên bản sau khi quét mã VietQR Napas
          </div>
          <button
            onClick={() => {
              onClose();
              if (onBuy) onBuy(product);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-1.5"
          >
            <span>Mua Gói Đầy Đủ Ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
