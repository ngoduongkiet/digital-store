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
  Play, Terminal, Flame, ShoppingBag, Send, DollarSign,
  Star, UserCheck, HeartHandshake, PhoneCall, ExternalLink, Activity
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

  // --- AUTOMATION SIMULATOR STATE ---
  const [simStep, setSimStep] = useState(1);
  const [simRunning, setSimRunning] = useState(false);
  const [simLogs, setSimLogs] = useState([
    { time: '00:00.12', text: '⚡ Trigger: Make.com khởi động chu kỳ quét Shopee API', color: 'text-indigo-400' },
    { time: '00:00.35', text: '🔍 Quét thấy 12 mã giảm 50% & flash sale hôm nay', color: 'text-amber-400' },
    { time: '00:00.68', text: '🧠 OpenAI GPT-4o: Tóm tắt deal sốc & chèn link affiliate', color: 'text-purple-400' },
    { time: '00:00.95', text: '📢 Telegram Broadcaster: Bắn bài vào kênh 5.000 mem', color: 'text-blue-400' },
    { time: '00:01.20', text: '💰 Khách bấm mua qua link: Hoa hồng +45.000đ về ví!', color: 'text-emerald-400 font-bold' }
  ]);

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

  const runSimulation = () => {
    if (simRunning) return;
    setSimRunning(true);
    setSimStep(1);
    setSimLogs([
      { time: '00:00.05', text: '🚀 [BẮT ĐẦU] Kích hoạt trigger tự động Make/n8n...', color: 'text-indigo-400' }
    ]);

    setTimeout(() => {
      setSimStep(2);
      setSimLogs((prev) => [
        ...prev,
        { time: '00:00.38', text: '⚡ [SHOPEE API] Quét thấy 12 voucher 50% & flash sale mới!', color: 'text-amber-400' }
      ]);
    }, 900);

    setTimeout(() => {
      setSimStep(3);
      setSimLogs((prev) => [
        ...prev,
        { time: '00:00.75', text: '🧠 [AI REWRITE] GPT-4o lọc deal sốc nhất & tự động gắn link Affiliate cá nhân...', color: 'text-purple-400' }
      ]);
    }, 1800);

    setTimeout(() => {
      setSimStep(4);
      setSimLogs((prev) => [
        ...prev,
        { time: '00:01.10', text: '📢 [TELEGRAM BOT] Bắn bài kèm ảnh & nút mua vào kênh 5.000 thành viên...', color: 'text-blue-400' },
        { time: '00:01.35', text: '💰 [HOA HỒNG] Khách click đặt hàng: +45.000đ hoa hồng thụ động ghi nhận!', color: 'text-emerald-400 font-bold' }
      ]);
      setSimRunning(false);
    }, 2700);
  };

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
      {/* KHỐI 1: HERO SECTION 3D (LUMINOUS HORIZON + 3D INFLATED ASSETS) */}
      {/* ============================================================== */}
      <section className="relative pt-20 sm:pt-28 pb-32 sm:pb-36 bg-[linear-gradient(to_bottom,#000000,#130728_32%,#2e1065_62%,#6d28d9_90%)] overflow-hidden border-b border-purple-950/40">
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
              href="#simulation"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-purple-500/40 bg-purple-950/40 hover:bg-purple-900/50 text-white font-bold text-sm backdrop-blur-md transition flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
            >
              <Activity className="w-4 h-4 text-purple-400 shrink-0 animate-pulse" />
              <span>Xem Demo Hoạt Động</span>
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
      {/* KHỐI 2: BĂNG CHUYỀN MARQUEE ĐỐI TÁC & HỆ SINH THÁI */}
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
      {/* KHỐI 3: KHO SẢN PHẨM MỞ BÁN (ĐẶT NGAY TRÊN CAO - CHỐT ĐƠN LIỀN) */}
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
      {/* KHỐI 4: KHUNG MAC OS 3D MÔ PHỎNG BOT CHẠY THỰC TẾ (DEMO SHOWCASE) */}
      {/* ============================================================== */}
      <section id="simulation" className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl p-6 sm:p-10 bg-[#090d16] border border-white/10 shadow-[0_0_60px_rgba(124,58,237,0.12)] relative overflow-hidden">
          {/* Top Window Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block"></span>
                <span className="ml-2 text-xs font-mono text-slate-400">kiet-automation-engine // live-workflow-v2026.1</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                Kiểm Chứng Thực Tế: Mô Phỏng Bot Săn Deal Tự Động 24/7
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Bấm nút chạy thử bên dưới để xem luồng dữ liệu tự động quét deal Shopee, gọi AI gắn link và nổ hoa hồng.
              </p>
            </div>

            <button
              type="button"
              onClick={runSimulation}
              disabled={simRunning}
              className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition shadow-xl shrink-0 ${
                simRunning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30 active:scale-95 shimmer-btn'
              }`}
            >
              <Play className={`w-4 h-4 ${simRunning ? 'animate-spin' : 'fill-current'}`} />
              <span>{simRunning ? 'Đang chạy mô phỏng...' : 'Kích Hoạt Chạy Thử Ngay'}</span>
            </button>
          </div>

          {/* Interactive Pipeline Nodes (4 Stages) */}
          <div className="py-10 grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative">
            {/* Stage 1 */}
            <div
              className={`p-5 rounded-2xl transition-all duration-300 relative border flex flex-col justify-between ${
                simStep >= 1
                  ? 'bg-amber-500/10 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                  : 'bg-black/40 border-white/5 opacity-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Trạm 1: Trigger
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-white">API Shopee Flash Sale</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Tự động quét toàn bộ mã giảm 50% & voucher chớp nhoáng 24/7.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] font-bold text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span>Tìm thấy 12 voucher</span>
              </div>
            </div>

            {/* Stage 2 */}
            <div
              className={`p-5 rounded-2xl transition-all duration-300 relative border flex flex-col justify-between ${
                simStep >= 2
                  ? 'bg-purple-500/10 border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                  : 'bg-black/40 border-white/5 opacity-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Trạm 2: Xử Lý AI
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-white">OpenAI GPT-4o Filter</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Lọc deal sốc nhất, tự viết caption giật tít & gắn link Affiliate cá nhân.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-500/20 text-[11px] font-bold text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Gắn link affiliate 100%</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div
              className={`p-5 rounded-2xl transition-all duration-300 relative border flex flex-col justify-between ${
                simStep >= 3
                  ? 'bg-blue-500/10 border-blue-500/60 shadow-[0_0_30px_rgba(59,130,246,0.15)]'
                  : 'bg-black/40 border-white/5 opacity-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold shadow-md">
                    <Send className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Trạm 3: Phát Sóng
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-white">Telegram Broadcaster</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Tự động đăng bài định dạng Markdown đẹp mắt kèm ảnh và nút Mua Ngay.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-500/20 text-[11px] font-bold text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Kênh 5.000 thành viên</span>
              </div>
            </div>

            {/* Stage 4 */}
            <div
              className={`p-5 rounded-2xl transition-all duration-300 relative border flex flex-col justify-between ${
                simStep >= 4
                  ? 'bg-emerald-500/15 border-emerald-500 shadow-[0_0_35px_rgba(16,185,129,0.25)]'
                  : 'bg-black/40 border-white/5 opacity-50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Trạm 4: Kết Quả
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-white">Hoa Hồng Về Ví Thụ Động</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Khách click mua deal từ kênh ➔ Hoa hồng Shopee Affiliate tự động ghi nhận.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-500/20 text-[11px] font-black text-emerald-400 flex items-center gap-1.5">
                <span>+45.000 đ / đơn hàng</span>
              </div>
            </div>
          </div>

          {/* Terminal Console Log Output */}
          <div className="rounded-2xl bg-[#03060d] border border-white/10 p-4 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="ml-2 font-bold text-slate-300">live-workflow-terminal.log</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">● 24/7 ACTIVE</span>
                <span>Latency: 12ms</span>
              </div>
            </div>
            <div className="space-y-1.5">
              {simLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-slate-500 shrink-0">[{log.time}]</span>
                  <span className={log.color}>{log.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* KHỐI 5: PHẢN HỒI KHÁCH HÀNG THỰC TẾ (SOCIAL PROOF & REVIEWS) */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
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
      {/* KHỐI 6: CAM KẾT FOUNDER + 3 BƯỚC NHẬN FILE & FAQ (CHỐT HẠ ĐƠN) */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
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
