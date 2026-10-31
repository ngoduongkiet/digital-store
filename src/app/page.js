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
  Play, Terminal, Flame, ShoppingBag, Send, DollarSign, XCircle,
  Calculator, Sliders, Activity
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

  // --- ROI CALCULATOR STATE ---
  const [hoursPerDay, setHoursPerDay] = useState(4);

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
    { name: 'n8n Cloud', tag: 'Workflow' },
    { name: 'Telegram Bot API', tag: 'Broadcasting' },
    { name: 'Shopee Affiliate', tag: 'Ecommerce' },
    { name: 'TikTok Shop', tag: 'Commerce' },
    { name: 'ChatGPT-4o', tag: 'AI Model' },
    { name: 'Claude 3.5 Sonnet', tag: 'Reasoning' },
    { name: 'Google Gemini Pro', tag: 'AI Engine' },
    { name: 'Excel / CSV', tag: 'B2B Database' },
    { name: 'VietQR Napas 24/7', tag: 'Instant Pay' }
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

  // ROI calculations
  const hoursSavedPerMonth = Math.round(hoursPerDay * 30 * 0.85);
  const moneyValueSaved = (hoursSavedPerMonth * 50000).toLocaleString('vi-VN');

  return (
    <div className="relative overflow-hidden transition-colors">
      {/* 1. HERO SECTION WITH ATMOSPHERIC AURORA LIGHTING */}
      <section className="relative pt-16 sm:pt-24 pb-16 sm:pb-24 bg-grid-tech border-b border-slate-200/80 dark:border-slate-800">
        {/* Glow Sphere Ambient Lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          {/* Announcement Pill with Glowing Dot */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-slate-800 dark:text-slate-200 text-xs font-bold mb-6 shadow-sm max-w-full overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="truncate">Kho Tài Nguyên Số & Tự Động Hóa MMO 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18] max-w-4xl mx-auto">
            Giải Phóng 90% Sức Lao Động <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
              Nhân Bản Thu Nhập MMO
            </span>
          </h1>

          <p className="mt-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Các kịch bản tự động hóa Make.com/n8n, data B2B chất lượng cao và bộ câu lệnh AI thực chiến.
            <strong className="text-slate-900 dark:text-white block sm:inline"> Quét mã VietQR nhận file trực tiếp sau 3 giây!</strong>
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <a
              href="#products"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shimmer-btn"
            >
              <span>Xem Kho Tài Nguyên Mở Bán</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
            <a
              href="#simulation"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl glass-card text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4 text-indigo-500 shrink-0" />
              <span>Xem Bot Chạy Thử Thực Tế</span>
            </a>
          </div>

          {/* 3 Metric Cards */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto gap-3.5">
            <div className="p-4 rounded-2xl glass-card flex items-center justify-center sm:justify-start gap-3.5 h-full">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-slate-900 dark:text-white leading-none">3 Giây</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Nhả file tự động</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card flex items-center justify-center sm:justify-start gap-3.5 h-full">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-slate-900 dark:text-white leading-none">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Sạch & Bảo mật</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass-card flex items-center justify-center sm:justify-start gap-3.5 h-full">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-slate-900 dark:text-white leading-none">Trọn Đời</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Hỗ trợ Ultraviewer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MOVING MARQUEE (MAGIC UI STYLE) */}
      <section className="border-b border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-950/40 py-3.5 overflow-hidden relative">
        {/* Left & Right Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 dark:from-[#07090e] to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 dark:from-[#07090e] to-transparent z-10"></div>

        <div className="animate-marquee flex items-center gap-3">
          {[...marqueePlatforms, ...marqueePlatforms].map((platform, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-xl glass-card text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 whitespace-nowrap shadow-xs hover:border-indigo-500/40 transition shrink-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
              <span className="font-extrabold">{platform.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-normal">
                {platform.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE LIVE AUTOMATION WORKFLOW SIMULATOR */}
      <section id="simulation" className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-indigo-500/20 dark:border-indigo-500/30 shadow-2xl shadow-indigo-500/5 relative overflow-hidden">
          {/* Top Label */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>Trải Nghiệm Trực Quan Thực Tế</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                Mô Phỏng Bot Tự Động Săn Deal & Bắn Telegram 24/7
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Xem luồng dữ liệu chạy tự động từ lúc quét deal Shopee đến khi hoa hồng thụ động về ví bạn.
              </p>
            </div>

            <button
              type="button"
              onClick={runSimulation}
              disabled={simRunning}
              className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition shadow-lg shrink-0 ${
                simRunning
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-indigo-500/25 active:scale-95 shimmer-btn'
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
                  ? 'bg-amber-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md">
                    <Flame className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    Trạm 1: Trigger
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">API Shopee Flash Sale</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Tự động quét toàn bộ mã giảm 50% & voucher chớp nhoáng 24/7.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span>Tìm thấy 12 voucher</span>
              </div>
            </div>

            {/* Stage 2 */}
            <div
              className={`p-5 rounded-2xl transition-all duration-300 relative border flex flex-col justify-between ${
                simStep >= 2
                  ? 'bg-purple-500/10 border-purple-500/50 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    Trạm 2: Xử Lý AI
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">OpenAI GPT-4o Filter</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Lọc deal sốc nhất, tự viết caption giật tít & gắn link Affiliate cá nhân.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-500/20 text-[11px] font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                <span>Gắn link affiliate 100%</span>
              </div>
            </div>

            {/* Stage 3 */}
            <div
              className={`p-5 rounded-2xl transition-all duration-300 relative border flex flex-col justify-between ${
                simStep >= 3
                  ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold shadow-md">
                    <Send className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Trạm 3: Phát Sóng
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Telegram Broadcaster</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Tự động đăng bài định dạng Markdown đẹp mắt kèm ảnh và nút Mua Ngay.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-500/20 text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Kênh 5.000 thành viên</span>
              </div>
            </div>

            {/* Stage 4 */}
            <div
              className={`p-5 rounded-2xl transition-all duration-300 relative border flex flex-col justify-between ${
                simStep >= 4
                  ? 'bg-emerald-500/15 border-emerald-500 shadow-xl shadow-emerald-500/15'
                  : 'bg-slate-100/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Trạm 4: Kết Quả
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Hoa Hồng Về Ví Thụ Động</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Khách click mua deal từ kênh ➔ Hoa hồng Shopee Affiliate tự động ghi nhận.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-500/20 text-[11px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span>+45.000 đ / đơn hàng</span>
              </div>
            </div>
          </div>

          {/* Terminal Console Log Output */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800 text-slate-400 text-[11px]">
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

      {/* 4. SEARCH & FILTERS BAR */}
      <section id="products" className="max-w-6xl mx-auto px-4 pt-6 pb-6">
        <div className="glass-card p-4 sm:p-5 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-64 lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm công cụ, data..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
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

      {/* 5. PRODUCTS SECTION */}
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

      {/* 6. BEFORE VS AFTER COMPARISON (HIGH CONVERTING MATRIX) */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 text-xs font-black uppercase tracking-wider mb-2">
            Đòn Bẩy Năng Suất
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Sự Khác Biệt Khi Bạn Áp Dụng Tự Động Hóa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Đừng lãng phí tuổi trẻ vào những thao tác thủ công lặp đi lặp lại
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* OLD MANUAL WAY */}
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-300/60 dark:border-rose-900/40 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-rose-700 dark:text-rose-400">
                    Làm Thủ Công Truyền Thống
                  </h3>
                  <div className="text-xs text-rose-600/70 dark:text-rose-400/60 font-semibold">
                    Tốn công sức • Hiệu quả bấp bênh
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Mất 6 - 8 tiếng mỗi ngày cắm mặt vào máy tính ngồi canh từng deal và voucher giảm giá.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Chậm tay chỉ 5 giây là voucher 50% bị đối thủ hốt sạch, mất trắng cơ hội bán hàng.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Mỏi mắt, đau lưng, không còn thời gian cho gia đình, học tập hoặc công việc chính.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Hễ bạn tắt máy đi ngủ là dòng tiền hoa hồng dừng lại 100%.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-rose-300/40 dark:border-rose-900/40 text-xs font-bold text-rose-600 dark:text-rose-400">
              Lãng phí 180 - 240 giờ làm việc vô ích mỗi tháng
            </div>
          </div>

          {/* NEW AUTOMATION WAY */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-emerald-500/50 shadow-xl shadow-emerald-500/10 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 blur-3xl pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-emerald-600 dark:text-emerald-400">
                    Dùng Kịch Bản MMO Tự Động
                  </h3>
                  <div className="text-xs text-emerald-600/70 dark:text-emerald-400/60 font-semibold">
                    Giải phóng sức người • Thu nhập thụ động
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>Kịch bản chạy ngầm 24/7 trên đám mây Make/n8n, tắt máy tính đi ngủ kịch bản vẫn săn deal đều đặn.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>Tự động quét và bắt trọn mọi deal ngon trong 0.3 giây với API siêu tốc, không bao giờ trễ nhịp.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>AI tự viết caption hấp dẫn, tự động chèn link tiếp thị affiliate và đẩy vào Telegram/Facebook.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>Bạn thảnh thơi làm việc chính hoặc đi chơi, hoa hồng vẫn đổ về tài khoản ngân hàng.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-500/20 text-xs font-black text-emerald-600 dark:text-emerald-400">
              Giải phóng 90% thời gian • Tăng gấp 10 lần hiệu suất làm MMO
            </div>
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE TIME SAVER & ROI CALCULATOR */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-wider mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Bảng Tính Tiết Kiệm Thời Gian</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Bạn Sẽ Tiết Kiệm Được Bao Nhiêu Giờ Mỗi Tháng?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Kéo thanh trượt để tính toán thời gian và giá trị công sức bạn giải phóng được nhờ tự động hóa.
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-slate-400 block">Đầu tư một lần chỉ từ</span>
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">99.000 đ</span>
            </div>
          </div>

          <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Slider Control */}
            <div className="md:col-span-7 space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  Số giờ bạn dành cho MMO / bán hàng mỗi ngày:
                </label>
                <span className="px-3 py-1 rounded-xl bg-indigo-600 text-white font-black text-sm">
                  {hoursPerDay} Giờ / ngày
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-bold">
                <span>1 tiếng (Bán thời gian)</span>
                <span>4 tiếng (Bán chuyên)</span>
                <span>8 tiếng (Toàn thời gian)</span>
              </div>
            </div>

            {/* Live Reactive Numbers */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-center">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Tiết kiệm mỗi tháng
                </span>
                <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  {hoursSavedPerMonth} Giờ
                </span>
                <span className="text-[10px] text-indigo-500 block mt-1">Thảnh thơi nghỉ ngơi</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-center">
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Giá trị công sức
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  ~{moneyValueSaved} đ
                </span>
                <span className="text-[10px] text-emerald-500 block mt-1">Quy đổi 50k/giờ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BENTO GRID SHOWCASE */}
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Bento 1: Automation Engine (7 Cols) */}
          <div className="md:col-span-7 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 h-full">
            <div className="space-y-3">
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
          <div className="md:col-span-5 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 h-full">
            <div className="space-y-3">
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
          <div className="md:col-span-4 glass-card p-6 rounded-3xl flex flex-col justify-between space-y-3 h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">500+ Prompt AI Chuẩn AIDA</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5">
                Câu lệnh tối ưu cho ChatGPT-4o & Claude 3.5 Sonnet. Viết kịch bản video TikTok 15s giữ chân người xem và bài quảng cáo Facebook nổ đơn.
              </p>
            </div>
            <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 pt-2">
              ✓ Tối ưu riêng cho sàn TMĐT
            </div>
          </div>

          {/* Bento 4: VietQR Fast Delivery (4 Cols) */}
          <div className="md:col-span-4 glass-card p-6 rounded-3xl flex flex-col justify-between space-y-3 h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">Giao Hàng Sau 3 Giây</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5">
                Mã VietQR Napas 24/7 nhận diện tiền lập tức. Hệ thống tự động chuyển hướng sang trang nhận file và gửi link dự phòng về email của bạn.
              </p>
            </div>
            <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 pt-2">
              ✓ Tự động nhả file 24/7
            </div>
          </div>

          {/* Bento 5: Ultraviewer Support (4 Cols) */}
          <div className="md:col-span-4 glass-card p-6 rounded-3xl flex flex-col justify-between space-y-3 h-full">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-3">
                <Laptop className="w-5 h-5" />
              </div>
              <h4 className="font-black text-base text-slate-900 dark:text-white">Hỗ Trợ Kỹ Thuật 1-1</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-1.5">
                Nếu bạn không rành về code hay máy tính, Kiệt sẽ trực tiếp kết nối UltraViewer qua Zalo để cài đặt hoàn thiện cho bạn hoàn toàn miễn phí.
              </p>
            </div>
            <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 pt-2">
              ✓ Đồng hành tới khi chạy được
            </div>
          </div>
        </div>
      </section>

      {/* 9. PROMO BANNER: VOUCHER KHAITRUONG */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300/50 dark:border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
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
            <span className="font-mono font-black text-sm text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-4 py-2.5 rounded-xl border border-amber-300 dark:border-amber-800 whitespace-nowrap">
              KHAITRUONG
            </span>
            <button
              type="button"
              onClick={() => handleCopyCoupon('KHAITRUONG')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm whitespace-nowrap"
            >
              {copiedCoupon ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCoupon ? 'Đã sao chép' : 'Sao chép mã'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 10. REAL PROCESS STEPS (HOW IT WORKS) */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
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
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-black text-lg flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-900/60 shadow-inner">
                  02
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                  Quét Mã VietQR Napas Tự Động
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Mở app ngân hàng (Techcombank, Vietcombank, MBBank...) quét mã QR. Số tiền và nội dung chuyển khoản được điền sẵn chuẩn xác 100%.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                ✓ Hỗ trợ toàn bộ ngân hàng VN
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-black text-lg flex items-center justify-center mb-6 border border-emerald-100 dark:border-emerald-900/60 shadow-inner">
                  03
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                  Nhận File Tức Thì Sau 3 Giây
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Màn hình tự động chuyển sang trang tải file nguyên bản không quảng cáo. Bạn có thể tra cứu và tải lại file trọn đời bằng mã đơn hàng.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                ✓ Tải lại trọn đời không giới hạn
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQS ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
            Giải Đáp Thắc Mắc
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Mọi thắc mắc của bạn về việc mua và sử dụng tài nguyên số
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Banner */}
        <div className="mt-10 p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Cần tư vấn thêm trước khi mua?</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Kiệt luôn trực Zalo & Telegram hỗ trợ bạn 24/7</p>
            </div>
          </div>
          <a
            href="https://zalo.me/0352279413"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-2 shrink-0 shadow-md shadow-indigo-600/20"
          >
            <span>Nhắn Zalo: 0352.279.413</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
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
