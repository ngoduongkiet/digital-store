'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import {
  ArrowLeft, CheckCircle2, ShieldCheck, Zap, Star,
  Download, Eye, RefreshCw, FileText, Lock, FileCode2,
  HelpCircle, MessageCircle, Sparkles, ChevronRight, Clock,
  Award, Shield, PhoneCall
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
      <div className="py-24 text-center text-slate-500 font-sans">
        <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-slate-900 animate-spin mx-auto mb-3"></div>
        <p className="text-xs">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 font-sans">
        <h2 className="font-editorial text-2xl font-bold text-slate-900">Không tìm thấy sản phẩm!</h2>
        <p className="text-xs text-slate-500 mt-2">Sản phẩm này có thể đã được gỡ hoặc đường dẫn không chính xác.</p>
        <Link 
          href="/" 
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-black transition shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại trang chủ</span>
        </Link>
      </div>
    );
  }

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-8 font-sans">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition flex items-center gap-1.5 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Tất Cả Sản Phẩm</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-500 uppercase tracking-wider text-[11px] font-semibold">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.title}</span>
        </div>

        {/* Main Balanced 2-Column Luxury Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-6 sm:p-10 rounded-[2rem] border border-slate-200/80 shadow-sm items-start">
          
          {/* Left Column (5 Cols): Product Image & Trust box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-72 sm:h-84 object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-md">
                  {product.badge}
                </span>
              )}
              {product.fileFormat && (
                <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-slate-800 backdrop-blur-md flex items-center gap-1.5 border border-slate-200 shadow-sm">
                  <FileCode2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>{product.fileFormat}</span>
                </span>
              )}
            </div>

            {/* Quick Preview Button */}
            {product.preview && (
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="w-full py-3 px-4 rounded-full border border-slate-300 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Eye className="w-4 h-4 text-slate-700" />
                <span>Xem Thử Cấu Trúc File & Dữ Liệu Mẫu (Miễn Phí)</span>
              </button>
            )}

            {/* Trust Guarantees Box */}
            <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-slate-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cam Kết Chất Lượng Chuẩn Từ Kiệt (Đà Nẵng)</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 pl-4 list-disc leading-relaxed">
                <li>100% file gốc sạch mã độc, kiểm định <strong>0/72 VirusTotal</strong>.</li>
                <li>Hỗ trợ kỹ thuật trực tiếp 1-1 qua <strong>UltraViewer & Zalo</strong>.</li>
                <li>Khớp lệnh Napas tự động <strong>3 giây</strong>, nhả link Google Drive gốc.</li>
                <li>Hoàn tiền 100% ngay lập tức nếu file lỗi không khắc phục được.</li>
              </ul>
            </div>
          </div>

          {/* Right Column (7 Cols): Info, Tabs & Purchase CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
            <div>
              {/* Status Badge */}
              <div className="flex items-center gap-2 text-xs mb-3">
                <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{product.salesCount || 120}+ Lượt tải thành công</span>
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500 text-[11px]">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-slate-800">5.0 / 5.0</span>
                </span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                {product.title}
              </h1>

              {/* Price section */}
              <div className="mt-4 flex items-baseline gap-3 p-4 rounded-2xl bg-[#f8f9fa] border border-slate-200/80">
                <span className="text-3xl font-extrabold text-slate-900">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200/60 ml-auto">
                  Tiết kiệm {discountPercent}%
                </span>
              </div>

              {/* TAB HEADERS */}
              <div className="flex gap-6 mt-6 border-b border-slate-200">
                <button
                  onClick={() => setActiveTab('DESC')}
                  className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                    activeTab === 'DESC'
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Mô Tả Chi Tiết
                </button>
                <button
                  onClick={() => setActiveTab('SPECS')}
                  className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                    activeTab === 'SPECS'
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Thông Số Kỹ Thuật
                </button>
                <button
                  onClick={() => setActiveTab('POLICY')}
                  className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition ${
                    activeTab === 'POLICY'
                      ? 'border-slate-900 text-slate-900'
                      : 'border-transparent text-slate-400 hover:text-slate-700'
                  }`}
                >
                  Chính Sách & Bảo Hành
                </button>
              </div>

              {/* TAB CONTENTS */}
              <div className="py-5 min-h-[160px]">
                {activeTab === 'DESC' && (
                  <div className="space-y-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                      {product.fullDesc || product.shortDesc}
                    </p>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                        Tính Năng Nổi Bật
                      </h4>
                      <div className="space-y-2">
                        {product.features?.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'SPECS' && (
                  <div className="space-y-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-slate-200/80 flex justify-between">
                      <span className="text-slate-500">Định dạng file:</span>
                      <span className="font-bold text-slate-900">{product.fileFormat || 'Tệp số nguyên bản'}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-slate-200/80 flex justify-between">
                      <span className="text-slate-500">Dung lượng:</span>
                      <span className="font-bold text-slate-900">{product.fileSize || 'Chuẩn nhẹ'}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-slate-200/80 flex justify-between">
                      <span className="text-slate-500">Phiên bản:</span>
                      <span className="font-bold text-slate-900">{product.version || '2026.1'}</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#f8f9fa] border border-slate-200/80 flex justify-between">
                      <span className="text-slate-500">Kiểm tra bảo mật:</span>
                      <span className="font-bold text-emerald-600">{product.testedClean || 'VirusTotal 0/72 Clean'}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'POLICY' && (
                  <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                      <span>Hỗ trợ kỹ thuật UltraViewer 1-1 cài đặt trọn gói trực tiếp cho đến khi vận hành thành công.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                      <span>Hoàn tiền 100% nếu file lỗi kỹ thuật hoặc không đúng như mô tả.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                      <span>Tải lại không giới hạn từ Email cá nhân đã đăng ký bất kỳ lúc nào.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ACTION BUTTONS (Pill Buttons chuẩn Focal Luxury) */}
            <div className="pt-4 border-t border-slate-200/80 space-y-3">
              <button
                type="button"
                onClick={() => setShowCheckout(true)}
                className="w-full py-4 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Thanh Toán & Nhận File Ngay ({formatPrice(product.price)})</span>
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>VietQR Napas 24/7 Giao File 3s</span>
                </span>
                <a
                  href={`https://zalo.me/0352279413?text=${encodeURIComponent(`Chào bạn Kiệt, mình muốn tư vấn thêm về ${product.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 font-bold flex items-center gap-1 transition"
                >
                  <PhoneCall className="w-3 h-3 text-slate-700" />
                  <span>Chat Zalo Hỏi Kiệt</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* CHECKOUT & PREVIEW MODALS */}
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
