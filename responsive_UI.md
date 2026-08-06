# Responsive UI — Trang Customers (bản cập nhật)

Tài liệu ghi lại các thay đổi vừa cập nhật để trả lại UI ban đầu của trang khách hàng
(thiết kế cho màn hình **1920 x 945px**) và đảm bảo **khi thu nhỏ màn hình vẫn thấy toàn bộ bảng**.

## Cách tiếp cận

- Khôi phục toàn bộ **layout cố định ban đầu** (width `1485px`, bảng `1437px`, margin âm…).
- Khi màn hình nhỏ hơn thiết kế gốc, trang **cuộn ngang** (horizontal scroll) để luôn thấy
  đủ toàn bộ bảng, **không thay đổi kích thước/nội dung** của UI gốc.
- Xoá bỏ các media query cũ (1199px/768px) vốn làm thay đổi layout, font, margin của bảng
  khi thu nhỏ — trái với yêu cầu giữ nguyên UI gốc.

## Files đã sửa

| File | Loại thay đổi |
|------|---------------|
| `src/components/Customers/index.tsx` | Bọc bảng trong container cuộn ngang `customer-table-scroll`; bỏ `scroll={{ x }}`; khôi phục Pagination như cũ |
| `src/components/Customers/index.scss` | Thêm style container cuộn ngang; khôi phục toàn bộ layout cố định; xoá media query cũ |
| `src/components/common/Segmented/index.scss` | Khôi phục nguyên bản (xoá media query mobile) |

---

## 1. `src/components/Customers/index.tsx`

### 1.1. Bọc bảng trong container cuộn ngang

Bảng có width cố định (1437px) nên khi màn hình nhỏ sẽ bị tràn. Thêm 1 wrapper div
`.customer-table-scroll` quanh `.table_layout` — wrapper này có `overflow-x: auto`,
khi viewport hẹp thì xuất hiện thanh cuộn ngang để thấy trọn bảng.

```tsx
return (
  <>
    <Header name={key} />

    <SegmentedBar
    options={segmentedOptions}
    />
    <div className="customer-table-scroll">
      <div className={`table_layout${collapsed ? ' collapsed' : ''}`}>
        <div className="intro-box">
          {/* search + filter */}
        </div>

        <div className="main-table" onClick={(e) => e.stopPropagation()}>
          {/* Table + SavedBtn */}
        </div>
      </div>
    </div>
  </>
)
```

### 1.2. Bỏ `scroll={{ x: 1200 }}` khỏi `<Table>`

```tsx
// Trước (bản responsive cũ)
<Table className="customer-table" ... scroll={{ x: 1200 }} footer={...} />
// Sau (khôi phục nguyên bản)
<Table className="customer-table" columns={columns} dataSource={data} pagination={false}
footer={!error? () => tableFooter : undefined}
/>
```

### 1.3. Khôi phục Pagination như cũ

```tsx
<Pagination
  style={{marginRight: "-50px"}}
  current={10}
  total={10}
  pageSize={entriesPerPage}
  showSizeChanger={false}
/>
```

---

## 2. `src/components/Customers/index.scss`

### 2.1. Container cuộn ngang (thêm mới)

```scss
.customer-table-scroll {
    width: 100%;
    overflow-x: auto;
}
```

Container này chiếm hết chiều rộng khả dụng của trang. Khi màn hình ≥ 1920px thì bảng
(1485px) nằm gọn, không có thanh cuộn. Khi thu nhỏ màn hình, container cuộn ngang để
luôn nhìn thấy toàn bộ bảng.

### 2.2. Khôi phục layout cố định ban đầu

Toàn bộ giá trị width/margin cố định được khôi phục nguyên bản:

- `.customer-table`: `width: 1437px`, `margin-left: -22px`
- `.ant-table table`: `width: 1437px !important`, `margin-left: -50px`, `margin-top: -70px !important`
- `.customer-table .ant-table-footer`: `margin-left: -55px`, `margin-right: 25px`
- `.table_layout`: `width: 1485px`, `height: 756px`; `.collapsed` → `width: 1708px`
- `.table_layout.collapsed .customer-table`: `width: 1660px !important`
- `.intro-box .search-section`: `width: 220px`, `left: 15px`, `margin-left: -18px`
- `.intro-box .filter-section`: `width: 200px`, `right: 4px`
- `.footer-box`, `.entry-display`, `.saved-btn` (`position: absolute; top: 165px; right: 0`)… giữ nguyên

### 2.3. Xoá media query cũ

Đã xoá hai block `@media (max-width: 1199px)` và `@media (max-width: 768px)`
(trước đây thay đổi `margin`, `padding`, `font-size` và đặt `min-width` cho bảng).
Thay vào đó, việc thu nhỏ được xử lý bằng thanh cuộn ngang của `.customer-table-scroll`,
giúp UI luôn giống hệt bản thiết kế 1920x945px ở mọi kích thước màn hình.

---

## 3. `src/components/common/Segmented/index.scss`

Khôi phục nguyên bản: xoá các media query mobile đã thêm trước đó, Segmented bar giữ
nguyên kích thước như thiết kế gốc.

---

## 4. Kiểm chứng

- Ở **1920 x 945px**: UI hiển thị giống hệt bản gốc, không có thanh cuộn ngang.
- Khi **thu nhỏ màn hình** (ví dụ 1366px, 1024px, 768px): xuất hiện thanh cuộn ngang,
  kéo ngang là thấy đủ toàn bộ bảng, không bị vỡ layout.

Lưu ý: sidebar Dashboard tự thu gọn (311px → 86px) khi viewport ≤ 1199px, nên độ rộng
khả dụng thay đổi theo — scroll container tự động xử lý phần thừa.
