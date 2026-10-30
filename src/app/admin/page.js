'use client';

import { useState, useEffect } from 'react';
import {
  Lock, TrendingUp, DollarSign, Package, ShoppingCart,
  Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw, LogOut,
  Settings, Download, Edit3, X, Save, MessageSquare, Tag, Eye
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Dashboard Data
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('PRODUCTS'); // 'PRODUCTS' | 'ORDERS' | 'MESSAGES' | 'SETTINGS'

  // Settings form
  const [settingsForm, setSettingsForm] = useState({
    storeName: 'Kiệt Digital Store',
    bankName: 'Techcombank',
    bankAccount: '19075242377010',
    bankOwner: 'NGO DUONG KIET',
    adminPassword: '',
    hotline: '',
    zaloLink: '',
    telegramLink: ''
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // New Product Modal Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProd, setNewProd] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    price: 199000,
    originalPrice: 399000,
    category: 'Tự Động Hóa',
    badge: 'Kịch Bản Tự Động',
    fileFormat: 'JSON (Make / n8n Blueprint)',
    fileSize: '2.5 KB',
    version: '2026.1',
    testedClean: 'VirusTotal Clean 100%',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    downloadUrl: '/downloads/kich-ban-san-deal-shopee-telegram.json',
    fileName: 'kich-ban-moi.json',
    features: 'Tự động chạy 24/7\nKhông cần mở máy\nHướng dẫn chi tiết 3 phút'
  });

  const loadData = async () => {
    try {
      const [resStats, resProds, resOrders, resSettings, resMsgs] = await Promise.all([
        fetch('/api/stats').then((r) => r.json()),
        fetch('/api/products').then((r) => r.json()),
        fetch('/api/orders').then((r) => r.json()),
        fetch('/api/settings').then((r) => r.json()),
        fetch('/api/messages').then((r) => r.json())
      ]);

      if (resStats.success) setStats(resStats.stats);
      if (resProds.success) setProducts(resProds.products);
      if (resOrders.success) setOrders(resOrders.orders);
      if (resSettings.success && resSettings.settings) {
        setSettingsForm((prev) => ({
          ...prev,
          ...resSettings.settings
        }));
      }
      if (resMsgs.success) setMessages(resMsgs.messages);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setErrorMsg('');
        loadData();
      } else {
        setErrorMsg(data.error || 'Mật khẩu không đúng!');
      }
    } catch (err) {
      setErrorMsg('Lỗi kết nối máy chủ');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        loadData();
      }
    } catch (err) {
      alert('Lỗi khi xóa sản phẩm');
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const featuresArray = newProd.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProd,
          price: Number(newProd.price),
          originalPrice: Number(newProd.originalPrice),
          features: featuresArray
        })
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        loadData();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert('Lỗi khi tạo sản phẩm');
    }
  };

  const handleMarkAsPaid = async (orderId) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/pay`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        loadData();
      }
    } catch (err) {
      alert('Lỗi duyệt thanh toán');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!confirm('Bạn có chắc muốn xóa đơn hàng này?')) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        loadData();
      }
    } catch (err) {
      alert('Lỗi xóa đơn hàng');
    }
  };

  const handleDeleteMessage = async (msgId) => {
    if (!confirm('Bạn có chắc muốn xóa tin nhắn này?')) return;
    try {
      const res = await fetch(`/api/messages/${msgId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        loadData();
      }
    } catch (err) {
      alert('Lỗi xóa tin nhắn');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm)
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSuccess(true);
        loadData();
        setTimeout(() => setSettingsSuccess(false), 3000);
      }
    } catch (err) {
      alert('Lỗi khi lưu cài đặt');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleExportOrders = () => {
    if (orders.length === 0) {
      alert('Chưa có đơn hàng nào để xuất!');
      return;
    }
    const headers = ['MaDon,SanPham,GiaTien,EmailKhach,SoDienThoai,TrangThai,NgayMua'];
    const rows = orders.map((o) =>
      `"${o.id}","${o.productTitle}",${o.productPrice},"${o.customerEmail}","${o.customerPhone}","${o.status}","${o.createdAt}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `danh-sach-don-hang-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-100 dark:border-indigo-900/60 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Trang Quản Trị Hệ Thống</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">
            Khu vực bảo mật dành riêng cho Quản trị viên Kiệt Digital Store.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu quản trị..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            {errorMsg && <p className="text-xs text-rose-500 font-bold">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition"
            >
              Đăng Nhập Quản Trị
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Bảng Điều Khiển Quản Trị</span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Live Real
            </span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Quản lý tài nguyên, duyệt đơn chuyển khoản VietQR, tin nhắn khách và cấu hình cửa hàng.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Làm mới</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-700 dark:text-rose-400 text-xs font-semibold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Real Statistics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Doanh thu thực tế</span>
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
              {formatPrice(stats?.totalRevenue || 0)}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Đơn đã giao thành công</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {stats?.paidOrders || 0}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Tổng đơn khởi tạo</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {stats?.totalOrders || 0}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Tin nhắn khách gửi</span>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              {messages.length}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('PRODUCTS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'PRODUCTS'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Sản Phẩm ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'ORDERS'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Đơn Hàng ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('MESSAGES')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'MESSAGES'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Tin Nhắn Khách ({messages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('SETTINGS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'SETTINGS'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Cài Đặt Cửa Hàng & Ngân Hàng</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS LIST */}
      {activeTab === 'PRODUCTS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-slate-900 dark:text-white">Danh Sách Tài Nguyên Số</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Sản Phẩm Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div>
                  <div className="h-36 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-3 relative">
                    <img src={prod.imageUrl} alt={prod.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-600 text-white">
                      {prod.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">{prod.title}</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-black text-indigo-600 dark:text-indigo-400 text-base">{formatPrice(prod.price)}</span>
                    <span className="text-xs text-slate-400 line-through">{formatPrice(prod.originalPrice)}</span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                    Đã bán thực tế: <strong className="text-emerald-600">{prod.salesCount || 0}</strong>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono truncate max-w-[150px]">{prod.fileName}</span>
                  <button
                    onClick={() => handleDeleteProduct(prod.id)}
                    className="p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-600 transition"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'ORDERS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-base text-slate-900 dark:text-white">Quản Lý Đơn Hàng & Duyệt Chuyển Khoản</h2>
            <button
              onClick={handleExportOrders}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold transition"
            >
              <Download className="w-4 h-4" />
              <span>Xuất File CSV</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-x-auto shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Mã Đơn</th>
                  <th className="p-4">Sản Phẩm</th>
                  <th className="p-4">Khách Hàng</th>
                  <th className="p-4">Số Tiền</th>
                  <th className="p-4">Thời Gian</th>
                  <th className="p-4">Trạng Thái</th>
                  <th className="p-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-400">Chưa có đơn hàng nào phát sinh.</td>
                  </tr>
                ) : (
                  orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{ord.id}</td>
                      <td className="p-4 font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate">{ord.productTitle}</td>
                      <td className="p-4">
                        <div className="font-medium text-slate-900 dark:text-white">{ord.customerEmail}</div>
                        <div className="text-[11px] text-slate-400">{ord.customerPhone}</div>
                      </td>
                      <td className="p-4 font-black text-indigo-600 dark:text-indigo-400">{formatPrice(ord.productPrice)}</td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">{new Date(ord.createdAt).toLocaleString('vi-VN')}</td>
                      <td className="p-4 whitespace-nowrap">
                        {ord.status === 'PAID' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Đã thanh toán
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full">
                            Chờ nhận tiền
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {ord.status === 'PENDING' && (
                            <button
                              onClick={() => handleMarkAsPaid(ord.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-sm transition"
                            >
                              Duyệt Đã Nhận Tiền
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteOrder(ord.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500 hover:text-rose-600 transition"
                            title="Xóa đơn hàng"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER MESSAGES */}
      {activeTab === 'MESSAGES' && (
        <div className="space-y-4">
          <h2 className="font-bold text-base text-slate-900 dark:text-white">Tin Nhắn Khách Hàng Gửi Đến</h2>
          {messages.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center text-slate-400 text-xs">
              Chưa có tin nhắn hỗ trợ nào từ khách hàng.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{m.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">{new Date(m.createdAt).toLocaleString('vi-VN')}</span>
                      <button
                        onClick={() => handleDeleteMessage(m.id)}
                        className="p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950 text-rose-500 hover:text-rose-600 transition"
                        title="Xóa tin nhắn này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-4">
                    <span>Email: <strong className="text-slate-700 dark:text-slate-200">{m.email}</strong></span>
                    {m.phone && <span>SĐT: <strong className="text-slate-700 dark:text-slate-200">{m.phone}</strong></span>}
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{m.message}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {activeTab === 'SETTINGS' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl">
          <h2 className="font-bold text-base text-slate-900 dark:text-white mb-6">Cài Đặt Cửa Hàng & Tài Khoản Ngân Hàng</h2>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tên cửa hàng</label>
              <input
                type="text"
                value={settingsForm.storeName}
                onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Ngân hàng thụ hưởng</label>
                <input
                  type="text"
                  value={settingsForm.bankName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bankName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Số tài khoản ngân hàng</label>
                <input
                  type="text"
                  value={settingsForm.bankAccount}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bankAccount: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Tên chủ tài khoản (In hoa không dấu)</label>
              <input
                type="text"
                value={settingsForm.bankOwner}
                onChange={(e) => setSettingsForm({ ...settingsForm, bankOwner: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Số Hotline / Zalo</label>
                <input
                  type="text"
                  value={settingsForm.hotline}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hotline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Link Zalo hỗ trợ</label>
                <input
                  type="text"
                  value={settingsForm.zaloLink}
                  onChange={(e) => setSettingsForm({ ...settingsForm, zaloLink: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {settingsSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Đã lưu cấu hình thành công!</span>
              </div>
            )}

            <button
              type="submit"
              disabled={savingSettings}
              className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition disabled:opacity-70 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{savingSettings ? 'Đang lưu...' : 'Lưu Thay Đổi'}</span>
            </button>
          </form>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Thêm Tài Nguyên Mới</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tiêu đề sản phẩm</label>
                <input
                  type="text"
                  required
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Giá bán (VNĐ)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Giá gốc (VNĐ)</label>
                  <input
                    type="number"
                    required
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Danh mục</label>
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                >
                  <option value="Tự Động Hóa">Tự Động Hóa</option>
                  <option value="Data Khách Hàng">Data Khách Hàng</option>
                  <option value="Tài Nguyên Bán Hàng">Tài Nguyên Bán Hàng</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Mô tả ngắn</label>
                <textarea
                  rows="2"
                  value={newProd.shortDesc}
                  onChange={(e) => setNewProd({ ...newProd, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"
              >
                Lưu Và Đăng Bán
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
