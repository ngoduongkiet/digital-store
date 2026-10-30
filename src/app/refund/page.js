import Link from 'next/link';
import { ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Chính Sách Bảo Hành & Hoàn Tiền - Kiệt Digital Store',
  description: 'Chính sách hỗ trợ kỹ thuật và cam kết hoàn tiền 100% nếu sản phẩm lỗi.'
};

export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </Link>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Chính Sách Bảo Hành & Đổi Trả</h1>
            <p className="text-xs text-slate-500">Bảo vệ quyền lợi tối đa cho khách hàng</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">1. Cam Kết Hỗ Trợ Kỹ Thuật 1-1</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Mọi sản phẩm bán ra đều đi kèm với cam kết hỗ trợ cài đặt. Nếu bạn gặp bất kỳ khó khăn nào trong quá trình nhập file vào Make.com / n8n hoặc mở file dữ liệu, đội ngũ hỗ trợ sẽ hướng dẫn trực tiếp qua UltraViewer / TeamViewer hoặc video call Zalo hoàn toàn miễn phí.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">2. Chính Sách Hoàn Tiền 100%</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Chúng tôi cam kết hoàn lại <strong>100% số tiền thanh toán</strong> trong các trường hợp sau:
          </p>
          <ul className="text-xs sm:text-sm text-slate-600 space-y-2 pl-5 list-disc">
            <li>File tải về bị hỏng, lỗi cấu trúc và đội ngũ kỹ thuật không thể khắc phục được trong 24 giờ.</li>
            <li>Sản phẩm không đúng với mô tả được niêm yết trên website.</li>
            <li>Giao dịch bị trùng lặp do lỗi hệ thống ngân hàng (chuyển tiền 2 lần).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">3. Quy Trình Nhận Hoàn Tiền</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Khách hàng chỉ cần gửi mã đơn hàng (ORD...) cùng ảnh chụp lỗi về Zalo hoặc Telegram hỗ trợ. Tiền sẽ được chuyển khoản trả lại tài khoản ngân hàng của bạn trong vòng tối đa 2 giờ làm việc.
          </p>
        </section>
      </div>
    </div>
  );
}
