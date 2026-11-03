'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';

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
      <div className="py-32 text-center text-on-surface-variant">
        <div className="w-10 h-10 rounded-full border-2 border-surface-container border-t-primary animate-spin mx-auto mb-4"></div>
        <p className="text-sm font-semibold">Đang tải kiến trúc vũ khí số...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-32 text-center max-w-md mx-auto px-6">
        <h2 className="text-2xl font-bold text-on-surface">Không tìm thấy vũ khí số!</h2>
        <p className="text-xs text-on-surface-variant mt-2">
          Vũ khí số này có thể đã được cập nhật đường dẫn mới hoặc tạm đóng đăng ký.
        </p>
        <Link
          href="/tools"
          className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all"
        >
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
    <div className="w-full pt-4 pb-20 bg-background min-h-screen">
      {/* BREADCRUMB & METADATA BAR */}
      <section className="w-full max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body-sm text-xs text-on-surface-variant">
            <Link href="/" className="hover:text-on-surface transition-colors">Trang Chủ</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link href="/tools" className="hover:text-on-surface transition-colors">Bộ Sưu Tập Tool</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface-variant">{product.category}</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold truncate max-w-[220px] sm:max-w-none">{product.title}</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              BẢN QUYỀN VĨNH VIỄN
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              0/72 Clean
            </span>
          </div>
        </div>
      </section>

      {/* 2-COLUMN LUXESTATE ARCHITECTURAL STAGE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE MEDIA STAGE */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-surface-container-lowest shadow-md border border-surface-container">
              {/* Top Tags */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-xs font-semibold shadow-sm">
                  {product.badge || 'TOOL MMO THỰC CHIẾN'}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-xs flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>46 người đang xem</span>
                </span>
              </div>

              {/* Main Media Display Viewport */}
              <div className="relative w-full aspect-[16/10] bg-surface-container overflow-hidden">
                <img
                  src={mediaViews[activeMediaView].image}
                  alt={mediaViews[activeMediaView].title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6 text-white">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="font-headline-sm text-base sm:text-lg font-bold drop-shadow-sm">
                        {mediaViews[activeMediaView].title}
                      </p>
                      <p className="font-body-sm text-xs text-white/80 mt-0.5">
                        {mediaViews[activeMediaView].subtitle}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md font-label-sm text-xs shrink-0 ml-3">
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
                  className={`p-3 rounded-2xl text-left transition-all border shadow-sm ${
                    activeMediaView === idx
                      ? 'bg-surface-container-lowest border-primary shadow-md'
                      : 'bg-surface-container-lowest border-surface-container opacity-70 hover:opacity-100 hover:bg-surface-container-low'
                  }`}
                >
                  <span className="block font-label-sm text-[10px] text-on-surface-variant font-bold uppercase">
                    VIEW 0{idx + 1}
                  </span>
                  <span className="font-headline-sm text-xs sm:text-sm font-bold text-on-surface block truncate mt-0.5">
                    {view.tag}
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant block truncate">
                    Bản Quyền 2026
                  </span>
                </button>
              ))}
            </div>

            {/* Technical Telemetry Mini Widget */}
            <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">speed</span>
                </div>
                <div>
                  <p className="font-label-sm text-[11px] text-on-surface-variant font-semibold">TẦN SUẤT QUÉT</p>
                  <p className="font-headline-sm text-sm font-bold text-on-surface">1.2 Giây / Lần</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">memory</span>
                </div>
                <div>
                  <p className="font-label-sm text-[11px] text-on-surface-variant font-semibold">TIÊU HAO BỘ NHỚ</p>
                  <p className="font-headline-sm text-sm font-bold text-on-surface">&lt; 150 MB RAM</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                </div>
                <div>
                  <p className="font-label-sm text-[11px] text-on-surface-variant font-semibold">AI ENGINE</p>
                  <p className="font-headline-sm text-sm font-bold text-on-surface">GPT-4o Mini</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: PRICING & ORDER ACTION */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 shadow-sm border border-surface-container flex flex-col gap-6">
              
              {/* Badge row */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-xs font-semibold tracking-wide">
                  🔥 BESTSELLER #1 • BẢN QUYỀN VĨNH VIỄN
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-xs font-semibold">
                  {product.version || 'v2026 Live'}
                </span>
              </div>

              {/* Title & Short description */}
              <div>
                <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight leading-tight">
                  {product.title}
                </h1>
                <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                  {product.shortDesc}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-on-surface">5.0 (150+ đơn hàng đã giao)</span>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <div>
                  <span className="block font-label-sm text-[11px] text-on-surface-variant font-medium">Giá ưu đãi bản quyền</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-price-hero text-2xl sm:text-3xl font-extrabold text-on-surface">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs line-through text-on-surface-variant">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-label-sm text-xs font-bold">
                  Tiết kiệm {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </div>

              {/* Features List */}
              <div className="space-y-2.5">
                <p className="font-label-sm text-xs uppercase text-secondary font-bold tracking-wider">
                  Đặc Quyền Kèm Theo Khi Mua:
                </p>
                {(product.features || []).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3.5 px-6 rounded-full bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold shadow-md hover:bg-primary-container hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                  <span>Mua Ngay Bản Quyền (Giao File 3s)</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="py-2.5 px-4 rounded-full bg-surface-container text-on-surface font-label-md text-xs hover:bg-surface-container-high transition-all flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>Xem Thử Bản Mẫu</span>
                  </button>

                  <a
                    href="https://zalo.me/0352279413"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-full bg-surface-container-low border border-surface-container text-on-surface font-label-md text-xs hover:bg-surface-container transition-all flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>UltraViewer 1-1</span>
                  </a>
                </div>
              </div>

              {/* Trust footer info */}
              <div className="pt-2 border-t border-surface-container flex items-center justify-between text-xs text-secondary font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-emerald-600">verified</span>
                  Quét VietQR nhận file 3s
                </span>
                <span>Hoàn tiền 100% nếu lỗi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED SPECIFICATIONS & ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-12 shadow-sm border border-surface-container space-y-8">
          <div>
            <span className="font-label-md text-xs uppercase tracking-widest text-secondary font-bold">
              Kiến Trúc &amp; Đặc Tả Kỹ Thuật
            </span>
            <h2 className="font-headline-lg text-2xl font-bold text-on-surface tracking-tight mt-1">
              Thông Tin Bàn Giao Chi Tiết
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5">
              <span className="text-xs text-on-surface-variant">Định Dạng Tệp Tin</span>
              <p className="font-bold text-sm text-on-surface">{product.fileFormat || 'Mã Nguồn Mở'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5">
              <span className="text-xs text-on-surface-variant">Dung Lượng Gói Cài</span>
              <p className="font-bold text-sm text-on-surface">{product.fileSize || '3.4 MB'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5">
              <span className="text-xs text-on-surface-variant">Phiên Bản Kiểm Thử</span>
              <p className="font-bold text-sm text-emerald-600">{product.version || 'v2026 Live'}</p>
            </div>
            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5">
              <span className="text-xs text-on-surface-variant">Xác Thực Mã Độc</span>
              <p className="font-bold text-sm text-emerald-600">{product.testedClean || 'VirusTotal 0/72 Clean'}</p>
            </div>
          </div>

          {product.fullDesc && (
            <div className="pt-4 border-t border-surface-container space-y-3">
              <h3 className="font-headline-sm text-base font-bold text-on-surface">Mô Tả Chuyên Sâu Từ Tác Giả</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                {product.fullDesc}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="mb-8">
            <h3 className="font-headline-lg text-xl font-bold text-on-surface">Vũ Khí Số Cùng Hệ Sinh Thái</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md border border-surface-container flex flex-col justify-between group transition-all"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface-container">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-xs font-bold text-on-surface">
                      {rel.badge}
                    </span>
                  </div>
                  <div>
                    <Link
                      href={`/product/${rel.id}`}
                      className="font-headline-sm text-sm font-bold text-on-surface hover:text-primary transition-colors block line-clamp-1"
                    >
                      {rel.title}
                    </Link>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 line-clamp-2">
                      {rel.shortDesc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 flex items-center justify-between border-t border-surface-container">
                  <span className="font-price-card text-base font-extrabold text-on-surface">
                    {formatPrice(rel.price)}
                  </span>
                  <Link
                    href={`/product/${rel.id}`}
                    className="px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-xs font-semibold hover:bg-primary-container transition-all"
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
