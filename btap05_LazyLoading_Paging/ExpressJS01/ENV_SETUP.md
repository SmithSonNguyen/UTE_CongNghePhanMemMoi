# Hướng dẫn setup Environment Variables

## Tạo file .env trong thư mục ExpressJS01

Tạo file `.env` với nội dung sau:

```env
# Database
MONGO_DB_URL=mongodb://localhost:27017/expressjs01

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Server
PORT=8888
```

## Lưu ý:
- Thay đổi `MONGO_DB_URL` nếu bạn sử dụng MongoDB khác
- Thay đổi `JWT_SECRET` thành key bí mật của bạn
- Port 8888 là port mặc định cho backend
