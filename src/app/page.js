'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';
import {
  Sparkles, ShieldCheck, Zap, HelpCircle, Search,
  ArrowUpDown, CheckCircle, TrendingUp, Shield, Lock, Award,
  CheckCircle2, FileText, ChevronDown
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
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

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
      <section className="relative overflow-hidden pt-14 pb-20 bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 dark:from-slate-900/90 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/90 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold mb-6 shadow-sm border border-indigo-200/50 dark:border-indigo-800/50">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Kho Tài Nguyên Số & Tự Động Hóa MMO Chuẩn 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Tự Động Hóa Công Việc <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
              Nhân Bản Thu Nhập MMO
            </span>
          </h1>

          <p className="mt-5 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Các kịch bản Make.com/n8n thực chiến, dữ liệu B2B chất lượng cao và bộ công cụ tạo ra dòng tiền thụ động.
            <strong className="text-slate-900 dark:text-white"> Nhận link tải trực tiếp trong 3 giây sau khi quét mã VietQR!</strong>
          </p>

          {/* Key genuine trust metrics */}
          <div className="mt-8 pt-6 border-t border-indigo-100/80 dark:border-slate-800 grid grid-cols-3 max-w-xl mx-auto gap-4">
            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">3 Giây</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Nhận file tự động</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">100%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Sạch & Bảo mật</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400">Trọn Đời</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Hỗ trợ kỹ thuật 1-1</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS BAR */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm công cụ, kịch bản, data..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="DEFAULT">Thứ tự mặc định</option>
              <option value="PRICE_ASC">Giá tăng dần</option>
              <option value="PRICE_DESC">Giá giảm dần</option>
            </select>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Tài Nguyên Đang Mở Bán
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              File sạch nguyên bản • Tải về dùng ngay • Đầy đủ hướng dẫn
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {filtered.length} sản phẩm
          </span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">Đang tải danh sách sản phẩm...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <h3 className="font-bold text-slate-800 dark:text-white text-base">Không tìm thấy sản phẩm phù hợp!</h3>
            <p className="text-xs text-slate-400 mt-1">Hãy thử tìm với từ khóa khác hoặc chuyển danh mục.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* PROMO BANNER: VOUCHER KHAITRUONG */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300/50 dark:border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md shadow-amber-500/30">
              %
            </div>
            <div>
              <h4 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">Ưu Đãi Khai Trương Hôm Nay</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Nhập mã <span className="font-mono font-black text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-lg border border-amber-300 dark:border-amber-800">KHAITRUONG</span> khi thanh toán để được giảm ngay 20.000đ cho mọi đơn hàng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & GUARANTEE BANNER */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-indigo-900/60">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-indigo-200">
              <Award className="w-4 h-4 text-amber-400" />
              Cam kết chất lượng 100%
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Mua Một Lần - Sở Hữu & Cập Nhật Trọn Đời
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              Mọi kịch bản và dữ liệu đều do chúng tôi xây dựng và kiểm tra thực chiến trước khi đăng bán. Khách hàng nhận được quyền cập nhật miễn phí khi thuật toán sàn thay đổi, bảo hành 1 đổi 1 và hỗ trợ cài đặt qua Zalo Ultraviewer đến khi vận hành thành công!
            </p>
          </div>
        </div>
      </section>

      {/* REAL PROCESS STEPS */}
      <section className="bg-slate-100/70 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Quy Trình Mua Hàng & Giao Nhận Tự Động</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Đơn giản, minh bạch và an toàn 100%</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200/70 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-black text-base flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">Chọn Sản Phẩm & Nhập Email</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Chọn gói kịch bản hoặc dữ liệu bạn cần, điền email cá nhân để hệ thống lưu trữ bản quyền và gửi link tải file dự phòng.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200/70 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-black text-base flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">Quét Mã VietQR Ngân Hàng</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mở ứng dụng ngân hàng bất kỳ (Techcombank, Vietcombank, MB, Momo...) quét mã QR có sẵn số tiền và mã đơn hàng chính xác.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200/70 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 font-black text-base flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1.5">Nhận File Tức Thì & Hỗ Trợ 1-1</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Hệ thống xác nhận tiền sau vài giây, mở khóa link tải file nguyên bản ngay trên màn hình. Kèm hỗ trợ kỹ thuật cài đặt qua Zalo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Câu Hỏi Thường Gặp</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Giải đáp các thắc mắc phổ biến nhất khi mua hàng</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4"
              >
                <span className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{faq.q}</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180 text-indigo-600' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-11 border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
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
