'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import {
  ArrowLeft, CheckCircle2, ShieldCheck, Zap, Star,
  Download, Eye, RefreshCw, FileText, Lock, FileCode2,
  HelpCircle, MessageCircle, Sparkles, ChevronRight
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('DESC'); // 'DESC' | 'SPECS' | 'POLICY'

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
    return (
      <div className="py-24 text-center text-slate-400 dark:text-slate-500">
        Đang tải thông tin sản phẩm...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Không tìm thấy sản phẩm!</h2>
        <Link href="/" className="mt-4 inline-block text-indigo-600 text-sm font-semibold hover:underline">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-28">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-6">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Trang chủ</span>
        </Link>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-600 dark:text-slate-300">{product.category}</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-900 dark:text-white font-bold truncate max-w-xs">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
        {/* Left Column: Product Image & Trust box */}
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-inner">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-80 object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-600 text-white shadow-lg">
                {product.badge}
              </span>
            )}
            {product.fileFormat && (
              <span className="absolute bottom-4 left-4 px-3 py-1 rounded-lg text-xs font-bold bg-black/75 text-white backdrop-blur-md flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>{product.fileFormat}</span>
              </span>
            )}
          </div>

          {/* Quick Preview Button */}
          {product.preview && (
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="mt-4 w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <Eye className="w-4 h-4 text-indigo-600" />
              <span>Xem Thử Dữ Liệu / Cấu Trúc Mẫu (Miễn phí)</span>
            </button>
          )}

          {/* Trust Guarantees Box */}
          <div className="mt-6 p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-950 dark:text-indigo-300">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Cam Kết Chất Lượng Từ Kiệt Digital Store</span>
            </div>
            <ul className="text-xs text-indigo-900/80 dark:text-indigo-200/80 space-y-2 pl-4 list-disc">
              <li>100% file gốc sạch, không virus, đã kiểm duyệt an toàn tuyệt đối.</li>
              <li>Hỗ trợ kỹ thuật 1-1 qua Zalo Ultraviewer đến khi vận hành thành công.</li>
              <li>Tải lại không giới hạn từ Email cá nhân trọn đời.</li>
              <li>Cam kết hoàn tiền 100% nếu file lỗi kỹ thuật không khắc phục được.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Info, Tabs & Purchase CTA */}
        <div className="flex flex-col">
          {/* Real Status Badge */}
          <div className="flex items-center gap-2 text-xs mb-3">
            {product.salesCount > 0 ? (
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/40">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{product.salesCount} đơn đã giao thành công</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-800/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bản phát hành chính thức 2026</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
            {product.title}
          </h1>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/60">
              Tiết kiệm {discountPercent}%
            </span>
          </div>

          {/* TAB HEADERS */}
          <div className="flex gap-4 mt-6 border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('DESC')}
              className={`pb-2.5 text-xs font-bold border-b-2 transition ${
                activeTab === 'DESC'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Mô tả chi tiết
            </button>
            <button
              onClick={() => setActiveTab('SPECS')}
              className={`pb-2.5 text-xs font-bold border-b-2 transition ${
                activeTab === 'SPECS'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Thông số kỹ thuật
            </button>
            <button
              onClick={() => setActiveTab('POLICY')}
              className={`pb-2.5 text-xs font-bold border-b-2 transition ${
                activeTab === 'POLICY'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              Chính sách & Bảo hành
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="py-4 flex-1">
            {activeTab === 'DESC' && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {product.fullDesc || product.shortDesc}
                </p>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5">
                    Tính năng nổi bật
                  </h4>
                  <div className="space-y-2">
                    {product.features?.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'SPECS' && (
              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Định dạng file:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{product.fileFormat || 'Tệp số nguyên bản'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Kích thước file:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{product.fileSize || 'Chuẩn nhẹ'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Phiên bản:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{product.version || '2026.1'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Kiểm tra bảo mật:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{product.testedClean || 'Sạch 100%'}</span>
                </div>
              </div>
            )}

            {activeTab === 'POLICY' && (
              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Hỗ trợ kỹ thuật 1-1 qua Zalo hoặc UltraViewer nếu bạn gặp khó khăn khi cài đặt.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Hoàn tiền 100% nếu file lỗi cấu trúc hoặc không đúng như mô tả.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Được quyền cập nhật các bản vá lỗi và phiên bản mới miễn phí trọn đời.</span>
                </div>
              </div>
            )}
          </div>

          {/* Action CTA Desktop */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-base shadow-xl shadow-indigo-500/25 dark:shadow-none flex items-center justify-center gap-2 transition transform active:scale-98"
            >
              <Zap className="w-5 h-5 fill-white" />
              <span>Mua Ngay ({formatPrice(product.price)}) - Tải Về Tức Thì</span>
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Quét mã VietQR Techcombank chuyển khoản 24/7 • Nhận file sau 3 giây
            </p>
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM BAR FOR MOBILE */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 border-t border-slate-200 dark:border-slate-800 shadow-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 block line-through">{formatPrice(product.originalPrice)}</span>
          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 leading-none">{formatPrice(product.price)}</span>
        </div>
        <button
          onClick={() => setShowCheckout(true)}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-extrabold text-xs shadow-md shadow-indigo-500/30"
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

      {showPreview && (
        <PreviewModal
          product={product}
          onClose={() => setShowPreview(false)}
          onBuy={(prod) => {
            setShowPreview(false);
            setShowCheckout(true);
          }}
        />
      )}
    </div>
  );
}
