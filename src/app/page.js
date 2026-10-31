'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import {
  Sparkles, ShieldCheck, Zap, Search, ArrowUpDown, CheckCircle2,
  ChevronDown, Copy, Check, MessageCircle, Clock, RefreshCw,
  Laptop, ArrowRight, ArrowUpRight, Star, UserCheck, HeartHandshake,
  PhoneCall, ExternalLink, Shield, Lock, Award
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

  // Filter & Search Logic
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
      {/* 1. HERO SECTION (CHUẨN SLIDE 1 FOCAL EYEWEAR) */}
      {/* ============================================================== */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-[#f8f9fa] via-white to-[#f8f9fa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Editorial Typography & Actions) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Bản Quyền Thực Chiến 2026 • Tự Động Hóa MMO</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.06] tracking-tight">
              Tối Ưu Hiệu Suất. <br />
              <span className="italic font-normal text-slate-600">Nhân Bản Doanh Thu</span> <br />
              Với Vũ Khí Số.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Nền tảng cung cấp các tool tự động hóa, kịch bản phần mềm, data khách hàng B2B và tài nguyên MMO thực chiến hàng đầu Việt Nam. Quét mã VietQR nhả file tải ngay sau 3 giây.
            </p>

            {/* Action Buttons (Pills chuẩn Focal) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>Khám Phá Bộ Sưu Tập Tool</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#guarantee"
                className="w-full sm:w-auto px-7 py-4 rounded-full border border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <span>Cam Kết Từ Kiệt (Đà Nẵng)</span>
              </a>
            </div>

            {/* Social Proof (Slide 1 style) */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
              <div className="flex -space-x-2">
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
              <div className="text-left font-medium">
                <span className="text-slate-900 font-bold">1.250+ Khách Hàng</span> đã tải & sử dụng thực chiến
              </div>
            </div>
          </div>

          {/* Right Column: Hero Bento Stack (Slide 1 of Focal) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            
            {/* Card 1: Warm Peach Card */}
            <div className="bento-peach p-5 rounded-3xl border border-orange-200/50 flex items-center gap-4 shadow-sm hover:shadow-md transition">
              <img
                src="/images/shopee-bot-cover.jpg"
                alt="Shopee Bot Cover"
                className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-full">
                  Bestseller
                </span>
                <h4 className="font-bold text-sm text-slate-900 truncate mt-1">Bot Săn Deal Shopee Telegram</h4>
                <p className="text-xs text-slate-600 truncate">Tự quét mã 50% & gắn link affiliate 24/7</p>
                <div className="mt-1 font-extrabold text-sm text-slate-900">199.000 đ</div>
              </div>
            </div>

            {/* Card 2: Soft Ice Blue Card */}
            <div className="bento-blue p-5 rounded-3xl border border-sky-200/50 flex items-center gap-4 shadow-sm hover:shadow-md transition">
              <img
                src="/images/data-cafe-cover.jpg"
                alt="Data Cafe Cover"
                className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-full">
                  Hot Leads
                </span>
                <h4 className="font-bold text-sm text-slate-900 truncate mt-1">Data 25.000+ Khách Hàng B2B F&B</h4>
                <p className="text-xs text-slate-600 truncate">Hồ sơ chủ quán, SĐT, địa chỉ đã xác minh</p>
                <div className="mt-1 font-extrabold text-sm text-slate-900">299.000 đ</div>
              </div>
            </div>

            {/* Card 3: Warm Ivory Card */}
            <div className="bento-ivory p-5 rounded-3xl border border-stone-200/60 flex items-center gap-4 shadow-sm hover:shadow-md transition">
              <img
                src="/images/prompt-ecommerce-cover.jpg"
                alt="Prompt AI Cover"
                className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                  New Release
                </span>
                <h4 className="font-bold text-sm text-slate-900 truncate mt-1">Bộ Prompt AI GPT-4o Đỉnh Cao</h4>
                <p className="text-xs text-slate-600 truncate">Tự động viết content & kịch bản bán hàng</p>
                <div className="mt-1 font-extrabold text-sm text-slate-900">99.000 đ</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. SECTION: A DEEPER LOOK AT YOUR TOOLS (CHUẨN SLIDE 2 FOCAL) */}
      {/* ============================================================== */}
      <section id="products" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            A Deeper Look at Your Tools
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mt-2">
            Bộ Sưu Tập Vũ Khí Số Thực Chiến
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed">
            Tuyển tập các tool tự động hóa, kịch bản phần mềm và dữ liệu khách hàng chất lượng cao nhất để nhân bản doanh thu.
          </p>
        </div>

        {/* Filter Pills Bar (Chuẩn Slide 2 của Focal) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'ALL', label: 'Tất Cả Sản Phẩm' },
            { id: 'AUTOMATION', label: 'Tool Tự Động Hóa' },
            { id: 'PROMPT', label: 'Kịch Bản / Prompt AI' },
            { id: 'DATA', label: 'Data Khách Hàng B2B' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tool, script, data..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-800 transition shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-500 hidden sm:inline">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-slate-800 shadow-sm"
            >
              <option value="DEFAULT">Bán chạy nhất</option>
              <option value="PRICE_ASC">Giá tăng dần</option>
              <option value="PRICE_DESC">Giá giảm dần</option>
              <option value="RATING">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>

        {/* Product Bento Grid (Hiển thị mượt mà mọi sản phẩm) */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 text-xs">
            Đang tải dữ liệu sản phẩm...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">Không tìm thấy sản phẩm nào phù hợp với từ khóa.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onBuy={(p) => setActiveProduct(p)}
                onPreview={(p) => setPreviewProduct(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 3. SECTION: THE PINNACLE OF PERFORMANCE (CHUẨN SLIDE 3 FOCAL) */}
      {/* ============================================================== */}
      <section id="standards" className="py-16 sm:py-24 bg-white border-y border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              The Pinnacle of Performance
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight mt-2">
              4 Tiêu Chuẩn Vàng Vượt Trội
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Cam kết chất lượng cao cấp nhất khi sở hữu tool và tài nguyên số tại Kiệt Digital Store.
            </p>
          </div>

          {/* 4 Bento Story Cards (Slide 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bento-blue p-6 rounded-3xl border border-sky-100 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-sky-200/60 text-sky-800 flex items-center justify-center font-bold mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-slate-900">Giao File 3 Giây</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Quét VietQR là hệ thống tự khớp lệnh và nhả link Google Drive gốc kèm quyền tải lại trọn đời.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-sky-200/60 text-[11px] font-bold text-sky-800">
                Tự Động 24/7 Qua Napas
              </div>
            </div>

            <div className="bento-mint p-6 rounded-3xl border border-emerald-100 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-200/60 text-emerald-800 flex items-center justify-center font-bold mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-slate-900">Sạch Mã Độc 100%</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Kiểm định khắt khe qua VirusTotal (0/72 engines), cam kết không backdoor hay đánh cắp dữ liệu.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-emerald-200/60 text-[11px] font-bold text-emerald-800">
                VirusTotal 0/72 Clean
              </div>
            </div>

            <div className="bento-peach p-6 rounded-3xl border border-orange-100 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-orange-200/60 text-orange-800 flex items-center justify-center font-bold mb-4">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-slate-900">Update Trọn Đời</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Nền tảng Shopee hay Telegram đổi thuật toán? Bạn luôn được tải bản cập nhật mới nhất miễn phí.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-orange-200/60 text-[11px] font-bold text-orange-800">
                Miễn Phí Cập Nhật Vĩnh Viễn
              </div>
            </div>

            <div className="bento-ivory p-6 rounded-3xl border border-stone-200 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-stone-200 text-stone-800 flex items-center justify-center font-bold mb-4">
                  <Laptop className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base text-slate-900">Ultraviewer 1-1</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Không rành kỹ thuật? Kiệt trực tiếp Ultraviewer hỗ trợ cài đặt cho bạn từ A-Z hoàn toàn miễn phí.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-200 text-[11px] font-bold text-stone-800">
                Hỗ Trợ Tận Tâm Qua Zalo
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SECTION: SEE THINGS CLEARLY & FOUNDER SPOTLIGHT (SLIDE 4) */}
      {/* ============================================================== */}
      <section id="guarantee" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Founder Spotlight Card (Warm Sand Tone Bento Card) */}
        <div className="bento-yellow p-8 sm:p-12 rounded-[2.5rem] border border-amber-200/60 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 shadow-sm">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
            <div className="relative shrink-0">
              <img
                src="/images/founder-kiet.jpg"
                alt="Ngô Dương Kiệt - Founder"
                className="w-24 h-28 sm:w-28 sm:h-32 rounded-3xl object-cover object-top border-4 border-white shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Chính Chủ
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-widest block">
                Lời Cam Kết Từ Ngô Dương Kiệt (Founder)
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Bảo Hành 1-1 • Hỗ Trợ Cài Đặt Ultraviewer Miễn Phí
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
                Mình là <strong>Kiệt</strong> – sinh sống tại <strong>Đà Nẵng</strong>, người phát triển và tuyển chọn các kịch bản, tool MMO trên website này. Mình cam kết 100%: <strong>Tài nguyên sạch, không virus, đúng mô tả</strong>. Nếu bạn gặp khó khăn trong quá trình sử dụng, mình sẵn sàng kết nối <strong>UltraViewer hỗ trợ 1-1 qua Zalo hoặc Facebook</strong>. Lỗi kỹ thuật hoàn tiền 100% ngay lập tức!
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Đà Nẵng, Việt Nam</span>
                </span>
                <span>•</span>
                <span>ngoduongkiet53006@gmail.com</span>
                <span>•</span>
                <span>Zalo: 0352.279.413</span>
              </div>
            </div>
          </div>

          {/* Contact Action Pills */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <a
              href="https://zalo.me/0352279413"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Chat Zalo: 0352.279.413</span>
            </a>

            <a
              href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-xs font-bold transition flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span>Facebook Chính Chủ</span>
            </a>
          </div>
        </div>

        {/* 3 Easy Steps (Quy Trình Chuẩn Slide 5) */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Built To Adapt
          </span>
          <h3 className="font-editorial text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mt-1">
            Nhận File & Sử Dụng Chỉ Với 3 Bước
          </h3>
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
      </section>

      {/* ============================================================== */}
      {/* 5. CUSTOMER REVIEWS (SOCIAL PROOF) */}
      {/* ============================================================== */}
      <section id="reviews" className="py-16 sm:py-24 bg-white border-t border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
