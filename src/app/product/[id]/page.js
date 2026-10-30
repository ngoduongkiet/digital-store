'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CheckoutModal from '@/components/CheckoutModal';
import {
  ArrowLeft, CheckCircle2, ShieldCheck, Zap, Star,
  Download, Eye, RefreshCw, FileText, Lock
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeTab, setActiveTab] = useState('DESC'); // 'DESC' | 'PREVIEW' | 'POLICY'

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
    <div className="max-w-5xl mx-auto px-4 py-10 pb-28">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại danh sách sản phẩm</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        {/* Left: Product Image & Trust box */}
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
              Cam kết chất lượng từ Kiệt Digital Store
            </div>
            <ul className="text-xs text-indigo-800/80 space-y-1.5 pl-5 list-disc">
              <li>100% file sạch, bảo mật, hoạt động ổn định.</li>
              <li>Hỗ trợ đổi mới hoặc sửa lỗi kịch bản nếu có thay đổi thuật toán.</li>
              <li>Tải về không giới hạn số lần từ email cá nhân.</li>
              <li>Cam kết hoàn tiền 100% nếu file lỗi không khắc phục được.</li>
            </ul>
          </div>
        </div>

        {/* Right: Info & Purchase CTA */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold mb-2">
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-400 font-normal">({product.salesCount} khách đã mua & đánh giá 5 sao)</span>
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

          {/* TAB HEADERS */}
          <div className="flex gap-4 mt-6 border-b border-slate-100">
            <button
              onClick={() => setActiveTab('DESC')}
              className={`pb-2.5 text-xs font-bold border-b-2 transition ${
                activeTab === 'DESC'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Mô tả chi tiết
            </button>
            <button
              onClick={() => setActiveTab('PREVIEW')}
              className={`pb-2.5 text-xs font-bold border-b-2 transition ${
                activeTab === 'PREVIEW'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Xem trước nội dung
            </button>
            <button
              onClick={() => setActiveTab('POLICY')}
              className={`pb-2.5 text-xs font-bold border-b-2 transition ${
                activeTab === 'POLICY'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Chính sách & Bảo hành
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="py-4 flex-1">
            {activeTab === 'DESC' && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {product.fullDesc || product.shortDesc}
                </p>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Tính năng nổi bật
                  </h4>
                  <div className="space-y-1.5">
                    {product.features?.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'PREVIEW' && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Định dạng file giao hàng: {product.fileName}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Sau khi quét mã VietQR thành công, bạn sẽ nhận được đường dẫn tải trực tiếp file nguyên bản sạch 100%, có thể giải nén hoặc nhập thẳng vào hệ thống mà không cần phần mềm trung gian.
                </p>
                <div className="p-3 bg-white rounded-lg border border-slate-200 text-emerald-700 font-mono text-[11px]">
                  ✓ Đã kiểm tra không chứa mã độc, sạch 100%<br />
                  ✓ Tương thích Windows, MacOS, iPhone, Android
                </div>
              </div>
            )}

            {activeTab === 'POLICY' && (
              <div className="text-xs text-slate-600 space-y-2.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Hỗ trợ kỹ thuật 1-1 qua Zalo hoặc Ultraviewer nếu không biết cài đặt.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Hoàn tiền 100% nếu file lỗi cấu trúc hoặc không đúng như mô tả.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Được quyền cập nhật phiên bản mới miễn phí trọn đời.</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTA Desktop */}
          <div className="pt-4 border-t border-slate-100">
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

      {/* STICKY BOTTOM BAR FOR MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md p-3.5 border-t border-slate-200 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block line-through">{formatPrice(product.originalPrice)}</span>
          <span className="text-lg font-black text-indigo-600 leading-none">{formatPrice(product.price)}</span>
        </div>
        <button
          onClick={() => setShowCheckout(true)}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold text-xs shadow-md shadow-indigo-200"
        >
          Mua Ngay (3s)
        </button>
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
