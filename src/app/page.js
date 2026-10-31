'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import {
  Sparkles, ShieldCheck, Zap, HelpCircle, Search,
  ArrowUpDown, CheckCircle, TrendingUp, Shield, Lock, Award,
  CheckCircle2, FileText, ChevronDown, Copy, Check, MessageCircle,
  Clock, RefreshCw, Laptop, ArrowRight, Bot, Database, Cpu,
  Flame, ShoppingBag, Send, DollarSign, Star, UserCheck,
  HeartHandshake, PhoneCall, ExternalLink, Activity
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
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  const categories = [
    { id: 'ALL', label: 'Tất cả sản phẩm', count: products.length },
    { id: 'Tự Động Hóa', label: '🤖 Tự Động Hóa', count: products.filter(p => p.category === 'Tự Động Hóa').length },
    { id: 'Data Khách Hàng', label: '📊 Data Khách Hàng', count: products.filter(p => p.category === 'Data Khách Hàng').length },
    { id: 'Tài Nguyên Bán Hàng', label: '💼 Tài Nguyên Bán Hàng', count: products.filter(p => p.category === 'Tài Nguyên Bán Hàng').length }
  ];

  let filtered = products.filter((p) => {
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === 'PRICE_ASC') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'PRICE_DESC') {
    filtered.sort((a, b) => b.price - a.price);
  }

  const marqueePlatforms = [
    { name: 'Make.com', tag: 'Automation' },
    { name: 'n8n Cloud', tag: 'Workflow Engine' },
    { name: 'Telegram Bot API', tag: 'Auto Broadcasting' },
    { name: 'Shopee Affiliate', tag: 'Passive Revenue' },
    { name: 'TikTok Shop', tag: 'Commerce AI' },
    { name: 'ChatGPT-4o', tag: 'Copywriting AI' },
    { name: 'Claude 3.5 Sonnet', tag: 'Reasoning Engine' },
    { name: 'Google Gemini Pro', tag: 'Data Crawl' },
    { name: 'Excel / CSV', tag: '1.500 B2B Data' },
    { name: 'VietQR Napas 24/7', tag: 'Instant 3s Delivery' }
  ];

  // Testimonials / Social Proof
  const testimonials = [
    {
      name: 'Lê Tuấn Hưng',
      role: 'Admin Kênh Săn Deal Telegram (12.000 member)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      comment: 'Kịch bản Make.com săn deal Shopee chạy cực kỳ mượt. Import file đúng 3 phút là bot tự động quét và đẩy bài vào group. Hoa hồng tháng đầu tiên đã bù thừa gấp 10 lần tiền mua kịch bản.',
      rating: 5,
      productBought: 'Kịch bản Make/n8n: Bot Săn Deal Shopee'
    },
    {
      name: 'Nguyễn Hoài Nam',
      role: 'Telesale & Phân Phối Thiết Bị POS Sài Gòn',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      comment: 'Bộ data 1.500 quán cafe TP.HCM rất chất lượng, số điện thoại chủ quán chuẩn đến 90%. Đội telesale bên mình gọi 2 tuần đã chốt được 8 hợp đồng máy tính tiền và nguyên liệu.',
      rating: 5,
      productBought: 'Bộ Data B2B: 1.500 Quán Cafe & Nhà Hàng'
    },
    {
      name: 'Trần Mai Anh',
      role: 'Kinh Doanh Thời Trang Shopee & TikTok Shop',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      comment: 'Lúc đầu sợ web lừa đảo vì bán rẻ quá, nhưng quét VietQR xong đúng 3 giây sau màn hình tự nhả link tải file ngay. Bạn Kiệt còn Ultraviewer hướng dẫn tận tình nữa, chấm 10/10 uy tín!',
      rating: 5,
      productBought: 'Bộ File Tính Lãi Sàn & 500+ Prompt AI'
    }
  ];

  const faqs = [
    {
      q: 'Sau khi quét mã VietQR bao lâu tôi nhận được file?',
      a: 'Hệ thống kết nối trực tiếp cổng thanh toán ngân hàng tự động. Ngay khi bạn quét mã VietQR và ngân hàng ghi nhận (khoảng 3 giây), màn hình sẽ lập tức chuyển đến trang nhận file kèm đường link tải trực tiếp nguyên bản. Đồng thời thông tin đơn hàng cũng được lưu lại để bạn tra cứu bất kỳ lúc nào.'
    },
    {
      q: 'Tôi không rành về kỹ thuật/code, có cài đặt và sử dụng được không?',
      a: 'Hoàn toàn được! Mỗi sản phẩm đều được đóng gói tỉ mỉ kèm theo video hướng dẫn ngắn 3 phút từng thao tác click chuột. Ngoài ra, bạn luôn có thể nhắn tin trực tiếp qua Zalo để Kiệt hỗ trợ UltraViewer cài đặt giúp bạn miễn phí từ A đến Z.'
    },
    {
      q: 'Nếu tải về file bị lỗi hoặc không chạy được thì sao?',
      a: 'Kiệt cam kết bảo hành 1-1: Hỗ trợ kỹ thuật trực tiếp qua Ultraviewer đến khi công cụ hoạt động trơn tru trên thiết bị của bạn. Trong trường hợp xảy ra lỗi do hệ thống mà không khắc phục được, Kiệt hoàn lại 100% số tiền bạn đã thanh toán qua tài khoản ngân hàng.'
    },
    {
      q: 'Làm sao để tải lại file nếu sau này tôi đổi máy tính hoặc làm mất file?',
      a: 'Rất đơn giản! Bạn chỉ cần vào mục "Tra cứu đơn hàng" trên thanh menu trên cùng, nhập địa chỉ Email hoặc Mã đơn hàng đã dùng khi mua là có thể bấm tải lại toàn bộ tài liệu bất kỳ lúc nào, hoàn toàn miễn phí trọn đời.'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-[#030712] text-slate-100 font-sans">
      {/* ============================================================== */}
      {/* 1. HERO SECTION: LUMINOUS HORIZON + 3D INFLATED ASSETS */}
      {/* ============================================================== */}
      <section className="relative pt-20 sm:pt-28 pb-28 sm:pb-36 bg-[linear-gradient(to_bottom,#000000,#130728_32%,#2e1065_62%,#6d28d9_90%)] overflow-hidden border-b border-purple-950/40">
        {/* The Signature Luminous Horizon Curve Ring */}
        <div className="horizon-eclipse w-[750px] sm:w-[1536px] sm:h-[650px] lg:w-[2200px] lg:h-[480px] top-[calc(100%-90px)] sm:top-[calc(80%-20px)]"></div>

        {/* Ambient Top Glow Dots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[450px] bg-purple-600/20 blur-[140px] rounded-full pointer-events-none -z-10"></div>

        {/* 3D FLOATING INFLATED ASSETS */}
        {/* Left Floating 3D Message Bubble */}
        <div className="absolute left-2 sm:left-10 lg:left-20 top-24 sm:top-36 hidden sm:block pointer-events-none z-20 animate-float-slow">
          <img
            src="/assets/message.png"
            alt="3D Message Notification"
            className="w-20 sm:w-32 lg:w-44 drop-shadow-[0_20px_40px_rgba(168,85,247,0.45)]"
            draggable="false"
          />
        </div>

        {/* Right Floating 3D Cursor */}
        <div className="absolute right-2 sm:right-10 lg:right-20 top-20 sm:top-32 hidden sm:block pointer-events-none z-20 animate-float-reverse">
          <img
            src="/assets/cursor.png"
            alt="3D Floating Cursor"
            className="w-20 sm:w-32 lg:w-44 drop-shadow-[0_20px_40px_rgba(99,102,241,0.45)]"
            draggable="false"
          />
        </div>

        {/* Bottom Left Floating 3D Helix */}
        <div className="absolute left-4 sm:left-14 bottom-12 hidden lg:block pointer-events-none z-10 opacity-80 animate-float-reverse">
          <img
            src="/assets/helix2.png"
            alt="3D Torus Helix"
            className="w-28 lg:w-44 drop-shadow-[0_20px_50px_rgba(147,51,234,0.4)]"
            draggable="false"
          />
        </div>

        {/* Bottom Right Floating 3D Emoji Star */}
        <div className="absolute right-4 sm:right-14 bottom-16 hidden lg:block pointer-events-none z-10 opacity-80 animate-float-slow">
          <img
            src="/assets/emojistar.png"
            alt="3D Star Sphere"
            className="w-24 lg:w-36 drop-shadow-[0_20px_50px_rgba(245,158,11,0.4)]"
            draggable="false"
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-950/60 text-purple-300 text-xs font-black tracking-wide mb-8 shadow-[0_0_25px_rgba(168,85,247,0.3)] backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>KHO TOOL & TÀI NGUYÊN SỐ THỰC CHIẾN 2026</span>
          </div>

          {/* Balanced Umbrella High-Converting Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] max-w-4xl mx-auto">
            Vũ Khí Số & Tool MMO Tự Động <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300">
              Tối Ưu Hiệu Suất — Nhân Bản Doanh Thu
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Nền tảng cung cấp các tool tự động hóa, kịch bản phần mềm, data khách hàng và tài nguyên kiếm tiền online (MMO) thực chiến.
            <strong className="text-white block sm:inline"> Quét mã VietQR nhả file tải ngay sau 3 giây!</strong>
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#products"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-sm shadow-[0_0_40px_rgba(255,255,255,0.4)] transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2.5 shimmer-btn"
            >
              <span>Khám Phá Kho Tool & Tài Nguyên</span>
              <ArrowRight className="w-4 h-4 shrink-0 text-purple-600" />
            </a>
            <a
              href="#guarantee"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/50 text-white font-bold text-sm backdrop-blur-md transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
            >
              <HeartHandshake className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Cam Kết Uy Tín & Bảo Hành</span>
            </a>
          </div>

          {/* 3 Metric Pills */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center sm:justify-start gap-3.5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-white leading-none">3 Giây</div>
                <div className="text-xs text-slate-400 mt-1">Nhả file tự động</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center sm:justify-start gap-3.5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-white leading-none">100%</div>
                <div className="text-xs text-slate-400 mt-1">Sạch VirusTotal</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center sm:justify-start gap-3.5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-white leading-none">Trọn Đời</div>
                <div className="text-xs text-slate-400 mt-1">Hỗ trợ Ultraviewer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BĂNG CHUYỀN MARQUEE ĐỐI TÁC & HỆ SINH THÁI */}
      {/* ============================================================== */}
      <section className="border-b border-white/10 bg-[#02050c] py-4 overflow-hidden relative">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#02050c] to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#02050c] to-transparent z-10"></div>

        <div className="animate-marquee flex items-center gap-4">
          {[...marqueePlatforms, ...marqueePlatforms].map((platform, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-2xl bg-[#0b0f19] border border-white/10 text-xs font-bold text-slate-200 flex items-center gap-2.5 whitespace-nowrap shadow-sm hover:border-purple-500/50 transition shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
              <span className="font-extrabold text-white">{platform.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-lg bg-white/5 text-purple-300 font-medium">
                {platform.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. KHO SẢN PHẨM MỞ BÁN (TRỌNG TÂM CỦA TOÀN BỘ CỬA HÀNG) */}
      {/* ============================================================== */}
      <section id="products" className="max-w-6xl mx-auto px-4 pt-14 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Sản Phẩm Đang Mở Bán</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Kho Tài Nguyên & Tool Sẵn Sàng Tải Về
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              File sạch nguyên bản • Tải về dùng ngay sau 3s • Hướng dẫn chi tiết & Hỗ trợ Ultraviewer 1-1
            </p>
          </div>
          <span className="text-xs font-bold text-purple-300 bg-purple-950/60 border border-purple-800/60 px-4 py-2 rounded-2xl self-start sm:self-auto shadow-sm">
            {filtered.length} tài nguyên sẵn sàng tải
          </span>
        </div>

        {/* Search & Categories Bar */}
        <div className="bg-[#0b0f19] p-4 sm:p-5 rounded-3xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full md:w-64 lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tool, data, prompt..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-white/10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-[#030712] text-white"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-white/25 text-white font-extrabold' : 'bg-white/10 text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 rounded-2xl border border-white/10 text-xs font-semibold bg-[#030712] text-slate-300 focus:outline-none"
            >
              <option value="DEFAULT">Thứ tự mặc định</option>
              <option value="PRICE_ASC">Giá: Thấp đến Cao</option>
              <option value="PRICE_DESC">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">Đang tải danh sách sản phẩm...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 bg-[#0b0f19] rounded-3xl p-8 border border-white/10">
            <h3 className="font-bold text-white text-base">Không tìm thấy sản phẩm phù hợp!</h3>
            <p className="text-xs text-slate-500 mt-1">Hãy thử tìm với từ khóa khác hoặc chuyển danh mục.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={(prod) => setActiveProduct(prod)}
                onPreview={(prod) => setPreviewProduct(prod)}
              />
            ))}
          </div>
        )}

        {/* Voucher Bar Khai Trương Tích Hợp Tiện Lợi */}
        <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-amber-500/30">
              %
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">
                Mã giảm giá khai trương: <span className="text-amber-400 font-mono font-black">KHAITRUONG</span> (-20.000đ)
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Áp dụng cho mọi đơn hàng hôm nay. Bấm nút bên cạnh để sao chép mã và dán khi thanh toán.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleCopyCoupon('KHAITRUONG')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
          >
            {copiedCoupon ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCoupon ? 'Đã sao chép mã!' : 'Sao chép mã'}</span>
          </button>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. TIÊU CHUẨN VÀNG & CAM KẾT CHẤT LƯỢNG KHI MUA TOOL TẠI STORE */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-wider mb-2">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Tiêu Chuẩn Chất Lượng</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            4 Lý Do Khách Hàng Tin Chọn Kiệt Digital Store
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Minh bạch, bảo mật tuyệt đối và đồng hành hỗ trợ kỹ thuật lâu dài
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10 hover:border-purple-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold mb-4 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-white">Giao File Sau 3 Giây</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Quét mã VietQR tự động 24/7. Nhận file gốc tải về ngay trên màn hình mà không cần đợi duyệt thủ công.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10 hover:border-emerald-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold mb-4 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-white">Sạch Mã Độc 100%</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Mọi kịch bản, file tool và dữ liệu đều được quét sạch qua VirusTotal (0/72 cảnh báo), an toàn tuyệt đối.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10 hover:border-amber-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold mb-4 shadow-sm">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-white">Update Trọn Đời Miễn Phí</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Khi các nền tảng (Shopee, TikTok, Telegram) đổi thuật toán, bạn luôn được tải bản cập nhật mới nhất miễn phí.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0b0f19] border border-white/10 hover:border-blue-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-4 shadow-sm">
              <Laptop className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-base text-white">Ultraviewer Hỗ Trợ 1-1</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Không rành công nghệ? Kiệt trực tiếp Ultraviewer qua Zalo hỗ trợ cài đặt cho bạn từ A đến Z hoàn toàn miễn phí.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PHẢN HỒI KHÁCH HÀNG THỰC TẾ (SOCIAL PROOF & REVIEWS) */}
      {/* ============================================================== */}
      <section id="reviews" className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Đánh Giá Thực Tế Từ Khách Hàng</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Người Dùng Nói Gì Về Tài Nguyên & Tool?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Được kiểm chứng hiệu quả thực chiến bởi các anh em kinh doanh online và làm MMO
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#0b0f19] p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-purple-500/40 flex flex-col justify-between space-y-6 shadow-xl transition"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3.5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-purple-500/40 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">{t.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight">{t.role}</p>
                  <span className="text-[10px] text-purple-400 font-medium block mt-0.5">✓ Đã mua: {t.productBought}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. CAM KẾT FOUNDER + 3 BƯỚC NHẬN FILE & FAQ (CHỐT HẠ ĐƠN HÀNG) */}
      {/* ============================================================== */}
      <section id="guarantee" className="max-w-6xl mx-auto px-4 pb-20">
        {/* Founder Guarantee Box with Real Portrait Photo */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0b0f19] to-indigo-950/40 border border-purple-500/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
            {/* Real Founder Photo with Verified Glow */}
            <div className="relative shrink-0">
              <img
                src="/images/founder-kiet.jpg"
                alt="Ngô Dương Kiệt - Founder"
                className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl object-cover object-top border-2 border-purple-500/60 shadow-xl shadow-purple-500/20"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md">
                <CheckCircle2 className="w-3 h-3 text-slate-950" />
                <span>Chính Chủ</span>
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-black uppercase tracking-wider mb-2 border border-purple-500/30">
                <span>Cam Kết Uy Tín Từ Ngô Dương Kiệt (Founder)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Bảo Hành 1-1 • Hỗ Trợ Cài Đặt Ultraviewer Miễn Phí
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-2xl">
                Mình là <strong>Kiệt</strong> – sinh sống tại <strong>Đà Nẵng</strong>, người phát triển và đóng gói các kịch bản, tool MMO trên website này. Mình cam kết 100%: <strong>Tài nguyên sạch, không virus, đúng mô tả</strong>. Nếu bạn gặp khó khăn trong quá trình sử dụng, mình sẵn sàng kết nối <strong>UltraViewer hỗ trợ 1-1 qua Zalo hoặc Facebook</strong>. Lỗi kỹ thuật hoàn tiền 100% ngay lập tức!
              </p>

              {/* Founder Meta Details */}
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Đà Nẵng, Việt Nam</span>
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">ngoduongkiet53006@gmail.com</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">Zalo: 0352.279.413</span>
              </div>
            </div>
          </div>

          {/* Action Contact Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
            <a
              href="https://zalo.me/0352279413"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 whitespace-nowrap shimmer-btn"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Chat Zalo: 0352.279.413</span>
            </a>
            <a
              href="https://www.facebook.com/share/1JCPpN7YR6/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-black transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Facebook Chính Chủ</span>
            </a>
          </div>
        </div>

        {/* 3 Steps Mini Grid */}
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Nhận File & Sử Dụng Chỉ Với 3 Bước
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Quy trình hoàn toàn tự động qua VietQR Napas 24/7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 font-black text-base flex items-center justify-center shrink-0 border border-purple-800">
              01
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Chọn Tool & Nhập Email</h4>
              <p className="text-xs text-slate-400 mt-1">Bấm Xem thử mẫu miễn phí và nhập email nhận bản quyền tải về.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-400 font-black text-base flex items-center justify-center shrink-0 border border-purple-800">
              02
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Quét Mã VietQR Ngân Hàng</h4>
              <p className="text-xs text-slate-400 mt-1">Mở app Techcombank, VCB, MBBank... quét mã QR tự điền sẵn tiền.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b0f19] border border-white/10 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 font-black text-base flex items-center justify-center shrink-0 border border-emerald-800">
              03
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Tải File Ngay Sau 3 Giây</h4>
              <p className="text-xs text-slate-400 mt-1">Màn hình tự động nhả link tải file gốc, kèm quyền tải lại trọn đời.</p>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="text-center mb-6">
            <h4 className="text-lg font-bold text-white">Câu Hỏi Thường Gặp</h4>
          </div>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#0b0f19] rounded-2xl border border-white/10 overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-purple-400' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/10">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
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
