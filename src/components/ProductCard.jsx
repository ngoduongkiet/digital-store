'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowRight, CheckCircle2, Eye, FileCode2, Sparkles } from 'lucide-react';

export default function ProductCard({ product, onBuy, onPreview }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/70 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* Image Banner */}
      <Link
        href={`/product/${product.id}`}
        className="relative h-52 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800 block shrink-0"
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 items-center">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* File Format / Specs Tag */}
        <span className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-xl text-[11px] font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-sm">
          <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>{product.fileSize || product.category}</span>
        </span>
      </Link>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Real Status / Trust Tag */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold mb-3">
            {product.salesCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{product.salesCount} đơn giao thành công</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-800/50">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Bản quyền 2026 • Sạch virus</span>
              </span>
            )}
          </div>

          {/* Product Title - Balanced uniform height */}
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug line-clamp-2 min-h-[48px] sm:min-h-[52px] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
              {product.title}
            </h3>
          </Link>

          {/* Short Description - Balanced uniform height */}
          <p className="text-slate-600 dark:text-slate-300 text-xs mt-2 line-clamp-2 leading-relaxed min-h-[36px]">
            {product.shortDesc}
          </p>

          {/* Feature Highlights - Balanced uniform height */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 space-y-2 min-h-[58px]">
            {product.features?.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price & Action Footer - Anchored at the bottom across all cards */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </div>
            <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {product.preview && (
              <button
                type="button"
                onClick={() => onPreview && onPreview(product)}
                className="h-10 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5 transition"
                title="Xem thử tài liệu mẫu trước khi mua"
              >
                <Eye className="w-4 h-4 text-indigo-500" />
                <span className="hidden sm:inline">Xem thử</span>
              </button>
            )}

            <button
              onClick={() => onBuy(product)}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-indigo-500/25 dark:shadow-none transition transform active:scale-95"
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
