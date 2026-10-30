'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import {
  Sparkles, ShieldCheck, Zap, HelpCircle, Search,
  ArrowUpDown, CheckCircle, TrendingUp, Shield, Lock, Award,
  CheckCircle2, FileText, ChevronDown, Copy, Check, MessageCircle,
  Clock, RefreshCw, Laptop, ArrowRight, Bot, Database, Cpu, ExternalLink
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

  const platforms = [
    { name: 'Make.com', category: 'Automation' },
    { name: 'n8n.io', category: 'Workflow' },
    { name: 'Telegram Bot API', category: 'Broadcasting' },
    { name: 'Shopee Affiliate', category: 'Ecommerce' },
    { name: 'TikTok Shop', category: 'Commerce' },
    { name: 'OpenAI GPT-4o', category: 'AI Models' },
    { name: 'Google Sheets', category: 'Data' },
    { name: 'VietQR Napas', category: 'Instant Pay' }
  ];

  const faqs = [
    {
      q: 'Sau khi chuyển khoản bao lâu tôi nhận được file?',
      a: 'Hệ thống kết nối trực tiếp cổng thanh toán ngân hàng tự động. Ngay khi bạn quét mã VietQR và ngân hàng ghi nhận, màn hình sẽ lập tức chuyển đến trang nhận file kèm đường link tải trực tiếp nguyên bản. Đồng thời thông tin đơn hàng cũng được lưu lại để bạn tra cứu bất kỳ lúc nào.'
    },
    {
      q: 'Tôi không rành về kỹ thuật/code, có cài đặt và sử dụng được không?',
      a: 'Hoàn toàn được! Mỗi sản phẩm đều được đóng gói tỉ mỉ kèm theo video hướng dẫn ngắn 3 phút từng thao tác click chuột. Ngoài ra, bạn luôn có thể nhắn tin trực tiếp qua Zalo để chúng tôi hỗ trợ UltraViewer cài đặt giúp bạn miễn phí.'
    },
    {
      q: 'Nếu tải về file bị lỗi hoặc không chạy được thì sao?',
      a: 'Chúng tôi cam kết bảo hành 1-1: Hỗ trợ kỹ thuật trực tiếp đến khi công cụ hoạt động trơn tru trên thiết bị của bạn. Trong trường hợp xảy ra lỗi do hệ thống mà không khắc phục được, chúng tôi hoàn lại 100% số tiền bạn đã thanh toán qua tài khoản ngân hàng.'
    },
    {
      q: 'Làm sao để tải lại file nếu sau này tôi đổi máy tính hoặc làm mất file?',
      a: 'Rất đơn giản! Bạn chỉ cần vào mục "Tra cứu đơn hàng" trên thanh menu trên cùng, nhập địa chỉ Email hoặc Mã đơn hàng đã dùng khi mua là có thể bấm tải lại toàn bộ tài liệu bất kỳ lúc nào, hoàn toàn miễn phí trọn đời.'
    }
  ];

  return (
    <div className="relative overflow-hidden transition-colors">
      {/* HERO SECTION WITH ATMOSPHERIC AURORA LIGHTING */}
      <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-28 bg-grid-tech border-b border-slate-200/80 dark:border-slate-800">
        {/* Glow Sphere Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 right-10 w-72 h-72 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          {/* Announcement Pill with Glowing Dot */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card text-slate-800 dark:text-slate-200 text-xs font-bold mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Kho Tài Nguyên Số & Tự Động Hóa MMO 2026</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-indigo-600 dark:text-indigo-400 font-extrabold">Bản Chuẩn Thực Chiến</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Giải Phóng 90% Sức Lao Động <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
              Nhân Bản Thu Nhập MMO
            </span>
          </h1>

          <p className="mt-6 text-slate-600 dark:text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Các kịch bản tự động hóa Make.com/n8n, data B2B chất lượng cao và bộ câu lệnh AI thực chiến.
            <strong className="text-slate-900 dark:text-white block sm:inline"> Quét mã VietQR nhận file trực tiếp sau 3 giây!</strong>
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#products"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 transition transform hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <span>Xem Kho Tài Nguyên Mở Bán</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="px-6 py-3.5 rounded-2xl glass-card text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition"
            >
              Quy trình 3 bước mua hàng
            </a>
          </div>

          {/* Key Metric Cards */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto gap-4">
            <div className="p-4 rounded-2xl glass-card flex items-center justify-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-slate-900 dark:text-white">3 Giây</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Nhả file tự động</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card flex items-center justify-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-slate-900 dark:text-white">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Sạch & Bảo mật</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card flex items-center justify-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-slate-900 dark:text-white">Trọn Đời</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Hỗ trợ Ultraviewer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTED PLATFORMS ECOSYSTEM STRIP */}
      <section className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 py-5">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 shrink-0">
            Hệ sinh thái tương thích:
          </span>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3">
            {platforms.map((p, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/70 dark:border-slate-800 flex items-center gap-1.5 shadow-2xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                <span>{p.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS BAR */}
      <section id="products" className="max-w-6xl mx-auto px-4 pt-12 pb-6">
        <div className="glass-card p-4 sm:p-5 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm công cụ, kịch bản, data..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-white/25 text-white font-extrabold' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="DEFAULT">Thứ tự mặc định</option>
              <option value="PRICE_ASC">Giá: Thấp đến Cao</option>
              <option value="PRICE_DESC">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-slate-200/60 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Tài Nguyên Đang Mở Bán
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              File sạch nguyên bản • Tải về dùng ngay • Đầy đủ video hướng dẫn
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full self-start sm:self-auto">
            {filtered.length} tài nguyên sẵn sàng tải
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">Đang tải danh sách sản phẩm...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 glass-card rounded-3xl p-8">
            <h3 className="font-bold text-slate-800 dark:text-white text-base">Không tìm thấy sản phẩm phù hợp!</h3>
            <p className="text-xs text-slate-400 mt-1">Hãy thử tìm với từ khóa khác hoặc chuyển danh mục.</p>
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
      </section>

      {/* BENTO GRID SHOWCASE (APPLE / LINEAR STYLE) */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
            Tại Sao Chọn Kiệt Digital Store?
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Giá Trị Thực Chiến - Không Lý Thuyết Suông
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Được xây dựng bởi người làm thực tế cho cộng đồng kinh doanh online tại Việt Nam
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Bento 1: Automation Engine (7 Cols) */}
          <div className="md:col-span-7 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Kịch Bản Tự Động Hóa Chạy 24/7 Không Cần Treo Máy
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Các blueprint n8n và Make.com đã được thiết lập sẵn các khối API: Quét deal Shopee, gọi AI lọc mã 50%, tự động gắn link affiliate và đẩy vào Telegram đúng chu kỳ. Bạn chỉ cần import file và nhập token là xong.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-mono space-y-1">
              <div className="text-emerald-500 font-bold">● Make.com Scenario: Active</div>
              <div>Trigger: Every 15 min → Shopee Deals → AI Rewrite → Telegram Push</div>
            </div>
          </div>

          {/* Bento 2: Data B2B (5 Cols) */}
          <div className="md:col-span-5 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between space-y-6">
            <div className="space-y-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Dữ Liệu Khách Hàng B2B Chuẩn Xác Tới 90%
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Được quét công khai từ Google Maps tại TP.HCM, lọc sạch số bàn chết. Sẵn sàng cho chiến dịch gọi Telesale, chào hàng phần mềm POS hoặc nguyên liệu quán cà phê.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              ✓ 1.500 SĐT thật • Có địa chỉ Quận • Đánh giá sao
            </div>
          </div>

          {/* Bento 3: AI Prompts (4 Cols) */}
          <div className="md:col-span-4 glass-card p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-black text-base text-slate-900 dark:text-white">500+ Prompt AI Chuẩn AIDA</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Câu lệnh tối ưu cho ChatGPT-4o & Claude 3.5 Sonnet. Viết kịch bản video TikTok 15s giữ chân người xem và bài quảng cáo Facebook nổ đơn.
            </p>
          </div>

          {/* Bento 4: VietQR Fast Delivery (4 Cols) */}
          <div className="md:col-span-4 glass-card p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-black text-base text-slate-900 dark:text-white">Giao Hàng Sau 3 Giây</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mã VietQR Napas 24/7 nhận diện tiền lập tức. Hệ thống tự động chuyển hướng sang trang nhận file và gửi link dự phòng về email của bạn.
            </p>
          </div>

          {/* Bento 5: Ultraviewer Support (4 Cols) */}
          <div className="md:col-span-4 glass-card p-6 rounded-3xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Laptop className="w-5 h-5" />
            </div>
            <h4 className="font-black text-base text-slate-900 dark:text-white">Hỗ Trợ Kỹ Thuật 1-1</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Nếu bạn không rành về code hay máy tính, Kiệt sẽ trực tiếp kết nối UltraViewer qua Zalo để cài đặt hoàn thiện cho bạn hoàn toàn miễn phí.
            </p>
          </div>
        </div>
      </section>

      {/* PROMO BANNER: VOUCHER KHAITRUONG */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300/50 dark:border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-lg shadow-amber-500/30">
              %
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[11px] font-black uppercase tracking-wider mb-1">
                Ưu Đãi Khai Trương Hôm Nay
              </div>
              <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                Giảm ngay 20.000đ mừng khai trương Kiệt Digital Store
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Áp dụng cho mọi đơn hàng. Bấm sao chép mã và dán vào ô giảm giá khi thanh toán.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono font-black text-sm text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-4 py-2.5 rounded-xl border border-amber-300 dark:border-amber-800">
              KHAITRUONG
            </span>
            <button
              type="button"
              onClick={() => handleCopyCoupon('KHAITRUONG')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              {copiedCoupon ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCoupon ? 'Đã sao chép' : 'Sao chép mã'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* REAL PROCESS STEPS (HOW IT WORKS) */}
      <section id="how-it-works" className="bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
              Quy Trình Tự Động Hóa 24/7
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Mua Hàng & Giao Nhận Chỉ Với 3 Bước
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Minh bạch, bảo mật và nhả file trực tiếp ngay trên màn hình của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-3xl flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-black text-lg flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-900/60 shadow-inner">
                  01
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                  Chọn Tài Nguyên & Nhập Email
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Bấm "Xem thử" để kiểm tra cấu trúc dữ liệu mẫu, sau đó nhập email cá nhân để hệ thống cấp quyền tải về và gửi bản lưu.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                ✓ Miễn phí xem trước dữ liệu
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-black text-lg flex items-center justify-center mb-6 border border-emerald-100 dark:border-emerald-900/60 shadow-inner">
                  02
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                  Quét Mã VietQR Ngân Hàng
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Mở ứng dụng ngân hàng bất kỳ (Techcombank, Vietcombank, MB, Momo...) quét mã QR có sẵn số tiền và mã đơn hàng chính xác.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                ✓ Chuyển khoản chuẩn Napas 24/7
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 font-black text-lg flex items-center justify-center mb-6 border border-violet-100 dark:border-violet-900/60 shadow-inner">
                  03
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                  Nhận File Tức Thì & Hỗ Trợ 1-1
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Màn hình tự động nhả link tải file gốc nguyên bản kèm video hướng dẫn 3 phút. Kèm hỗ trợ kỹ thuật cài đặt từ xa qua Zalo.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-violet-600 dark:text-violet-400">
                ✓ Nhận file sau 3 giây
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider mb-2">
            Giải Đáp Thắc Mắc
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Câu Hỏi Thường Gặp</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Những thông tin cần biết trước khi mua tài nguyên tại Kiệt Digital Store
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-3xl overflow-hidden shadow-sm transition"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 sm:p-6 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-12 sm:pl-14 border-t border-slate-100 dark:border-slate-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Callout Box */}
        <div className="mt-10 p-6 rounded-3xl glass-card text-center space-y-3">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Bạn vẫn còn câu hỏi khác cần được tư vấn chi tiết trước khi đặt mua?
          </p>
          <a
            href="https://zalo.me/0352279413"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Zalo trực tiếp với Kiệt (0352.279.413)</span>
          </a>
        </div>
      </section>

      {/* CHECKOUT MODAL */}
      {activeProduct && (
        <CheckoutModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}

      {/* PREVIEW MODAL */}
      {previewProduct && (
        <PreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          onBuy={(prod) => setActiveProduct(prod)}
        />
      )}
    </div>
  );
}
