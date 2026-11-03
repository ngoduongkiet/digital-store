'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import {
  Search, Zap, ShieldCheck, CheckCircle2, Activity,
  Sparkles, Terminal, ArrowUpRight, ArrowLeft, Database, Award
} from 'lucide-react';

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
    <div className="w-full pt-4 pb-20 bg-[#f8f9fa] min-h-screen">
      {/* Top Breadcrumb & Status */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
              <span>Trang Chủ</span>
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Kho Vũ Khí Số &amp; Bộ Sưu Tập Tool (/tools)</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-2xs border border-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-800 font-bold">
              KHO TỰ ĐỘNG HÓA VẬN HÀNH 24/7 • GIAO LINK 3S
            </span>
          </div>
        </div>
      </div>

      {/* Hero Catalog Editorial Intro */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xs border border-slate-200/80 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 text-xs text-slate-700 uppercase tracking-widest font-bold">
                <Terminal className="w-3.5 h-3.5 text-slate-900" />
                <span>MMO Automation Suite &amp; Data Asset 2026</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Kho Vũ Khí Số &amp; Kịch Bản MMO Thực Chiến
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Toàn bộ bot tự động, mã nguồn API và tệp dữ liệu khách hàng được <strong className="text-slate-900 font-bold">Ngô Dương Kiệt</strong> tối ưu hóa tinh gọn. Kiểm định VirusTotal 0/72 Clean, bàn giao Google Drive tức thì qua VietQR Napas 24/7 và cam kết bảo hành hoàn tiền 100%.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Tình Trạng Kho</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" /> Trực Tuyến 100%
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-900 h-full w-[96%] rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Độ trễ API: <strong>0.24s</strong></span>
                  <span>Bảo mật: <strong>SHA-256 Verified</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Bar Metrics Cluster */}
          <div className="mt-8 pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-200/80">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Kho Công Cụ</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">12+</span>
                <span className="text-xs text-slate-600 font-medium">Tool Thực Chiến</span>
              </div>
              <span className="text-[12px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Update v2026
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Khách Hàng</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">1.450+</span>
                <span className="text-xs text-slate-600 font-medium">Đơn Hoàn Tất</span>
              </div>
              <span className="text-[12px] text-slate-500 font-medium mt-0.5">99.8% Hài lòng 5 sao</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Kiểm Định Mã</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">100%</span>
                <span className="text-xs text-slate-600 font-medium">Mã Sạch</span>
              </div>
              <span className="text-[12px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> VirusTotal 0/72
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Khớp Lệnh QR</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">3.2s</span>
                <span className="text-xs text-slate-600 font-medium">Napas 24/7</span>
              </div>
              <span className="text-[12px] text-slate-500 font-medium mt-0.5">Auto Giao Link Drive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Smart Search Hub */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-2xs border border-slate-200/80 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên tool, từ khóa (shopee, telegram, zalo, crawl, data, prompt, webhook)..."
                className="w-full h-12 pl-11 pr-4 rounded-full bg-slate-50 text-slate-900 text-xs placeholder:text-slate-400 focus:bg-white border border-slate-200 focus:outline-none focus:border-slate-800 transition"
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-500 whitespace-nowrap font-medium">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 px-4 rounded-full bg-slate-50 text-slate-800 text-xs font-semibold appearance-none cursor-pointer focus:outline-none border border-slate-200 transition"
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
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                Phân Loại Danh Mục
              </span>
              <span className="text-xs text-slate-500">Hiển thị {filteredProducts.length} sản phẩm</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200'
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
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl p-6 shadow-2xs hover:shadow-xl hover:-translate-y-1 border border-slate-200/80 flex flex-col justify-between group transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-900 shadow-sm border border-slate-200/60">
                    {prod.badge}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold">
                    {prod.version}
                  </span>
                </div>

                <div>
                  <Link
                    href={`/product/${prod.id}`}
                    className="text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors block line-clamp-1"
                  >
                    {prod.title}
                  </Link>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                    {prod.shortDesc}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    1.2s / vòng quét
                  </span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center gap-1 font-medium text-emerald-600">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    0/72 Clean
                  </span>
                </div>
              </div>

              <div className="pt-5 mt-4 flex items-center justify-between border-t border-slate-100">
                <div>
                  <span className="block text-[11px] text-slate-400 font-medium">Giá trọn đời</span>
                  <span className="text-lg font-black text-slate-900">
                    {formatPrice(prod.price)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewProduct(prod)}
                    className="px-3.5 py-2 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all"
                  >
                    Xem Thử
                  </button>
                  <button
                    onClick={() => setActiveProduct(prod)}
                    className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-black transition-all shadow-sm"
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
