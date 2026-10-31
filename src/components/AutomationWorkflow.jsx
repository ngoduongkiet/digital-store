'use client';

import { useState } from 'react';
import { 
  Zap, Bot, Send, Database, CheckCircle2, ArrowRight, 
  Sparkles, ShieldCheck, Clock, RefreshCw, Cpu, Layers, DollarSign 
} from 'lucide-react';

export default function AutomationWorkflow() {
  const [activeTab, setActiveTab] = useState('shopee');

  const workflows = {
    shopee: {
      title: 'Bot Săn Deal Shopee ➔ Bắn Telegram Tự Động',
      desc: 'Quy trình tự động quét API Shopee tìm voucher 50%, gọi AI tóm tắt deal sốc và tự gắn link affiliate cá nhân bắn vào kênh Telegram 24/7.',
      badge: 'Shopee Affiliate v2026',
      stats: { speed: '1.2s / chu kỳ', automation: '100% Không cần người canh', returnRate: '+45.000đ / đơn' },
      nodes: [
        {
          id: 'step1',
          label: 'Shopee Open API',
          sub: 'Quét 1.000+ voucher chớp nhoáng & flash sale',
          icon: Zap,
          color: 'bg-amber-500/10 text-amber-600 border-amber-300',
          badge: 'Trigger 24/7'
        },
        {
          id: 'step2',
          label: 'AI GPT-4o Engine',
          sub: 'Lọc deal sốc > 50% & viết caption thu hút',
          icon: Cpu,
          color: 'bg-purple-500/10 text-purple-600 border-purple-300',
          badge: 'Xử lý tự động'
        },
        {
          id: 'step3',
          label: 'Telegram Broadcaster',
          sub: 'Bắn bài kèm ảnh & nút mua vào kênh 5.000 mem',
          icon: Send,
          color: 'bg-sky-500/10 text-sky-600 border-sky-300',
          badge: 'Phát sóng tức thì'
        },
        {
          id: 'step4',
          label: 'Hoa Hồng Về Ví',
          sub: 'Khách click mua deal ➔ Ghi nhận hoa hồng thụ động',
          icon: DollarSign,
          color: 'bg-emerald-500/10 text-emerald-600 border-emerald-300',
          badge: 'Doanh thu thụ động'
        }
      ]
    },
    vietqr: {
      title: 'Hệ Thống Thanh Toán VietQR ➔ Nhả File Sau 3 Giây',
      desc: 'Toàn bộ quy trình thanh toán và giao hàng số được tự động hóa qua Napas 24/7, không cần chủ shop phải ngồi check tiền hay gửi link thủ công.',
      badge: 'Napas Auto-Delivery',
      stats: { speed: '3 giây khớp lệnh', automation: '100% Tự động 24/7', returnRate: '0% Delay' },
      nodes: [
        {
          id: 'step1',
          label: 'Khách Quét VietQR',
          sub: 'Mở app ngân hàng quét mã tự điền sẵn tiền',
          icon: Zap,
          color: 'bg-indigo-500/10 text-indigo-600 border-indigo-300',
          badge: 'Napas 24/7'
        },
        {
          id: 'step2',
          label: 'Webhook Ngân Hàng',
          sub: 'Techcombank xác nhận biến động số dư',
          icon: ShieldCheck,
          color: 'bg-red-500/10 text-red-600 border-red-300',
          badge: 'Khớp lệnh 1s'
        },
        {
          id: 'step3',
          label: 'Cloud Delivery API',
          sub: 'Mở khóa link Google Drive gốc trên màn hình',
          icon: Layers,
          color: 'bg-blue-500/10 text-blue-600 border-blue-300',
          badge: 'File sạch 100%'
        },
        {
          id: 'step4',
          label: 'Email Bản Quyền',
          sub: 'Gửi biên lai & quyền tải lại trọn đời vào email',
          icon: CheckCircle2,
          color: 'bg-emerald-500/10 text-emerald-600 border-emerald-300',
          badge: 'Hoàn tất'
        }
      ]
    },
    b2b: {
      title: 'Quy Trình Lọc & Khai Thác 25.000 Data F&B',
      desc: 'Kịch bản thu thập, xác minh số điện thoại, định vị GPS và phân nhóm data chủ quán cafe, nhà hàng để telesales và chạy quảng cáo chuyển đổi cao.',
      badge: 'B2B CRM Pipeline',
      stats: { speed: '25.000+ Hồ sơ', automation: 'Định dạng Excel / CRM', returnRate: 'Tỷ lệ nghe máy > 85%' },
      nodes: [
        {
          id: 'step1',
          label: 'Thu Thập Data Thô',
          sub: 'Google Maps & Đăng ký kinh doanh F&B',
          icon: Database,
          color: 'bg-amber-500/10 text-amber-600 border-amber-300',
          badge: '25.000+ Records'
        },
        {
          id: 'step2',
          label: 'Xác Minh SĐT & Zalo',
          sub: 'Lọc bỏ số rác, kiểm tra tài khoản Zalo hoạt động',
          icon: RefreshCw,
          color: 'bg-sky-500/10 text-sky-600 border-sky-300',
          badge: 'Lọc chuẩn 100%'
        },
        {
          id: 'step3',
          label: 'Phân Vùng Quận Huyện',
          sub: 'Chia tệp theo tỉnh thành Hà Nội, TP.HCM, Đà Nẵng',
          icon: Layers,
          color: 'bg-purple-500/10 text-purple-600 border-purple-300',
          badge: 'Dễ phân bổ sales'
        },
        {
          id: 'step4',
          label: 'Xuất CRM / Telesales',
          sub: 'Nhập vào phần mềm gọi điện chốt khách sỉ',
          icon: CheckCircle2,
          color: 'bg-emerald-500/10 text-emerald-600 border-emerald-300',
          badge: 'Ra đơn ngay'
        }
      ]
    }
  };

  const currentWf = workflows[activeTab];

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-200/90 p-6 sm:p-10 shadow-sm">
      
      {/* Top Header & Tab Switcher (Chuẩn Magic UI / Linear) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Quy Trình Tự Động Hóa Thực Chiến
            </span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Mô Hình Hoạt Động Thực Tế Của Tool
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            {currentWf.desc}
          </p>
        </div>

        {/* Tab Buttons (Chuẩn Focal / Magic UI) */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200/80 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('shopee')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              activeTab === 'shopee'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bot Shopee
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vietqr')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              activeTab === 'vietqr'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Giao File 3s
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('b2b')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              activeTab === 'b2b'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Data B2B
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes with Animated Beams (Chuẩn Magic UI Animated Beam) */}
      <div className="py-10 relative">
        
        {/* Horizontal Connector Line on Desktop */}
        <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-amber-200 via-purple-300 to-emerald-300 z-0">
          {/* Animated Glowing Light Pulse (Magic Beam) */}
          <div className="w-20 h-[3px] bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)] rounded-full animate-marquee"></div>
        </div>

        {/* 4 Connected Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {currentWf.nodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl ${node.color} border flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
                      Bước {idx + 1}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {node.badge}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900">
                    {node.label}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {node.sub}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tự Động Hóa
                  </span>
                  <span className="font-mono text-slate-400">0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Live Metrics Strip (Tạo Uy Tín Thực Tế) */}
      <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Tốc Độ Xử Lý
          </span>
          <span className="font-bold text-sm text-slate-900 mt-0.5 block">
            ⚡ {currentWf.stats.speed}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Mức Độ Tự Động
          </span>
          <span className="font-bold text-sm text-emerald-600 mt-0.5 block">
            ✓ {currentWf.stats.automation}
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Hiệu Quả Doanh Thu
          </span>
          <span className="font-bold text-sm text-purple-600 mt-0.5 block">
            💰 {currentWf.stats.returnRate}
          </span>
        </div>
      </div>

    </div>
  );
}
