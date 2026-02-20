# 📮 Postman API Documentation - User CRUD API

## 🔧 Setup Postman

### 1. ตั้งค่า Environment

ใน Postman ให้สร้าง Environment ใหม่ชื่อ `CF-DevTools` มี Variables ดังนี้:

```
base_url    : http://localhost:8787
api_version : v1
```

### 2. Postman Collection

สร้าง Collection ใหม่ชื่อ `User API` และเพิ่ม Requests ตามด้านล่าง

---

## 📝 API Endpoints

### 1️⃣ CREATE USER (2 วิธี)

#### วิธี A: สร้างด้วย JSON (ไม่มีรูป)
**POST** `{{base_url}}/api/users`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password_hash": "$2b$10$...",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "0812345678",
  "address": "123 Main St, Bangkok, Thailand",
  "date_of_birth": "1990-01-15",
  "avatar_url": "https://example.com/avatar.jpg",
  "status": "active"
}
```

#### วิธี B: สร้างด้วย Form Data (มีรูป)
**POST** `{{base_url}}/api/users`

**Headers:**
```
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
| Key | Value | Type |
|-----|-------|------|
| `email` | john.doe@example.com | text |
| `password_hash` | $2b$10$... | text |
| `first_name` | John | text |
| `last_name` | Doe | text |
| `phone` | 0812345678 | text |
| `address` | 123 Main St... | text |
| `date_of_birth` | 1990-01-15 | text |
| `status` | active | text |
| `file` | [ไฟล์รูปภาพ] | File |

**Response (201):**
```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "password_hash": "$2b$10$...",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "0812345678",
  "address": "123 Main St, Bangkok, Thailand",
  "date_of_birth": "1990-01-15",
  "status": "active",
  "avatar_url": "https://cdn.example.com/users/1/avatar-1708345200000.jpg",
  "last_login_at": null,
  "created_at": "2026-02-19T10:30:00Z",
  "updated_at": "2026-02-19T10:30:00Z",
  "deleted_at": null
}
```

**Error (400):**
```json
{
  "error": "กรุณากรอกข้อมูลที่จำเป็น: email, password_hash, first_name, last_name"
}
```

**Error (400) - File Invalid:**
```json
{
  "error": "ไฟล์ต้องเป็นรูปภาพ (image/*)"
}
```

---

### 2️⃣ GET ALL USERS (with Pagination, Filter, Search)
**GET** `{{base_url}}/api/users?page=1&limit=10&status=active&search=john`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | number | No | หน้า (default: 1) |
| `limit` | number | No | จำนวน records ต่อหน้า (default: 10) |
| `status` | string | No | Filter by status (active, inactive, etc.) |
| `search` | string | No | ค้นหาใน first_name, last_name, email |

