# 🌤️ Weather Mobile App (React Native & Expo)

Ứng dụng xem dự báo thời tiết di động hiện đại, mượt mà được xây dựng với **React Native**, **Expo SDK 58**, **TypeScript** và **Open-Meteo API**.

🔗 **GitHub Repository:** [tuannewbie-cos/weather-app-mobile](https://github.com/tuannewbie-cos/weather-app-mobile)

---

## ✨ Tính năng nổi bật

- 🌡️ **Thời tiết thời gian thực**: Nhiệt độ hiện tại, trạng thái thời tiết (nắng, mưa, mây, dông sét), nhiệt độ cảm giác (feels-like), nhiệt độ cao nhất & thấp nhất trong ngày.
- ⏱️ **Dự báo 24 giờ tới**: Thanh cuộn ngang hiển thị chi tiết nhiệt độ, biểu tượng thời tiết và xác suất mưa theo từng giờ.
- 📊 **4 chỉ số khí tượng chuyên sâu**: Độ ẩm (%), Tốc độ gió (km/h), Chỉ số tia cực tím (UV Index), Áp suất khí quyển (hPa).
- 📅 **Dự báo 7 ngày tới**: Xem xu hướng thời tiết cả tuần kèm thanh nhiệt độ trực quan (Min - Max).
- 🔍 **Tìm kiếm thành phố toàn cầu**: Tích hợp Geocoding API cho phép gõ tìm bất kỳ tỉnh thành nào tại Việt Nam hoặc thế giới.
- ⚡ **Chuyển nhanh tỉnh thành phổ biến**: Các nút chọn nhanh Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Đà Lạt, Sa Pa, Nha Trang, Cần Thơ, Tokyo, Seoul...
- 💾 **Tự động lưu vị trí gần nhất**: Lưu vị trí bạn đã chọn bằng `AsyncStorage` để tự động tải lại trong các lần mở app sau.
- 🔄 **Pull-to-Refresh**: Vuốt nhẹ từ trên xuống để cập nhật dữ liệu thời tiết mới nhất tức thì.

---

## 🚀 Cách chạy thử ứng dụng

### 1. Khởi động Dev Server
```bash
npm start
```

### 2. Xem trực tiếp:
- **Trên điện thoại thật (Khuyên dùng)**: 
  - Tải app **Expo Go** trên App Store (iOS) hoặc CH Play (Android).
  - Quét mã QR hiển thị trên màn hình Terminal để xem ứng dụng chạy ngay trên điện thoại.
- **Trên trình duyệt Web**: Bấm phím `w` trong terminal hoặc chạy `npm run web`.

---

## 🛠️ Công nghệ sử dụng

- **Framework**: React Native 0.88 + Expo SDK 58
- **Navigation**: Expo Router (File-based routing)
- **Language**: TypeScript (Strict mode)
- **Icons**: `@expo/vector-icons` (Ionicons, Feather, MaterialCommunityIcons)
- **Data Source**: Open-Meteo Weather Forecast & Geocoding API (Không cần API key, dữ liệu chuẩn xác toàn cầu)
- **Storage**: `@react-native-async-storage/async-storage`
