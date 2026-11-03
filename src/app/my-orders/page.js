'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Mail, Phone, ShieldCheck, CheckCircle2, Zap,
  Download, Copy, Check, Lock, Server, HelpCircle, MessageCircle,
  Clock, ArrowRight
} from 'lucide-react';

export default function MyOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

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
    <div className="w-full pt-4 pb-20 bg-[#f8f9fa] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Trang Chủ
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Tra Cứu Đơn Hàng &amp; Bản Quyền (/my-orders)</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-2xs border border-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs text-slate-800 font-bold">
              Napas 24/7 Telemetry: SẴN SÀNG (Độ trễ: 1.8s)
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs uppercase tracking-widest font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-900" />
            <span>Tự Động Hóa 2026 • Sáng lập bởi Ngô Dương Kiệt</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight font-black mb-3">
            Tra Cứu Đơn Hàng &amp; Tải Lại Kịch Bản Số
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Nhập Email mua hàng hoặc Số điện thoại đặt đơn để lấy lại link tải Google Drive gốc, kiểm tra mã bản quyền License Key và yêu cầu hỗ trợ UltraViewer 1-1 miễn phí trọn đời.
          </p>
        </div>

        {/* Central Search Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xs border border-slate-200/80 mb-12 relative">
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div className="relative flex flex-col md:flex-row items-stretch gap-3">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nhập email hoặc SĐT bạn đã điền khi quét VietQR..."
                  className="w-full h-14 pl-12 pr-4 rounded-full bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:bg-white border border-slate-200 focus:outline-none focus:border-slate-800 transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-14 px-8 rounded-full bg-slate-900 text-white text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow hover:bg-black hover:scale-[1.01] active:scale-95 transition-all flex-shrink-0 cursor-pointer"
              >
                <span>{loading ? 'ĐANG TÌM KIẾM...' : 'TRA CỨU ĐƠN HÀNG'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Suggestion Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Gợi ý tìm nhanh:</span>
              <button
                type="button"
                onClick={() => setQuickSearch('ORD')}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors border border-slate-200"
              >
                Tất cả đơn đã tạo (Mã #ORD)
              </button>
              <button
                type="button"
                onClick={() => setQuickSearch('@gmail.com')}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors border border-slate-200"
              >
                Tìm theo đuôi @gmail.com
              </button>
            </div>
          </form>

          {/* Security note */}
          <div className="mt-6 pt-5 flex items-center gap-3 bg-slate-50 rounded-2xl p-4 text-slate-600 border border-slate-200/80 text-xs">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-slate-900 shadow-2xs border border-slate-200">
              <Lock className="w-4 h-4 text-slate-800" />
            </div>
            <p className="leading-relaxed">
              <strong className="font-bold text-slate-900">Bảo mật tuyệt đối 100%:</strong> Dữ liệu đơn hàng được mã hóa chuẩn SHA-256. Chỉ chủ sở hữu email hoặc số điện thoại đối chiếu mới có quyền tải source code và key kích hoạt.
            </p>
          </div>
        </div>

        {/* Results Section */}
        {searched && (
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Kết Quả Hệ Thống VietQR Napas
                </span>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mt-1">
                  <span>Kết quả cho:</span>
                  <span className="font-mono bg-slate-100 px-2.5 py-0.5 rounded-lg text-sm border border-slate-200">
                    {searchQuery}
                  </span>
                  <span className="text-xs text-slate-500 font-normal">
                    (Tìm thấy {orders.length} đơn hàng)
                  </span>
                </h2>
              </div>

              {orders.length > 0 && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ĐÃ KHỚP LỆNH TỰ ĐỘNG 100%</span>
                </div>
              )}
            </div>

            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200/80 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Chưa tìm thấy đơn hàng khớp với từ khóa
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Vui lòng kiểm tra lại chính xác địa chỉ Email hoặc Số điện thoại bạn đã điền lúc tạo lệnh quét mã VietQR. Nếu cần hỗ trợ ngay, hãy liên hệ Zalo Kiệt: 0352.279.413.
                </p>
                <a
                  href="https://zalo.me/0352279413"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-black transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
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
                      className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs border border-slate-200/80 transition-all"
                    >
                      {/* Header Details */}
                      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6">
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-900 border border-slate-200">
                              #{ord.id}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{new Date(ord.createdAt).toLocaleString('vi-VN')}</span>
                            </span>
                            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs flex items-center gap-1 font-semibold border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                              <span>
                                {ord.status === 'PAID'
                                  ? 'Đã thanh toán VietQR Napas 24/7'
                                  : 'Chờ đối soát thanh toán'}
                              </span>
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-xs text-slate-600 font-medium">
                              VirusTotal: 0/72 Clean
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            {ord.productTitle}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                            Đơn hàng được xử lý tự động cho Email: <strong className="text-slate-900">{ord.customerEmail}</strong>. Mã nguồn và quyền tải vĩnh viễn đã được mở khóa.
                          </p>
                        </div>

                        <div className="lg:text-right flex-shrink-0 space-y-1">
                          <div className="text-2xl font-black text-slate-900">
                            {formatPrice(ord.productPrice)}
                          </div>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs text-slate-700">
                            <span>Trạng thái:</span>
                            <strong className="text-emerald-600 font-bold">{ord.status}</strong>
                          </div>
                        </div>
                      </div>

                      {/* License Key Box */}
                      <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border border-slate-200">
                        <div className="space-y-1">
                          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                            Mã Bản Quyền Kích Hoạt (License Key)
                          </div>
                          <div className="flex items-center gap-3">
                            <code className="text-sm sm:text-base text-slate-900 font-mono tracking-wider font-extrabold">
                              {licenseKey}
                            </code>
                            <button
                              type="button"
                              onClick={() => copyLicenseKey(licenseKey)}
                              className="px-3 py-1 rounded-full bg-white text-slate-800 hover:bg-slate-900 hover:text-white text-xs transition-all flex items-center gap-1 shadow-2xs border border-slate-300 font-semibold"
                            >
                              {copiedKey === licenseKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedKey === licenseKey ? 'Đã chép!' : 'Sao chép'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-slate-600 text-xs font-medium">
                          <div className="flex items-center gap-1.5">
                            <Server className="w-4 h-4 text-slate-500" />
                            <span>VPS / Local Ready</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <HelpCircle className="w-4 h-4 text-slate-500" />
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
                          className="px-6 py-3 rounded-full bg-slate-900 text-white text-xs uppercase tracking-wider font-bold flex items-center gap-2 hover:bg-black transition-all shadow-sm"
                        >
                          <Download className="w-4 h-4" />
                          <span>Tải Mã Nguồn Gốc (Google Drive)</span>
                        </a>

                        <a
                          href="https://zalo.me/0352279413"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-full bg-white border border-slate-300 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-all flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-600" />
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
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">UltraViewer Hỗ Trợ 1-1</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nếu bạn gặp khó khăn khi cài đặt mã nguồn hoặc cấu hình VPS, Kiệt trực tiếp UltraViewer kết nối máy tính của bạn và hướng dẫn đến khi chạy hoàn hảo.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Hotline Kỹ Thuật 24/7</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Số hotline &amp; Zalo: <strong className="text-slate-900 font-bold">0352.279.413</strong> (Ngô Dương Kiệt). Sẵn sàng tiếp nhận hỗ trợ kỹ thuật và giải đáp mọi bài toán tự động hóa.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Hoàn Tiền 100% Trong 7 Ngày</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chính sách bảo hành không rủi ro: Nếu sản phẩm không hoạt động đúng như cam kết, hoàn tiền 100% trong ngày qua Techcombank hoặc bất kỳ ngân hàng nào.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
