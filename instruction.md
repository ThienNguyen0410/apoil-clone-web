# Hướng dẫn tổ chức source code theo 3 lớp Entities – Repository – Presenter (Redux)

## 1. Cấu trúc thư mục đề xuất

```
src/
├── entities/                  # Lớp Entities: định nghĩa kiểu dữ liệu (interface / type)
│   ├── customer/
│   │   └── entity.ts          # CustomerEntity
│   └── error/
│       └── entity.ts
│
├── repositories/              # Lớp Repository: gọi API, trả về dữ liệu đã map
│   ├── customer.ts            # CustomerRepository: các hàm fetch, create, update, delete
│   └── ...
│
├── presenter/                 # Lớp Presenter: Redux slice + store (chứa state, action, reducer, selector)
│   ├── store.ts               # configureStore
│   ├── hooks.ts               # useAppDispatch, useAppSelector (typed)
│   └── slices/
│       └── customerSlice.ts   # Customer state, asyncThunk, reducer
│
├── components/                # UI component, dùng selector + dispatch từ presenter
│   └── dashboardTable.tsx
│
├── pages/
│   ├── Dashboard/
│   │   ├── dashboard.tsx
│   │   └── profile.tsx
│   └── ...
│
└── lib/
    └── data.ts                # Mock data (tạm, sau này bỏ)
```

---

## 2. Lớp Entities – Định nghĩa dữ liệu

**Vai trò:** Chỉ chứa interface / type thuần, không có logic.  
**Nằm ở:** `src/entities/<tên module>/entity.ts`

```typescript
// src/entities/customer/entity.ts
export default interface CustomerEntity {
    ID: number;
    name: string;
    phone_number: string;
    date_of_birth: string | null;
    number_of_oil_changes: number;
    next_time_change_oil: string;
    status: boolean;
    action: any;
}
```

Giải thích:
- Entity là "xương sống" của dữ liệu, được dùng ở cả Repository và Presenter.
- Mỗi module (customer, error, ...) có một thư mục riêng trong `entities/`.

---

## 3. Lớp Repository – Gọi API

**Vai trò:** Chứa các hàm gọi API, map response thành Entity, xử lý lỗi HTTP.  
**Nằm ở:** `src/repositories/<tên module>.ts`

Cấu trúc mẫu:

```typescript
// src/repositories/customer.ts
import type CustomerEntity from '../entities/customer/entity';

const BASE_URL = '/api/customers';

async function handleResponse<T>(res: Response): Promise<T> {
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || `HTTP ${res.status}`);
    }
    return res.json();
}

export async function fetchCustomers(): Promise<CustomerEntity[]> {
    const res = await fetch(BASE_URL);
    return handleResponse<CustomerEntity[]>(res);
}

export async function fetchCustomerById(id: number): Promise<CustomerEntity> {
    const res = await fetch(`${BASE_URL}/${id}`);
    return handleResponse<CustomerEntity>(res);
}

// Thêm create, update, delete nếu cần
```

Giải thích:
- Repository không biết gì về Redux hay UI.
- Mỗi hàm trả về `Promise<Entity>` hoặc `Promise<Entity[]>`.
- Xử lý lỗi tập trung trong `handleResponse`.

---

## 4. Lớp Presenter (Redux) – Quản lý state

**Vai trò:** Cầu nối giữa Repository và UI. Quản lý state (data, loading, error) và dispatch action.  
**Cấu trúc:**

### 4.1. Cài đặt Redux

```bash
npm install @reduxjs/toolkit react-redux
```

### 4.2. Store

```typescript
// src/presenter/store.ts
import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './slices/customerSlice';

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        // thêm các slice khác vào đây
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 4.3. Typed hooks

```typescript
// src/presenter/hooks.ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### 4.4. Slice (asyncThunk + reducer)

```typescript
// src/presenter/slices/customerSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type CustomerEntity from '../../entities/customer/entity';
import { fetchCustomers } from '../../repositories/customer';

// --- AsyncThunk: gọi repository ---
export const getCustomers = createAsyncThunk(
    'customer/getCustomers',
    async () => {
        const data = await fetchCustomers();
        return data;
    }
);

// --- State ---
interface CustomerState {
    data: CustomerEntity[];
    loading: boolean;
    error: string | null;
}

const initialState: CustomerState = {
    data: [],
    loading: false,
    error: null,
};

// --- Slice ---
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Lỗi không xác định';
            });
    },
});

export default customerSlice.reducer;
```

### 4.5. Kết nối Store vào App

```typescript
// src/main.tsx
import { Provider } from 'react-redux';
import { store } from './presenter/store';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
);
```

---

## 5. Sử dụng trong UI (components/dashboardTable.tsx)

Luồng dữ liệu:

```
[Component] --dispatch--> [AsyncThunk] --call--> [Repository] --fetch--> [API]
                                                      |
                                                      v
[Component] <--useSelector-- [Redux Store] <--fulfilled-- [Slice Reducer]
```

Các bước trong component:

```typescript
import { useAppDispatch, useAppSelector } from '../presenter/hooks';
import { getCustomers } from '../presenter/slices/customerSlice';
import { useEffect } from 'react';

// Trong component:
const dispatch = useAppDispatch();
const { data, loading, error } = useAppSelector((state) => state.customer);

useEffect(() => {
    dispatch(getCustomers());
}, [dispatch]);

// data là CustomerEntity[] -> map vào Table
// loading -> hiển thị spinning
// error -> hiển thị thông báo lỗi
```

---

## 6. Luồng tổng quát

```
User mở Dashboard
        │
        ▼
dashboard.tsx render DashboardContent
        │
        ▼
useEffect → dispatch(getCustomers())
        │
        ▼
createAsyncThunk gọi fetchCustomers() (repository)
        │
        ▼
Repository fetch API → map → trả về CustomerEntity[]
        │
        ▼
Slice: fulfilled → cập nhật state.customer.data
        │
        ▼
useSelector nhận data mới → Table re-render với dữ liệu
```

---

## 7. Mở rộng cho module khác

Với mỗi module mới (ví dụ: error, equipment), lặp lại các bước:

1. `entities/<module>/entity.ts` — interface
2. `repositories/<module>.ts` — hàm fetch API
3. `presenter/slices/<module>Slice.ts` — asyncThunk + reducer
4. Đăng ký reducer vào `presenter/store.ts`
5. UI component dùng `useAppDispatch` + `useAppSelector`

---

## 8. Lưu ý

- Repository **không được import** bất cứ thứ gì từ presenter (Redux).
- Component **không gọi repository trực tiếp**, chỉ dispatch asyncThunk.
- Entity là nguồn sự thật duy nhất cho shape dữ liệu.
- Presenter chỉ chứa logic state, không chứa logic API hay UI.