**Examples:**
- ทั้งหมด: `GET {{base_url}}/api/users`
- Page 2, 20 records: `GET {{base_url}}/api/users?page=2&limit=20`
- Filter by status: `GET {{base_url}}/api/users?status=active`
- Search: `GET {{base_url}}/api/users?search=john`
- Combine: `GET {{base_url}}/api/users?page=1&limit=10&status=active&search=doe`

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "email": "john.doe@example.com",
      "password_hash": "$2b$10$...",
      "first_name": "John",
      "last_name": "Doe",
      "phone": "0812345678",
      "address": "123 Main St, Bangkok, Thailand",
      "date_of_birth": "1990-01-15",
      "status": "active",
      "avatar_url": "https://example.com/avatar.jpg",
      "last_login_at": null,
      "created_at": "2026-02-19T10:30:00Z",
      "updated_at": "2026-02-19T10:30:00Z",
      "deleted_at": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "total_pages": 1
  }
}
```

---

### 3️⃣ GET USER BY ID
**GET** `{{base_url}}/api/users/1`

**Response (200):**
```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "password_hash": "$2b$10$...",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "0812345678",
  "address": "123 Main St, Bangkok, Thailand",
  "date_of_birth": "1990-01-15",
  "status": "active",
  "avatar_url": "https://example.com/avatar.jpg",
  "last_login_at": "2026-02-19T10:45:00Z",
  "created_at": "2026-02-19T10:30:00Z",
  "updated_at": "2026-02-19T10:30:00Z",
  "deleted_at": null
}
```

**Error (404):**
```json
{
  "error": "User not found"
}
```

**Error (400):**
```json
{
  "error": "Invalid user ID"
}
```

---

### 4️⃣ UPDATE USER
**PUT** `{{base_url}}/api/users/1`

**Headers:**
```
Content-Type: application/json
```

**Request Body (ส่งเฉพาะฟิลด์ที่ต้องแก้):**
```json
{
  "first_name": "Jonathan",
  "phone": "0887654321",
  "status": "inactive",
  "last_login_at": "2026-02-19T14:30:00Z"
}
```

**Response (200):**
```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "password_hash": "$2b$10$...",
  "first_name": "Jonathan",
  "last_name": "Doe",
  "phone": "0887654321",
  "address": "123 Main St, Bangkok, Thailand",
  "date_of_birth": "1990-01-15",
  "status": "inactive",
  "avatar_url": "https://example.com/avatar.jpg",
  "last_login_at": "2026-02-19T14:30:00Z",
  "created_at": "2026-02-19T10:30:00Z",
  "updated_at": "2026-02-19T14:35:00Z",
  "deleted_at": null
}
```

**Error (404):**
```json
{
  "error": "User not found"
}
```

---

### 5️⃣ DELETE USER (Soft Delete)
**DELETE** `{{base_url}}/api/users/1`

**Response (200):**
```json
{
  "message": "ลบผู้ใช้สำเร็จ"
}
```

**Error (404):**
```json
{
  "error": "ไม่พบผู้ใช้"
}
```

---

### 6️⃣ UPLOAD USER AVATAR
**POST** `{{base_url}}/api/users/1/avatar`

**หมายเหตุ:** อัพโหลดรูปโปรไฟล์ผ่าน R2 Storage และ Auto-update avatar_url ใน Database

**Headers:**
```
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
| Key | Value | Type |
|-----|-------|------|
| `file` | [ไฟล์รูปภาพ] | File |

