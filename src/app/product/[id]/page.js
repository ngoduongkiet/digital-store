'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CheckoutModal from '@/components/CheckoutModal';
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap, Star, ShoppingBag, Download } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params?.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return <div className="py-24 text-center text-slate-400">Đang tải thông tin sản phẩm...</div>;
  }

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800">Không tìm thấy sản phẩm!</h2>
        <Link href="/" className="mt-4 inline-block text-indigo-600 text-sm font-semibold hover:underline">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại danh sách sản phẩm</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        {/* Left: Product Image & Badges */}
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 shadow-inner">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-80 object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Cam kết chất lượng & hỗ trợ
            </div>
            <ul className="text-xs text-indigo-800/80 space-y-1.5 pl-5 list-disc">
              <li>100% file sạch, bảo mật, hoạt động ổn định.</li>
              <li>Hỗ trợ đổi mới hoặc sửa lỗi kịch bản nếu có thay đổi thuật toán.</li>
              <li>Tải về không giới hạn số lần từ email cá nhân.</li>
            </ul>
          </div>
        </div>

        {/* Right: Info & Purchase CTA */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold mb-2">
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.salesCount} người đã mua và đánh giá 5 sao)</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-indigo-600">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100">
              Tiết kiệm {discountPercent}%
            </span>
          </div>

          {/* Description */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mô tả chi tiết</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {product.fullDesc || product.shortDesc}
            </p>
          </div>

          {/* What you get */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Bạn sẽ nhận được gì?</h3>
            <div className="space-y-2">
              {product.features?.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-base shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 transition transform active:scale-[0.99]"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>Mua Ngay ({formatPrice(product.price)}) - Nhả Hàng Tức Thì</span>
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Thanh toán an toàn qua mã QR Ngân Hàng Việt Nam (VietQR)
            </p>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal
          product={product}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
