import Link from 'next/link';
import { ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Điều Khoản Dịch Vụ - Kiệt Digital Store',
  description: 'Điều khoản sử dụng và cam kết hợp pháp của Kiệt Digital Store.'
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </Link>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/60">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Điều Khoản Dịch Vụ & Pháp Lý</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Cập nhật lần cuối: Tháng 10/2026</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Tính Hợp Pháp Của Sản Phẩm Số</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Kiệt Digital Store cam kết 100% các sản phẩm được phân phối trên hệ thống (bao gồm các kịch bản tự động hóa n8n/Make.com, tài liệu hướng dẫn, bộ câu lệnh AI và tệp dữ liệu thông tin công khai) đều tuân thủ nghiêm ngặt theo quy định của pháp luật Việt Nam.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Chúng tôi <strong>tuyệt đối không kinh doanh</strong> các công cụ bẻ khóa (crack), phần mềm độc hại, tool tấn công mạng hoặc dữ liệu cá nhân nhạy cảm bất hợp pháp.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Quyền Sở Hữu & Sử Dụng</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Khi hoàn tất thanh toán, khách hàng nhận được quyền sử dụng trọn đời (Lifetime License) đối với sản phẩm đã mua cho mục đích cá nhân hoặc nội bộ doanh nghiệp. Khách hàng không được phép bán lại nguyên vẹn gói sản phẩm trên các sàn thương mại hoặc chia sẻ công khai khi chưa có sự đồng ý của chúng tôi.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Giao Hàng & Bảo Hành</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Sản phẩm được phân phối hoàn toàn tự động qua hệ thống tải về trực tuyến ngay sau khi giao dịch chuyển khoản VietQR được xác nhận. Chúng tôi cung cấp chế độ hỗ trợ kỹ thuật 1-1 qua Zalo trong trường hợp khách hàng gặp sự cố trong quá trình cài đặt.
          </p>
        </section>
      </div>
    </div>
  );
}
