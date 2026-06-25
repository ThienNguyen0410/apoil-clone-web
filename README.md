# APSP Oil Change — CMS Web

A web-based Content Management System for managing oil change services. Built with **React 19**, **TypeScript 6**, **Vite 8**, and **Ant Design 6**.

> This project is in early development. The current implementation uses mock data with a planned REST API integration documented in [`api.md`](api.md).

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
| State Mgmt    | [Redux Toolkit](https://redux-toolkit.js.org) + [redux-persist](https://github.com/rt2zz/redux-persist) |
| i18n           | [react-i18next](https://react.i18next.com) + [i18next](https://www.i18next.com) |
| HTTP Client   | [Axios](https://axios-http.com)                              |
| Linting        | [ESLint](https://eslint.org) 10 + typescript-eslint          |

---

## Project Structure

```
src/
├── assets/              # Static assets (logo, icons)
│   ├── logo.png
│   └── avatar.png
├── components/          # Reusable UI components
│   ├── header.tsx              # Top bar with breadcrumb, language switcher, avatar
│   ├── header.scss
│   ├── dashboardTable.tsx      # Customer list table with Segmented navigation
│   ├── dashboardStyle.scss
│   ├── dropdownbar.tsx         # Language dropdown (deprecated)
│   └── dropdown.scss
├── entities/            # TypeScript interfaces
│   ├── customer/entity.ts
│   ├── user/entity.ts          # User + login payload interfaces
│   ├── pagination.ts           # Pagination interface
│   └── error/entity.ts
├── icons/               # Custom SVG icon components
│   ├── vi.tsx                  # Vietnam flag icon
│   └── us.tsx                  # US flag icon
├── locale/              # i18n configuration
│   ├── i18n.ts                 # i18next setup
│   ├── vi/translation.json     # Vietnamese translations
│   └── en/translation.json     # English translations
├── pages/
│   ├── auth/
│   │   ├── login.tsx           # Login page
│   │   └── login.scss
│   └── Dashboard/
│       ├── dashboard.tsx       # Main dashboard layout with sidebar
│       ├── dasboard.scss
│       ├── profile.tsx         # Profile page
│       └── profile.scss
├── presenters/          # Redux state management
│   ├── store.ts                # Redux store with persist config
│   ├── hooks.ts                # Typed hooks (useAppDispatch, useAppSelector)
│   └── slices/
│       ├── authSlice.ts        # Auth state (login, logout, rehydrate validation)
│       └── customerSlice.ts    # Customer state (fetch list)
├── repositories/        # API service layer
│   ├── api.ts                  # Axios instance with JWT interceptors + refresh
│   ├── auth/auth.ts            # Auth API (login)
│   └── customer/customer.ts    # Customer API (CRUD)
├── routes/
│   ├── publicRoutes.tsx        # Public route definitions (/login)
│   └── privateRoutes.tsx       # Private route definitions (/dashboard, /profile)
├── styles/
│   └── color.scss       # SCSS variables (colors, fonts)
├── App.tsx              # Root component with PersistGate + routing
├── App.css
└── main.tsx             # Application entry point (Provider wrapper)
```

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

Output is written to the `dist/` directory.

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

## Features

### Implemented

- **Responsive sidebar** — Collapses automatically on screens narrower than 1200px; toggle manually by clicking the content area
- **Customer management** — Table view displaying customer data (name, phone, oil change history, status) via REST API
- **Segmented navigation** — Switch between Dashboard and Customers views
- **Responsive layout** — Adapts to tablet and mobile screen sizes
- **Internationalization (i18n)** — Multi-language support with Vietnamese and English via `react-i18next` + `i18next`
- **JWT Authentication** — Login with access/refresh token flow; automatic token refresh via Axios interceptors
- **Persistent auth state** — Redux state persisted to localStorage via `redux-persist`; survives page reload
- **Route guards** — Public/private layout separation; redirect to login when unauthenticated

### Planned

| Module              | Description                           |
| ------------------- | ------------------------------------- |
| Roles & Permissions | Role-based access control             |
| Devices             | Oil change device management          |
| Device Groups       | Device grouping                       |
| Products            | Product and oil-change settings       |
| Revenues            | Revenue tracking and export           |
| Errors / Logs       | Error monitoring and processing       |
| Coupons & Vouchers  | Promotional code management           |
| Referral Codes      | Referral program                      |
| Points & Settings   | Loyalty points system                 |
| Instructional Videos| Video content management              |
| Locations           | Province, district, commune data      |

---

## Architecture

### Data Flow

```
main.tsx
  └── <Provider store={store}>                    ← Redux Provider
       └── App.tsx
            └── <PersistGate>                      ← Wait for rehydration
                 └── <BrowserRouter>
                      ├── PublicLayout              ← Redirect to /dashboard if token exists
                      │    └── /login → Login
                      └── PrivateLayout             ← Redirect to /login if no token
                           └── Dashboard
                                ├── Sider (logo + navigation)
                                └── Content
                                      ├── Header (breadcrumb + language switcher + avatar)
                                      ├── Segmented (Dashboard / Customers)
                                      └── Table ← API Service → Repository → REST API
```

Authentication tokens are stored in `localStorage` and managed by `redux-persist`. Axios interceptors handle automatic token refresh on 401 responses.

The API base URL is `https://apsp-oilchange-api.dev.altasoftware.vn` (see [`api.md`](api.md) for full contract).

---

## Configuration

### Vite

- **Plugin**: `@vitejs/plugin-react`
- **Config file**: `vite.config.ts`

### TypeScript

TypeScript is configured with strict mode, `verbatimModuleSyntax`, and `erasableSyntaxOnly`. Configuration is split into:
- `tsconfig.json` — Root (references sub-configs)
- `tsconfig.app.json` — App source (`src/`)
- `tsconfig.node.json` — Node tooling (`vite.config.ts`)

### SCSS

Shared style variables are defined in `src/styles/color.scss` and imported via Sass `@use`:
- `$background-color: #e2faf0`
- `$side-bar-color: #0D733B`
- `$text-font: 'Inter', sans-serif`

---

## License

Public — Unlicensed.
