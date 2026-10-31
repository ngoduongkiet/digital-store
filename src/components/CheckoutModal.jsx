'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  X, QrCode, Copy, Check, Loader2, ShieldCheck, Tag,
  Sparkles, CheckCircle2, MessageCircle, AlertTriangle, ArrowRight
} from 'lucide-react';

export default function CheckoutModal({ product, onClose }) {
  const router = useRouter();
  const [step, setStep] = useState('FORM'); // 'FORM' | 'PAYMENT'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [countdown, setCountdown] = useState(600); // 10 minutes

  const currentPrice = couponData?.finalAmount !== undefined ? couponData.finalAmount : product.price;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplyingCoupon(true);
    setCouponError('');
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, amount: product.price })
      });
      const data = await res.json();
      if (data.success) {
        setCouponData(data);
      } else {
        setCouponError(data.error || 'Mã giảm giá không hợp lệ');
        setCouponData(null);
      }
    } catch (err) {
      setCouponError('Lỗi kiểm tra mã giảm giá');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerEmail: email,
          customerPhone: phone,
          couponCode: couponData?.valid ? couponData.code : null
        })
      });
      const data = await res.json();
      if (data.success) {
        setOrderData(data);
        setStep('PAYMENT');
      } else {
        alert(data.error || 'Có lỗi xảy ra khi tạo đơn');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  // Poll for payment status
  useEffect(() => {
    if (step !== 'PAYMENT' || !orderData?.order?.id) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const poller = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderData.order.id}`);
        const data = await res.json();
        if (data.success && data.order.status === 'PAID') {
          clearInterval(poller);
          clearInterval(timer);
          router.push(`/order/${orderData.order.id}`);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(poller);
    };
  }, [step, orderData, router]);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[2rem] max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-slate-900 p-6 text-white text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-300 text-[11px] font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Cổng Thanh Toán VietQR Napas 24/7</span>
          </div>
          <h2 className="font-editorial text-2xl font-bold tracking-tight">Thanh Toán An Toàn</h2>
          <p className="text-xs text-slate-400 mt-1 line-clamp-1 max-w-xs mx-auto">{product.title}</p>
        </div>

        {step === 'FORM' ? (
          /* STEP 1: Enter Customer Info & Coupon */
          <form onSubmit={handleCreateOrder} className="p-6 space-y-4 text-xs font-sans">
            
            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-slate-500">
                <span>Giá gốc sản phẩm:</span>
                <span className="line-through">{formatPrice(product.originalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Ưu đãi hôm nay:</span>
                <span className="font-bold">{formatPrice(product.price)}</span>
              </div>
              {couponData?.valid && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>Mã giảm ({couponData.code}):</span>
                  <span>-{formatPrice(couponData.discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900">Tổng thanh toán:</span>
                <span className="text-xl font-extrabold text-slate-900">
                  {formatPrice(currentPrice)}
                </span>
              </div>
            </div>

            {/* COUPON INPUT */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-slate-700 uppercase">
                  Mã giảm giá
                </label>
                <button
                  type="button"
                  onClick={() => setCouponCode('KHAITRUONG')}
                  className="text-[11px] text-slate-500 hover:text-slate-900 underline font-semibold"
                >
                  Dùng mã: KHAITRUONG
                </button>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="KHAITRUONG hoặc KIETVIP"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 uppercase font-mono font-bold focus:border-slate-800 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={applyingCoupon || !couponCode.trim()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold transition disabled:opacity-50"
                >
                  {applyingCoupon ? '...' : 'Áp dụng'}
                </button>
              </div>
              {couponError && <p className="text-[11px] text-rose-500 mt-1 font-medium">{couponError}</p>}
              {couponData?.valid && (
                <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{couponData.description}</span>
                </p>
              )}
            </div>

            {/* Customer Email */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Email nhận link tải file <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="emailcuaban@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-slate-800 text-xs"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Hệ thống gửi bản lưu link Google Drive và quyền tải lại trọn đời về email này.
              </span>
            </div>

            {/* Customer Phone */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Số điện thoại / Zalo <span className="text-slate-400 font-normal">(Để Ultraviewer hỗ trợ khi cần)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-slate-800 text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang khởi tạo mã VietQR...</span>
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4" />
                  <span>Tạo Mã VietQR ({formatPrice(currentPrice)})</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: VietQR Payment Screen */
          <div className="p-6 text-center space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-full border border-amber-200 text-xs">
              <span className="font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                <span>Chờ quét mã Techcombank</span>
              </span>
              <span className="font-mono font-bold">{formatTimer(countdown)}</span>
            </div>

            {/* QR Image */}
            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-slate-300 inline-block shadow-sm">
              <img
                src={orderData.paymentInfo.qrUrl}
                alt="VietQR Code"
                className="w-52 h-52 mx-auto rounded-lg object-contain"
              />
            </div>

            <div className="text-[11px] text-slate-500 max-w-xs mx-auto">
              Mở app ngân hàng (Techcombank, Vietcombank, MBBank, Momo...) quét mã để chuyển khoản chính xác nội dung.
            </div>

            {/* Bank details with copy buttons */}
            <div className="bg-[#f8f9fa] rounded-2xl p-3.5 text-left text-xs space-y-2 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Ngân hàng:</span>
                <span className="font-bold text-slate-900">{orderData.paymentInfo.bankName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Số tài khoản:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderData.paymentInfo.bankAccount, 'acc')}
                  className="font-mono font-bold text-slate-900 flex items-center gap-1 hover:text-purple-600 transition"
                >
                  {orderData.paymentInfo.bankAccount}
                  {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Chủ tài khoản:</span>
                <span className="font-bold text-slate-900">{orderData.paymentInfo.bankOwner}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Số tiền:</span>
                <span className="font-extrabold text-slate-900">{formatPrice(orderData.paymentInfo.amount)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Nội dung CK:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderData.paymentInfo.content, 'content')}
                  className="font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1 hover:bg-rose-100 transition"
                >
                  {orderData.paymentInfo.content}
                  {copiedField === 'content' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
                </button>
              </div>
            </div>

            {/* Realtime waiting indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600 font-semibold py-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-900" />
              <span>Hệ thống đang tự động kiểm tra giao dịch Napas 24/7...</span>
            </div>

            {/* Check manual action & Zalo Support */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/orders/${orderData.order.id}`);
                    const data = await res.json();
                    if (data.success && data.order.status === 'PAID') {
                      router.push(`/order/${orderData.order.id}`);
                    } else {
                      alert('Hệ thống đang kiểm tra biến động số dư. Nếu bạn đã chuyển khoản xong, vui lòng đợi 1-2 phút hoặc bấm nút Zalo bên dưới để gửi biên lai cho Kiệt nhé!');
                    }
                  } catch (e) {
                    alert('Lỗi kiểm tra giao dịch');
                  }
                }}
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
              >
                Tôi đã chuyển khoản xong (Kiểm tra ngay)
              </button>

              <a
                href={`https://zalo.me/0352279413?text=${encodeURIComponent(`Chào bạn Kiệt, tôi vừa thanh toán đơn hàng ${orderData.order.id} cho sản phẩm ${product.title}. Nhờ bạn kiểm tra giúp tôi với nhé!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-emerald-200"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Gửi biên lai qua Zalo hỗ trợ nhanh</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
