import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Award, HeartHandshake, Zap, Target } from 'lucide-react';

export const metadata = {
  title: 'Giới Thiệu - Kiệt Digital Store',
  description: 'Về chúng tôi, sứ mệnh và cam kết dịch vụ sản phẩm số tại Kiệt Digital Store.'
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Về trang chủ</span>
      </Link>

      {/* Main Hero Card */}
      <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-bold">
          <Award className="w-4 h-4" />
          <span>Về Chúng Tôi - Kiệt Digital Store</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
          Nền Tảng Phân Phối Tài Nguyên Số & Tự Động Hóa Thực Chiến
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Được sáng lập bởi <strong>Ngô Dương Kiệt</strong>, <strong>Kiệt Digital Store</strong> ra đời với mục tiêu mang đến cho cộng đồng kiếm tiền online (MMO), chủ doanh nghiệp nhỏ và người kinh doanh tại Việt Nam những giải pháp tự động hóa công việc chuẩn mực, thực tế và hợp pháp 100%.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">100%</div>
            <div className="text-xs text-slate-500 mt-1">Hợp pháp & Minh bạch</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">3 Giây</div>
            <div className="text-xs text-slate-500 mt-1">Giao hàng tự động VietQR</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">Trọn Đời</div>
            <div className="text-xs text-slate-500 mt-1">Hỗ trợ kỹ thuật 1-1</div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Nói Không Với Tài Khoản Lậu</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Chúng tôi kiên quyết không kinh doanh tài khoản hack, tool bẻ khóa hay dữ liệu đen. Mọi sản phẩm đều do chúng tôi tự nghiên cứu, đóng gói và kiểm duyệt an toàn.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Thực Dụng & Có Giá Trị Thật</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Không bán lý thuyết sáo rỗng. Mọi kịch bản Make.com, dữ liệu B2B đều là tài nguyên mà khách hàng có thể áp dụng trực tiếp vào công việc để tạo ra doanh thu ngay.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">Đồng Hành & Hỗ Trợ</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Khách hàng không bao giờ bị bỏ rơi sau khi thanh toán. Đội ngũ sẵn sàng hỗ trợ cài đặt từ xa qua UltraViewer hoặc hướng dẫn video call nếu gặp bất kỳ khó khăn nào.
          </p>
        </div>
      </div>
    </div>
  );
}
