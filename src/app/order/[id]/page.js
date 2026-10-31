'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  CheckCircle2, Download, ArrowLeft, ShieldCheck, FileText,
  ExternalLink, HelpCircle, MessageCircle, Sparkles, PhoneCall
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
      <div className="py-24 text-center text-slate-500 font-sans">
        <div className="w-8 h-8 rounded-full border-2 border-slate-300 border-t-slate-900 animate-spin mx-auto mb-3"></div>
        <p className="text-xs">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-24 text-center max-w-md mx-auto px-4 font-sans">
        <h2 className="font-editorial text-2xl font-bold text-slate-900">Không tìm thấy đơn hàng!</h2>
        <Link href="/" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Về trang chủ</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-12 font-sans">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-slate-900 p-8 text-white text-center relative overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-2">
              Khớp Lệnh Napas Thành Công 100%
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight">Thanh Toán Hoàn Tất!</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Cảm ơn bạn đã tin tưởng sở hữu vũ khí số tại Kiệt Digital Store.
            </p>
          </div>

          {/* Order Details Body */}
          <div className="p-6 sm:p-8 space-y-6 text-xs">
            {/* Order info strip */}
            <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-slate-400 block text-[11px]">Mã đơn hàng:</span>
                <span className="font-mono font-bold text-slate-900 text-xs">{order.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Số tiền:</span>
                <span className="font-extrabold text-slate-900 text-xs">{formatPrice(order.productPrice)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email người nhận:</span>
                <span className="font-semibold text-slate-800 truncate block text-xs">{order.customerEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Trạng thái:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Đã thanh toán
                </span>
              </div>
            </div>

            {/* DOWNLOAD ACTION BOX */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#f8f9fa] border-2 border-dashed border-slate-300 text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <FileText className="w-3.5 h-3.5 text-slate-700" />
                <span>Sản phẩm: {order.productTitle}</span>
              </div>

              <h3 className="font-editorial text-2xl font-bold text-slate-900">
                Tài Nguyên Của Bạn Đã Sẵn Sàng Tải Xuống
              </h3>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Bấm vào nút bên dưới để tải trực tiếp file nguyên bản sạch 100% về máy tính hoặc điện thoại của bạn.
              </p>

              <div className="pt-2">
                <a
                  href={order.downloadUrl || '#'}
                  download={order.fileName}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md transition"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>TẢI XUỐNG FILE NGAY ({order.fileName || 'Google Drive'})</span>
                </a>
              </div>

              <p className="text-[11px] text-slate-400">
                * Quyền tải lại trọn đời đã được lưu trữ vĩnh viễn theo email {order.customerEmail}.
              </p>
            </div>

            {/* GUIDE / INSTRUCTIONS */}
            <div className="border-t border-slate-100 pt-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Hướng Dẫn Sử Dụng Nhanh
              </h4>
              <div className="space-y-2 text-xs text-slate-600 bg-[#f8f9fa] p-4 rounded-2xl border border-slate-200/80 leading-relaxed">
                <p><strong>Bước 1:</strong> Bấm nút <strong>"TẢI XUỐNG FILE NGAY"</strong> ở trên để lưu file về máy tính.</p>
                <p><strong>Bước 2:</strong> Nếu là file kịch bản (<strong>.json</strong>), bạn mở <strong>Make.com</strong> hoặc <strong>n8n</strong>, chọn Import file vừa tải vào là hệ thống tự động nhận diện các node.</p>
                <p><strong>Bước 3:</strong> Nếu là file dữ liệu (<strong>.csv / .xlsx</strong>), mở trực tiếp bằng Microsoft Excel hoặc Google Sheets.</p>
                <p><strong>Bước 4:</strong> Bạn luôn có thể tra cứu và tải lại đơn hàng bất kỳ lúc nào tại mục <strong>"Tra Cứu Đơn"</strong> trên thanh menu bằng mã <strong>{order.id}</strong> hoặc email <strong>{order.customerEmail}</strong>.</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 hover:border-slate-800 text-xs font-semibold transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Khám phá thêm sản phẩm khác</span>
              </Link>

              <a
                href="https://zalo.me/0352279413"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>Nhắn Zalo Kiệt Hỗ Trợ UltraViewer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