**Constraints:**
- ต้องเป็นไฟล์รูปภาพ (image/*, e.g., image/png, image/jpeg, image/webp)
- ขนาดไฟล์ต้องน้อยกว่า 5MB
- File จะถูกบันทึกใน R2 Storage ที่ `users/{id}/avatar-{timestamp}.{ext}`
- avatar_url จะ Auto-update ใน Database

**Response (200):**
```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "password_hash": "$2b$10$...",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "0812345678",
  "address": "123 Main St, Bangkok, Thailand",
  "date_of_birth": "1990-01-15",
  "status": "active",
  "avatar_url": "https://cdn.example.com/users/1/avatar-1708345200000.jpg",
  "last_login_at": "2026-02-19T14:30:00Z",
  "created_at": "2026-02-19T10:30:00Z",
  "updated_at": "2026-02-19T15:47:00Z",
  "deleted_at": null
}
```

**Error (400) - No File:**
```json
{
  "error": "กรุณาระบุไฟล์รูปภาพ"
}
```

**Error (400) - Invalid Type:**
```json
{
  "error": "ไฟล์ต้องเป็นรูปภาพ (image/*)"
}
```

**Error (400) - File Too Large:**
```json
{
  "error": "ขนาดไฟล์ต้องน้อยกว่า 5MB"
}
```

**Error (404):**
```json
{
  "error": "ไม่พบผู้ใช้"
}
```

---

## 📋 API Endpoints Summary

| # | Method | Endpoint | หน้าที่ |
|---|--------|----------|--------|
| 1 | **POST** | `/api/users` | สร้าง User (JSON หรือ Form Data + File) |
| 2 | **GET** | `/api/users?...` | ดึง Users ทั้งหมด (Pagination/Filter/Search) |
| 3 | **GET** | `/api/users/:id` | ดึง User by ID |
| 4 | **PUT** | `/api/users/:id` | แก้ไข User |
| 5 | **DELETE** | `/api/users/:id` | ลบ User (soft delete) |
| 6 | **POST** | `/api/users/:id/avatar` | อัพโหลดรูปโปรไฟล์ (R2 Storage) |

---

## 🧪 Test Scenarios

### Scenario 1: สร้าง User พร้อมรูป (ครั้งเดียว)
```
1. POST /api/users (Form Data + file) - สร้าง user พร้อมอัพโหลดรูป → ได้ user_id + avatar_url
2. GET /api/users/{{user_id}} (ดึงข้อมูล user id 1 พร้อม avatar_url)
3. GET /api/users (ดึง users ทั้งหมด)
```

### Scenario 2: สร้าง User ปกติ และ อัพเดตรูปทีหลัง
```
1. POST /api/users (JSON) - สร้าง user ปกติ → ได้ id = 1
2. POST /api/users/1/avatar - อัพโหลดรูปโปรไฟล์
3. GET /api/users/1 (ดึงข้อมูล user id 1 พร้อม avatar_url)
```

### Scenario 3: ค้นหา และ Filter
```
1. GET /api/users?search=john (ค้นหาชื่อ john)
2. GET /api/users?status=active (ดึง active users เท่านั้น)
3. GET /api/users?page=1&limit=5 (Pagination - 5 records ต่อหน้า)
```

### Scenario 4: แก้ไข รูป และ ลบ
```
1. PUT /api/users/1 (แก้ไข user id 1)
2. POST /api/users/1/avatar (อัพเดทรูปใหม่)
3. GET /api/users/1 (ตรวจสอบการแก้ไข)
4. DELETE /api/users/1 (ลบ user id 1)
5. GET /api/users (ตรวจสอบ user ถูกลบแล้ว - deleted_at not null)
```

---

## 📤 Import Collection ไปยัง Postman

### วิธี 1: ใช้ Postman Collection JSON

สร้างไฟล์ `postman_collection.json` ด้วยคำสั่ง:

```bash
npx wrangler types
```

จากนั้น Import เข้า Postman: `File → Import → เลือกไฟล์`

### วิธี 2: สร้าง Manually ใน Postman

1. สร้าง Collection ชื่อ "User API"
2. สร้าง Folder: "Users"
3. เพิ่ม 5 Requests ตามข้างบน

---

## ⚙️ Configuration

### R2 Domain อัปเดต:

แก้ไข [src/routes/users.ts](../src/routes/users.ts) บรรทัดที่ 10:

```typescript
// เปลี่ยนจาก:
const R2_DOMAIN = 'https://cdn.example.com';

// เป็น: (ใช้ R2 domain ของคุณ)
const R2_DOMAIN = 'https://your-account.r2.cloudflarecontent.com';
// หรือ custom domain
const R2_DOMAIN = 'https://cdn.yourdomain.com';
```

---

## 🔐 Security Notes

⚠️ **Production Tips:**
- ใช้ HTTPS แทน HTTP
- ส่ง password_hash ผ่าน Environment Secret (ไม่ใช่ plain text)
- เพิ่ม Authentication Header (Bearer Token, API Key, etc.)
- ใช้ Environment ที่แตกต่างสำหรับ Development/Production

---

## 🐛 Common Errors

| Status | Error | สาเหตุ |
|--------|-------|--------|
| 400 | Missing required fields | ลืมส่ง field บังคับ |
| 404 | User not found | ID ไม่มีอยู่ในระบบ |
| 500 | Failed to create user | Database error (email duplicate?) |

---

## 📊 Performance Tips

✅ ใช้ `limit` ที่เหมาะสม (10-50 records)
✅ ใช้ `search` + `filter` แทนดึงทั้งหมดแล้วค้นหา
✅ Check KV Cache (users สาขาเดิมจะได้จาก cache 1 ชั่วโมง)

---

**Last Updated:** Feb 19, 2026
