import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingSupport from '@/components/FloatingSupport';

export const metadata = {
  title: 'Kiệt Digital Store - Kho Kịch Bản Tự Động Hóa & Tài Nguyên MMO Hàng Đầu',
  description: 'Nền tảng phân phối kịch bản n8n, Make.com, dữ liệu khách hàng B2B, tool tự động hóa và tài nguyên kiếm tiền online (MMO) tự động 100% qua VietQR.',
  keywords: 'n8n shopee, kịch bản make.com, tự động hóa mmo, data b2b quán cafe, prompt ai bán hàng',
  authors: [{ name: 'Kiệt Digital Store' }],
  openGraph: {
    title: 'Kiệt Digital Store - Tự Động Hóa Công Việc & Tài Nguyên MMO',
    description: 'Quét mã VietQR nhận ngay kịch bản tự động n8n/Make.com, data khách hàng B2B chất lượng cao. Nhả hàng sau 3 giây!',
    type: 'website',
    locale: 'vi_VN',
    url: 'https://digital-store.vercel.app',
    siteName: 'Kiệt Digital Store',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
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
