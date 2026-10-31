'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import AutomationWorkflow from '@/components/AutomationWorkflow';
import {
  Sparkles, ShieldCheck, Zap, Search, CheckCircle2, ChevronDown,
  RefreshCw, Laptop, ArrowRight, ArrowUpRight, Star, PhoneCall,
  ExternalLink, FileCode2, Eye, Shield, Users, Layers, Award
} from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('DEFAULT');
  const [activeProduct, setActiveProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

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

  const filteredProducts = products
    .filter((prod) => {
      const matchCategory = selectedCategory === 'ALL' || prod.category === selectedCategory;
      const matchSearch =
        prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'PRICE_ASC') return a.price - b.price;
      if (sortBy === 'PRICE_DESC') return b.price - a.price;
      if (sortBy === 'RATING') return b.rating - a.rating;
      return (b.salesCount || 0) - (a.salesCount || 0);
    });

  const faqs = [
    {
      q: 'Sau khi quét mã VietQR thì bao lâu tôi nhận được file tải?',
      a: 'Hệ thống tự động 100%. Sau khi bạn quét mã VietQR qua app ngân hàng, hệ thống Napas sẽ khớp lệnh trong 3 giây và tự động mở link tải Google Drive gốc, kèm quyền tải lại trọn đời vào email của bạn.'
    },
    {
      q: 'Tôi không rành về kỹ thuật hay code thì có cài đặt và dùng được không?',
      a: 'Hoàn toàn được! Mỗi sản phẩm đều có video hướng dẫn chi tiết từng cú click chuột. Ngoài ra, Kiệt hỗ trợ trực tiếp 1-1 qua UltraViewer và Zalo cho bạn đến khi tool chạy mượt mà.'
    },
    {
      q: 'Chính sách bảo hành và hoàn tiền của Kiệt như thế nào?',
      a: 'Kiệt cam kết 100%: Toàn bộ tool, script và data đều được kiểm tra sạch mã độc (VirusTotal 0/72). Nếu tool lỗi kỹ thuật không hoạt động như mô tả, Kiệt hoàn tiền 100% ngay lập tức qua số tài khoản của bạn.'
    },
    {
      q: 'Khi các nền tảng (Shopee, TikTok, Telegram) cập nhật thuật toán thì sao?',
      a: 'Bạn được cập nhật các phiên bản mới hoàn toàn MIỄN PHÍ trọn đời. Khi có bản cập nhật mới, link tải sẽ tự động cập nhật code mới nhất.'
    }
  ];

  const testimonials = [
    {
      name: 'Nguyễn Thành Nam',
      role: 'Chủ shop thời trang & Affiliate Marketer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment: 'Con bot Shopee Telegram của Kiệt giúp mình bắn deal tự động 24/7. Tháng vừa rồi hoa hồng Shopee nhảy thêm hơn 14 triệu mà không tốn công canh deal.',
      productBought: 'Bot Săn Deal Shopee Telegram',
      rating: 5
    },
    {
      name: 'Vũ Quốc Bảo',
      role: 'Agency Marketing B2B Hà Nội',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment: 'Tệp 25.000 data quán cafe và F&B lọc chuẩn từng quận huyện. Đội ngũ sales bên mình gọi điện chuyển đổi cực cao. Đáng từng xu!',
      productBought: 'Tệp 25.000 Khách Hàng B2B F&B',
      rating: 5
    },
    {
      name: 'Lê Hoàng Yến',
      role: 'Content Creator & Bán hàng E-commerce',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      comment: 'Bộ prompt GPT-4o viết content thương mại chuẩn SEO dùng cực kỳ sướng. Bạn Kiệt nhiệt tình Ultraviewer hướng dẫn tận tình.',
      productBought: 'Bộ Prompt AI GPT-4o Đỉnh Cao',
      rating: 5
    }
  ];

  return (
    <div className="bg-[#f8f9fa] text-slate-800 font-sans">
      
      {/* ============================================================== */}
      {/* 1. HERO SECTION (CHUẨN 100% BENTO FOCAL - NỘI DUNG CHUẨN MMO) */}
      {/* ============================================================== */}
      <section className="relative pt-8 sm:pt-14 pb-16 sm:pb-20 border-b border-slate-200/80 bg-[#f8f9fa] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Cột 1: Headline & Text & Buttons & 50K+ Avatars (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between py-2 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 text-slate-700 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Bản Quyền 2026 • Tự Động Hóa MMO</span>
                </div>

                <h1 className="font-editorial text-4xl sm:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.02] tracking-tight">
                  Define Your <br />
                  <span className="italic font-normal">Digital Weapon</span>
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md">
                  Nơi độ chuẩn xác kỹ thuật kết hợp cùng tự động hóa thực chiến. Khám phá kho kịch bản và tool phần mềm độc quyền để nhân bản doanh thu online mà không cần tốn hàng giờ trực máy.
                </p>

                {/* Dual Pill Buttons (Chuẩn Slide 1) */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#products"
                    className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
                  >
                    <span>Khám Phá Bộ Sưu Tập</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="#guarantee"
                    className="px-6 py-3.5 rounded-full border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 text-xs font-semibold transition flex items-center gap-2"
                  >
                    <span>Cam Kết Từ Kiệt</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>

              {/* 50K+ Verified Trust Avatar Cluster (Chuẩn Slide 1) */}
              <div className="pt-4 border-t border-slate-200/70 flex items-center gap-3 text-xs text-slate-500">
                <div className="flex -space-x-2 shrink-0">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Buyer"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Buyer"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                    alt="Buyer"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">50.000+ Dòng Dữ Liệu & Users</div>
                  <div className="text-[11px] text-slate-500">Cộng đồng MMO & E-Commerce tin dùng</div>
                </div>
              </div>
            </div>

            {/* Cột 2: Cụm 3 Thẻ Dọc Xếp Tầng (Slide 1 Style - 100% Sản Phẩm & Người Thật) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-3.5">
              
              {/* Thẻ 1: Peach / Warm Apricot (#FBE8DE) - Bot Shopee */}
              <a
                href="#products"
                className="bg-[#fbe8de] rounded-3xl p-4 flex items-center justify-between border border-orange-200/50 shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src="/images/shopee-bot-cover.jpg"
                    alt="Shopee Bot"
                    className="w-16 h-20 rounded-2xl object-cover shrink-0 shadow-sm"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-200/60 px-2 py-0.5 rounded-full">
                      Shopee Bot
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-slate-900 mt-1">Bot Săn Deal Shopee</h4>
                    <p className="text-[11px] text-slate-600">Flash Sale 50% Auto 24/7</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/80 group-hover:bg-slate-900 group-hover:text-white text-slate-700 flex items-center justify-center transition shadow-sm shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Thẻ 2: Warm Sand / Tan (#F6DDCF) - Ảnh thật Kiệt */}
              <a
                href="#guarantee"
                className="bg-[#f6ddcf] rounded-3xl p-4 flex items-center justify-between border border-amber-200/50 shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src="/images/founder-kiet.jpg"
                    alt="Ngô Dương Kiệt"
                    className="w-16 h-20 rounded-2xl object-cover object-top shrink-0 shadow-sm"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                      Founder & Dev
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-slate-900 mt-1">Ngô Dương Kiệt</h4>
                    <p className="text-[11px] text-slate-600">Đà Nẵng • Ultraviewer 1-1</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/80 group-hover:bg-slate-900 group-hover:text-white text-slate-700 flex items-center justify-center transition shadow-sm shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>

              {/* Thẻ 3: Dusty Rose (#E8D7D8) - Data B2B Cafe */}
              <a
                href="#products"
                className="bg-[#e8d7d8] rounded-3xl p-4 flex items-center justify-between border border-rose-200/50 shadow-sm hover:shadow-md transition group"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src="/images/data-cafe-cover.jpg"
                    alt="Data B2B"
                    className="w-16 h-20 rounded-2xl object-cover shrink-0 shadow-sm"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-200/60 px-2 py-0.5 rounded-full">
                      B2B Lead Engine
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-slate-900 mt-1">Tệp 25.000 Quán Cafe</h4>
                    <p className="text-[11px] text-slate-600">Data F&B Chuẩn Từng Quận</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/80 group-hover:bg-slate-900 group-hover:text-white text-slate-700 flex items-center justify-center transition shadow-sm shrink-0">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>

            </div>

            {/* Cột 3: Thẻ Showcase Khổng Lồ Có Tag Giá (Slide 1 Style) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden group">
              
              {/* Top Sub-label */}
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                  High-Performance Automation
                </span>
                <span className="text-xs font-bold text-slate-900">
                  Shopee API v2026 Engine • Bot Deal Độc Quyền
                </span>
              </div>

              {/* Central Product Graphic */}
              <div className="relative my-6 flex items-center justify-center">
                <img
                  src="/images/shopee-bot-cover.jpg"
                  alt="Shopee Bot Showcase"
                  className="w-full h-52 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Price Pill Tag */}
                <div className="absolute -bottom-3 left-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">199.000 đ</span>
                    <span className="text-slate-400 text-[10px] ml-1">/ Shopee Bot v2026</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quote & Text */}
              <div className="pt-3 border-t border-slate-100">
                <p className="font-editorial text-base text-slate-800 leading-snug">
                  "Tự động hóa quy trình kinh doanh, biến thời gian rảnh thành dòng thu nhập thụ động bền vững."
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>VietQR Napas 24/7</span>
                  <span className="font-semibold text-slate-800">Giao File 3 Giây ↗</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SECTION: A DEEPER LOOK AT YOUR TOOLS (CHUẨN 100% SLIDE 2 BENTO) */}
      {/* ============================================================== */}
      <section id="products" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          
          {/* Header Section 2 */}
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Kiến Trúc Tự Động Hóa Thực Chiến
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mt-1">
                Khám Phá Các Vũ Khí Số Của Kiệt
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
                Vượt trội hơn các kịch bản sơ sài thông thường. Toàn bộ tool, bot và data của Kiệt được kiểm định thực chiến, 100% sạch mã độc và có tài liệu video hướng dẫn từng bước.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/my-orders"
                className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition shadow-sm"
              >
                Tra Cứu Đơn Hàng Tự Động
              </Link>
              <a
                href="#standards"
                className="px-5 py-2.5 rounded-full border border-slate-300 hover:border-slate-800 text-slate-700 text-xs font-semibold transition"
              >
                Tiêu Chuẩn Mã Sạch (0/72 Clean)
              </a>
            </div>
          </div>

          {/* Slide 2 Bento Split: Left Bento + Right Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Bento Stack (Slide 2 Style) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Bento Card 1: Engineered for What's Next */}
              <div className="bg-[#f8f9fa] rounded-3xl p-6 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Performance Architecture
                  </span>
                  <h4 className="font-editorial text-xl font-bold text-slate-900 mt-0.5">
                    Engineered for What's Next.
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                    Tự động thích ứng và update code miễn phí trọn đời khi Shopee, TikTok hoặc Telegram đổi thuật toán.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bento Card 2: Performance Upgrade */}
              <div className="bg-[#f0f4f8] rounded-3xl p-6 border border-sky-100 relative overflow-hidden flex items-center gap-5">
                <img
                  src="/images/prompt-ecommerce-cover.jpg"
                  alt="Prompt AI Package"
                  className="w-20 h-24 rounded-2xl object-cover shrink-0 shadow-sm"
                />
                <div>
                  <span className="text-[10px] font-bold text-sky-700 uppercase tracking-widest bg-sky-200/60 px-2 py-0.5 rounded-full">
                    AI Upgrade
                  </span>
                  <h4 className="font-editorial text-xl font-bold text-slate-900 mt-1">
                    Bộ Prompt AI Thương Mại
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Nhân bản nội dung bán hàng và viết kịch bản quảng cáo triệu view chỉ trong 30 giây.
                  </p>
                </div>
              </div>

              {/* Bento Card 3: HD Precision & 0/72 Clean */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">HD Precision & Clean Code</span>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    VirusTotal 0/72 Clean
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Toàn bộ mã nguồn và kịch bản đều minh bạch, không mã độc backdoor, hỗ trợ Ultraviewer 1-1 tận tình cho bạn từ Đà Nẵng.
                </p>
                <div className="pt-2">
                  <a
                    href="https://zalo.me/0352279413"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-purple-600 transition"
                  >
                    <span>Cần Tư Vấn Riêng (Chat Zalo)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Bento: Product Catalog List */}
            <div className="lg:col-span-7 bg-[#f8f9fa] rounded-3xl p-6 sm:p-8 border border-slate-200/80">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-slate-900">
                    Bộ Sưu Tập Tool & Kịch Bản Tuyển Chọn
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tối ưu hóa hiệu suất MMO. Toàn bộ tool thực chiến đã sẵn sàng nhả file sau 3 giây.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'ALL', label: 'Tất Cả' },
                    { id: 'AUTOMATION', label: 'Tool Bot' },
                    { id: 'PROMPT', label: 'Prompt AI' },
                    { id: 'DATA', label: 'Data B2B' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                        selectedCategory === cat.id
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product List Showcase */}
              <div className="pt-6 space-y-4">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-slate-400 transition flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            {prod.badge || 'TOP PICK'}
                          </span>
                          <span className="text-xs font-extrabold text-slate-900">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(prod.price)}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1">
                          {prod.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {prod.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                      <button
                        type="button"
                        onClick={() => setPreviewProduct(prod)}
                        className="px-3.5 py-2 rounded-full border border-slate-200 hover:border-slate-800 text-slate-700 text-xs font-semibold transition"
                      >
                        Xem Thử
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveProduct(prod)}
                        className="px-4 py-2 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center gap-1 shadow-sm"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>Tải Ngay</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2.5 INTERACTIVE WORKFLOW PIPELINE (CHUẨN MAGIC UI / N8N PIPELINE) */}
      {/* ============================================================== */}
      <section className="py-12 border-b border-slate-200/80 bg-gradient-to-b from-white to-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <AutomationWorkflow />
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SECTION: THE PINNACLE OF PERFORMANCE (CHUẨN 100% SLIDE 3 BENTO) */}
      {/* ============================================================== */}
      <section id="standards" className="py-16 sm:py-24 border-b border-slate-200/80 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              The Pinnacle of Engineering
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mt-1">
              4 Tiêu Chuẩn Kỹ Thuật Vàng
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Sự kết hợp hoàn hảo giữa công nghệ tự động hóa gọn nhẹ và chiến lược gia tăng tỷ lệ chuyển đổi.
            </p>
          </div>

          {/* Slide 3 Bento Grid: 3 left cards, 2 center cards, 1 right tall card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left 3 Narrow Cards (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col justify-between gap-4">
              
              {/* Card 1: Neural Engine / Pale Mint (#EEF7F2) */}
              <div className="bg-[#eef7f2] p-5 rounded-3xl border border-emerald-100 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                    Neural Engine
                  </span>
                  <h4 className="font-editorial text-xl font-bold text-slate-900 mt-1">Lập Trình Tinh Gọn</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Mã nguồn Python & NodeJS tối ưu hóa, chạy mượt mà trên VPS giá rẻ hoặc máy tính cá nhân.
                  </p>
                </div>
                <div className="mt-4 font-mono font-bold text-sm text-slate-900">199.000 đ</div>
              </div>

              {/* Card 2: Telegram Broadcaster / Pale Yellow (#FEF9E8) */}
              <div className="bg-[#fef9e8] p-5 rounded-3xl border border-amber-100 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block">
                    Telegram Broadcaster
                  </span>
                  <h4 className="font-editorial text-xl font-bold text-slate-900 mt-1">Phát Sóng Tự Động</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Tự động lọc deal và bắn vào kênh 5.000+ thành viên liên tục 24/7 mà không cần mở máy.
                  </p>
                </div>
                <div className="mt-4 font-mono font-bold text-sm text-slate-900">299.000 đ</div>
              </div>

              {/* Card 3: B2B Lead Engine / Pale Rose (#FDF2ED) */}
              <div className="bg-[#fdf2ed] p-5 rounded-3xl border border-rose-100 flex flex-col justify-between h-full shadow-sm">
                <div>
                  <span className="text-[10px] font-bold text-rose-800 uppercase tracking-widest block">
                    B2B Lead Engine
                  </span>
                  <h4 className="font-editorial text-xl font-bold text-slate-900 mt-1">Data Chuẩn 100%</h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    Dữ liệu quán cafe, nhà hàng lọc sạch từng quận, sẵn sàng import vào Excel & Zalo Marketing.
                  </p>
                </div>
                <div className="mt-4 font-mono font-bold text-sm text-slate-900">299.000 đ</div>
              </div>

            </div>

            {/* Center 2 Cards (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              
              {/* Card 4 (Top): The Best of Both Worlds / Soft Lavender (#F3EFFA) */}
              <div className="bg-[#f3effa] p-6 rounded-3xl border border-purple-100 shadow-sm flex items-center gap-5">
                <img
                  src="/images/prompt-ecommerce-cover.jpg"
                  alt="Philosophy"
                  className="w-24 h-32 rounded-2xl object-cover shrink-0 shadow-sm"
                />
                <div>
                  <span className="text-[10px] font-bold text-purple-800 uppercase tracking-widest bg-purple-200/60 px-2 py-0.5 rounded-full">
                    Philosophy
                  </span>
                  <h4 className="font-editorial text-2xl font-bold text-slate-900 mt-1">
                    Vừa Dùng Tool, Vừa Hiểu Bản Chất
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Không chỉ nhận tool chạy sẵn, bạn còn nhận video hướng dẫn nguyên lý tự động hóa để tự làm chủ công nghệ lâu dài.
                  </p>
                </div>
              </div>

              {/* Card 5 (Bottom): Insurance, Simplified / Warm Peach (#FBEEE8) */}
              <div className="bg-[#fbeee8] p-6 rounded-3xl border border-orange-100 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-orange-800 uppercase tracking-widest block">
                    Guarantee
                  </span>
                  <h4 className="font-editorial text-2xl font-bold text-slate-900 mt-1">
                    Bảo Hành Hoàn Tiền 100%
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Nếu tool lỗi kỹ thuật không chạy được hoặc không đúng như mô tả, Kiệt hoàn tiền 100% ngay lập tức qua số tài khoản của bạn. Không rườm rà thủ tục.
                  </p>
                </div>
                <div className="pt-4 mt-2">
                  <a
                    href="https://zalo.me/0352279413"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Trao Đổi Trực Tiếp (Zalo Kiệt)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right 1 Tall Card (lg:col-span-4) Security Architecture */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                  Security Architecture
                </span>
                <h4 className="font-editorial text-2xl font-bold text-slate-900 mt-1">
                  Kiểm Định Mã Sạch Tuyệt Đối
                </h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Cam kết bảo vệ máy tính của khách hàng. Toàn bộ kịch bản và mã nguồn đều được kiểm định qua VirusTotal trước khi bàn giao.
                </p>

                <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>Mã Nguồn Minh Bạch</span>
                    <span className="text-emerald-600 font-bold">✓ 0/72 Clean</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Từ các kịch bản API Shopee đến bot Telegram cá nhân, Kiệt trực tiếp kiểm tra từng dòng code trước khi đóng gói lên hệ thống.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Ultraviewer 1-1</span>
                <span className="font-bold text-slate-900">Hỗ Trợ Tận Tâm Từ Đà Nẵng</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SECTION: SÁNG LẬP & CAM KẾT TỪ KIỆT (ĐÀ NẴNG) */}
      {/* ============================================================== */}
      <section id="guarantee" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Founder Photo & Bio (Slide 4 style) */}
            <div className="lg:col-span-6 bg-[#fef9e8] p-8 sm:p-12 rounded-[2.5rem] border border-amber-200/60 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src="/images/founder-kiet.jpg"
                alt="Ngô Dương Kiệt"
                className="w-28 h-36 rounded-3xl object-cover object-top border-4 border-white shadow-md shrink-0"
              />
              <div className="space-y-2.5 text-center sm:text-left">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest bg-amber-200/60 px-2.5 py-0.5 rounded-full inline-block">
                  Meet The Founder
                </span>
                <h3 className="font-editorial text-3xl font-bold text-slate-900">
                  Ngô Dương Kiệt
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Mình sinh sống tại <strong>Đà Nẵng</strong>, trực tiếp lập trình và phát triển các giải pháp tự động hóa MMO. Cam kết mã sạch 100%, bảo hành hoàn tiền nếu không đúng mô tả và sẵn sàng Ultraviewer hỗ trợ bạn từ A-Z!
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <a
                    href="https://zalo.me/0352279413"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zalo: 0352.279.413</span>
                  </a>
                  <a
                    href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                    <span>Facebook Chính Chủ</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: See Things Clearly & Trust Indicators (Slide 4) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#eef7f2] p-6 rounded-3xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">
                    Hỗ Trợ Kỹ Thuật Trực Tuyến
                  </span>
                  <h4 className="font-editorial text-2xl font-bold text-slate-900 mt-1">
                    Cài Đặt UltraViewer 1-1 Miễn Phí
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 max-w-sm">
                    Bạn không rành máy tính? Kiệt sẽ kết nối UltraViewer cài đặt giúp bạn chỉ với vài phút trao đổi qua Zalo.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                  1-1
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">HỆ THỐNG GIAO HÀNG TỰ ĐỘNG</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">● Active Napas 24/7</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Hệ thống VietQR hoạt động tự động xuyên đêm, bạn mua lúc 2h sáng hay giờ cao điểm đều nhận link tải file sau 3 giây.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. SECTION: NHẬN FILE CHỈ VỚI 3 BƯỚC (CHUẨN SLIDE 5 BENTO) */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Quy Trình Tự Động Hóa 100%
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mt-1">
              Nhận File & Sử Dụng Chỉ Với 3 Bước
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                01
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Chọn Tool & Nhập Email</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Xem thử demo miễn phí và nhập email nhận link tải bản quyền về máy.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                02
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Quét Mã VietQR Ngân Hàng</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Mở app Techcombank, VCB, MBBank... quét mã QR tự điền sẵn số tiền.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-start gap-4">
              <div className="w-9 h-9 rounded-2xl bg-emerald-700 text-white font-bold text-sm flex items-center justify-center shrink-0">
                03
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Tải File Ngay Sau 3 Giây</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Màn hình tự động nhả link tải file gốc, kèm quyền tải lại vĩnh viễn.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">FAQ</span>
              <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                Câu Hỏi Thường Gặp
              </h4>
            </div>

            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CUSTOMER REVIEWS (SOCIAL PROOF) */}
      {/* ============================================================== */}
      <section id="reviews" className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Đánh Giá Thực Tế</span>
            <h3 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mt-2">
              Khách Hàng Nói Gì Về Kiệt?
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Được kiểm chứng hiệu quả thực chiến bởi các anh em kinh doanh online và làm MMO.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#f8f9fa] p-6 rounded-3xl border border-slate-200/80 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{t.name}</h4>
                    <p className="text-[11px] text-slate-500">{t.role}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                      ✓ Đã mua: {t.productBought}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKOUT & PREVIEW MODALS */}
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
          onBuy={(prod) => {
            setPreviewProduct(null);
            setActiveProduct(prod);
          }}
        />
      )}
    </div>
  );
}
