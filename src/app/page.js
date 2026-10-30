'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import {
  Sparkles, ShieldCheck, Zap, HelpCircle, Search,
  ArrowUpDown, CheckCircle, TrendingUp, Shield, Lock, Award
} from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('POPULAR'); // 'POPULAR' | 'NEWEST' | 'PRICE_ASC' | 'PRICE_DESC'
  const [activeProduct, setActiveProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
    { id: 'ALL', label: 'Tất cả sản phẩm' },
    { id: 'Tự Động Hóa', label: '🤖 Tự Động Hóa' },
    { id: 'Data Khách Hàng', label: '📊 Data Khách Hàng' },
    { id: 'Tài Nguyên Bán Hàng', label: '💼 Tài Nguyên Bán Hàng' }
  ];

  // Filtering & Sorting
  let filtered = products.filter((p) => {
    const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === 'POPULAR') {
    filtered.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
  } else if (sortBy === 'PRICE_ASC') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'PRICE_DESC') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-bold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kho Sản Phẩm Số & Công Cụ Tự Động Hóa MMO 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Tự Động Hóa Công Việc <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500">
              Nhân Bản Thu Nhập MMO
            </span>
          </h1>

          <p className="mt-5 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Các kịch bản n8n, Make.com, dữ liệu khách hàng B2B và bộ công cụ tạo ra dòng tiền thụ động.
            <strong> Thanh toán quét mã VietQR nhận file tức thì trong 3 giây!</strong>
          </p>

          {/* Key metrics */}
          <div className="mt-8 pt-6 border-t border-indigo-100/80 grid grid-cols-3 max-w-xl mx-auto gap-4">
            <div>
              <div className="text-xl sm:text-2xl font-black text-indigo-600">3 Giây</div>
              <div className="text-xs text-slate-500">Nhả hàng tự động</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-indigo-600">100%</div>
              <div className="text-xs text-slate-500">Hợp pháp & sạch</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-indigo-600">24/7</div>
              <div className="text-xs text-slate-500">Hỗ trợ trọn đời</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTERS BAR */}
      <section className="max-w-6xl mx-auto px-4 -mt-7 relative z-20">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-lg shadow-slate-200/40 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm công cụ, kịch bản, data..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-slate-700 focus:outline-none"
            >
              <option value="POPULAR">Bán chạy nhất</option>
              <option value="PRICE_ASC">Giá tăng dần</option>
              <option value="PRICE_DESC">Giá giảm dần</option>
            </select>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="py-20 text-center text-slate-400">Đang tải danh sách sản phẩm...</div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white rounded-3xl border border-slate-200 p-8">
            <h3 className="font-bold text-slate-800 text-base">Không tìm thấy sản phẩm phù hợp!</h3>
            <p className="text-xs text-slate-400 mt-1">Hãy thử tìm với từ khóa khác hoặc chuyển danh mục.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={(prod) => setActiveProduct(prod)}
              />
            ))}
          </div>
        )}
      </section>

      {/* TRUST & GUARANTEE BANNER */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-indigo-200">
              <Award className="w-4 h-4 text-amber-400" />
              Cam kết chất lượng 100%
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Mua Một Lần - Sử Dụng & Cập Nhật Trọn Đời
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Mọi kịch bản và dữ liệu đều được chúng tôi kiểm tra thực chiến trước khi đăng bán. Khách hàng nhận được quyền cập nhật miễn phí khi thuật toán sàn thay đổi, bảo hành 1 đổi 1 hoặc hoàn tiền nếu xảy ra lỗi kỹ thuật.
            </p>
          </div>
        </div>
      </section>

      {/* REAL PROCESS STEPS (NO FAKE REVIEWS) */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900">Quy Trình Mua Hàng & Giao Nhận Tự Động</h2>
            <p className="text-xs text-slate-500 mt-1">Đơn giản, minh bạch và an toàn 100%</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-black text-base flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1.5">Chọn Sản Phẩm & Nhập Email</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Chọn gói kịch bản hoặc dữ liệu bạn cần, điền email cá nhân để hệ thống lưu trữ bản quyền và gửi link tải file dự phòng.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-black text-base flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1.5">Quét Mã VietQR Ngân Hàng</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mở ứng dụng ngân hàng bất kỳ (Techcombank, Vietcombank, MB, Momo...) quét mã QR có sẵn số tiền và mã đơn hàng chính xác.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 font-black text-base flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1.5">Nhận File Tức Thì & Hỗ Trợ 1-1</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hệ thống xác nhận tiền sau vài giây, mở khóa link tải file nguyên bản ngay trên màn hình. Kèm hỗ trợ kỹ thuật cài đặt qua Zalo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900">Câu Hỏi Thường Gặp</h2>
          <p className="text-xs text-slate-500 mt-1">Giải đáp các thắc mắc phổ biến nhất khi mua hàng</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              Sau khi chuyển khoản bao lâu tôi nhận được file?
            </h3>
            <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">
              Hệ thống kết nối trực tiếp với cổng thanh toán ngân hàng tự động. Ngay khi bạn chuyển khoản đúng nội dung, trong vòng 3 đến 5 giây màn hình sẽ tự động hiển thị nút tải file về máy và gửi bản lưu vào email của bạn.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              Tôi không rành về code, có cài đặt và sử dụng được không?
            </h3>
            <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">
              Hoàn toàn được! Mỗi sản phẩm đều được đóng gói kèm theo 1 video ngắn 3 phút hướng dẫn từng cú click chuột. Bạn chỉ việc mở kịch bản lên và làm theo video là chạy được ngay trong 5 phút.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              Sản phẩm có được cập nhật mới không?
            </h3>
            <p className="text-xs text-slate-600 mt-2 pl-6 leading-relaxed">
              Có! Bạn chỉ cần mua 1 lần duy nhất, khi các nền tảng (Shopee, Facebook...) đổi thuật toán, chúng tôi sẽ cập nhật bản sửa lỗi lên cùng link tải đó hoàn toàn miễn phí trọn đời.
            </p>
          </div>
        </div>
      </section>

      {/* CHECKOUT MODAL */}
      {activeProduct && (
        <CheckoutModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </div>
  );
}
