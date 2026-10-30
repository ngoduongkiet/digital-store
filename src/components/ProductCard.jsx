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
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Banner */}
      <Link href={`/product/${product.id}`} className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800 block">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-1.5 items-center">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* File Format Tag */}
        <span className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-950/80 text-white backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-sm">
          <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
          <span>{product.fileSize || product.category}</span>
        </span>
      </Link>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Real Status / Trust Tag */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-2.5">
          {product.salesCount > 0 ? (
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200/50 dark:border-emerald-800/40">
              <CheckCircle2 className="w-3 h-3" />
              <span>{product.salesCount} đơn đã giao thành công</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md border border-indigo-200/50 dark:border-indigo-800/40">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bản quyền chính thức • Tải tức thì</span>
            </span>
          )}
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
            {product.title}
          </h3>
        </Link>

        <p className="text-slate-600 dark:text-slate-300 text-xs mt-2.5 line-clamp-2 leading-relaxed">
          {product.shortDesc}
        </p>

        {/* Feature bullets */}
        <div className="mt-4 space-y-2 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex-1">
          {product.features?.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>

        {/* Price & Action */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
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
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                title="Xem thử tài liệu mẫu trước khi mua"
              >
                <Eye className="w-4 h-4 text-indigo-500" />
                <span className="hidden sm:inline">Xem thử</span>
              </button>
            )}

            <button
              onClick={() => onBuy(product)}
              className="flex items-center gap-1.5 text-xs font-extrabold px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-500/25 dark:shadow-none transition transform active:scale-95"
            >
              <span>Mua ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
