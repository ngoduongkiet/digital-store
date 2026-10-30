import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

const INITIAL_PRODUCTS = [
  {
    id: 'workflow-shopee',
    title: 'Kịch bản Make/n8n: Bot Săn Deal Shopee & Bắn Telegram Tự Động',
    shortDesc: 'Tự động quét voucher 50%, flash sale Shopee 24/7, tự gắn mã tiếp thị affiliate và đẩy tin nhắn vào nhóm/kênh Telegram.',
    price: 199000,
    originalPrice: 450000,
    category: 'Tự Động Hóa',
    rating: 4.9,
    salesCount: 84,
    badge: 'Bán chạy nhất',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    downloadUrl: '/downloads/kich-ban-san-deal-shopee-telegram.json',
    fileName: 'kich-ban-san-deal-shopee-telegram.json',
    features: [
      'Chạy tự động 24/7 không cần mở máy tính liên tục',
      'Tự động chèn link tiếp thị liên kết (Affiliate) để ăn hoa hồng',
      'Kèm video hướng dẫn 3 phút import file là chạy ngay',
      'Được hỗ trợ kỹ thuật và nhận bản cập nhật mới miễn phí trọn đời'
    ],
    fullDesc: 'Bạn muốn xây dựng kênh săn deal Telegram kiếm hoa hồng thụ động nhưng không có thời gian ngồi canh deal? Kịch bản này sẽ thay bạn làm 100% công việc: Quét voucher giảm 50%, deal sốc từ Shopee -> Cho AI viết lại tóm tắt ngắn gọn hấp dẫn -> Tự động chèn link affiliate cá nhân của bạn -> Bắn vào kênh Telegram mỗi 15 phút. Bạn chỉ việc nằm ngủ và nhận tiền hoa hồng!'
  },
  {
    id: 'data-cafe-hcm',
    title: 'Bộ Data B2B: 1.500 Quán Cafe & Nhà Hàng Sài Gòn (Có SĐT)',
    shortDesc: 'File Excel quét sạch 1.500 quán cà phê, nhà hàng tại TP.HCM. Có đầy đủ tên quán, địa chỉ, số điện thoại chủ quán/quản lý, link Google Maps.',
    price: 149000,
    originalPrice: 350000,
    category: 'Data Khách Hàng',
    rating: 4.8,
    salesCount: 112,
    badge: 'Mới cập nhật',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=60',
    downloadUrl: '/downloads/data-1500-quan-cafe-nha-hang-hcm.csv',
    fileName: 'data-1500-quan-cafe-nha-hang-hcm.csv',
    features: [
      '1.500 số điện thoại liên hệ trực tiếp chủ quán/quản lý',
      'Đầy đủ thông tin: Địa chỉ, Quận, Đánh giá sao, Link Maps',
      'Chuẩn định dạng Excel (.csv/xlsx) mở được trên điện thoại và máy tính',
      'Cực kỳ phù hợp cho dân Telesale, phần mềm POS, nội thất, F&B'
    ],
    fullDesc: 'Data khách hàng chất lượng cao được quét công khai từ Google Maps tại các quận trung tâm TP.HCM (Quận 1, Quận 3, Bình Thạnh, Thủ Đức...). Đã lọc bỏ các số bàn không liên lạc được, chuẩn xác tới 90%. Tiết kiệm hàng tuần trời ngồi tìm kiếm thông tin khách hàng.'
  },
  {
    id: 'prompt-pack-ecommerce',
    title: 'Bộ File Tính Lãi Sàn TMĐT & 500+ Prompt AI Bán Hàng',
    shortDesc: 'File tính tự động chi phí sàn, thuế, lãi ròng Shopee/TikTok Shop + Bộ 500 câu lệnh AI viết bài quảng cáo, kịch bản video ngắn nổ đơn.',
    price: 99000,
    originalPrice: 250000,
    category: 'Tài Nguyên Bán Hàng',
    rating: 4.9,
    salesCount: 195,
    badge: 'Cực Hot',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    downloadUrl: '/downloads/bo-tinh-lai-san-va-500-prompt-ai.txt',
    fileName: 'bo-tinh-lai-san-va-500-prompt-ai.txt',
    features: [
      'Bảng tính chi phí chuẩn thuật toán sàn mới nhất năm 2026',
      '500 Prompt AI tối ưu riêng cho ChatGPT, Gemini, Claude',
      'Bộ công thức viết tiêu đề giật tít, kịch bản giữ chân TikTok 15s',
      'Định dạng dễ dùng, chỉ cần nhập giá vốn là ra tiền lãi'
    ],
    fullDesc: 'Bộ vũ khí không thể thiếu cho bất kỳ ai kinh doanh online. Giúp bạn không bao giờ bị tình trạng "bán hàng rôm rả nhưng cuối tháng lỗ vốn vì không tính chuẩn phí sàn". Kèm theo 500 câu lệnh AI giúp bạn sản xuất 10 bài viết quảng cáo hoặc kịch bản video chỉ trong 5 phút.'
  }
];

