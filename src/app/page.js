'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import { Sparkles, ShieldCheck, Zap, HelpCircle, CheckCircle, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
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

  const filteredProducts = selectedCategory === 'ALL'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/60">
        <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-bold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kho Sản Phẩm Số & Công Cụ Tự Động Hóa 2026</span>
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

      {/* PRODUCTS SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        {/* Category filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">Đang tải danh sách sản phẩm...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-slate-500">Chưa có sản phẩm nào trong danh mục này.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={(prod) => setActiveProduct(prod)}
              />
            ))}
          </div>
        )}
      </section>

      {/* SOCIAL PROOF / REVIEWS */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900">Khách Hàng Nói Gì Về Chúng Tôi?</h2>
            <p className="text-xs text-slate-500 mt-1">Hơn 400+ anh em làm MMO & kinh doanh online đã tin dùng</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">★★★★★</div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Kịch bản bot săn deal Shopee chạy cực kỳ mượt! Nhập API Telegram mất đúng 2 phút. Từ ngày treo bot không phải thức đêm canh sale nữa, hoa hồng về đều đặn."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">H</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Hoàng Nam</h4>
                  <span className="text-[11px] text-slate-400">Shopee Affiliate</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">★★★★★</div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Bộ Data quán cafe Sài Gòn quá chất lượng! Mình giao cho team telesale gọi chào phần mềm máy tính tiền, chốt được 6 khách ngay trong tuần đầu tiên."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">T</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Trần Minh Quân</h4>
                  <span className="text-[11px] text-slate-400">Chủ Agency Phần Mềm</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">★★★★★</div>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                "Thanh toán QR xong 3 giây web nhảy link tải luôn, tiện dã man. Bảng tính lãi sàn TMĐT chuẩn từng đồng thuế phí, trước toàn tính vo bị lỗ mà không biết."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">L</div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Lê Thuỳ Trang</h4>
                  <span className="text-[11px] text-slate-400">Shop thời trang TikTok</span>
                </div>
              </div>
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
