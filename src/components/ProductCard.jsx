'use client';

import Link from 'next/link';
import {
  ShieldCheck, ArrowRight, CheckCircle2, Eye, FileCode2,
  Sparkles, Zap, Layers, Star
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
      {/* Image Banner with subtle glow */}
      <Link
        href={`/product/${product.id}`}
        className="relative h-52 sm:h-56 overflow-hidden bg-slate-900 block shrink-0"
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity"></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 items-center">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* File Format / Specs Tag */}
        <span className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-xl text-[11px] font-bold bg-slate-950/85 text-white backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-sm">
          <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>{product.fileSize || product.category}</span>
        </span>
      </Link>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Highlight Value Pill */}
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-800/50">
              {product.highlightPill || '⚡ Bản quyền chính thức • Sạch virus'}
            </span>
          </div>

          {/* Product Title - Balanced uniform height */}
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-black text-slate-900 dark:text-white text-base sm:text-lg leading-snug line-clamp-2 min-h-[50px] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              {product.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-slate-600 dark:text-slate-300 text-xs mt-2 line-clamp-2 leading-relaxed min-h-[36px]">
            {product.shortDesc}
          </p>

          {/* Platform Pills (Make.com, n8n, etc.) */}
          {product.tags && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Feature Highlights */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-2 min-h-[56px]">
            {product.features?.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Action Footer - Anchored at the bottom */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </div>
            <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {product.preview && (
              <button
                type="button"
                onClick={() => onPreview && onPreview(product)}
                className="h-10 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5 transition"
                title="Xem thử tài liệu mẫu trước khi mua"
              >
                <Eye className="w-4 h-4 text-indigo-500" />
                <span className="hidden sm:inline">Xem thử</span>
              </button>
            )}

            <button
              onClick={() => onBuy(product)}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-indigo-500/25 dark:shadow-none transition transform active:scale-95"
            >
              <span>Mua ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
