import Link from 'next/link';
import { ArrowLeft, RefreshCw, CheckCircle2, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'Chính Sách Hoàn Tiền - Kiệt Digital Store',
  description: 'Chính sách hoàn tiền 100% và bảo hành sản phẩm số tại Kiệt Digital Store.'
};

export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </Link>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/60">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Chính Sách Bảo Hành & Hoàn Tiền</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Minh bạch, công bằng và bảo vệ quyền lợi người mua</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Cam Kết Hoàn Tiền 100%</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Chúng tôi tự tin vào chất lượng của các sản phẩm số được đăng bán. Quý khách hàng sẽ được <strong>hoàn tiền 100%</strong> trong các trường hợp sau:
          </p>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 pl-5 list-disc">
            <li>File kịch bản bị lỗi cấu trúc và đội ngũ kỹ thuật của chúng tôi không thể khắc phục được trong vòng 24 giờ.</li>
            <li>Sản phẩm nhận được có nội dung hoàn toàn khác biệt so với mô tả trên website.</li>
            <li>Đơn hàng đã thanh toán thành công nhưng hệ thống không cung cấp link tải và không được hỗ trợ kịp thời.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Quy Trình Nhận Hoàn Tiền</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Để yêu cầu hoàn tiền, quý khách chỉ cần:
          </p>
          <ol className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 pl-5 list-decimal">
            <li>Nhắn tin qua Zalo hỗ trợ kỹ thuật hoặc gửi yêu cầu tại trang Liên Hệ.</li>
            <li>Cung cấp Mã đơn hàng (ví dụ: ORD123456) và mô tả lỗi gặp phải kèm ảnh chụp màn hình.</li>
            <li>Sau khi xác nhận sự cố, tiền sẽ được chuyển khoản trực tiếp về số tài khoản ngân hàng của bạn trong vòng 2 đến 4 giờ làm việc.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Hỗ Trợ Kỹ Thuật 1-1 Trước Khi Hoàn Tiền</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Đa số các trường hợp không chạy được kịch bản thường do khách hàng chưa cấu hình đúng API Key hoặc tài khoản bot. Do đó, chúng tôi luôn ưu tiên kết nối UltraViewer để hỗ trợ bạn cài đặt thành công trước khi tiến hành hoàn tiền.
          </p>
        </section>
      </div>
    </div>
  );
}
