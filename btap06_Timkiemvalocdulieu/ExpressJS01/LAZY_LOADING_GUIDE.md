# Hướng dẫn sử dụng Lazy Loading API

## Tổng quan

API lazy loading cho phép bạn tải danh sách users theo từng trang thay vì tải tất cả cùng lúc, giúp cải thiện performance và trải nghiệm người dùng.

## API Endpoint

### GET `/v1/api/user`

Lấy danh sách users với pagination.

#### Query Parameters:

- `page` (optional): Số trang (mặc định: 1)
- `limit` (optional): Số lượng users mỗi trang (mặc định: 10)

#### Ví dụ sử dụng:

```bash
# Lấy trang đầu tiên với 10 users (mặc định)
GET /v1/api/user

# Lấy trang đầu tiên với 5 users
GET /v1/api/user?page=1&limit=5

# Lấy trang thứ 2 với 3 users
GET /v1/api/user?page=2&limit=3

# Lấy trang thứ 3 với 20 users
GET /v1/api/user?page=3&limit=20
```

#### Response Format:

```json
{
  "EC": 0,
  "EM": "Lấy danh sách user thành công",
  "DT": {
    "users": [
      {
        "_id": "user_id",
        "name": "User Name",
        "email": "user@example.com",
        "role": "User",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false,
      "nextPage": 2,
      "prevPage": null
    }
  }
}
```

#### Response Fields:

**Users Array:**

- `_id`: ID của user
- `name`: Tên user
- `email`: Email user
- `role`: Vai trò user
- `createdAt`: Thời gian tạo
- `updatedAt`: Thời gian cập nhật cuối

**Pagination Object:**

- `currentPage`: Trang hiện tại
- `totalPages`: Tổng số trang
- `totalUsers`: Tổng số users
- `limit`: Số users mỗi trang
- `hasNextPage`: Có trang tiếp theo không
- `hasPrevPage`: Có trang trước không
- `nextPage`: Số trang tiếp theo (null nếu không có)
- `prevPage`: Số trang trước (null nếu không có)

## Cách sử dụng trong Frontend

### JavaScript/React Example:

```javascript
// Function để lấy users với pagination
async function getUsers(page = 1, limit = 10) {
  try {
    const response = await fetch(`/v1/api/user?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Nếu cần authentication
      },
    });

    const data = await response.json();

    if (data.EC === 0) {
      return {
        users: data.DT.users,
        pagination: data.DT.pagination,
      };
    } else {
      throw new Error(data.EM);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// Sử dụng trong component
const [users, setUsers] = useState([]);
const [pagination, setPagination] = useState({});
const [currentPage, setCurrentPage] = useState(1);

const loadUsers = async (page) => {
  try {
    const result = await getUsers(page, 10);
    setUsers(result.users);
    setPagination(result.pagination);
    setCurrentPage(page);
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

// Load more users (infinite scroll)
const loadMoreUsers = async () => {
  if (pagination.hasNextPage) {
    const nextPage = pagination.nextPage;
    const result = await getUsers(nextPage, 10);
    setUsers((prev) => [...prev, ...result.users]);
    setPagination(result.pagination);
  }
};
```

### Axios Example:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8888/v1/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Lấy users với pagination
const getUsers = async (page = 1, limit = 10) => {
  const response = await api.get(`/user?page=${page}&limit=${limit}`);
  return response.data.DT;
};
```

## Testing

Để test API lazy loading, bạn có thể sử dụng file `test-lazy-loading.js`:

```bash
# Chạy test
node test-lazy-loading.js
```

Hoặc sử dụng Postman/Insomnia với các URL sau:

- `GET http://localhost:8888/v1/api/user?page=1&limit=5`
- `GET http://localhost:8888/v1/api/user?page=2&limit=3`
- `GET http://localhost:8888/v1/api/user` (default)

## Lưu ý

1. **Authentication**: API yêu cầu authentication token trong header `Authorization: Bearer <token>`
2. **Error Handling**: Luôn kiểm tra `EC` field trong response để xử lý lỗi
3. **Performance**: Sử dụng `limit` hợp lý (không quá lớn) để tránh tải quá nhiều dữ liệu
4. **Sorting**: Users được sắp xếp theo thời gian tạo mới nhất trước (`createdAt: -1`)

## Cải tiến có thể thêm

1. **Search/Filter**: Thêm tìm kiếm theo tên hoặc email
2. **Sorting**: Cho phép sort theo các trường khác nhau
3. **Caching**: Implement caching để tăng performance
4. **Cursor-based pagination**: Sử dụng cursor thay vì offset cho datasets lớn
