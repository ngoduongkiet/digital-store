'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  X, QrCode, Copy, Check, Loader2, ShieldCheck, Tag,
  Sparkles, CheckCircle2, MessageCircle, AlertTriangle
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
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-700 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-28 h-28 rounded-full bg-white/10 blur-xl"></div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cổng Thanh Toán VietQR Napas 24/7</span>
          </div>
          <h2 className="text-xl font-extrabold">Thanh Toán Đơn Hàng</h2>
          <p className="text-xs text-indigo-100 mt-1 line-clamp-1">{product.title}</p>
        </div>

        {step === 'FORM' ? (
          /* STEP 1: Enter Customer Info & Coupon */
          <form onSubmit={handleCreateOrder} className="p-6 space-y-4">
            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Giá gốc:</span>
                <span className="line-through">{formatPrice(product.originalPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                <span>Giá ưu đãi hôm nay:</span>
                <span className="font-bold">{formatPrice(product.price)}</span>
              </div>
              {couponData?.valid && (
                <div className="flex items-center justify-between text-xs text-emerald-600 font-bold">
                  <span>Mã giảm ({couponData.code}):</span>
                  <span>-{formatPrice(couponData.discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 dark:border-slate-700">
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">Tổng thanh toán:</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {formatPrice(currentPrice)}
                </span>
              </div>
            </div>

            {/* COUPON INPUT */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Mã giảm giá
                </label>
                <button
                  type="button"
                  onClick={() => setCouponCode('KHAITRUONG')}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs uppercase font-mono font-bold focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={applyingCoupon || !couponCode.trim()}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 text-white text-xs font-bold transition disabled:opacity-50"
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
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Email nhận file / tài liệu <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="emailcuaban@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Hệ thống gửi bản lưu link tải và bản quyền file về email này.
              </span>
            </div>

            {/* Customer Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                Số điện thoại / Zalo <span className="text-slate-400">(Để hỗ trợ khi cần)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-extrabold text-sm shadow-md shadow-indigo-500/25 dark:shadow-none flex items-center justify-center gap-2 transition disabled:opacity-70 transform active:scale-98"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang khởi tạo mã VietQR...</span>
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4" />
                  <span>Tạo mã VietQR ({formatPrice(currentPrice)})</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: VietQR Payment Screen */
          <div className="p-6 text-center space-y-4">
            <div className="flex items-center justify-between text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800">
              <span className="font-semibold">Đang chờ quét mã Techcombank...</span>
              <span className="font-mono font-black">{formatTimer(countdown)}</span>
            </div>

            {/* QR Image */}
            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-indigo-200 inline-block shadow-inner">
              <img
                src={orderData.paymentInfo.qrUrl}
                alt="VietQR Code"
                className="w-56 h-56 mx-auto rounded-lg object-contain"
              />
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              Mở app ngân hàng (Techcombank, Vietcombank, MB, Momo...) quét mã để thanh toán chuẩn xác.
            </div>

            {/* Bank details with copy buttons */}
            <div className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-3.5 text-left text-xs space-y-2 border border-slate-200/80 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Ngân hàng:</span>
                <span className="font-bold text-slate-900 dark:text-white">{orderData.paymentInfo.bankName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Số tài khoản:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderData.paymentInfo.bankAccount, 'acc')}
                  className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1 hover:text-indigo-600 transition"
                >
                  {orderData.paymentInfo.bankAccount}
                  {copiedField === 'acc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Chủ tài khoản:</span>
                <span className="font-bold text-slate-900 dark:text-white">{orderData.paymentInfo.bankOwner}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Số tiền:</span>
                <span className="font-black text-indigo-600 dark:text-indigo-400">{formatPrice(orderData.paymentInfo.amount)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Nội dung CK:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderData.paymentInfo.content, 'content')}
                  className="font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded flex items-center gap-1 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition"
                >
                  {orderData.paymentInfo.content}
                  {copiedField === 'content' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
                </button>
              </div>
            </div>

            {/* Realtime waiting indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold py-1">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Hệ thống đang tự động kiểm tra giao dịch...</span>
            </div>

            {/* Check manual action & Zalo Support */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/orders/${orderData.order.id}`);
                    const data = await res.json();
                    if (data.success && data.order.status === 'PAID') {
                      router.push(`/order/${orderData.order.id}`);
                    } else {
                      alert('Hệ thống đang kiểm tra biến động số dư. Nếu bạn đã chuyển khoản xong, vui lòng đợi 1-2 phút hoặc bấm nút Zalo bên dưới để gửi biên lai nhé!');
                    }
                  } catch (e) {
                    alert('Lỗi kiểm tra giao dịch');
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition"
              >
                Tôi đã chuyển khoản xong (Kiểm tra ngay)
              </button>

              <a
                href={`https://zalo.me/0352279413?text=${encodeURIComponent(`Chào bạn Kiệt, tôi vừa thanh toán đơn hàng ${orderData.order.id} cho sản phẩm ${product.title}. Nhờ bạn kiểm tra giúp tôi với nhé!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <MessageCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>Gửi biên lai qua Zalo hỗ trợ nhanh</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
