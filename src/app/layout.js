import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Kiệt Digital Store - Kho Kịch Bản Tự Động Hóa & Tài Nguyên MMO',
  description: 'Nền tảng mua bán kịch bản n8n, Make.com, tool tự động hoá, data khách hàng B2B và tài nguyên MMO tự động 100% qua VietQR.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen antialiased bg-slate-50 text-slate-900">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
