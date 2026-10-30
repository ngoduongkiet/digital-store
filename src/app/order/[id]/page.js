'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CheckCircle2, Download, ArrowLeft, ShieldCheck, FileText, ExternalLink, HelpCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.order);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [params?.id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return <div className="py-24 text-center text-slate-400">Đang tải thông tin đơn hàng...</div>;
  }

  if (!order) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800">Không tìm thấy đơn hàng!</h2>
        <Link href="/" className="mt-4 inline-block text-indigo-600 text-sm font-semibold hover:underline">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-tr from-emerald-600 to-teal-600 p-8 text-white text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2">
            Giao Dịch Hoàn Tất
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Thanh Toán Thành Công!</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Cảm ơn bạn đã tin tưởng mua hàng tại Kiệt Digital Store.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Order info strip */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Mã đơn hàng:</span>
              <span className="font-mono font-bold text-slate-900">{order.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Số tiền:</span>
              <span className="font-bold text-indigo-600">{formatPrice(order.productPrice)}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Email người nhận:</span>
              <span className="font-medium text-slate-800 truncate block">{order.customerEmail}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Trạng thái:</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Đã thanh toán
              </span>
            </div>
          </div>

          {/* DOWNLOAD ACTION BOX */}
          <div className="p-6 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200 text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow-sm">
              <FileText className="w-3.5 h-3.5" />
              <span>Sản phẩm: {order.productTitle}</span>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              Tài Nguyên Của Bạn Đã Sẵn Sàng!
            </h3>

            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Bấm vào nút bên dưới để tải trực tiếp file kịch bản / tài liệu về máy tính hoặc điện thoại của bạn.
            </p>

            <a
              href={order.downloadUrl || '#'}
              download={order.fileName}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-300 transition transform active:scale-95"
            >
              <Download className="w-5 h-5" />
              <span>TẢI XUỐNG FILE NGAY ({order.fileName})</span>
            </a>
          </div>

          {/* GUIDE / INSTRUCTIONS */}
          <div className="border-t border-slate-100 pt-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hướng dẫn sử dụng nhanh
            </h4>
            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p><strong>Bước 1:</strong> Tải file về máy tính.</p>
              <p><strong>Bước 2:</strong> Nếu là file kịch bản (<strong>.json</strong>), bạn vào <strong>Make.com</strong> hoặc <strong>n8n</strong>, chọn Import file vừa tải vào là kịch bản tự động hiển thị.</p>
              <p><strong>Bước 3:</strong> Nếu là file dữ liệu (<strong>.csv / .xlsx</strong>), mở trực tiếp bằng Microsoft Excel hoặc Google Sheets.</p>
              <p><strong>Bước 4:</strong> Bạn luôn có thể tra cứu lại đơn hàng này bằng cách vào mục <strong>"Đơn của tôi"</strong> trên thanh menu và nhập mã <strong>{order.id}</strong>.</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Khám phá thêm sản phẩm khác</span>
            </Link>

            <Link
              href="/my-orders"
              className="w-full sm:w-auto text-center text-xs font-semibold text-indigo-600 hover:underline"
            >
              Xem lịch sử đơn hàng của tôi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
