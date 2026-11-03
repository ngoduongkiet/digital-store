'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';

export default function ToolsCatalogPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('bestseller');
  const [activeProduct, setActiveProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const categories = [
    { id: 'ALL', name: 'Tất Cả (12)' },
    { id: 'Tool & Bot MMO', name: 'Tool & Bot MMO (6)' },
    { id: 'Data Khách Hàng B2B', name: 'Data B2B F&B / Spa (3)' },
    { id: 'Prompt AI & Kịch Bản', name: 'AI GPT-4o & Prompt (2)' },
    { id: 'Kịch Bản Tự Động', name: 'Kịch Bản Make / n8n (1)' }
  ];

  const filteredProducts = products
    .filter((prod) => {
      const matchCategory = selectedCategory === 'ALL' || prod.category === selectedCategory;
      const matchSearch =
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.id > a.id ? 1 : -1);
      return (b.salesCount || 0) - (a.salesCount || 0);
    });

  return (
    <div className="w-full pt-6 pb-20 bg-surface min-h-screen">
      {/* Top Ambient Glow & Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 pt-4 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3">
          <nav className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Trang Chủ</span>
            </Link>
            <span className="text-outline-variant font-normal">/</span>
            <span className="text-primary font-semibold tracking-tight">Kho Vũ Khí Số &amp; Bộ Sưu Tập Tool (/tools)</span>
          </nav>

          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface font-semibold">
              KHO TỰ ĐỘNG HÓA VẬN HÀNH 24/7 • BẢN QUYỀN VĨNH VIỄN • GIAO LINK 3S
            </span>
          </div>
        </div>
      </div>

      {/* Hero Catalog Editorial Intro */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-6">
        <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-12 shadow-sm border border-surface-container relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">
                <span className="material-symbols-outlined text-[15px] text-primary">data_object</span>
                <span>MMO Automation Suite &amp; Data Asset 2026</span>
              </div>
              <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
                Kho Vũ Khí Số &amp; Kịch Bản MMO Thực Chiến
              </h1>
              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-3xl leading-relaxed">
                Toàn bộ bot tự động, mã nguồn API và tệp dữ liệu khách hàng được <strong className="text-on-surface font-semibold">Ngô Dương Kiệt</strong> tối ưu hóa tinh gọn. Kiểm định VirusTotal 0/72 Clean, bàn giao Google Drive tức thì qua VietQR Napas 24/7 và cam kết bảo hành hoàn tiền 100%.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="p-5 rounded-2xl bg-surface-container space-y-3">
                <div className="flex items-center justify-between text-on-surface font-label-sm text-xs">
                  <span className="text-on-surface-variant">Tình Trạng Kho</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> Trực Tuyến 100%
                  </span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[96%] rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Độ trễ API: <strong>0.24s</strong></span>
                  <span>Bảo mật: <strong>SHA-256 Verified</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Bar Metrics Cluster */}
          <div className="mt-10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface-container-low rounded-2xl p-6 border border-surface-container">
            <div className="flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">Kho Công Cụ</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-price-hero text-2xl font-extrabold text-on-surface">12+</span>
                <span className="font-label-sm text-xs text-on-surface-variant font-medium">Tool Thực Chiến</span>
              </div>
              <span className="text-[12px] text-emerald-600 font-medium mt-0.5 flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">sync</span> Update v2026
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">Khách Hàng</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-price-hero text-2xl font-extrabold text-on-surface">1.450+</span>
                <span className="font-label-sm text-xs text-on-surface-variant font-medium">Đơn Hoàn Tất</span>
              </div>
              <span className="text-[12px] text-on-surface-variant font-medium mt-0.5">99.8% Hài lòng 5 sao</span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">Kiểm Định Mã</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-price-hero text-2xl font-extrabold text-on-surface">100%</span>
                <span className="font-label-sm text-xs text-on-surface-variant font-medium">Mã Sạch</span>
              </div>
              <span className="text-[12px] text-emerald-600 font-medium mt-0.5 flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">verified_user</span> VirusTotal 0/72
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">Khớp Lệnh QR</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-price-hero text-2xl font-extrabold text-on-surface">3.2s</span>
                <span className="font-label-sm text-xs text-on-surface-variant font-medium">Napas 24/7</span>
              </div>
              <span className="text-[12px] text-on-surface-variant font-medium mt-0.5">Auto Giao Link Drive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Smart Search Hub */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-4">
        <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 shadow-sm border border-surface-container space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[22px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên tool, từ khóa (shopee, telegram, zalo, crawl, data, prompt, webhook)..."
                className="w-full h-12 pl-12 pr-4 rounded-full bg-surface-container text-on-surface font-body-md text-xs placeholder:text-on-surface-variant/60 focus:bg-surface-container-low border border-surface-container focus:outline-none transition-all"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-label-md text-xs text-on-surface-variant whitespace-nowrap">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 px-4 rounded-full bg-surface-container text-on-surface font-label-md text-xs font-semibold appearance-none cursor-pointer focus:outline-none border border-surface-container transition-all"
              >
                <option value="bestseller">Bán chạy nhất (Best Seller)</option>
                <option value="newest">Mới nhất (v2026 Engine)</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
              </select>
            </div>
          </div>

          {/* Platform Categories */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                Phân Loại Danh Mục
              </span>
              <span className="text-xs text-on-surface-variant">Hiển thị {filteredProducts.length} sản phẩm</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-label-md text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high border border-surface-container'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="max-w-7xl mx-auto w-full px-6 lg:px-12 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md border border-surface-container flex flex-col justify-between group transition-all"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface-container">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-xs font-bold text-on-surface">
                    {prod.badge}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-xs font-semibold">
                    {prod.version}
                  </span>
                </div>

                <div>
                  <Link
                    href={`/product/${prod.id}`}
                    className="font-headline-sm text-base font-bold text-on-surface hover:text-primary transition-colors block line-clamp-1"
                  >
                    {prod.title}
                  </Link>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-1.5 line-clamp-2">
                    {prod.shortDesc}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 font-body-sm text-xs text-secondary">
                  <span className="material-symbols-outlined text-[16px]">speed</span>
                  <span>1.2s / vòng quét</span>
                  <span className="mx-1">•</span>
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                  <span>0/72 Clean</span>
                </div>
              </div>

              <div className="pt-5 mt-4 flex items-center justify-between border-t border-surface-container">
                <div>
                  <span className="block font-label-sm text-[11px] text-on-surface-variant">Giá trọn đời</span>
                  <span className="font-price-card text-lg font-extrabold text-on-surface">
                    {formatPrice(prod.price)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewProduct(prod)}
                    className="px-3.5 py-2 rounded-full bg-surface-container text-on-surface font-label-md text-xs hover:bg-surface-container-high transition-all"
                  >
                    Xem Thử
                  </button>
                  <button
                    onClick={() => setActiveProduct(prod)}
                    className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-xs font-semibold hover:bg-primary-container transition-all"
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      {activeProduct && (
        <CheckoutModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}

      {previewProduct && (
        <PreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          onBuyNow={(prod) => {
            setPreviewProduct(null);
            setActiveProduct(prod);
          }}
        />
      )}
    </div>
  );
}
