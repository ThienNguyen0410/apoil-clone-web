# APSP Oil Change — CMS Web

A web-based **Content Management System (CMS)** for the APSP Oil Change platform. It provides an admin dashboard for managing oil-change businesses: customers, devices, oil-change sessions, payment transactions, revenue statistics, error logs, and system users.

The application is built as a **Single Page Application (SPA)** using **React 19**, **TypeScript 6**, **Vite 8**, and **Ant Design 6**. It communicates with the APSP Oil Change REST API over HTTPS, using JWT authentication with automatic token refresh.

---

## Tech Stack

| Layer          | Technology                                                   |
| -------------- | ------------------------------------------------------------ |
| Framework      | [React](https://react.dev) 19                                |
| Language       | [TypeScript](https://www.typescriptlang.org) 6               |
| Build Tool     | [Vite](https://vitejs.dev) 8                                 |
| UI Library     | [Ant Design](https://ant.design) 6                           |
| Routing        | [React Router](https://reactrouter.com) 7                    |
| Styling        | [Sass](https://sass-lang.com) (sass-embedded) + Ant Design   |
| State Management| [Redux Toolkit](https://redux-toolkit.js.org) + [redux-persist](https://github.com/rt2zz/redux-persist) |
| i18n           | [react-i18next](https://react.i18next.com) + [i18next](https://www.i18next.com) |
| HTTP Client    | [Axios](https://axios-http.com)                              |
| Linting        | [ESLint](https://eslint.org) 10 + typescript-eslint          |

---

## Project Structure

```
src/
├── assets/                      # Static images (logo, avatars, language flags)
│
├── components/
│   ├── common/                  # Reusable shared components
│   │   ├── BreadCrumbs/         # Breadcrumb navigation bar
│   │   ├── DatePicker/          # Date range picker (custom hover/focus styles)
│   │   ├── Footer/              # Pagination footer
│   │   ├── Progress/            # Progress bar (e.g. oil tank levels)
│   │   ├── SearchBox/           # Keyword search input
│   │   ├── Segmented/           # Segmented navigation (Dashboard / Customers)
│   │   ├── SelectBox/           # Dropdown select
│   │   └── Table/               # Generic table wrapper (sorting, scrolling)
│   │
│   ├── Customers/               # Customer management page
│   │   ├── Header/              # Page header: breadcrumb, language switcher, avatar
│   │   ├── ProfileNav/          # Profile navigation panel
│   │   ├── SavedBtn/            # Saved indicator button
│   │   ├── index.tsx
│   │   └── index.scss
│   │
│   ├── Devices/                 # Device management
│   │   ├── BreadCrumbs/         # Device page breadcrumbs
│   │   ├── DeviceDetail/        # Device detail page
│   │   │   ├── Detail/          # Device information tab
│   │   │   ├── TransactionHistory/   # Transaction history tab
│   │   │   ├── CollectionHistory/    # Oil collection history tab
│   │   │   └── Revenue/         # Device revenue tab
│   │   ├── FlexBar/             # Search + filter bar
│   │   ├── index.tsx
│   │   └── index.scss
│   │
│   ├── Errors/                  # Error / log processing page
│   │
│   ├── Revenue/                 # Revenue & payment transactions page
│   │   └── Voucher-card/        # Summary revenue/discount cards
│   │
│   ├── System-settings/         # System administration
│   │   ├── BreadCrumbs/         # Breadcrumb navigation
│   │   ├── FlexBar/             # Search + role filter bar
│   │   ├── Right-Menu/          # Floating action menu (add / delete)
│   │   └── Users/               # User management page
│   │
│   ├── icons/                   # Custom SVG icon components
│   │
│   └── popups/                  # Modal / popup dialogs
│       ├── Customers/           # Lock screen & logout popups
│       └── System-settings/Users/   # Delete, change-status & profile popups
│
├── entities/                    # TypeScript interfaces
│   ├── customer/
│   ├── devices/
│   ├── error/
│   ├── payment/
│   ├── product/
│   ├── user/
│   └── pagination.ts
│
├── locale/                      # i18n configuration
│   ├── i18n.ts                  # i18next setup
│   ├── en/translation.json      # English translations
│   └── vi/translation.json      # Vietnamese translations
│
├── pages/
│   ├── Auth/                    # Login page
│   ├── Dashboard/               # Main application layout (sidebar, header, drawer)
│   ├── Layout/                  # Public / Private route layouts
│   └── Profile/                 # User profile page
│
├── presenters/                  # Redux state management
│   ├── store.ts                 # Redux store with persist configuration
│   ├── hooks.ts                 # Typed hooks (useAppDispatch, useAppSelector)
│   └── slices/                  # auth, customer, device, error, locale,
│                                # payment, product, profile, user slices
│
├── repositories/                # API service layer
│   ├── api.ts                   # Axios instance + JWT interceptors
│   ├── auth/                    # Authentication API
│   ├── customer/                # Customer API
│   ├── devices/                 # Device API
│   ├── error/                   # Error / log API
│   ├── payment/                 # Payment / revenue API
│   ├── product/                 # Product API
│   └── user/                    # User API
│
├── routes/                      # Public / Private route definitions
│   ├── publicRoutes.tsx
│   └── privateRoutes.tsx
│
├── styles/
│   └── color.scss               # Shared SCSS variables (colors, fonts)
│
├── App.tsx                      # Root component: PersistGate + routing
├── index.css
└── main.tsx                     # Application entry point
```

---

## Pages Built

| Page                | Route                     | Description                                                              |
| ------------------- | ------------------------- | ------------------------------------------------------------------------ |
| Login               | `/login`                  | Public login page using JWT access/refresh tokens.                       |
| Customers           | `/apsp/customers`         | Customer list with search, status filter, pagination and a responsive card view on mobile. |
| Devices             | `/apsp/devices`           | Device list with add/edit forms, location cascades (province/district/ward), oil tank progress and device group filter. |
| Device Detail       | `/apsp/device/:id/detail` | Device detail page with tabs: Device Info, Transaction History, Collection History, Revenue. |
| Revenue             | `/apsp/revenue`           | Payment transactions with total revenue/discount cards and multi-field filters (device, oil name, payment status, refund, e-invoice, date range). |
| Errors              | `/apsp/errors`            | Error / log processing list.                                             |
| Users (System)      | `/apsp/user`              | User management: add, edit, delete, change status, role filter.          |
| Profile             | `/profile`                | Current user profile page.                                               |

The sidebar contains additional menu items (Oil Type, Code Management, System Settings sub-menus) that are reserved for future modules.

---

## Getting Started

### Prerequisites

- **Node.js** >= 20
- **npm** >= 9

### Installation

```bash
npm install
```

### Development

Start the Vite dev server with hot module replacement:

```bash
npm run dev
```

### Build

Type-check and build for production:

```bash
npm run build
```

The production bundle is written to the `dist/` directory.

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Lint

Run ESLint across the project:

```bash
npm run lint
```

---

## Key Features

- **JWT Authentication** — Login with access/refresh token flow; tokens are persisted in `localStorage` via `redux-persist` and automatically refreshed by Axios interceptors.
- **Route guards** — Public and private layouts; unauthenticated users are redirected to the login page.
- **Internationalization (i18n)** — Full Vietnamese and English support via `react-i18next` + `i18next`.
- **Responsive design** — Desktop, tablet and mobile layouts; the sidebar collapses into a mini menu on tablet and becomes a drawer with a hamburger button on mobile; data tables convert into card lists on small screens.
- **Advanced filtering** — Multi-field filtering (search, dropdowns, date range) with server-side query parameters.
- **State persistence** — Redux state survives page reloads through `redux-persist`.

---

## API Integration

- **Base URL:** `https://apsp-oilchange-api.dev.altasoftware.vn`
- All requests go through a shared Axios instance (`src/repositories/api.ts`) that:
  - attaches the `Authorization: Bearer <token>` header,
  - refreshes an expired access token before sending the request,
  - queues and retries requests on `401` responses,
  - logs the user out when the refresh token is no longer valid.

---

## Author

- **Author:** Nguyen Huu Thien — Student of HCMUT (Ho Chi Minh City University of Technology)
- **Context:** This product was developed during an internship program, carried out under the supervision of **Alta Software**.

---

## License

Public — Unlicensed.
