'use client';

import Link from 'next/link';
import { Star, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ProductCard({ product, onBuy }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Image Banner */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-indigo-600 text-white shadow-md">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-black/60 text-white backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Rating / Status */}
        <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
          <span>{product.rating}</span>
          <span className="text-slate-400 font-normal">
            {product.salesCount > 0 ? `(${product.salesCount} đã mua)` : '(Bản chuẩn mới nhất)'}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-indigo-600 transition">
          {product.title}
        </h3>

        <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
          {product.shortDesc}
        </p>

        {/* Feature bullets */}
        <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100 flex-1">
          {product.features?.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>

        {/* Price & Action */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </div>
            <div className="text-lg font-black text-indigo-600">
              {formatPrice(product.price)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/product/${product.id}`}
              className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            >
              Chi tiết
            </Link>
            <button
              onClick={() => onBuy(product)}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-sm shadow-indigo-200 transition"
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
