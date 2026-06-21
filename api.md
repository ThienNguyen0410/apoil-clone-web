# APSP Oil Change CMS — API Documentation

**Base URL:** `https://apsp-oilchange-api.dev.altasoftware.vn`

> All endpoints (except login, forgot-password, reset-password) require authentication via Bearer token.

---

## 1. Authentication

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| POST | `/api/auth/login` | Đăng nhập hệ thống | `{ accessToken, refreshToken, user }` |
| POST | `/api/auth/logout` | Đăng xuất | `{ message }` |
| POST | `/api/auth/refresh-token` | Làm mới token hết hạn | `{ accessToken, refreshToken }` |
| POST | `/api/auth/forgot-password` | Gửi email khôi phục mật khẩu | `{ message }` |
| POST | `/api/auth/reset-password` | Đặt lại mật khẩu mới | `{ message }` |

---

## 2. Users

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/users` | Danh sách người dùng (phân trang) | `{ data: User[], pagination }` |
| POST | `/api/users` | Tạo người dùng mới | `User` |
| GET | `/api/users/{id}` | Chi tiết người dùng | `User` |
| PUT | `/api/users/{id}` | Cập nhật người dùng | `User` |
| DELETE | `/api/users/{id}` | Xóa người dùng | `{ message }` |
| GET | `/api/users/me` | Thông tin người dùng hiện tại | `User` |
| POST | `/api/users/bulk-delete` | Xóa nhiều người dùng | `{ message }` |

**User fields:** `id`, `name`, `email`, `phone`, `roleId`, `status`, `avatar`, `createdAt`, `updatedAt`

---

## 3. Roles

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/roles` | Danh sách vai trò | `{ data: Role[], pagination }` |
| POST | `/api/roles` | Tạo vai trò mới | `Role` |
| GET | `/api/roles/{id}` | Chi tiết vai trò | `Role` |
| PUT | `/api/roles/{id}` | Cập nhật vai trò | `Role` |
| DELETE | `/api/roles/{id}` | Xóa vai trò | `{ message }` |
| POST | `/api/roles/bulk-delete` | Xóa nhiều vai trò | `{ message }` |

**Role fields:** `id`, `name`, `code`, `description`, `permissions`, `status`, `createdAt`, `updatedAt`

---

## 4. Permissions

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/permissions` | Danh sách tất cả quyền | `Permission[]` |

---

## 5. Vehicle Brands

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/vehicle-brands` | Danh sách hãng xe | `{ data: Brand[], pagination }` |
| POST | `/api/vehicle-brands` | Tạo hãng xe mới | `Brand` |
| GET | `/api/vehicle-brands/{id}` | Chi tiết hãng xe | `Brand` |
| PUT | `/api/vehicle-brands/{id}` | Cập nhật hãng xe | `Brand` |
| DELETE | `/api/vehicle-brands/{id}` | Xóa hãng xe | `{ message }` |
| POST | `/api/vehicle-brands/bulk-delete` | Xóa nhiều hãng xe | `{ message }` |

**Brand fields:** `id`, `name`, `logo`, `description`, `status`, `createdAt`, `updatedAt`

---

## 6. Vehicle Models

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/vehicle-models` | Danh sách dòng xe | `{ data: Model[], pagination }` |
| POST | `/api/vehicle-models` | Tạo dòng xe mới | `Model` |
| GET | `/api/vehicle-models/{id}` | Chi tiết dòng xe | `Model` |
| PUT | `/api/vehicle-models/{id}` | Cập nhật dòng xe | `Model` |
| DELETE | `/api/vehicle-models/{id}` | Xóa dòng xe | `{ message }` |
| POST | `/api/vehicle-models/bulk-delete` | Xóa nhiều dòng xe | `{ message }` |

**Model fields:** `id`, `brandId`, `name`, `year`, `engineType`, `fuelType`, `status`, `createdAt`, `updatedAt`

---

## 7. Products

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/products` | Danh sách sản phẩm (dầu nhớt) | `{ data: Product[], pagination }` |
| POST | `/api/products` | Tạo sản phẩm mới | `Product` |
| GET | `/api/products/{id}` | Chi tiết sản phẩm | `Product` |
| PUT | `/api/products/{id}` | Cập nhật sản phẩm | `Product` |
| DELETE | `/api/products/{id}` | Xóa sản phẩm | `{ message }` |
| GET | `/api/products/{id}/oil-change-settings` | Cài đặt thay nhớt cho sản phẩm | `OilChangeSettings` |
| PUT | `/api/products/{id}/oil-change-settings` | Cập nhật cài đặt thay nhớt | `OilChangeSettings` |
| GET | `/api/products/{id}/devices` | Danh sách thiết bị gán với sản phẩm | `Device[]` |
| POST | `/api/products/{id}/assign-device` | Gán thiết bị vào sản phẩm | `{ message }` |
| POST | `/api/products/bulk-delete` | Xóa nhiều sản phẩm | `{ message }` |

**Product fields:** `id`, `name`, `code`, `brandId`, `category`, `unit`, `price`, `stock`, `description`, `status`, `engineTypes[]`, `createdAt`, `updatedAt`

