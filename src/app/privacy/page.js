import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export const metadata = {
  title: 'Chính Sách Bảo Mật - Kiệt Digital Store',
  description: 'Chính sách bảo mật dữ liệu và thông tin khách hàng.'
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </Link>

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">Chính Sách Bảo Mật Thông Tin</h1>
            <p className="text-xs text-slate-500">Cam kết bảo mật 100% dữ liệu người dùng</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">1. Thu Thập Dữ Liệu</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Chúng tôi chỉ thu thập thông tin tối thiểu cần thiết để phục vụ đơn hàng, bao gồm: <strong>Địa chỉ Email</strong> (để gửi link tải file và thông tin tra cứu đơn) và <strong>Số điện thoại</strong> (tùy chọn, để hỗ trợ kỹ thuật qua Zalo khi cần).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">2. An Toàn Thanh Toán</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Hệ thống không lưu trữ bất kỳ thông tin tài khoản ngân hàng, mã PIN hay mật khẩu của quý khách. Mọi giao dịch đều được thực hiện qua ứng dụng ngân hàng chính thức của quý khách bằng phương thức quét mã VietQR Napas 24/7.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">3. Cam Kết Không Tiết Lộ Cho Bên Thứ Ba</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Chúng tôi cam kết không bán, không trao đổi hoặc chia sẻ thông tin khách hàng cho bất kỳ đơn vị quảng cáo hay bên thứ ba nào vì bất kỳ mục đích nào.
          </p>
        </section>
      </div>
    </div>
  );
}
