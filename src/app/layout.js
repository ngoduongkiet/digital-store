import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingSupport from '@/components/FloatingSupport';

export const metadata = {
  title: 'Kiệt Digital Store - Kho Vũ Khí Số & Kịch Bản Tự Động Hóa MMO 2026',
  description: 'Nền tảng phân phối kịch bản tự động hóa, tool MMO thực chiến, tệp data B2B và tài nguyên số bản quyền 100% tự động qua VietQR.',
  keywords: 'tool shopee, kịch bản make n8n, data b2b cafe, prompt ai mmo, kiệt digital store',
  authors: [{ name: 'Ngô Dương Kiệt' }],
  openGraph: {
    title: 'Kiệt Digital Store - Vũ Khí Số & Tự Động Hóa MMO Thực Chiến',
    description: 'Quét mã VietQR nhả file tải sau 3 giây. Bảo hành hoàn tiền 100% từ Founder Ngô Dương Kiệt.',
    type: 'website',
    locale: 'vi_VN',
    url: 'https://digital-store-eight-ebon.vercel.app',
    siteName: 'Kiệt Digital Store',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased bg-[#f8f9fa] text-slate-800 selection:bg-slate-900 selection:text-white transition-colors">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingSupport />
      </body>
    </html>
  );
}