---

## 8. Devices

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/devices` | Danh sách thiết bị | `{ data: Device[], pagination }` |
| POST | `/api/devices` | Tạo thiết bị mới | `Device` |
| GET | `/api/devices/{id}` | Chi tiết thiết bị | `Device` |
| PUT | `/api/devices/{id}` | Cập nhật thiết bị | `Device` |
| DELETE | `/api/devices/{id}` | Xóa thiết bị | `{ message }` |
| GET | `/api/devices/{id}/fuel-transfers` | Lịch sử đổ nhiên liệu | `{ data: FuelTransfer[], pagination }` |
| POST | `/api/devices/{id}/fuel-transfers` | Tạo phiếu đổ nhiên liệu | `FuelTransfer` |
| GET | `/api/devices/{id}/oil-change-sessions` | Lịch sử phiên thay nhớt | `{ data: OilChangeSession[], pagination }` |
| GET | `/api/devices/{id}/payment-histories` | Lịch sử thanh toán | `{ data: PaymentHistory[], pagination }` |
| POST | `/api/devices/bulk-delete` | Xóa nhiều thiết bị | `{ message }` |

**Device fields:** `id`, `code`, `name`, `productId`, `groupId`, `location`, `status`, `fuelLevel`, `lastOilChange`, `createdAt`, `updatedAt`

---

## 9. Device Groups

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/device-groups` | Danh sách nhóm thiết bị | `{ data: Group[], pagination }` |
| POST | `/api/device-groups` | Tạo nhóm thiết bị mới | `Group` |
| GET | `/api/device-groups/{id}` | Chi tiết nhóm thiết bị | `Group` |
| PUT | `/api/device-groups/{id}` | Cập nhật nhóm thiết bị | `Group` |
| DELETE | `/api/device-groups/{id}` | Xóa nhóm thiết bị | `{ message }` |

**Group fields:** `id`, `name`, `description`, `status`, `deviceCount`, `createdAt`, `updatedAt`

---

## 10. Customers

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/customers` | Danh sách khách hàng | `{ data: Customer[], pagination }` |
| POST | `/api/customers` | Tạo khách hàng mới | `Customer` |
| GET | `/api/customers/{id}` | Chi tiết khách hàng | `Customer` |
| PUT | `/api/customers/{id}` | Cập nhật khách hàng | `Customer` |
| DELETE | `/api/customers/{id}` | Xóa khách hàng | `{ message }` |

**Customer fields:** `id`, `name`, `phone`, `email`, `dateOfBirth`, `address`, ` communeId`, `districtId`, `provinceId`, `numberOfOilChanges`, `nextOilChange`, `status`, `createdAt`, `updatedAt`

---

## 11. Revenues

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/revenues` | Báo cáo doanh thu | `{ data: Revenue[], pagination }` |
| GET | `/api/revenues/{id}` | Chi tiết doanh thu | `Revenue` |
| GET | `/api/revenues/export` | Xuất báo cáo doanh thu (Excel) | File |

**Revenue fields:** `id`, `deviceId`, `customerId`, `productId`, `amount`, `paymentMethod`, `paymentStatus`, `transactionStatus`, `refundStatus`, `date`, `createdAt`

**Enums:**
- `PaymentStatus`: `pending`, `completed`, `failed`, `refunded`
- `TransactionStatus`: `pending`, `success`, `failed`
- `RefundStatus`: `none`, `partial`, `full`

---

## 12. Errors / Logs

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/errors` | Danh sách lỗi hệ thống | `{ data: Error[], pagination }` |
| GET | `/api/errors/{id}` | Chi tiết lỗi | `Error` |
| PUT | `/api/errors/{id}/process` | Xử lý lỗi | `Error` |

---

## 13. Provinces / Districts / Communes

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/provinces` | Danh sách tỉnh/thành | `{ data: Province[], pagination }` |
| POST | `/api/provinces` | Tạo tỉnh/thành | `Province` |
| GET | `/api/provinces/{id}` | Chi tiết tỉnh/thành | `Province` |
| PUT | `/api/provinces/{id}` | Cập nhật tỉnh/thành | `Province` |
| DELETE | `/api/provinces/{id}` | Xóa tỉnh/thành | `{ message }` |
| GET | `/api/districts` | Danh sách quận/huyện | `{ data: District[], pagination }` |
| POST | `/api/districts` | Tạo quận/huyện | `District` |
| GET | `/api/districts/{id}` | Chi tiết quận/huyện | `District` |
| PUT | `/api/districts/{id}` | Cập nhật quận/huyện | `District` |
| DELETE | `/api/districts/{id}` | Xóa quận/huyện | `{ message }` |
| GET | `/api/communes` | Danh sách phường/xã | `{ data: Commune[], pagination }` |
| POST | `/api/communes` | Tạo phường/xã | `Commune` |
| GET | `/api/communes/{id}` | Chi tiết phường/xã | `Commune` |
| PUT | `/api/communes/{id}` | Cập nhật phường/xã | `Commune` |
| DELETE | `/api/communes/{id}` | Xóa phường/xã | `{ message }` |

