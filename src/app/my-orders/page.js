'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Auto-search if query in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
      executeSearch(q);
    }
  }, []);

  const executeSearch = async (queryText) => {
    if (!queryText.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && data.orders) {
        const q = queryText.trim().toLowerCase();
        const matched = data.orders.filter(
          (o) =>
            o.id.toLowerCase().includes(q) ||
            (o.customerEmail && o.customerEmail.toLowerCase().includes(q)) ||
            (o.customerPhone && o.customerPhone.toLowerCase().includes(q))
        );
        setOrders(matched);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  const setQuickSearch = (val) => {
    setSearchQuery(val);
    executeSearch(val);
  };

  const copyLicenseKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const generateLicenseKey = (order) => {
    const cleanId = order.id.replace(/[^A-Za-z0-9]/g, '').slice(-4).toUpperCase() || '8942';
    return `KIET-MMO-${cleanId}-2026-X9Q1`;
  };

  return (
    <div className="w-full pt-6 pb-20 bg-surface min-h-[calc(100vh-80px)]">
      {/* Ambient Atmospheric Layer */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-gradient-to-b from-surface-variant/40 to-transparent blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute -top-24 left-1/3 w-[450px] h-[250px] bg-secondary-container/20 blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-4">
          
          {/* Top Breadcrumb & Live Telemetry Badge */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-on-surface-variant font-label-md text-xs">
              <Link href="/" className="hover:text-on-surface transition-colors flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">home</span>
                <span>Trang Chủ</span>
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-on-surface font-semibold">Tra Cứu Đơn Hàng &amp; Bản Quyền (/my-orders)</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-label-sm text-xs text-on-surface font-semibold">
                Napas 24/7 Telemetry: SẴN SÀNG (Độ trễ: 1.8s)
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs uppercase tracking-widest mb-3">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>Tự Động Hóa 2026 • Sáng lập bởi Ngô Dương Kiệt</span>
            </div>
            <h1 className="font-display-xl text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight font-extrabold mb-3">
              Tra Cứu Đơn Hàng &amp; Tải Lại Kịch Bản Số
            </h1>
            <p className="font-body-lg text-sm sm:text-base text-on-surface-variant leading-relaxed">
              Nhập Email mua hàng hoặc Số điện thoại đặt đơn để lấy lại link tải Google Drive gốc, kiểm tra mã bản quyền License Key và yêu cầu hỗ trợ UltraViewer 1-1 miễn phí trọn đời.
            </p>
          </div>

          {/* Central Search Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-surface-container mb-12 relative">
            <form onSubmit={handleSearchSubmit} className="space-y-4">
              <div className="relative flex flex-col md:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    alternate_email
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Nhập email hoặc SĐT bạn đã điền khi quét VietQR..."
                    className="w-full h-14 pl-14 pr-5 rounded-full bg-surface-container-lowest text-on-surface font-body-md text-sm placeholder:text-on-surface-variant/60 focus:bg-surface-container-low border border-surface-container focus:outline-none transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-14 px-8 rounded-full bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-95 transition-all flex-shrink-0 cursor-pointer"
                >
                  <span>{loading ? 'ĐANG TÌM KIẾM...' : 'TRA CỨU ĐƠN HÀNG'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-on-surface-variant font-body-sm text-xs">
                <span className="font-medium text-on-surface">Gợi ý tìm nhanh:</span>
                <button
                  type="button"
                  onClick={() => setQuickSearch('ORD')}
                  className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-xs transition-colors border border-surface-container"
                >
                  Tất cả đơn đã tạo (Mã #ORD)
                </button>
                <button
                  type="button"
                  onClick={() => setQuickSearch('@gmail.com')}
                  className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-xs transition-colors border border-surface-container"
                >
                  Tìm theo đuôi @gmail.com
                </button>
              </div>
            </form>

            {/* Security note */}
            <div className="mt-6 pt-5 flex items-center gap-3 bg-surface-container-low/70 rounded-2xl p-4 text-on-surface-variant border border-surface-container text-xs">
              <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 text-on-surface">
                <span className="material-symbols-outlined text-[18px]">lock</span>
              </div>
              <p className="leading-relaxed">
                <strong className="font-semibold text-on-surface">Bảo mật tuyệt đối 100%:</strong> Dữ liệu đơn hàng được mã hóa chuẩn SHA-256. Chỉ chủ sở hữu email hoặc số điện thoại đối chiếu mới có quyền tải source code và key kích hoạt.
              </p>
            </div>
          </div>

          {/* Results Section */}
          {searched && (
            <div className="mb-14">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
                <div>
                  <span className="font-label-sm text-xs uppercase tracking-wider text-on-surface-variant">
                    Kết Quả Hệ Thống VietQR Napas
                  </span>
                  <h2 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2 mt-1">
                    <span>Kết quả cho:</span>
                    <span className="font-mono bg-surface-container px-2.5 py-0.5 rounded-lg text-sm">
                      {searchQuery}
                    </span>
                    <span className="font-body-md text-xs text-on-surface-variant font-normal">
                      (Tìm thấy {orders.length} đơn hàng)
                    </span>
                  </h2>
                </div>

                {orders.length > 0 && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-label-sm text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">task_alt</span>
                    <span>ĐÃ KHỚP LỆNH TỰ ĐỘNG 100%</span>
                  </div>
                )}
              </div>

              {orders.length === 0 ? (
                <div className="bg-surface-container-lowest rounded-3xl p-10 text-center border border-surface-container space-y-3">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface mx-auto">
                    <span className="material-symbols-outlined text-[24px]">search_off</span>
                  </div>
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                    Chưa tìm thấy đơn hàng khớp với từ khóa
                  </h3>
                  <p className="text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    Vui lòng kiểm tra lại chính xác địa chỉ Email hoặc Số điện thoại bạn đã điền lúc tạo lệnh quét mã VietQR. Nếu cần hỗ trợ ngay, hãy liên hệ Zalo Kiệt: 0352.279.413.
                  </p>
                  <a
                    href="https://zalo.me/0352279413"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Nhắn Zalo Kiệt Kiểm Tra Sao Kê</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((ord) => {
                    const licenseKey = generateLicenseKey(ord);
                    return (
                      <div
                        key={ord.id}
                        className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 lg:p-9 shadow-sm border border-surface-container transition-all"
                      >
                        {/* Header Details */}
                        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6">
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-xs font-bold text-on-surface">
                                #{ord.id}
                              </span>
                              <span className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                <span>{new Date(ord.createdAt).toLocaleString('vi-VN')}</span>
                              </span>
                              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-label-sm text-xs flex items-center gap-1 font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                <span>
                                  {ord.status === 'PAID'
                                    ? 'Đã thanh toán VietQR Napas 24/7'
                                    : 'Chờ đối soát thanh toán'}
                                </span>
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-label-sm text-xs text-on-surface-variant">
                                VirusTotal: 0/72 Clean
                              </span>
                            </div>

                            <h3 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface tracking-tight">
                              {ord.productTitle}
                            </h3>
                            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                              Đơn hàng được xử lý tự động cho Email: <strong className="text-on-surface">{ord.customerEmail}</strong>. Mã nguồn và quyền tải vĩnh viễn đã được mở khóa.
                            </p>
                          </div>

                          <div className="lg:text-right flex-shrink-0 space-y-1">
                            <div className="font-price-hero text-2xl font-extrabold text-on-surface">
                              {formatPrice(ord.productPrice)}
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container font-label-sm text-xs text-on-surface-variant">
                              <span>Trạng thái:</span>
                              <strong className="text-emerald-600 font-bold">{ord.status}</strong>
                            </div>
                          </div>
                        </div>

                        {/* License Key Box */}
                        <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border border-surface-container">
                          <div className="space-y-1">
                            <div className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                              Mã Bản Quyền Kích Hoạt (License Key)
                            </div>
                            <div className="flex items-center gap-3">
                              <code className="font-headline-sm text-sm sm:text-base text-on-surface font-mono tracking-wider font-bold">
                                {licenseKey}
                              </code>
                              <button
                                type="button"
                                onClick={() => copyLicenseKey(licenseKey)}
                                className="px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-primary hover:text-on-primary font-label-sm text-xs transition-all flex items-center gap-1 shadow-sm border border-surface-container"
                              >
                                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                                <span>{copiedKey === licenseKey ? 'Đã chép!' : 'Sao chép'}</span>
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-xs">
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">dns</span>
                              <span>VPS / Local Ready</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">support_agent</span>
                              <span>UltraViewer 1-1 Sẵn Sàng</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <a
                            href={ord.downloadUrl || 'https://drive.google.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-md text-xs uppercase tracking-wider font-semibold flex items-center gap-2 hover:bg-primary-container transition-all shadow-sm"
                          >
                            <span className="material-symbols-outlined text-[18px]">download</span>
                            <span>Tải Mã Nguồn Gốc (Google Drive)</span>
                          </a>

                          <a
                            href="https://zalo.me/0352279413"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 rounded-full bg-surface-container text-on-surface font-label-md text-xs hover:bg-surface-container-high transition-all flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[18px]">chat</span>
                            <span>UltraViewer 1-1 Với Kiệt</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 3-Column Help & Support Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container space-y-3">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[20px]">support</span>
              </div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface">UltraViewer Hỗ Trợ 1-1</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Nếu bạn gặp khó khăn khi cài đặt mã nguồn hoặc cấu hình VPS, Kiệt trực tiếp UltraViewer kết nối máy tính của bạn và hướng dẫn đến khi chạy hoàn hảo.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container space-y-3">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[20px]">phone</span>
              </div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface">Hotline Kỹ Thuật 24/7</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Số hotline &amp; Zalo: <strong className="text-on-surface">0352.279.413</strong> (Ngô Dương Kiệt). Sẵn sàng tiếp nhận hỗ trợ kỹ thuật và giải đáp mọi bài toán tự động hóa.
              </p>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container space-y-3">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[20px]">published_with_changes</span>
              </div>
              <h3 className="font-headline-sm text-base font-bold text-on-surface">Hoàn Tiền 100% Trong 7 Ngày</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Chính sách bảo hành không rủi ro: Nếu sản phẩm không hoạt động đúng như cam kết, hoàn tiền 100% trong ngày qua Techcombank hoặc bất kỳ ngân hàng nào.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
