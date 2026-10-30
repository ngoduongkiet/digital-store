'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, Download, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function MyOrdersPage() {
  const [query, setQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        const q = query.trim().toLowerCase();
        const matched = data.orders.filter(
          (o) => o.id.toLowerCase() === q || o.customerEmail.toLowerCase() === q
        );
        setOrders(matched);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </Link>

      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3 border border-indigo-100 dark:border-indigo-900/60 shadow-sm">
          <Package className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Tra Cứu Đơn Hàng</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Nhập mã đơn hàng (ví dụ: ORD784664) hoặc địa chỉ Email của bạn để tải lại tài nguyên đã mua trọn đời.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <input
            type="text"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nhập mã đơn hàng hoặc địa chỉ email..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm shadow-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition disabled:opacity-70 flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Tìm kiếm</span>
          </button>
        </form>
      </div>

      {/* Search Results */}
      {searched && (
        <div className="space-y-4">
          {loading ? (
            <div className="py-12 text-center text-slate-400">Đang tìm kiếm đơn hàng...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center max-w-md mx-auto shadow-sm">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Không tìm thấy đơn hàng nào!</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Vui lòng kiểm tra lại mã đơn hàng hoặc email bạn đã dùng khi thanh toán. Nếu bạn cần hỗ trợ, vui lòng nhắn qua Zalo để chúng tôi kiểm tra giúp bạn.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Tìm thấy {orders.length} đơn hàng
              </h3>
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-800 dark:text-slate-200">
                        {ord.id}
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(ord.createdAt).toLocaleDateString('vi-VN')}
                      </span>
                      {ord.status === 'PAID' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã thanh toán
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          Chờ thanh toán
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{ord.productTitle}</h4>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-black">{formatPrice(ord.productPrice)}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {ord.status === 'PAID' ? (
                      <a
                        href={ord.downloadUrl}
                        download={ord.fileName}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Tải lại file ({ord.fileName})</span>
                      </a>
                    ) : (
                      <Link
                        href={`/order/${ord.id}`}
                        className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition"
                      >
                        <span>Chi tiết & Thanh toán</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
