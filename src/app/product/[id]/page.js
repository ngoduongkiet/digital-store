'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import {
  ChevronRight, Star, ShieldCheck, CheckCircle2, Zap,
  Download, Eye, MessageCircle, Terminal, Cpu, Layers,
  ArrowLeft, ArrowUpRight, Check
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMediaView, setActiveMediaView] = useState(0); // 0: Live Feed, 1: Clean Code, 2: Analytics, 3: VirusTotal
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

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

    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setAllProducts(data.products);
        }
      })
      .catch((err) => console.error(err));
  }, [params?.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-500">
        <div className="w-10 h-10 rounded-full border-2 border-slate-300 border-t-slate-900 animate-spin mx-auto mb-4"></div>
        <p className="text-xs font-semibold">Đang tải kiến trúc vũ khí số...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center max-w-md mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900">Không tìm thấy vũ khí số!</h2>
        <p className="text-xs text-slate-500 mt-2">
          Vũ khí số này có thể đã được cập nhật đường dẫn mới hoặc tạm đóng đăng ký.
        </p>
        <Link
          href="/tools"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-black transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Khám phá kho vũ khí khác</span>
        </Link>
      </div>
    );
  }

  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const mediaViews = [
    {
      title: 'Giao diện Telegram Bot Real-time',
      subtitle: 'Tự động cấu trúc caption AI GPT-4o, gắn shortlink & hình ảnh deal 50%',
      tag: 'Live Feed',
      image: product.imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80'
    },
    {
      title: 'Cấu trúc Code Tinh Gọn (Clean Architecture)',
      subtitle: 'Khởi chạy đa luồng Asyncio, không giật lag, memory footprint < 150MB RAM',
      tag: 'Source Code',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80'
    },
    {
      title: 'Thống Kê Hiệu Suất Vận Hành Thực Tế',
      subtitle: 'Tự động chạy ngầm 24/7 trên VPS / Cloud, tỷ lệ chuyển đổi đơn cao',
      tag: 'Analytics',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80'
    },
    {
      title: 'Chứng Nhận Bảo Mật VirusTotal (0/72 Clean)',
      subtitle: 'Bàn giao file source code mở (.py / .js / .json), nói không với mã độc',
      tag: 'VirusTotal Clean',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="w-full pt-4 pb-20 bg-[#f8f9fa] min-h-screen">
      {/* BREADCRUMB & METADATA BAR */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">Trang Chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/tools" className="hover:text-slate-900 transition-colors">Bộ Sưu Tập Tool</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[220px] sm:max-w-none">{product.title}</span>
          </nav>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              BẢN QUYỀN VĨNH VIỄN
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-600 text-xs font-semibold border border-slate-200 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              0/72 Clean
            </span>
          </div>
        </div>
      </section>

      {/* 2-COLUMN LUXESTATE STAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE MEDIA STAGE */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            <div className="relative rounded-3xl overflow-hidden bg-white shadow-md border border-slate-200">
              {/* Top Tags */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-sm border border-slate-200/60">
                  {product.badge || 'TOOL MMO THỰC CHIẾN'}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <Eye className="w-3.5 h-3.5" />
                  <span>46 người đang xem</span>
                </span>
              </div>

              {/* Main Media Display Viewport */}
              <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden">
                <img
                  src={mediaViews[activeMediaView].image}
                  alt={mediaViews[activeMediaView].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-6 text-white">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="text-base sm:text-lg font-bold drop-shadow-sm">
                        {mediaViews[activeMediaView].title}
                      </p>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {mediaViews[activeMediaView].subtitle}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold shrink-0 ml-3">
                      {mediaViews[activeMediaView].tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Interactive Media Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {mediaViews.map((view, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaView(idx)}
                  className={`p-3.5 rounded-2xl text-left transition-all border shadow-2xs ${
                    activeMediaView === idx
                      ? 'bg-white border-slate-900 ring-2 ring-slate-900 shadow-md'
                      : 'bg-white border-slate-200 opacity-75 hover:opacity-100 hover:bg-slate-50'
                  }`}
                >
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    VIEW 0{idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 block truncate mt-0.5">
                    {view.tag}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">
                    Bản Quyền 2026
                  </span>
                </button>
              ))}
            </div>

            {/* Technical Telemetry Mini Widget */}
            <div className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">TẦN SUẤT QUÉT</p>
                  <p className="text-sm font-black text-slate-900">1.2 Giây / Lần</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">TIÊU HAO BỘ NHỚ</p>
                  <p className="text-sm font-black text-slate-900">&lt; 150 MB RAM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">AI ENGINE</p>
                  <p className="text-sm font-black text-slate-900">GPT-4o Mini</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRICING & ORDER ACTION */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col gap-6">
              
              {/* Badge row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3.5 py-1 rounded-full bg-slate-900 text-white text-xs font-bold tracking-wide">
                  🔥 BESTSELLER #1 • BẢN QUYỀN VĨNH VIỄN
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                  {product.version || 'v2026 Live'}
                </span>
              </div>

              {/* Title & Short description */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {product.shortDesc}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">5.0 (150+ đơn hàng đã giao)</span>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="block text-[11px] text-slate-400 font-medium">Giá ưu đãi bản quyền</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs line-through text-slate-400">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black">
                  Tiết kiệm {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-2.5">
                <p className="text-xs uppercase text-slate-400 font-bold tracking-wider">
                  Đặc Quyền Kèm Theo Khi Mua:
                </p>
                {(product.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-4 px-6 rounded-full bg-slate-900 text-white text-xs uppercase tracking-wider font-extrabold shadow-md hover:bg-black hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-amber-400 fill-current" />
                  <span>Mua Ngay Bản Quyền (Giao File 3s)</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="py-2.5 px-4 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Xem Thử Bản Mẫu</span>
                  </button>

                  <a
                    href="https://zalo.me/0352279413"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>UltraViewer 1-1</span>
                  </a>
                </div>
              </div>

              {/* Trust footer info */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Quét VietQR nhận file 3s
                </span>
                <span>Hoàn tiền 100% nếu lỗi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SPECIFICATIONS & ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xs border border-slate-200/80 space-y-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              Kiến Trúc &amp; Đặc Tả Kỹ Thuật
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Thông Tin Bàn Giao Chi Tiết
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Định Dạng Tệp Tin</span>
              <p className="font-bold text-sm text-slate-900">{product.fileFormat || 'Mã Nguồn Mở'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Dung Lượng Gói Cài</span>
              <p className="font-bold text-sm text-slate-900">{product.fileSize || '3.4 MB'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Phiên Bản Kiểm Thử</span>
              <p className="font-bold text-sm text-emerald-600">{product.version || 'v2026 Live'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
              <span className="text-xs text-slate-400 font-medium">Xác Thực Mã Độc</span>
              <p className="font-bold text-sm text-emerald-600">{product.testedClean || 'VirusTotal 0/72 Clean'}</p>
            </div>
          </div>

          {product.fullDesc && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Mô Tả Chuyên Sâu Từ Tác Giả</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {product.fullDesc}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h3 className="text-xl font-extrabold text-slate-900">Vũ Khí Số Cùng Hệ Sinh Thái</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-3xl p-6 shadow-2xs hover:shadow-xl hover:-translate-y-1 border border-slate-200/80 flex flex-col justify-between group transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-900 shadow-sm border border-slate-200/60">
                      {rel.badge}
                    </span>
                  </div>
                  <div>
                    <Link
                      href={`/product/${rel.id}`}
                      className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors block line-clamp-1"
                    >
                      {rel.title}
                    </Link>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {rel.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 flex items-center justify-between border-t border-slate-100">
                  <span className="text-base font-black text-slate-900">
                    {formatPrice(rel.price)}
                  </span>
                  <Link
                    href={`/product/${rel.id}`}
                    className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-black transition-all"
                  >
                    Xem Chi Tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modals */}
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
          onBuyNow={() => {
            setShowPreview(false);
            setShowCheckout(true);
          }}
        />
      )}
    </div>
  );
}
