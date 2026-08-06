# Revenue Task - Completed Tasks

## Summary
Implemented the Revenue page data wiring (payment API -> slice -> table), pagination Footer, and layout/DatePicker adjustments per `src/task.txt` requirements.

## Changes Made

### 1. Payment Repository (`src/repositories/payment/payment.ts`)
- Mapped the `GET Revenues/Payments` response `pagedData` to the defined `PaymentEntities` fields:
  - `id` -> `item.id`
  - `device_name` -> `oilChangeSession.device.name`
  - `transaction_code` -> `oilChangeSession.code`
  - `discount_code` -> `oilChangeSession.couponSession.code`
  - `accumulated_point` -> `oilChangeSession.oilSuctionPoints` (string)
  - `discount` -> `oilChangeSession.couponDiscountAmount` (string)
  - `total_payment` -> `oilChangeSession.totalPayment` (string)
  - `payment_code` -> `gatewayTransactionCode`
  - `oil_name` -> `oilChangeSession.product.name`
  - `created_at` -> `item.createdAt`
  - `payment_time` -> `oilChangeSession.paymentTime`
  - `payment_status` -> `item.paymentStatus`
  - `refund` -> `item.refundStatus`
  - `export_invoice` -> `oilChangeSession.oilChangeSessionEInvoice.eInvoiceStatus`
- Return type is now `{payments: PaymentEntities[], total: number}`
- `total` comes from `data.pageInfo.totalCount` for pagination
- Fixed filter param builder to forward values raw (was producing `$eq<value>`)

### 2. Payment Slice (`src/presenters/slices/paymentSlice.ts`)
- Created `paymentSlice` with state: `payments`, `total`, `loading`, `error`
- Added `fetchPaymentData` async thunk dispatching `PaymentRepositories.getPaymentData`
- Handles pending/fulfilled/rejected cases

### 3. Redux Store (`src/presenters/store.ts`)
- Registered `payment: paymentReducer` in the root reducer

### 4. DatePicker (`src/components/common/DatePicker/index.scss`)
- Resized `.ant-picker-range` to **306x42px** with 8px radius
- Hover/focus states use `#0d733b` border + green focus ring (matches SelectBox)

### 5. Revenue Page (`src/components/Revenue/index.tsx`)
- Added payment slice wiring: dispatch `fetchPaymentData` (debounced 500ms) on page/pageSize/search/filter changes
- `dataSource` built from `payments`, mapped to the 16 columns
- Table now uses `loading`/`error` from payment state and `scroll={true}`
- Added pagination `Footer` (common component) below the table with `currentPage`/`pageSize`/`total` and page change handlers
- SearchBox now wired with `setSearch`

### 6. Revenue Styles (`src/components/Revenue/index.scss`)
- Flex bar forced onto **one row** (`flex-wrap: nowrap` on `.flex-bar` and `.select-menu`)
- Added `gap: 20px` spacing between the boxes

### 7. Table Cell Fit (`src/components/common/Table/index.scss`)
- Added to both `.ant-table-thead > tr > th` and `.ant-table-tbody > tr > td`:
  - `overflow: hidden`
  - `text-overflow: ellipsis`
  - `white-space: nowrap`
  - `word-break: keep-all` (body cells)
- Long content now truncates with ellipsis inside its column width, so the table no longer stretches due to long values

### 8. Table Scroll Fix (Table overflow out of main-layout)
- `src/components/common/Table/index.tsx`:
  - `enableScroll` is now `Boolean(scroll)` — the scroll is applied whenever the `scroll` flag is passed, instead of gating on `dataSource.length > 8`
  - The old gating left the table unclipped (fixed `width: 1437px`) when data was empty/short, spilling out of the white `main-layout`
  - `scroll={{y: 500, x: scrollX}}` is always passed when the flag is set: `x` = sum of column widths so the body clips horizontally with an internal x-scrollbar, `y: 500` caps height with a y-scrollbar
- `src/components/common/Table/index.scss`:
  - `.table-scroll` gets `max-width: 100%; box-sizing: border-box`
  - `.ant-table-wrapper`, `.ant-table`, `.ant-table-container` constrained to `max-width: 100%` so the table can never stretch past the layout

## Verification
- `npx tsc -b` compiles all changed files without errors; the remaining TS errors are pre-existing in untouched files
