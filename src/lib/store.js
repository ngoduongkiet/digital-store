import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

const INITIAL_SETTINGS = {
  storeName: 'Kiệt Digital Store',
  tagline: 'Tài Nguyên Số Thực Chiến & Tự Động Hóa MMO 2026',
  bankName: 'Techcombank',
  bankAccount: '19075242377010',
  bankOwner: 'NGO DUONG KIET',
  adminPassword: 'Ngoduongkiet123@',
  hotline: '0352.279.413',
  zaloLink: 'https://zalo.me/0352279413',
  telegramLink: 'https://t.me/kiet_mmo'
};

const INITIAL_COUPONS = [
  { code: 'KHAITRUONG', type: 'FIXED', value: 20000, desc: 'Giảm ngay 20.000đ mừng khai trương' },
  { code: 'KIETVIP', type: 'PERCENT', value: 10, desc: 'Giảm 10% cho thành viên VIP' },
  { code: 'CHAO2026', type: 'FIXED', value: 30000, desc: 'Giảm 30.000đ đón đầu xu hướng 2026' }
];

const INITIAL_PRODUCTS = [
  {
    id: 'workflow-shopee',
    title: 'Kịch bản Make/n8n: Bot Săn Deal Shopee & Bắn Telegram Tự Động',
    shortDesc: 'Tự động quét voucher 50%, flash sale Shopee 24/7, tự gắn mã tiếp thị affiliate và đẩy tin nhắn vào nhóm/kênh Telegram.',
    price: 199000,
    originalPrice: 450000,
    category: 'Tự Động Hóa',
    badge: 'Kịch Bản Tự Động',
    fileFormat: 'JSON (Make / n8n Blueprint)',
    fileSize: '2.1 KB',
    version: '2026.1 (Bản ổn định)',
    testedClean: 'VirusTotal Clean 100% (0/72 cảnh báo)',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    downloadUrl: '/downloads/kich-ban-san-deal-shopee-telegram.json',
    fileName: 'kich-ban-san-deal-shopee-telegram.json',
    features: [
      'Chạy tự động 24/7 trên Make.com hoặc n8n Cloud (không cần mở máy tính)',
      'Tự động chèn link tiếp thị liên kết (Shopee Affiliate) để nhận hoa hồng thụ động',
      'Kèm video hướng dẫn 3 phút import file là chạy ngay',
      'Được hỗ trợ kỹ thuật 1-1 và nhận bản cập nhật mới miễn phí trọn đời'
    ],
    preview: {
      type: 'WORKFLOW',
      title: 'Sơ đồ luồng hoạt động tự động',
      steps: [
        { name: '1. Schedule Trigger', desc: 'Tự động kích hoạt định kỳ mỗi 15 phút 24/7' },
        { name: '2. Crawl API Shopee', desc: 'Quét toàn bộ mã giảm 50% & flash sale hôm nay' },
        { name: '3. Bộ não AI Filter', desc: 'Lọc các deal hời nhất & viết lại nội dung hấp dẫn' },
        { name: '4. Telegram Broadcaster', desc: 'Tự động bắn bài vào kênh/nhóm kèm link affiliate của bạn' }
      ]
    },
    fullDesc: `Bạn muốn xây dựng kênh săn deal Telegram kiếm hoa hồng thụ động nhưng không có thời gian ngồi canh deal? Kịch bản này sẽ thay bạn làm 100% công việc: Quét voucher giảm 50%, deal sốc từ Shopee -> Cho AI viết lại tóm tắt ngắn gọn hấp dẫn -> Tự động chèn link affiliate cá nhân của bạn -> Bắn vào kênh Telegram mỗi 15 phút. Bạn chỉ việc nhận tiền hoa hồng!`
  },
  {
    id: 'data-cafe-hcm',
    title: 'Bộ Data B2B: 1.500 Quán Cafe & Nhà Hàng Sài Gòn (Có SĐT Thật)',
    shortDesc: 'File Excel quét sạch 1.500 quán cà phê, nhà hàng tại TP.HCM. Có đầy đủ tên quán, địa chỉ, số điện thoại chủ quán/quản lý, link Google Maps.',
    price: 149000,
    originalPrice: 350000,
    category: 'Data Khách Hàng',
    badge: 'Data B2B Thực Chiến',
    fileFormat: 'CSV / Excel (Mở được trên mọi thiết bị)',
    fileSize: '224 KB (1.500 dòng)',
    version: 'Cập nhật Q4/2026',
    testedClean: 'Đã lọc trùng & loại bỏ số bàn chết',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=60',
    downloadUrl: '/downloads/data-1500-quan-cafe-nha-hang-hcm.csv',
    fileName: 'data-1500-quan-cafe-nha-hang-hcm.csv',
    features: [
      '1.500 số điện thoại liên hệ trực tiếp chủ quán/quản lý tại TP.HCM',
      'Đầy đủ thông tin: Tên quán, Địa chỉ, Quận, Đánh giá sao, Link Google Maps',
      'Chuẩn định dạng CSV/Excel mở được trên điện thoại và máy tính',
      'Cực kỳ phù hợp cho dân Telesale, phần mềm POS, nội thất, F&B'
    ],
    preview: {
      type: 'TABLE',
      title: 'Bản xem trước 5 dòng dữ liệu mẫu',
      headers: ['Tên Quán', 'Địa Chỉ', 'Quận', 'Số Điện Thoại', 'Đánh Giá'],
      rows: [
        ['The Coffee House - Chi nhánh 1', '86 Nguyễn Thị Minh Khai', 'Quận 3', '0912.345.xxx', '4.8 ★'],
        ['Highlands Coffee - Landmark 81', '720A Điện Biên Phủ', 'Bình Thạnh', '0908.765.xxx', '4.7 ★'],
        ['Trung Nguyên Legend Cafe', '219 Nguyễn Thị Minh Khai', 'Quận 1', '0934.567.xxx', '4.9 ★'],
        ['Phúc Long Coffee & Tea', '325 Lý Tự Trọng', 'Quận 1', '0988.112.xxx', '4.6 ★'],
        ['Cộng Cà Phê - Bùi Viện', '127 Bùi Viện', 'Quận 1', '0945.890.xxx', '4.7 ★']
      ],
      note: '... và hơn 1.495 quán khác được đóng gói đầy đủ trong file chính thức.'
    },
    fullDesc: `Data khách hàng chất lượng cao được thu thập công khai từ Google Maps tại các quận trung tâm TP.HCM (Quận 1, Quận 3, Quận 5, Quận 7, Bình Thạnh, Thủ Đức...). Đã lọc bỏ các số bàn không liên lạc được, chuẩn xác tới 90%. Tiết kiệm hàng tuần trời ngồi tìm kiếm thông tin khách hàng.`
  },
  {
    id: 'prompt-pack-ecommerce',
    title: 'Bộ File Tính Lãi Sàn TMĐT & 500+ Prompt AI Bán Hàng Đỉnh Cao',
    shortDesc: 'File tính tự động chi phí sàn, thuế, lãi ròng Shopee/TikTok Shop + Bộ 500 câu lệnh AI viết bài quảng cáo, kịch bản video ngắn nổ đơn.',
    price: 99000,
    originalPrice: 250000,
    category: 'Tài Nguyên Bán Hàng',
    badge: 'Tài Nguyên Thực Chiến',
    fileFormat: 'TXT / Prompt Document',
    fileSize: '203 KB (543 dòng)',
    version: 'Thuật toán sàn 2026',
    testedClean: 'Tối ưu cho ChatGPT, Gemini, Claude',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    downloadUrl: '/downloads/bo-tinh-lai-san-va-500-prompt-ai.txt',
    fileName: 'bo-tinh-lai-san-va-500-prompt-ai.txt',
    features: [
      'Bảng công thức tính chi phí sàn và lãi ròng chuẩn thuật toán mới nhất năm 2026',
      '500 Prompt AI tối ưu riêng cho ChatGPT, Gemini, Claude',
      'Bộ công thức viết tiêu đề giật tít, kịch bản giữ chân TikTok 15s',
      'Định dạng dễ dùng, chỉ cần nhập giá vốn là ra tiền lãi ròng chính xác'
    ],
    preview: {
      type: 'PROMPT',
      title: 'Xem trước 3 Prompt AI mẫu',
      samples: [
        {
          tag: 'Kịch bản TikTok 15s',
          text: 'Bạn là chuyên gia sáng tạo nội dung TikTok triệu view. Hãy viết cho tôi 3 kịch bản video 15s giới thiệu [Tên sản phẩm] giải quyết vấn đề [Nỗi đau khách hàng]. Mở đầu bằng hook giật gân, nhịp điệu nhanh, CTA chốt đơn.'
        },
        {
          tag: 'Facebook Ads AIDA',
          text: 'Đóng vai trò copywriter xuất sắc. Viết 1 bài quảng cáo bán sản phẩm [Tên sản phẩm] theo mô hình AIDA (Attention - Interest - Desire - Action), đánh trúng tâm lý người mua thích giảm giá trong 24h.'
        },
        {
          tag: 'Xử lý đánh giá 1 sao',
          text: 'Soạn 1 phản hồi chân thành, khéo léo và chuyên nghiệp cho đánh giá 1 sao của khách hàng phàn nàn về [Vấn đề gặp phải]. Biến khách hàng bức xúc thành khách hàng trung thành.'
        }
      ]
    },
    fullDesc: `Bộ vũ khí không thể thiếu cho bất kỳ ai kinh doanh online. Giúp bạn không bao giờ bị tình trạng "bán hàng rôm rả nhưng cuối tháng lỗ vốn vì không tính chuẩn phí sàn". Kèm theo 500 câu lệnh AI giúp bạn sản xuất 10 bài viết quảng cáo hoặc kịch bản video chỉ trong 5 phút.`
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
        settings: INITIAL_SETTINGS,
        coupons: INITIAL_COUPONS,
        messages: [],
        reviews: []
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    if (!parsed.products || parsed.products.length === 0) parsed.products = INITIAL_PRODUCTS;
    if (!parsed.orders) parsed.orders = [];
    if (!parsed.settings) parsed.settings = INITIAL_SETTINGS;
    if (!parsed.coupons) parsed.coupons = INITIAL_COUPONS;
    if (!parsed.messages) parsed.messages = [];
    if (!parsed.reviews) parsed.reviews = [];
    return parsed;
  } catch (err) {
    console.error('Data init error:', err);
    return {
      products: INITIAL_PRODUCTS,
      orders: [],
      settings: INITIAL_SETTINGS,
      coupons: INITIAL_COUPONS,
      messages: [],
      reviews: []
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
  // Dynamically calculate sales count from real paid orders - zero fake numbers!
  return data.products.map((p) => {
    const realSales = (data.orders || []).filter(
      (o) => o.productId === p.id && o.status === 'PAID'
    ).length;
    return {
      ...p,
      salesCount: realSales
    };
  });
}

export function getProductById(id) {
  const data = initData();
  const prod = data.products.find((p) => p.id === id);
  if (!prod) return null;
  const realSales = (data.orders || []).filter(
    (o) => o.productId === prod.id && o.status === 'PAID'
  ).length;
  return {
    ...prod,
    salesCount: realSales
  };
}

export function validateCoupon(code, amount) {
  const data = initData();
  const c = data.coupons?.find((item) => item.code.toUpperCase() === code.trim().toUpperCase());
  if (!c) {
    return { valid: false, error: 'Mã giảm giá không tồn tại hoặc đã hết hạn' };
  }

  let discount = 0;
  if (c.type === 'FIXED') {
    discount = c.value;
  } else if (c.type === 'PERCENT') {
    discount = Math.round((amount * c.value) / 100);
  }

  if (discount > amount) discount = amount;
  const finalAmount = amount - discount;

  return {
    valid: true,
    code: c.code,
    description: c.desc,
    discount,
    finalAmount
  };
}

export function createOrder({ productId, customerEmail, customerPhone, couponCode }) {
  const data = initData();
  const product = data.products.find((p) => p.id === productId);
  if (!product) throw new Error('Sản phẩm không tồn tại');

  let finalPrice = product.price;
  let appliedCoupon = null;

  if (couponCode) {
    const couponRes = validateCoupon(couponCode, product.price);
    if (couponRes.valid) {
      finalPrice = couponRes.finalAmount;
      appliedCoupon = couponRes.code;
    }
  }

  const orderId = 'ORD' + Math.floor(100000 + Math.random() * 900000);
  const newOrder = {
    id: orderId,
    productId,
    productTitle: product.title,
    productPrice: finalPrice,
    originalPrice: product.price,
    couponCode: appliedCoupon,
    downloadUrl: product.downloadUrl,
    fileName: product.fileName,
    customerEmail,
    customerPhone: customerPhone || 'Chưa cung cấp',
    status: 'PENDING',
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

export function updateProduct(id, updates) {
  const data = initData();
  const idx = data.products.findIndex((p) => p.id === id);
  if (idx !== -1) {
    data.products[idx] = { ...data.products[idx], ...updates };
    saveData(data);
    return data.products[idx];
  }
  return null;
}

export function deleteProduct(id) {
  const data = initData();
  data.products = data.products.filter((p) => p.id !== id);
  saveData(data);
  return true;
}

export function updateSettings(newSettings) {
  const data = initData();
  data.settings = { ...data.settings, ...newSettings };
  saveData(data);
  return data.settings;
}

export function addMessage(msg) {
  const data = initData();
  const newMsg = {
    id: 'msg-' + Date.now(),
    createdAt: new Date().toISOString(),
    ...msg
  };
  if (!data.messages) data.messages = [];
  data.messages.unshift(newMsg);
  saveData(data);
  return newMsg;
}

export function getMessages() {
  const data = initData();
  return data.messages || [];
}

export function getReviews(productId) {
  const data = initData();
  return (data.reviews || []).filter((r) => !productId || r.productId === productId);
}

export function addReview({ productId, customerName, rating, comment, orderId }) {
  const data = initData();
  const isVerified = (data.orders || []).some(
    (o) => o.id === orderId && o.status === 'PAID' && o.productId === productId
  );
  const newReview = {
    id: 'rev-' + Date.now(),
    productId,
    customerName: customerName.trim(),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    comment: comment.trim(),
    isVerified,
    createdAt: new Date().toISOString()
  };
  if (!data.reviews) data.reviews = [];
  data.reviews.unshift(newReview);
  saveData(data);
  return newReview;
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
    settings: data.settings,
    coupons: data.coupons || [],
    messagesCount: (data.messages || []).length
  };
}
