'use client';

import { useState, useEffect } from 'react';
import {
  Lock, TrendingUp, DollarSign, Package, ShoppingCart,
  Plus, Trash2, CheckCircle2, AlertCircle, RefreshCw, LogOut, ArrowUpRight
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Dashboard Data
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('PRODUCTS'); // 'PRODUCTS' | 'ORDERS'

  // New Product Modal Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProd, setNewProd] = useState({
    title: '',
    shortDesc: '',
    fullDesc: '',
    price: 199000,
    originalPrice: 399000,
    category: 'Tự Động Hóa',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    downloadUrl: '/downloads/kich-ban-san-deal-shopee-telegram.json',
    fileName: 'kich-ban-moi.json',
    features: 'Tự động chạy 24/7\nKhông cần mở máy\nHướng dẫn chi tiết 3 phút'
  });

  const loadData = async () => {
    try {
      const [resStats, resProds, resOrders] = await Promise.all([
        fetch('/api/stats').then((r) => r.json()),
        fetch('/api/products').then((r) => r.json()),
        fetch('/api/orders').then((r) => r.json())
      ]);

      if (resStats.success) setStats(resStats.stats);
      if (resProds.success) setProducts(resProds.products);
      if (resOrders.success) setOrders(resOrders.orders);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadData();
    } else {
      setErrorMsg('Mật khẩu không đúng! (Mặc định là "admin")');
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // IF NOT LOGGED IN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Đăng Nhập Quản Trị</h2>
          <p className="text-xs text-slate-400 mt-1 mb-6">Trang dành riêng cho chủ shop Kiệt Digital Store</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu quản trị..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-center font-mono"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                (Mật khẩu mặc định là: <strong>admin</strong>)
              </span>
            </div>

            {errorMsg && (
              <div className="text-xs text-rose-500 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
            >
              Vào Bảng Quản Trị
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Bảng Điều Khiển Quản Trị</h1>
          <p className="text-xs text-slate-500 mt-1">
            Quản lý doanh thu, danh mục sản phẩm và theo dõi các đơn hàng tự động.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Làm mới</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-semibold text-rose-700 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Thoát</span>
          </button>
        </div>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-indigo-600 mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Tổng Doanh Thu</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {formatPrice(stats?.totalRevenue || 0)}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            Tiền thực nhận qua VietQR
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Đơn Đã Thanh Toán</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{stats?.paidOrders || 0}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Trên tổng số {stats?.totalOrders || 0} đơn tạo ra
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-purple-600 mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Tổng Sản Phẩm</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{products.length}</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Đang hoạt động trên web</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-blue-600 mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Tài Khoản Nhận Tiền</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-black text-slate-900 truncate">
            {stats?.settings?.bankName || 'MBBank'}
          </div>
          <span className="text-[11px] text-slate-500 font-mono mt-1 block">
            STK: {stats?.settings?.bankAccount || '0987654321'}
          </span>
        </div>
      </div>

      {/* TABS HEADER */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('PRODUCTS')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'PRODUCTS'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Danh sách sản phẩm ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('ORDERS')}
            className={`pb-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'ORDERS'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Đơn hàng gần đây ({orders.length})
          </button>
        </div>

        {activeTab === 'PRODUCTS' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition mb-2"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm sản phẩm mới</span>
          </button>
        )}
      </div>

      {/* TAB CONTENT: PRODUCTS */}
      {activeTab === 'PRODUCTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">{p.category}</span>
                  <span>{p.salesCount || 0} đã bán</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{p.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.shortDesc}</p>
                <div className="mt-3 text-base font-black text-indigo-600">{formatPrice(p.price)}</div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[180px]">File: {p.fileName}</span>
                <button
                  onClick={() => handleDeleteProduct(p.id)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
                  title="Xóa sản phẩm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'ORDERS' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase font-bold">
                <tr>
                  <th className="px-5 py-3.5">Mã đơn</th>
                  <th className="px-5 py-3.5">Sản phẩm</th>
                  <th className="px-5 py-3.5">Khách hàng</th>
                  <th className="px-5 py-3.5">Số tiền</th>
                  <th className="px-5 py-3.5">Trạng thái</th>
                  <th className="px-5 py-3.5">Thời gian</th>
                  <th className="px-5 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-slate-400">Chưa có đơn hàng nào.</td>
                  </tr>
                ) : (
                  orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3.5 font-mono font-bold text-slate-900">{ord.id}</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-800 max-w-xs truncate">{ord.productTitle}</td>
                      <td className="px-5 py-3.5 text-slate-600">{ord.customerEmail}</td>
                      <td className="px-5 py-3.5 font-bold text-indigo-600">{formatPrice(ord.productPrice)}</td>
                      <td className="px-5 py-3.5">
                        {ord.status === 'PAID' ? (
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                            <CheckCircle2 className="w-3 h-3" />
                            Đã thanh toán
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                            Chờ duyệt
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-slate-400">
                        {new Date(ord.createdAt).toLocaleTimeString('vi-VN')} {new Date(ord.createdAt).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {ord.status !== 'PAID' && (
                          <button
                            onClick={() => handleMarkAsPaid(ord.id)}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-sm transition"
                          >
                            Duyệt đã nhận tiền
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Thêm Sản Phẩm Số Mới</h2>
            <p className="text-xs text-slate-400 mb-6">Nhập thông tin sản phẩm để đưa lên kệ bán hàng tự động.</p>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={newProd.title}
                  onChange={(e) => setNewProd({ ...newProd, title: e.target.value })}
                  placeholder="Ví dụ: Kịch bản Bot cào tin tức tự động..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giá bán thực tế (VND) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Giá gạch bỏ (VND)</label>
                  <input
                    type="number"
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Danh mục</label>
                <select
                  value={newProd.category}
                  onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Tự Động Hóa">🤖 Tự Động Hóa</option>
                  <option value="Data Khách Hàng">📊 Data Khách Hàng</option>
                  <option value="Tài Nguyên Bán Hàng">💼 Tài Nguyên Bán Hàng</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mô tả ngắn</label>
                <input
                  type="text"
                  value={newProd.shortDesc}
                  onChange={(e) => setNewProd({ ...newProd, shortDesc: e.target.value })}
                  placeholder="Mô tả 1-2 câu về công dụng..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Đường dẫn file tải về (URL hoặc đường dẫn file)</label>
                <input
                  type="text"
                  value={newProd.downloadUrl}
                  onChange={(e) => setNewProd({ ...newProd, downloadUrl: e.target.value })}
                  placeholder="/downloads/ten-file.json hoặc link Google Drive..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Các tính năng nổi bật (mỗi dòng 1 tính năng)</label>
                <textarea
                  rows="3"
                  value={newProd.features}
                  onChange={(e) => setNewProd({ ...newProd, features: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition"
                >
                  Đăng Bán Ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