---

## 14. Coupons

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/coupons` | Danh sách mã giảm giá | `{ data: Coupon[], pagination }` |
| POST | `/api/coupons` | Tạo mã giảm giá | `Coupon` |
| GET | `/api/coupons/{id}` | Chi tiết mã giảm giá | `Coupon` |
| PUT | `/api/coupons/{id}` | Cập nhật mã giảm giá | `Coupon` |
| DELETE | `/api/coupons/{id}` | Xóa mã giảm giá | `{ message }` |

---

## 15. Vouchers

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/vouchers` | Danh sách voucher | `{ data: Voucher[], pagination }` |
| POST | `/api/vouchers` | Tạo voucher | `Voucher` |
| GET | `/api/vouchers/{id}` | Chi tiết voucher | `Voucher` |
| PUT | `/api/vouchers/{id}` | Cập nhật voucher | `Voucher` |
| DELETE | `/api/vouchers/{id}` | Xóa voucher | `{ message }` |

---

## 16. Referral Codes

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/referral-codes` | Danh sách mã giới thiệu | `{ data: ReferralCode[], pagination }` |
| POST | `/api/referral-codes` | Tạo mã giới thiệu | `ReferralCode` |
| GET | `/api/referral-codes/{id}` | Chi tiết mã giới thiệu | `ReferralCode` |
| PUT | `/api/referral-codes/{id}` | Cập nhật mã giới thiệu | `ReferralCode` |
| DELETE | `/api/referral-codes/{id}` | Xóa mã giới thiệu | `{ message }` |

---

## 17. Secure Codes

### 17.1 Operation Secure Codes

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/secure-codes/operation` | Danh sách mã bảo mật vận hành | `{ data: SecureCode[], pagination }` |
| POST | `/api/secure-codes/operation` | Tạo mã bảo mật vận hành | `SecureCode` |
| GET | `/api/secure-codes/operation/{id}` | Chi tiết mã bảo mật | `SecureCode` |
| PUT | `/api/secure-codes/operation/{id}` | Cập nhật mã bảo mật | `SecureCode` |
| DELETE | `/api/secure-codes/operation/{id}` | Xóa mã bảo mật | `{ message }` |

### 17.2 System Secure Codes

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/secure-codes/system` | Danh sách mã bảo mật hệ thống | `{ data: SecureCode[], pagination }` |
| POST | `/api/secure-codes/system` | Tạo mã bảo mật hệ thống | `SecureCode` |
| GET | `/api/secure-codes/system/{id}` | Chi tiết mã bảo mật | `SecureCode` |
| PUT | `/api/secure-codes/system/{id}` | Cập nhật mã bảo mật | `SecureCode` |
| DELETE | `/api/secure-codes/system/{id}` | Xóa mã bảo mật | `{ message }` |

---

## 18. Instructional Videos

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/instructional-videos` | Danh sách video hướng dẫn | `{ data: Video[], pagination }` |
| POST | `/api/instructional-videos` | Tạo video hướng dẫn | `Video` |
| GET | `/api/instructional-videos/{id}` | Chi tiết video | `Video` |
| PUT | `/api/instructional-videos/{id}` | Cập nhật video | `Video` |
| DELETE | `/api/instructional-videos/{id}` | Xóa video | `{ message }` |

---

## 19. Points

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/points` | Danh sách điểm thưởng | `{ data: Point[], pagination }` |
| POST | `/api/points` | Tạo điểm thưởng | `Point` |
| GET | `/api/points/{id}` | Chi tiết điểm thưởng | `Point` |
| PUT | `/api/points/{id}` | Cập nhật điểm thưởng | `Point` |
| DELETE | `/api/points/{id}` | Xóa điểm thưởng | `{ message }` |

---

## 20. Point Settings

| Method | Endpoint | Công dụng | Giá trị trả về |
|--------|----------|-----------|----------------|
| GET | `/api/point-settings` | Danh sách cài đặt điểm | `{ data: PointSetting[], pagination }` |
| POST | `/api/point-settings` | Tạo cài đặt điểm | `PointSetting` |
| GET | `/api/point-settings/{id}` | Chi tiết cài đặt điểm | `PointSetting` |
| PUT | `/api/point-settings/{id}` | Cập nhật cài đặt điểm | `PointSetting` |
| DELETE | `/api/point-settings/{id}` | Xóa cài đặt điểm | `{ message }` |

---

## Common Patterns

### Pagination
All list endpoints accept:
- `?page=` (default: 1)
- `?limit=` (default: 10–20)
- `?search=` (search keyword)
- `?sort=` (sort field)
- `?order=` (`asc` / `desc`)
- Optional filters: `?status=`, `?fromDate=`, `?toDate=`

### HTTP Service
The app uses a centralized `execute()` service:
```
execute({
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  payload?: object,
  params?: object,         // query params
  config?: object,         // axios config overrides
  showSuccess?: boolean,   // show toast on success
  showError?: boolean,     // show toast on error
  convert?: (res) => any   // response transformer
})
```

### Error Response Shape
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "details": [...]
}
```
