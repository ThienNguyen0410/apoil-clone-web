# Các chỉnh sửa để render dữ liệu từ Presenter lên UI

## 1. Thêm Provider Redux vào `src/main.tsx`

Thiếu `<Provider store={store}>` nên Redux store không được kết nối với React app.

**Trước:**
```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Sau:**
```tsx
import { Provider } from 'react-redux'
import { store } from './presenters/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

---

## 2. Sửa `src/components/dashboardTable.tsx` — Dùng Redux thay vì mock data

Component đang dùng `mockCustomers` từ `lib/data.ts` thay vì gọi API qua Redux.

**Thay đổi:**
- Bỏ import `mockCustomers` khỏi `lib/data.ts`
- Thêm `useAppDispatch`, `useAppSelector`, `fetchCustomers`
- Dispatch `fetchCustomers(1)` trong `useEffect`
- Lấy `{ customers, loading, error }` từ Redux store
- Thêm xử lý `loading` (Spin) và `error`

```tsx
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../presenters/hooks'
import { fetchCustomers } from '../presenters/slices/customerSlice'

export default function DashboardContent() {
  const dispatch = useAppDispatch()
  const { customers, loading, error } = useAppSelector((state) => state.customer)

  useEffect(() => {
    dispatch(fetchCustomers(1))
  }, [dispatch])

  // customers -> map vào Table
  // loading -> Spin
  // error -> thông báo lỗi
}
```

---

## 3. Tạo `src/repositories/api.ts` — Shared axios instance với Access Token

Thêm file mới để dùng chung axios instance cho tất cả repository, kèm Authorization header.

```ts
import axios from 'axios';

const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

const api = axios.create({
    baseURL: 'https://apsp-oilchange-api.dev.altasoftware.vn',
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
});

export default api;
```

---

## 4. Sửa `src/repositories/customer.ts` — Dùng shared api instance

**Trước:**
```ts
import axios from 'axios';
const api = axios.create({baseURL: 'https://apsp-oilchange-api.dev.altasoftware.vn'})
```

**Sau:**
```ts
import api from './api';
```

---

## Luồng dữ liệu hiện tại

```
User mở Dashboard
  → click "Khách hàng" trên sidebar
  → dashboard.tsx render <DashboardContent />
    → useEffect dispatch fetchCustomers(1)
      → asyncThunk gọi customerRepository.getAllCustomers(1)
        → api.get('/customers') với Bearer Token
          → API trả về { customers, pagination }
    → fulfilled → state.customer.customers = data
    → Component re-render với dữ liệu từ Redux
```

## 5. Fix lỗi 404 — Sai endpoint, response shape, entity fields

### 5.1. `src/repositories/api.ts` — Sai baseURL

**Trước:** `baseURL: 'https://apsp-oilchange-api.dev.altasoftware.vn'`  
**Sau:** `baseURL: 'https://apsp-oilchange-api.dev.altasoftware.vn/api'`

Tất cả endpoints đều bắt đầu bằng `/api/` (vd: `/api/customers`).

### 5.2. `src/entities/customer/entity.ts` — Sai field names

API trả về các field theo chuẩn camelCase, khác với entity cũ.

| API field | Entity cũ | Entity mới |
|-----------|-----------|------------|
| `id` | `ID` | `id` |
| `phone` | `phone_number` | `phone` |
| `dateOfBirth` | `date_of_birth` | `dateOfBirth` |
| `numberOfOilChanges` | `number_of_oil_changes` | `numberOfOilChanges` |
| `nextOilChange` | `next_time_change_oil` | `nextOilChange` |

### 5.3. `src/presenters/slices/customerSlice.ts` — Sai response path

API trả về `{ data: Customer[], pagination }`, không phải `{ customers, pagination }`.

**Trước:** `state.customers = action.payload.customers;`  
**Sau:** `state.customers = action.payload.data;`

### 5.4. `src/components/dashboardTable.tsx` — Cập nhật field mapping

Dùng `customer.id`, `customer.phone`, `customer.numberOfOilChanges`, `customer.nextOilChange`.

---

## Luồng dữ liệu hiện tại

```
User mở Dashboard
  → click "Khách hàng" trên sidebar
  → dashboard.tsx render <DashboardContent />
    → useEffect dispatch fetchCustomers(1)
      → asyncThunk gọi customerRepository.getAllCustomers(1)
        → api.get('/customers') với Bearer Token
          → API trả về { data: Customer[], pagination }
    → fulfilled → state.customer.customers = action.payload.data
    → Component re-render với dữ liệu từ Redux
```

## Lưu ý

- Token hiện đang hardcode trong `src/repositories/api.ts`. Sau này cần lấy từ login state (Redux auth slice) và dùng axios interceptor để gắn tự động.
- `src/lib/data.ts` (mock data) không còn được dùng nữa, có thể xoá sau.