function initData() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      const initial = {
        products: INITIAL_PRODUCTS,
        orders: [],
        settings: {
          storeName: 'Kiệt Digital Store',
          bankName: 'Techcombank (Ngân hàng Kỹ Thương)',
          bankAccount: '19075242377010',
          bankOwner: 'NGO DUONG KIET',
          adminPassword: 'admin'
        }
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Data init error:', err);
    return {
      products: INITIAL_PRODUCTS,
      orders: [],
      settings: {
        storeName: 'Kiệt Digital Store',
        bankName: 'Techcombank',
        bankAccount: '19075242377010',
        bankOwner: 'NGO DUONG KIET',
        adminPassword: 'admin'
      }
    };
  }
}

function saveData(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Save data error:', err);
  }
}

export function getStoreData() {
  return initData();
}

export function getProducts() {
  const data = initData();
  return data.products;
}

export function getProductById(id) {
  const data = initData();
  return data.products.find((p) => p.id === id);
}

export function createOrder({ productId, customerEmail, customerPhone }) {
  const data = initData();
  const product = data.products.find((p) => p.id === productId);
  if (!product) throw new Error('Sản phẩm không tồn tại');

  const orderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    productId,
    productTitle: product.title,
    productPrice: product.price,
    downloadUrl: product.downloadUrl,
    fileName: product.fileName,
    customerEmail,
    customerPhone,
    status: 'PENDING', // PENDING, PAID, CANCELLED
    createdAt: new Date().toISOString(),
    paidAt: null
  };

  data.orders.unshift(newOrder);
  saveData(data);
  return newOrder;
}

export function getOrderById(id) {
  const data = initData();
  return data.orders.find((o) => o.id === id);
}

export function markOrderAsPaid(id) {
  const data = initData();
  const order = data.orders.find((o) => o.id === id);
  if (order && order.status !== 'PAID') {
    order.status = 'PAID';
    order.paidAt = new Date().toISOString();
    saveData(data);
  }
  return order;
}

export function getOrders() {
  const data = initData();
  return data.orders;
}

export function addProduct(newProduct) {
  const data = initData();
  const id = 'prod-' + Date.now();
  const product = {
    id,
    ...newProduct,
    rating: 5.0,
    salesCount: 0
  };
  data.products.unshift(product);
  saveData(data);
  return product;
}

export function deleteProduct(id) {
  const data = initData();
  data.products = data.products.filter((p) => p.id !== id);
  saveData(data);
  return true;
}

export function getStats() {
  const data = initData();
  const totalRevenue = data.orders
    .filter((o) => o.status === 'PAID')
    .reduce((sum, o) => sum + o.productPrice, 0);

  const totalOrders = data.orders.length;
  const paidOrders = data.orders.filter((o) => o.status === 'PAID').length;

  return {
    totalRevenue,
    totalOrders,
    paidOrders,
    totalProducts: data.products.length,
    settings: data.settings
  };
}
