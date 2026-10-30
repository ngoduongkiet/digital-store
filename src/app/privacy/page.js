import Link from 'next/link';
import { ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Chính Sách Bảo Mật - Kiệt Digital Store',
  description: 'Cam kết bảo mật dữ liệu và thông tin khách hàng tại Kiệt Digital Store.'
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </Link>

      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/60">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Chính Sách Bảo Mật Thông Tin</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Cam kết bảo vệ 100% quyền riêng tư của khách hàng</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Mục Đích Thu Thập Dữ Liệu</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Chúng tôi chỉ thu thập thông tin tối thiểu từ khách hàng gồm: <strong>Địa chỉ Email</strong> và <strong>Số điện thoại (tùy chọn)</strong> với mục đích duy nhất:
          </p>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 pl-5 list-disc">
            <li>Gửi đường dẫn tải file sản phẩm và lưu trữ bản quyền trọn đời.</li>
            <li>Hỗ trợ kỹ thuật 1-1 khi bạn cần hỗ trợ cài đặt kịch bản.</li>
            <li>Gửi thông báo cập nhật phiên bản mới miễn phí.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Cam Kết Tuyệt Đối Không Chia Sẻ Dữ Liệu</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Kiệt Digital Store cam kết <strong>không bao giờ bán, cho thuê hoặc chia sẻ</strong> thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích quảng cáo rác (spam). Mọi dữ liệu giao dịch đều được mã hóa và bảo mật.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Thanh Toán An Toàn VietQR</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Hệ thống thanh toán hoạt động thông qua mã VietQR liên ngân hàng (Techcombank). Chúng tôi không lưu trữ bất kỳ thông tin tài khoản ngân hàng, mật khẩu hay mã OTP nào của khách hàng. Giao dịch được thực hiện trực tiếp giữa ứng dụng ngân hàng của bạn và hệ thống ngân hàng Việt Nam.
          </p>
        </section>
      </div>
    </div>
  );
}
