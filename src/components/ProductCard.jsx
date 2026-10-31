'use client';

import Link from 'next/link';
import { CheckCircle2, Eye, Zap, FileCode2 } from 'lucide-react';

export default function ProductCard({ product, onBuy, onPreview }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 hover:border-slate-400/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group p-4 sm:p-5">
      {/* 1. Image Container with Bento Rounded Corners */}
      <div className="relative h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-sm">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Specs Tag */}
        <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-slate-800 backdrop-blur-md border border-slate-200/60 shadow-sm flex items-center gap-1">
          <FileCode2 className="w-3 h-3 text-slate-600" />
          <span>{product.fileSize || product.category}</span>
        </span>
      </div>

      {/* 2. Content Info */}
      <div className="pt-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Highlight */}
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            {product.category === 'AUTOMATION' ? 'Tool Tự Động' : product.category === 'PROMPT' ? 'Kịch Bản AI' : 'Dữ Liệu B2B'}
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 h-[44px] group-hover:text-purple-600 transition">
              {product.title}
            </h3>
          </Link>

          {/* Short Desc */}
          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 leading-relaxed h-[36px]">
            {product.shortDesc}
          </p>

          {/* Key Feature Bullets */}
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 h-[48px] overflow-hidden">
            {product.features?.slice(0, 2).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Pricing & Actions */}
        <div className="pt-4 mt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <span className="text-xs text-slate-400">Giá sở hữu:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-extrabold text-slate-900 font-sans">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              VietQR 3s
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onPreview && onPreview(product)}
              className="py-2.5 px-3 rounded-full border border-slate-200 hover:border-slate-800 text-slate-700 hover:text-slate-900 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Xem Thử</span>
            </button>

            <button
              type="button"
              onClick={() => onBuy && onBuy(product)}
              className="py-2.5 px-3 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Tải Ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
