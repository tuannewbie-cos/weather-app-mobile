# 🚀 Hackathon Mobile App Starter

Bộ khởi tạo ứng dụng di động hoàn chỉnh chuẩn bị cho **Hackathon**, tích hợp sẵn 4 công nghệ:
- 📱 **React Native** (0.88+)
- ⚡ **Expo** (SDK 58 + Expo Router file-based routing)
- 🔷 **TypeScript** (Strict mode)
- 🗄️ **Supabase** (Auth, PostgreSQL Database, Storage & Realtime)

---

## 🛠️ Yêu cầu môi trường
- **Node.js**: v22 LTS (Đã được cài đặt qua `nvm`)
- **NPM**: v10+
- **Expo Go app** (tải miễn phí trên App Store cho iOS hoặc Google Play cho Android để quét mã chạy thử ngay trên điện thoại)

---

## 🚀 Khởi chạy dự án (Quick Start)

Trong terminal, tại thư mục dự án:

```bash
# 1. Chạy Expo dev server
npm start
```

### Các tùy chọn mở app:
- **Trên điện thoại thật (Khuyên dùng trong Hackathon)**:
  - Mở ứng dụng **Expo Go** trên điện thoại (đảm bảo điện thoại và laptop cùng kết nối 1 mạng Wi-Fi).
  - Quét mã QR hiển thị trên Terminal.
- **Trên trình duyệt Web**: Bấm phím `w` trong terminal hoặc chạy `npm run web`.
- **Trên iOS Simulator** (nếu có Xcode): Bấm phím `i` trong terminal.
- **Trên Android Emulator** (nếu có Android Studio): Bấm phím `a` trong terminal.

---

## 🔑 Cấu hình Supabase

1. Mở file [`.env`](file:///Users/dominhtuan/Downloads/test/.env).
2. Điền thông tin dự án Supabase của bạn (Lấy tại **Supabase Dashboard** > **Project Settings** > **API**):

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Client Supabase đã được khởi tạo sẵn tại [`lib/supabase.ts`](file:///Users/dominhtuan/Downloads/test/lib/supabase.ts), hỗ trợ lưu phiên đăng nhập tự động qua SecureStore (trên điện thoại) và LocalStorage (trên Web).

---

## 📁 Cấu trúc thư mục

```text
├── app/                  # File-based routing (Expo Router)
│   ├── (tabs)/           # Màn hình Navigation Tabs
│   │   ├── index.tsx     # Tab 1: Màn hình giới thiệu stack & tính năng
│   │   ├── two.tsx       # Tab 2: Demo đăng ký, đăng nhập Supabase Auth
│   │   └── _layout.tsx   # Cấu hình thanh điều hướng Tabs
│   ├── modal.tsx         # Modal popup mẫu
│   └── _layout.tsx       # Root layout của toàn bộ app
├── lib/
│   └── supabase.ts       # Cấu hình Supabase Client & Auth Auto-refresh
├── components/           # UI Components tái sử dụng
├── constants/            # Màu sắc và theme
├── .env                  # Biến môi trường Supabase (được gitignore)
├── .env.example          # Mẫu biến môi trường
└── package.json          # Thư viện & kịch bản lệnh
```

---

## 💡 Code Mẫu Sử Dụng Supabase

### 1. Truy vấn dữ liệu (Query Data)
```typescript
import { supabase } from '@/lib/supabase';

// Lấy danh sách bài viết từ bảng 'posts'
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false });
```

### 2. Thêm dữ liệu (Insert Data)
```typescript
const { data, error } = await supabase
  .from('posts')
  .insert([{ title: 'Bài viết mới', content: 'Nội dung...' }]);
```

### 3. Đăng ký / Đăng nhập
Tab **Supabase** (`app/(tabs)/two.tsx`) đã có sẵn form đăng ký, đăng nhập và hiển thị trạng thái tài khoản.
