'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle2, Download, ArrowLeft, ShieldCheck, FileText,
  ExternalLink, HelpCircle, MessageCircle, Sparkles
} from 'lucide-react';

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
    return (
      <div className="py-24 text-center text-slate-400 dark:text-slate-500">
        Đang tải thông tin đơn hàng...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Không tìm thấy đơn hàng!</h2>
        <Link href="/" className="mt-4 inline-block text-indigo-600 text-sm font-semibold hover:underline">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-tr from-emerald-600 to-teal-600 p-8 text-white text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2">
            Giao Dịch Hoàn Tất 100%
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">Thanh Toán Thành Công!</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            Cảm ơn bạn đã tin tưởng mua hàng tại Kiệt Digital Store.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Order info strip */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Mã đơn hàng:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{order.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Số tiền:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatPrice(order.productPrice)}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Email người nhận:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">{order.customerEmail}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Trạng thái:</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Đã thanh toán
              </span>
            </div>
          </div>

          {/* DOWNLOAD ACTION BOX */}
          <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/80 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800/80 text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 px-3.5 py-1.5 rounded-full shadow-sm">
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sản phẩm: {order.productTitle}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Tài Nguyên Của Bạn Đã Sẵn Sàng Tải Xuống!
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Bấm vào nút bên dưới để tải trực tiếp file nguyên bản sạch 100% về máy tính hoặc điện thoại của bạn.
            </p>

            <div>
              <a
                href={order.downloadUrl || '#'}
                download={order.fileName}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-black text-sm shadow-xl shadow-indigo-500/25 transition transform active:scale-95"
              >
                <Download className="w-5 h-5" />
                <span>TẢI XUỐNG FILE NGAY ({order.fileName})</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400">
              * Bản quyền file đã được kích hoạt vĩnh viễn theo email của bạn.
            </p>
          </div>

          {/* GUIDE / INSTRUCTIONS */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Hướng dẫn sử dụng nhanh
            </h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-800">
              <p><strong>Bước 1:</strong> Bấm nút <strong>"Tải xuống file ngay"</strong> ở trên để lưu file về máy tính.</p>
              <p><strong>Bước 2:</strong> Nếu là file kịch bản (<strong>.json</strong>), bạn mở <strong>Make.com</strong> hoặc <strong>n8n</strong>, chọn Import file vừa tải vào là kịch bản tự động hiển thị đầy đủ các khối.</p>
              <p><strong>Bước 3:</strong> Nếu là file dữ liệu (<strong>.csv / .xlsx</strong>), mở trực tiếp bằng Microsoft Excel hoặc Google Sheets.</p>
              <p><strong>Bước 4:</strong> Bạn luôn có thể tra cứu và tải lại đơn hàng này bất kỳ lúc nào bằng cách vào mục <strong>"Tra cứu đơn hàng"</strong> trên thanh menu và nhập mã <strong>{order.id}</strong> hoặc email <strong>{order.customerEmail}</strong>.</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Khám phá thêm sản phẩm khác</span>
            </Link>

            <a
              href="https://zalo.me/0352279413"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Nhắn Zalo hỗ trợ kỹ thuật cài đặt</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
