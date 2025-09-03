# Hướng dẫn chạy cùng lúc Frontend và Backend

## 🚀 Cách 1: Sử dụng Script tự động (Khuyến nghị)

### Windows (Batch file):
```bash
# Double-click file start-both.bat
# Hoặc chạy trong Command Prompt:
start-both.bat
```

### Windows (PowerShell):
```powershell
# Chạy trong PowerShell:
.\start-both.ps1
```

## 🔧 Cách 2: Chạy thủ công

### Bước 1: Chuẩn bị Environment Variables

#### Backend (ExpressJS01):
Tạo file `.env` trong thư mục `ExpressJS01`:
```env
MONGO_DB_URL=mongodb://localhost:27017/expressjs01
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=8888
```

#### Frontend (ReactJS01):
Tạo file `.env` trong thư mục `ReactJS01`:
```env
VITE_BACKEND_URL=http://localhost:8888
```

### Bước 2: Chạy Backend

Mở Terminal/Command Prompt thứ nhất:
```bash
cd ExpressJS01
npm install
npm run dev
```

Backend sẽ chạy tại: `http://localhost:8888`

### Bước 3: Chạy Frontend

Mở Terminal/Command Prompt thứ hai:
```bash
cd ReactJS01
npm install
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

## 🎯 Cách 3: Sử dụng VS Code

### Cài đặt extension "Live Server" hoặc "REST Client"

1. Mở VS Code
2. Mở folder gốc của project
3. Mở Terminal (Ctrl + `)
4. Chạy backend:
   ```bash
   cd ExpressJS01 && npm run dev
   ```
5. Mở Terminal mới (Ctrl + Shift + `)
6. Chạy frontend:
   ```bash
   cd ReactJS01 && npm run dev
   ```

## 🔍 Kiểm tra kết nối

### 1. Test Backend API:
```bash
# Test API endpoint
curl http://localhost:8888/v1/api/user

# Hoặc mở browser:
http://localhost:8888
```

### 2. Test Frontend:
```bash
# Mở browser:
http://localhost:5173
```

### 3. Test Lazy Loading:
1. Đăng nhập vào hệ thống
2. Truy cập `/user`
3. Quan sát users load từ trên xuống dưới

## 🐛 Troubleshooting

### Lỗi thường gặp:

#### 1. Backend không start được:
```bash
# Kiểm tra port 8888 có bị chiếm không
netstat -ano | findstr :8888

# Thay đổi port trong .env nếu cần
PORT=8889
```

#### 2. Frontend không kết nối được backend:
```bash
# Kiểm tra VITE_BACKEND_URL trong .env
VITE_BACKEND_URL=http://localhost:8888

# Restart frontend sau khi thay đổi .env
```

#### 3. MongoDB connection error:
```bash
# Đảm bảo MongoDB đang chạy
# Hoặc sử dụng MongoDB Atlas
MONGO_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/expressjs01
```

#### 4. CORS error:
```bash
# Kiểm tra CORS config trong server.js
app.use(cors());
```

## 📱 Test Lazy Loading

### 1. Tạo users mẫu:
```bash
# Sử dụng Postman hoặc curl để tạo users
curl -X POST http://localhost:8888/v1/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"User 1","email":"user1@test.com","password":"123456"}'
```

### 2. Test pagination:
```bash
# Test với pagination
curl "http://localhost:8888/v1/api/user?page=1&limit=5"
```

### 3. Quan sát lazy loading:
1. Mở `http://localhost:5173/user`
2. Users sẽ xuất hiện từ trên xuống dưới
3. Click "Load More" để tải thêm users
4. Quan sát animation mượt mà

## 🎨 Customization

### Thay đổi delay animation:
```javascript
// Trong UserList.jsx
setTimeout(() => {
  // ...
}, index * 200); // Thay đổi 200ms
```

### Thay đổi số users mỗi lần load:
```javascript
// Trong UserList.jsx
const pageSize = 5; // Thay đổi số này
```

## 📊 Performance Tips

1. **Backend**: Sử dụng pagination để giảm tải
2. **Frontend**: Chỉ render users đã visible
3. **Database**: Index trên các trường thường query
4. **Network**: Sử dụng compression middleware

## 🔄 Development Workflow

1. **Start servers**: Chạy script hoặc thủ công
2. **Code changes**: Auto-reload sẽ hoạt động
3. **Test**: Kiểm tra lazy loading
4. **Debug**: Sử dụng browser DevTools
5. **Deploy**: Build và deploy khi ready

## 📝 Notes

- Backend chạy trên port 8888
- Frontend chạy trên port 5173 (Vite default)
- MongoDB cần chạy trên port 27017
- CORS đã được config để cho phép cross-origin requests
