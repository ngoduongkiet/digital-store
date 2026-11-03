'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CheckoutModal from '@/components/CheckoutModal';
import PreviewModal from '@/components/PreviewModal';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProduct, setActiveProduct] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const filteredProducts = products.filter((prod) => {
    const matchCategory = selectedCategory === 'ALL' || prod.category === selectedCategory;
    const matchSearch =
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const row1Products = products.filter((p) => p.category === 'Tool & Bot MMO');
  const row2Products = products.filter((p) => p.category !== 'Tool & Bot MMO');

  const testimonials = [
    {
      name: 'Nguyễn Thành Nam',
      role: 'Chủ shop thời trang & MMO Shopee',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment: 'Con bot Shopee Telegram của Kiệt giúp mình tự động quét voucher và bắn deal liên tục 24/7. Tháng vừa rồi doanh thu hoa hồng Shopee nhảy thêm hơn 14 triệu mà không tốn công trực máy.',
      productBought: 'Bot Săn Deal Shopee API v2026',
      rating: 5,
      channel: 'Zalo Verified'
    },
    {
      name: 'Trần Đình Bảo',
      role: 'Telesale & Phân phối F&B Sài Gòn',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      comment: 'Tệp 25.000 quán cafe cực kỳ chuẩn xác, quét đúng số điện thoại chủ quán và quản lý. Tỷ lệ máy sống trên 92%, đội sale của mình gọi chốt được hơn 40 khách chỉ trong tuần đầu.',
      productBought: 'Tệp 25.000 Quán Cafe & Nhà Hàng F&B',
      rating: 5,
      channel: 'VietQR Napas'
    },
    {
      name: 'Hoàng Hải Yến',
      role: 'Content Creator & Bán hàng TikTok',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      comment: 'Bộ prompt AI viết kịch bản TikTok thực sự quá chất. Chỉ cần đổi tên sản phẩm là ra kịch bản giật tít 3s giữ chân người xem cực đỉnh. Đã lên 2 video cắn xu hướng triệu view.',
      productBought: 'Bộ Prompt AI GPT-4o Bán Hàng Triệu View',
      rating: 5,
      channel: 'Telegram Feedback'
    },
    {
      name: 'Lê Duy Khang',
      role: 'Chủ xưởng nội thất & Gia dụng',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      comment: 'Tool Zalo của Kiệt chạy rất êm, có độ trễ ngẫu nhiên nên không hề bị checkpoint hay khóa tài khoản. Cảm ơn Kiệt đã UltraViewer cài đặt và cấu hình trực tiếp giúp mình.',
      productBought: 'Tool Auto Bắn Tin Nhắn Zalo Nuôi Khách',
      rating: 5,
      channel: 'UltraViewer 1-1'
    },
    {
      name: 'Phạm Minh Trí',
      role: 'Marketing Agency Lead',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      comment: 'Tool cào Google Maps theo tọa độ GPS giải quyết triệt để bài toán tìm khách hàng cho team mình. Quét 10 phút được cả nghìn data có đầy đủ số hotline và link Google Maps.',
      productBought: 'Auto Crawl Dữ Liệu Google Maps GPS',
      rating: 5,
      channel: 'Zalo Verified'
    }
  ];

  const faqs = [
    {
      q: 'Sau khi quét mã VietQR thì bao lâu tôi nhận được file tải?',
      a: 'Hệ thống tự động 100%. Sau khi bạn quét mã VietQR qua app ngân hàng, hệ thống Napas sẽ khớp lệnh trong 3 giây và tự động mở link tải Google Drive gốc, kèm quyền tải lại trọn đời vào email của bạn.'
    },
    {
      q: 'Tôi không rành về kỹ thuật hay lập trình thì có dùng được không?',
      a: 'Hoàn toàn được! Mỗi sản phẩm đều có video hướng dẫn chi tiết từng cú click chuột. Ngoài ra, Kiệt hỗ trợ trực tiếp 1-1 qua UltraViewer và Zalo cho bạn đến khi tool chạy mượt mà.'
    },
    {
      q: 'Chính sách bảo hành và cam kết hoàn tiền của Kiệt như thế nào?',
      a: 'Kiệt cam kết 100%: Toàn bộ tool, script và data đều được kiểm tra sạch mã độc (VirusTotal 0/72 Clean). Nếu tool lỗi kỹ thuật không hoạt động như mô tả, Kiệt hoàn tiền 100% ngay lập tức qua số tài khoản của bạn.'
    },
    {
      q: 'Khi các nền tảng (Shopee, TikTok, Telegram) cập nhật thuật toán thì sao?',
      a: 'Bạn được cập nhật các phiên bản mới hoàn toàn MIỄN PHÍ trọn đời. Khi có bản cập nhật mới, link tải sẽ tự động cập nhật code mới nhất.'
    },
    {
      q: 'Tôi có thể yêu cầu viết tool riêng hoặc cào data theo tiêu chí đặc biệt không?',
      a: 'Có! Kiệt nhận lập trình tool tự động hóa riêng theo bài toán kinh doanh cụ thể của bạn. Bạn chỉ cần nhắn Zalo 0352.279.413 để trao đổi yêu cầu kỹ thuật và nhận báo giá trực tiếp.'
    }
  ];

  const categories = [
    { id: 'ALL', name: 'Tất Cả Vũ Khí' },
    { id: 'Tool & Bot MMO', name: 'Tool & Bot MMO' },
    { id: 'Data Khách Hàng B2B', name: 'Data B2B F&B / Spa' },
    { id: 'Prompt AI & Kịch Bản', name: 'Prompt AI & Kịch Bản' },
    { id: 'Kịch Bản Tự Động', name: 'Kịch Bản Tự Động' }
  ];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Dynamic Keyframes for marquee */}
      <style jsx global>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 45s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 45s linear infinite;
        }
        .pause-marquee:hover {
          animation-play-state: paused;
        }
        .marquee-paused {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* 1. HERO SECTION (Luxestate Architectural Luxury Aesthetic) */}
      <section className="relative w-full overflow-hidden bg-surface py-12 lg:py-20">
        {/* Ambient atmospheric glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[980px] h-[480px] bg-gradient-to-b from-surface-variant/70 via-secondary-container/20 to-transparent blur-3xl opacity-60"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Top Editorial Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-label-sm text-xs text-on-surface uppercase tracking-wider font-semibold">
                Bản Quyền 2026 • Tự Động Hóa MMO Chuẩn Enterprise
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-container font-label-sm text-xs text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">verified_user</span>
                VirusTotal 0/72 Clean
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-container font-label-sm text-xs text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-[15px] text-on-surface">bolt</span>
                VietQR Tự Động 3s
              </span>
            </div>
          </div>

          {/* Main Asymmetric Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Typography & Authority Copy */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <div className="space-y-3">
                <span className="font-label-md text-xs uppercase tracking-widest text-secondary font-bold">
                  Kiến Trúc Tự Động Hóa Thực Chiến
                </span>
                <h1 className="font-display-xl text-4xl sm:text-5xl lg:text-6xl text-on-surface font-extrabold tracking-tight leading-[1.08]">
                  VŨ KHÍ SỐ &amp;<br />
                  <span className="text-on-surface/85">TỰ ĐỘNG HÓA</span><br />
                  <span className="italic font-medium text-secondary">THỰC CHIẾN</span>
                </h1>
              </div>

              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Nơi kỹ thuật lập trình tinh gọn kết hợp cùng tư duy kinh doanh thực chiến. Khám phá kho kịch bản và công cụ phần mềm độc quyền giúp bạn nhân bản doanh thu tự động mà không cần trực máy.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#kho-vu-khi-so"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold shadow-md hover:scale-[1.02] hover:bg-primary-container transition-all"
                >
                  <span>Khám Phá Kho Kịch Bản</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
                <a
                  href="https://zalo.me/0352279413"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-xs hover:bg-surface-container transition-all shadow-sm border border-surface-container"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>UltraViewer 1-1 Với Kiệt</span>
                </a>
              </div>

              {/* Editorial Trust Badges Row */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
                  <p className="font-headline-sm text-xl font-bold text-on-surface">50.000+</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">Data &amp; Khách B2B</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
                  <p className="font-headline-sm text-xl font-bold text-emerald-600">0 / 72</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">VirusTotal Sạch 100%</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
                  <p className="font-headline-sm text-xl font-bold text-on-surface">3 Giây</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">VietQR Nhả File Drive</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
                  <p className="font-headline-sm text-xl font-bold text-on-surface">100%</p>
                  <p className="font-body-sm text-xs text-on-surface-variant">Hoàn Tiền Nếu Lỗi</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Showcase Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xl border border-surface-container">
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80"
                    alt="Bot Săn Deal Shopee API & Telegram Broadcaster"
                    className="w-full h-full object-cover transform hover:scale-105 duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent"></div>

                  {/* Top Left Badge */}
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-xs font-bold shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      API v2026 LIVE STREAMING
                    </span>
                  </div>

                  {/* Bottom Overlay Details */}
                  <div className="absolute bottom-5 inset-x-5 text-on-primary">
                    <p className="font-label-sm text-xs uppercase tracking-wider text-surface-variant">
                      Hệ Sinh Thái Tự Động Hóa Thực Chiến
                    </p>
                    <div className="flex items-center justify-between gap-4 mt-1">
                      <h3 className="font-headline-md text-xl sm:text-2xl font-bold">
                        Bot Săn Deal Shopee API &amp; Telegram Broadcaster
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="font-price-hero text-2xl sm:text-3xl font-extrabold text-on-primary">
                          199.000đ
                        </span>
                        <span className="block font-label-sm text-xs text-surface-variant">
                          Bản quyền trọn đời
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card footer CTA buttons */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-3 bg-surface-container-lowest">
                  <div className="flex items-center gap-2 text-xs text-secondary font-medium">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                    <span>Bảo hành hoàn tiền 100% trong 7 ngày</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/product/workflow-shopee"
                      className="px-4 py-2 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-semibold transition-all"
                    >
                      Xem Kiến Trúc
                    </Link>
                    <button
                      onClick={() => {
                        const prod = products.find((p) => p.id === 'workflow-shopee');
                        if (prod) setActiveProduct(prod);
                      }}
                      className="px-5 py-2 rounded-full bg-primary text-on-primary hover:bg-primary-container text-xs font-semibold shadow-sm transition-all"
                    >
                      Mua Ngay 199.000đ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE TICKER (2 HÀNG TỰ ĐỘNG CHẠY NGANG VÔ TẬN) */}
      <section className="relative w-full bg-background py-16 lg:py-24 overflow-hidden" id="kho-vu-khi-so">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container font-label-sm text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">sync_alt</span>
              Chuyển Động Trực Quan 2 Chiều
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
              Kho Vũ Khí Số &amp; Tool Tự Động Hóa Thực Chiến
            </h2>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl">
              Hệ thống tuyển chọn tối ưu hóa hiệu suất MMO. Tự động giao mã nguồn và kịch bản bản quyền sau 3 giây quét mã VietQR Napas. Rê chuột để dừng xem chi tiết.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMarqueePaused(!marqueePaused)}
              className="px-4 py-2 rounded-full bg-surface-container-lowest border border-surface-container text-on-surface font-label-md text-xs shadow-sm hover:bg-surface-container flex items-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                {marqueePaused ? 'play_arrow' : 'pause'}
              </span>
              <span>{marqueePaused ? 'Tiếp Tục Chạy' : 'Tạm Dừng Chạy'}</span>
            </button>
            <span className="text-xs font-label-sm text-on-surface-variant hidden sm:inline-block">
              ● 12 Vũ Khí Đang Hoạt Động
            </span>
          </div>
        </div>

        {/* ROW 1: TOOLS & BOTS (Chạy từ PHẢI sang TRÁI) */}
        <div className="w-full overflow-hidden mb-6 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
          
          <div className={`animate-marquee-left pause-marquee flex gap-6 px-4 ${marqueePaused ? 'marquee-paused' : ''}`}>
            {[...row1Products, ...row1Products, ...row1Products].map((item, idx) => (
              <div
                key={`row1-${item.id}-${idx}`}
                className="w-[340px] md:w-[380px] shrink-0 bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-lg border border-surface-container transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface-container">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-xs font-bold text-on-surface">
                      {item.badge || 'TOOL MMO'}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-xs font-semibold">
                      {item.version || 'v2026 Live'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-headline-sm text-base font-bold text-on-surface line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1.5 line-clamp-2">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1 font-body-sm text-xs text-secondary">
                    <span className="material-symbols-outlined text-[16px]">speed</span>
                    <span>1.2s / vòng quét</span>
                    <span className="mx-1">•</span>
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">verified</span>
                    <span>0/72 Clean</span>
                  </div>
                </div>

                <div className="pt-5 mt-4 flex items-center justify-between border-t border-surface-container">
                  <div>
                    <span className="block font-label-sm text-[11px] text-on-surface-variant">Giá trọn đời</span>
                    <span className="font-price-card text-lg font-extrabold text-on-surface">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewProduct(item)}
                      className="px-3.5 py-2 rounded-full bg-surface-container text-on-surface font-label-md text-xs hover:bg-surface-container-high transition-all"
                    >
                      Xem Thử
                    </button>
                    <button
                      onClick={() => setActiveProduct(item)}
                      className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-xs font-semibold hover:bg-primary-container transition-all"
                    >
                      Mua Ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: DATA B2B & PROMPTS (Chạy từ TRÁI sang PHẢI) */}
        <div className="w-full overflow-hidden relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>

          <div className={`animate-marquee-right pause-marquee flex gap-6 px-4 ${marqueePaused ? 'marquee-paused' : ''}`}>
            {[...row2Products, ...row2Products, ...row2Products].map((item, idx) => (
              <div
                key={`row2-${item.id}-${idx}`}
                className="w-[340px] md:w-[380px] shrink-0 bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-lg border border-surface-container transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface-container">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-xs font-bold text-on-surface">
                      {item.badge || 'DATA B2B'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-headline-sm text-base font-bold text-on-surface line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1.5 line-clamp-2">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1 font-body-sm text-xs text-secondary">
                    <span className="material-symbols-outlined text-[16px]">database</span>
                    <span>{item.fileSize || 'Data Chuẩn 100%'}</span>
                  </div>
                </div>

                <div className="pt-5 mt-4 flex items-center justify-between border-t border-surface-container">
                  <div>
                    <span className="block font-label-sm text-[11px] text-on-surface-variant">Giá trọn đời</span>
                    <span className="font-price-card text-lg font-extrabold text-on-surface">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewProduct(item)}
                      className="px-3.5 py-2 rounded-full bg-surface-container text-on-surface font-label-md text-xs hover:bg-surface-container-high transition-all"
                    >
                      Xem Thử
                    </button>
                    <button
                      onClick={() => setActiveProduct(item)}
                      className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-xs font-semibold hover:bg-primary-container transition-all"
                    >
                      Mua Ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5 CATALOG GRID WITH SEARCH & FILTER */}
      <section className="w-full bg-surface py-16 lg:py-20 border-t border-surface-container">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <span className="font-label-md text-xs uppercase tracking-widest text-secondary font-bold">
                Danh Mục Hoàn Chỉnh
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mt-1">
                Lọc &amp; Tìm Kiếm Vũ Khí Số
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary">
                <span className="material-symbols-outlined text-[18px]">search</span>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm tool, data, prompt..."
                className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-surface-container rounded-full text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-surface-container hover:bg-surface-container'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid of Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm hover:shadow-md border border-surface-container flex flex-col justify-between group transition-all"
              >
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-surface-container">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-xs font-bold text-on-surface">
                      {prod.badge}
                    </span>
                  </div>

                  <div>
                    <Link
                      href={`/product/${prod.id}`}
                      className="font-headline-sm text-base font-bold text-on-surface hover:text-primary transition-colors block line-clamp-1"
                    >
                      {prod.title}
                    </Link>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1.5 line-clamp-2">
                      {prod.shortDesc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1 border-t border-surface-container text-xs text-secondary">
                    <div className="flex items-center justify-between">
                      <span>Định dạng:</span>
                      <span className="font-medium text-on-surface">{prod.fileFormat}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Kiểm duyệt:</span>
                      <span className="font-medium text-emerald-600">{prod.testedClean}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 flex items-center justify-between border-t border-surface-container">
                  <div>
                    <span className="block font-label-sm text-[11px] text-on-surface-variant">Giá trọn đời</span>
                    <span className="font-price-card text-lg font-extrabold text-on-surface">
                      {formatPrice(prod.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewProduct(prod)}
                      className="px-3.5 py-2 rounded-full bg-surface-container text-on-surface font-label-md text-xs hover:bg-surface-container-high transition-all"
                    >
                      Xem Thử
                    </button>
                    <button
                      onClick={() => setActiveProduct(prod)}
                      className="px-4 py-2 rounded-full bg-primary text-on-primary font-label-md text-xs font-semibold hover:bg-primary-container transition-all"
                    >
                      Mua Ngay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUY TRÌNH TỰ ĐỘNG HÓA 3 BƯỚC THỰC CHIẾN */}
      <section className="w-full bg-surface py-20 lg:py-28 relative" id="quy-trinh-4-buoc">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-14 space-y-3">
            <span className="font-label-md text-xs uppercase tracking-widest text-secondary font-bold">
              Tiêu Chuẩn Vận Hành Độc Quyền
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
              Quy Trình Triển Khai &amp; Bàn Giao Vũ Khí Số
            </h2>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Quy trình 3 bước phổ quát được chuẩn hóa cho mọi phần mềm, bot tự động và kịch bản số. Đảm bảo từ người mới bắt đầu đến anh em MMO lão làng đều có thể đưa vào vận hành trơn tru ngay lập tức.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface text-sm">
                    01
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface-container-low font-label-sm text-xs text-secondary font-semibold uppercase">
                    3s Cấp Phép
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                    Nhận Kịch Bản &amp; Hướng Dẫn Chi Tiết
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Sau khi thanh toán, hệ thống tự động cấp link tải Google Drive gốc kèm toàn bộ video hướng dẫn cài đặt chi tiết từng cú click chuột.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center font-bold text-on-surface text-sm">
                    02
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface-container-low font-label-sm text-xs text-secondary font-semibold uppercase">
                    1 Click Setup
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                    Kích Hoạt &amp; Cấu Hình 1 Lần Duy Nhất
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Chỉ cần điền token hoặc cookie vào file cấu hình. Nếu gặp khó khăn, Kiệt trực tiếp UltraViewer kết nối máy tính hỗ trợ 1-1 miễn phí.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow">
                    03
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-label-sm text-xs font-semibold uppercase">
                    Tự Động 24/7
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                    Vận Hành Tự Động &amp; Thu Tiền Thụ Động
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-2 leading-relaxed">
                    Hệ thống tự động chạy ngầm trên VPS hoặc đám mây, quét deal, đẩy đơn và báo cáo doanh thu về Telegram không gián đoạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DỊCH VỤ VIẾT TOOL THEO YÊU CẦU (#custom-automation) */}
      <section className="w-full bg-surface-container-lowest py-20 lg:py-24 relative border-y border-surface-container" id="custom-automation">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="font-label-md text-xs uppercase tracking-widest text-secondary font-bold">
              Dịch Vụ Đo Ni Đóng Giày
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
              Lập Trình Tool &amp; Tự Động Hóa Riêng Theo Yêu Cầu
            </h2>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Ngoài các giải pháp có sẵn, Kiệt trực tiếp phát triển các module phần mềm chuyên biệt theo đúng quy trình và đặc thù kinh doanh riêng của doanh nghiệp bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-surface-container-low flex flex-col justify-between space-y-6 hover:shadow-md transition-all border border-surface-container">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">database</span>
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  Cào Data Khách Hàng Đa Kênh
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Thu thập data khách hàng tiềm năng, quét sản phẩm đối thủ từ Shopee, TikTok Shop, Google Maps, Facebook Group theo tiêu chí riêng, tự động làm sạch và xuất Excel.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container flex items-center justify-between">
                <span className="font-label-sm text-xs font-semibold text-secondary">Bàn Giao: 1 - 3 Ngày</span>
                <span className="material-symbols-outlined text-[18px] text-secondary">code</span>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-surface-container-low flex flex-col justify-between space-y-6 hover:shadow-md transition-all border border-surface-container">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">smart_toy</span>
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  Bot Telegram &amp; Zalo Nghiệp Vụ
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Tự động báo cáo doanh thu, bắn đơn hàng theo thời gian thực, quản lý hội nhóm, thông báo biến động số dư và tích hợp webhook AI phản hồi tin nhắn khách hàng 24/7.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container flex items-center justify-between">
                <span className="font-label-sm text-xs font-semibold text-secondary">Độ Trễ Siêu Thấp</span>
                <span className="material-symbols-outlined text-[18px] text-secondary">bolt</span>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-surface-container-low flex flex-col justify-between space-y-6 hover:shadow-md transition-all border border-surface-container">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">neurology</span>
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  Tích Hợp AI &amp; Tự Động Hóa Nội Dung
                </h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Xây dựng hệ thống tự động sinh bài viết SEO, kịch bản video ngắn, auto đăng tải đa kênh kết hợp API OpenAI GPT-4o, Claude 3.5 giúp tiết kiệm 90% chi phí nhân sự.
                </p>
              </div>
              <div className="pt-4 border-t border-surface-container flex items-center justify-between">
                <span className="font-label-sm text-xs font-semibold text-secondary">Tối Ưu Chi Phí API</span>
                <span className="material-symbols-outlined text-[18px] text-secondary">auto_awesome</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-surface flex flex-col md:flex-row items-center justify-between gap-6 border border-surface-container">
            <div className="space-y-1">
              <p className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                Bạn Có Ý Tưởng &amp; Muốn Khảo Sát Tính Khả Thi?
              </p>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Kiệt trực tiếp phân tích yêu cầu kỹ thuật và báo giá minh bạch, demo giải pháp mẫu trước khi thực hiện.
              </p>
            </div>
            <a
              href="https://zalo.me/0352279413"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold shadow hover:bg-primary-container transition-all flex items-center gap-2 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Trao Đổi Bài Toán Riêng Với Kiệt</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5. 4 TIÊU CHUẨN KỸ THUẬT VÀNG (#tieu-chuan-vang) */}
      <section className="w-full bg-background py-20 lg:py-28 relative" id="tieu-chuan-vang">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-label-md text-xs uppercase tracking-widest text-secondary font-bold">
              Kỷ Luật &amp; Trách Nhiệm Kỹ Thuật
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
              4 Tiêu Chuẩn Kỹ Thuật Vàng Độc Quyền
            </h2>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant">
              Khác biệt hoàn toàn với những tool trôi nổi chứa mã độc. Kiệt cam kết tối đa tính minh bạch, sự an toàn và quyền lợi tuyệt đối cho máy tính của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[24px]">code</span>
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Lập Trình Tinh Gọn</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Tối ưu hóa tài nguyên phần cứng, không ngốn RAM hay CPU. Viết bằng Python/Node.js hiện đại, dễ dàng tùy biến theo nhu cầu.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-emerald-600">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Mã Sạch 0/72 Clean</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  100% tệp tin được quét và xác thực qua VirusTotal trước khi bàn giao. Tuyệt đối không chứa trojan, spyware hay mã độc ngầm.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[24px]">bolt</span>
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Giao Tự Động 3 Giây</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Tích hợp Napas 24/7 tự động xác nhận giao dịch. Quét mã VietQR là nhận link tải Google Drive gốc ngay lập tức, không phải chờ duyệt.
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-7 rounded-2xl shadow-sm border border-surface-container flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[24px]">published_with_changes</span>
                </div>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Hoàn Tiền 100% 7 Ngày</h3>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Nếu tool phát sinh lỗi kỹ thuật hoặc không đúng với mô tả cam kết, Kiệt hoàn trả 100% số tiền ngay trong ngày qua số tài khoản của bạn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER SPOTLIGHT SECTION */}
      <section className="w-full bg-surface py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-surface-container rounded-3xl p-8 lg:p-14 relative overflow-hidden shadow-sm flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-6 max-w-2xl z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm font-label-sm text-xs text-on-surface font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Hỗ Trợ Kỹ Thuật UltraViewer 1-1 Trực Tiếp
              </div>

              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight leading-tight">
                Sẵn Sàng Nhân Bản Doanh Thu Với Tự Động Hóa Thực Chiến?
              </h2>

              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Đừng để quy trình thủ công kìm hãm quy mô kinh doanh của bạn. Kiệt trực tiếp tư vấn giải pháp, kết nối UltraViewer cài đặt và đồng hành cho đến khi công cụ vận hành sinh lời 24/7.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://zalo.me/0352279413"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold shadow hover:bg-primary-container transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Liên Hệ Zalo Với Kiệt</span>
                </a>
                <a
                  href="#kho-vu-khi-so"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-xs hover:bg-surface-container-high transition-all shadow-sm border border-surface-container"
                >
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                  <span>Khám Phá Vũ Khí Số</span>
                </a>
              </div>
            </div>

            {/* Founder Card */}
            <div className="relative z-10 w-full lg:w-[380px] shrink-0 bg-surface-container-lowest p-6 rounded-2xl shadow-md border border-surface-container flex flex-col space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[24px]">terminal</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-lg font-bold text-on-surface">Ngô Dương Kiệt</h4>
                  <p className="font-body-sm text-xs text-on-surface-variant">Lead Developer &amp; Founder</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-surface-container font-body-sm text-xs text-on-surface-variant">
                <div className="flex items-center justify-between">
                  <span>Khu vực hỗ trợ:</span>
                  <span className="font-semibold text-on-surface">Sơn Trà, Đà Nẵng</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tốc độ bàn giao:</span>
                  <span className="font-semibold text-emerald-600">3 Giây Tự Động</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Hình thức trợ giúp:</span>
                  <span className="font-semibold text-on-surface">UltraViewer 1-1</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="tel:0352279413"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-low text-on-surface font-label-md text-xs font-semibold hover:bg-surface-container transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Hotline: 0352.279.413</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ĐÁNH GIÁ THỰC TẾ & TESTIMONIALS CAROUSEL (#danh-gia) */}
      <section className="w-full bg-surface py-20 lg:py-28 relative" id="danh-gia">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container font-label-sm text-xs text-on-surface font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Đánh Giá Thực Chiến
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
                Cộng Đồng MMO &amp; Bán Hàng Nói Gì Về Kiệt?
              </h2>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
                Được kiểm chứng hiệu quả thực chiến bởi hơn 120+ anh em kinh doanh online, chủ shop đa sàn và agency tiếp thị. Người thật việc thật, kết quả đo lường minh bạch.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                className="w-11 h-11 rounded-full bg-surface-container-lowest border border-surface-container shadow-sm hover:bg-surface-container flex items-center justify-center text-on-surface transition-all active:scale-95"
                aria-label="Previous review"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </button>
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                className="w-11 h-11 rounded-full bg-surface-container-lowest border border-surface-container shadow-sm hover:bg-surface-container flex items-center justify-center text-on-surface transition-all active:scale-95"
                aria-label="Next review"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Testimonial Active Card */}
          <div className="bg-surface-container-lowest p-8 lg:p-10 rounded-3xl shadow-sm border border-surface-container transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[20px]">star</span>
                  ))}
                  <span className="text-xs font-semibold text-on-surface ml-2">5.0 / 5.0 Đánh giá</span>
                </div>

                <p className="font-headline-sm text-lg sm:text-xl font-medium text-on-surface leading-relaxed">
                  "{testimonials[currentTestimonial].comment}"
                </p>

                <div className="pt-2 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-on-surface">
                    Đã mua: {testimonials[currentTestimonial].productBought}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                    {testimonials[currentTestimonial].channel}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex items-center gap-4 lg:border-l lg:border-surface-container lg:pl-8">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-surface-container shadow"
                />
                <div>
                  <h4 className="font-headline-sm text-base font-bold text-on-surface">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="w-full bg-surface-container-lowest py-20 lg:py-28 relative border-t border-surface-container">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14 space-y-3">
            <span className="font-label-md text-xs uppercase tracking-widest text-secondary font-bold">
              Hỏi Đáp Trực Quan
            </span>
            <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface tracking-tight">
              Giải Đáp Thắc Mắc Kỹ Thuật Thường Gặp
            </h2>
            <p className="font-body-md text-sm sm:text-base text-on-surface-variant">
              Mọi quy trình được minh bạch hóa từ thanh toán đến hỗ trợ sau khi nhận file.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-surface-container bg-surface-container-low overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-headline-sm text-base font-bold text-on-surface hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-on-surface-variant leading-relaxed border-t border-surface-container pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modals */}
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
          onBuyNow={(prod) => {
            setPreviewProduct(null);
            setActiveProduct(prod);
          }}
        />
      )}
    </div>
  );
}
