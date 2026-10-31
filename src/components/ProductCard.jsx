'use client';

import Link from 'next/link';
import {
  ShieldCheck, ArrowRight, CheckCircle2, Eye, FileCode2,
  Sparkles, Zap, Layers
} from 'lucide-react';

export default function ProductCard({ product, onBuy, onPreview }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="glass-card rounded-3xl hover:border-indigo-500/60 dark:hover:border-indigo-400/60 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* 1. Image Banner - Fixed 210px height across all cards */}
      <Link
        href={`/product/${product.id}`}
        className="relative h-52 overflow-hidden bg-slate-900 block shrink-0"
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent opacity-85 group-hover:opacity-75 transition-opacity"></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 whitespace-nowrap">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-sm whitespace-nowrap">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* File Format / Specs Tag */}
        <span className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-950/85 text-white backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-sm whitespace-nowrap">
          <FileCode2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>{product.fileSize || product.category}</span>
        </span>
      </Link>

      {/* 2. Content Body - Fixed heights on every row to guarantee absolute symmetry */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Highlight Value Pill - Fixed 28px height, never wraps */}
          <div className="h-7 mb-2.5 flex items-center overflow-hidden">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-800/50 truncate max-w-full">
              {product.highlightPill || '⚡ Bản quyền chính thức • Sạch virus'}
            </span>
          </div>

          {/* Product Title - Exactly 2 lines height (50px), clean line-clamp */}
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg leading-snug line-clamp-2 h-[50px] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              {product.title}
            </h3>
          </Link>

          {/* Short Description - Exactly 2 lines height (36px), clean line-clamp */}
          <p className="text-slate-600 dark:text-slate-300 text-xs mt-2 line-clamp-2 leading-relaxed h-[36px]">
            {product.shortDesc}
          </p>

          {/* Platform Tags - Fixed 28px height, single line with no-wrap overflow-hidden to prevent pushing layout */}
          <div className="mt-3 h-7 flex items-center gap-1.5 overflow-hidden flex-nowrap">
            {product.tags?.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 whitespace-nowrap shrink-0"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Feature Highlights - Exactly 54px height across all cards */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 h-[54px] overflow-hidden">
            {product.features?.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Price & Action Footer - Anchored precisely at the bottom */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="shrink-0">
            <div className="text-[11px] text-slate-400 line-through leading-none">
              {formatPrice(product.originalPrice)}
            </div>
            <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight mt-1 leading-none">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {product.preview && (
              <button
                type="button"
                onClick={() => onPreview && onPreview(product)}
                className="h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap"
                title="Xem thử tài liệu mẫu trước khi mua"
              >
                <Eye className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="hidden sm:inline">Xem thử</span>
              </button>
            )}

            <button
              onClick={() => onBuy(product)}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-indigo-500/25 dark:shadow-none transition transform active:scale-95 whitespace-nowrap shimmer-btn"
            >
              <span>Mua ngay</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
