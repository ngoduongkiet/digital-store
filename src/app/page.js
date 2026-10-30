'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import {
  Sparkles, ShieldCheck, Zap, HelpCircle, Search,
  ArrowUpDown, CheckCircle, TrendingUp, Shield, Lock, Award,
  CheckCircle2, FileText, ChevronDown, Copy, Check, MessageCircle,
  Clock, RefreshCw, Laptop
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
    <div className="dark:bg-slate-950 transition-colors">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-24 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 dark:from-slate-900/90 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/70 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/90 dark:bg-indigo-950/90 text-indigo-700 dark:text-indigo-300 text-xs font-black mb-6 shadow-sm border border-indigo-200/60 dark:border-indigo-800/60">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Kho Tài Nguyên Số & Tự Động Hóa MMO Chuẩn 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18] max-w-4xl mx-auto">
            Tự Động Hóa Công Việc <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
              Nhân Bản Thu Nhập MMO
            </span>
          </h1>

          <p className="mt-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Các kịch bản Make.com/n8n thực chiến, dữ liệu B2B chất lượng cao và bộ công cụ tạo ra dòng tiền thụ động.
            <strong className="text-slate-900 dark:text-white block sm:inline"> Nhận link tải trực tiếp trong 3 giây sau khi quét mã VietQR!</strong>
          </p>

          {/* Key genuine trust metrics - Symmetrical 3 Columns */}
          <div className="mt-10 pt-8 border-t border-indigo-100/80 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto gap-4">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 backdrop-blur-md shadow-sm flex items-center justify-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-slate-900 dark:text-white">3 Giây</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Nhận file tự động</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 backdrop-blur-md shadow-sm flex items-center justify-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-xl font-black text-slate-900 dark:text-white">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Sạch & Bảo mật</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 backdrop-blur-md shadow-sm flex items-center justify-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
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

      {/* SEARCH & FILTERS BAR - Centered Symmetrical Card */}
      <section className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm công cụ, data..."
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/70 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Categories Pills - Even horizontal spacing */}
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

          {/* Sorting Dropdown */}
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

      {/* PRODUCTS SECTION - Symmetrical Grid */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Tài Nguyên Đang Mở Bán
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tệp gốc nguyên bản • Đã kiểm duyệt an toàn • Đi kèm hướng dẫn cài đặt 3 phút
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full self-start sm:self-auto">
            Hiển thị {filtered.length} tài nguyên
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">Đang tải danh sách sản phẩm...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <h3 className="font-bold text-slate-800 dark:text-white text-base">Không tìm thấy sản phẩm phù hợp!</h3>
            <p className="text-xs text-slate-400 mt-1">Hãy thử tìm với từ khóa khác hoặc bấm chọn Tất cả sản phẩm.</p>
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

      {/* PROMO BANNER: VOUCHER KHAITRUONG - Symmetrical and Actionable */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300/50 dark:border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-lg shadow-amber-500/30">
              %
            </div>
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[11px] font-black uppercase tracking-wider mb-1">
                Ưu Đãi Đặc Biệt Hôm Nay
              </div>
              <h4 className="font-black text-base sm:text-lg text-slate-900 dark:text-white">
                Giảm ngay 20.000đ mừng khai trương Kiệt Digital Store
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Áp dụng cho mọi tài nguyên trên website. Nhập mã tại bước thanh toán để nhận giảm giá ngay.
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

      {/* TRUST & GUARANTEE BANNER - Balanced 2-Column Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-indigo-900/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-indigo-200">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Cam kết chất lượng chuẩn 100%</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Mua Một Lần - Sở Hữu & Nhận Cập Nhật Trọn Đời
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              Mọi kịch bản và dữ liệu đều do chính chúng tôi tối ưu và sử dụng thực chiến trước khi đăng bán. Khi thuật toán nền tảng (Shopee, Telegram, AI...) cập nhật mới, bạn sẽ nhận được bản cập nhật miễn phí ngay tại link tải cá nhân mà không phải trả thêm bất kỳ chi phí nào.
            </p>
          </div>

          {/* Symmetrical 2x2 Feature Box on the right */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div className="text-xs font-black text-white">Sạch 100% Virus</div>
              <div className="text-[11px] text-indigo-200">Đã kiểm duyệt kỹ thuật</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div className="text-xs font-black text-white">Hỗ Trợ Ultraviewer</div>
              <div className="text-[11px] text-indigo-200">Cài đặt 1-1 qua Zalo</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div className="text-xs font-black text-white">Tải Lại Trọn Đời</div>
              <div className="text-[11px] text-indigo-200">Không lo mất file</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div className="text-xs font-black text-white">Hoàn Tiền 100%</div>
              <div className="text-[11px] text-indigo-200">Nếu xảy ra lỗi file</div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL PROCESS STEPS - Symmetrical 3 Columns */}
      <section className="bg-slate-100/70 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-20">
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
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-black text-lg flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-900/60 shadow-inner">
                  01
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                  Chọn Tài Nguyên & Nhập Email
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Bấm "Xem thử" để kiểm tra dữ liệu mẫu, sau đó nhập email cá nhân để hệ thống cấp bản quyền và gửi link tải dự phòng.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                ✓ Miễn phí xem trước dữ liệu
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between h-full">
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
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                ✓ Chuyển khoản chuẩn Napas 24/7
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between h-full">
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
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] font-bold text-violet-600 dark:text-violet-400">
                ✓ Nhận file sau 3 giây
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION - Clean Centered Accordion */}
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
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm transition"
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
        <div className="mt-10 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
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
