'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, QrCode, Copy, Check, Loader2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export default function CheckoutModal({ product, onClose }) {
  const router = useRouter();
  const [step, setStep] = useState('FORM'); // 'FORM' | 'PAYMENT'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [copiedField, setCopiedField] = useState(null);
  const [simulating, setSimulating] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
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
          customerPhone: phone
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

  // Test simulator button
  const handleSimulatePayment = async () => {
    if (!orderData?.order?.id) return;
    setSimulating(true);
    try {
      const res = await fetch(`/api/orders/${orderData.order.id}/pay`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/order/${orderData.order.id}`);
      }
    } catch (err) {
      alert('Không thể giả lập thanh toán');
    } finally {
      setSimulating(false);
    }
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Cổng thanh toán tự động VietQR
          </div>
          <h2 className="text-xl font-bold">Thanh Toán Đơn Hàng</h2>
          <p className="text-xs text-indigo-100 mt-1 line-clamp-1">{product.title}</p>
        </div>

        {step === 'FORM' ? (
          /* STEP 1: Enter Customer Info */
          <form onSubmit={handleCreateOrder} className="p-6 space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Số tiền thanh toán:</span>
                <span className="text-xl font-extrabold text-indigo-600">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  Giao hàng tức thì
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Email nhận file / tài liệu <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vidu@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Hệ thống sẽ lưu đơn hàng và gửi link tải file vào email này.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Số điện thoại / Zalo <span className="text-slate-400">(Tùy chọn)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912345678"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Đang khởi tạo mã VietQR...</span>
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4" />
                  <span>Tạo mã VietQR Thanh Toán</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: VietQR Payment & Auto Checking */
          <div className="p-6 text-center space-y-4">
            <div className="flex items-center justify-between text-xs bg-amber-50 text-amber-800 px-3 py-1.5 rounded-lg border border-amber-200">
              <span>Đang chờ chuyển khoản...</span>
              <span className="font-mono font-bold">{formatTimer(countdown)}</span>
            </div>

            {/* QR Image */}
            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-indigo-200 inline-block shadow-inner">
              <img
                src={orderData.paymentInfo.qrUrl}
                alt="VietQR Code"
                className="w-56 h-56 mx-auto rounded-lg object-contain"
              />
            </div>

            <div className="text-xs text-slate-500">
              Mở app ngân hàng bất kỳ (MB, Vietcombank, Momo...) quét mã để thanh toán tự động.
            </div>

            {/* Bank details with copy buttons */}
            <div className="bg-slate-50 rounded-xl p-3.5 text-left text-xs space-y-2 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Ngân hàng:</span>
                <span className="font-bold text-slate-900">{orderData.paymentInfo.bankName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Số tài khoản:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderData.paymentInfo.bankAccount, 'acc')}
                  className="font-mono font-bold text-slate-900 flex items-center gap-1 hover:text-indigo-600"
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
                <span className="font-bold text-indigo-600">{formatPrice(orderData.paymentInfo.amount)}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Nội dung CK:</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(orderData.paymentInfo.content, 'content')}
                  className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1 hover:bg-rose-100"
                >
                  {orderData.paymentInfo.content}
                  {copiedField === 'content' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-rose-400" />}
                </button>
              </div>
            </div>

            {/* Realtime waiting indicator */}
            <div className="flex items-center justify-center gap-2 text-xs text-indigo-600 font-semibold py-1">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Hệ thống đang tự động kiểm tra chuyển khoản...</span>
            </div>

            {/* Check manual action */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/orders/${orderData.order.id}`);
                    const data = await res.json();
                    if (data.success && data.order.status === 'PAID') {
                      router.push(`/order/${orderData.order.id}`);
                    } else {
                      alert('Hệ thống chưa nhận được tiền vào tài khoản hoặc giao dịch đang được ngân hàng xử lý. Bạn vui lòng đợi 1-2 phút hoặc liên hệ hỗ trợ nếu đã chuyển thành công nhé!');
                    }
                  } catch (e) {
                    alert('Lỗi kiểm tra giao dịch');
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
              >
                Tôi đã chuyển khoản xong (Kiểm tra ngay)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
