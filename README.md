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
├── assets/                      # Static images (logo, avatars, flags)
│   ├── after.png
│   ├── avatar.png
│   ├── avt.png
│   ├── be.png
│   ├── be4.png
│   ├── enFlag.png
│   ├── logo.png
│   └── vnFlag.png
│
├── components/
│   ├── common/                  # Reusable shared components
│   │   ├── Footer/              # Pagination footer
│   │   ├── SearchBox/           # Keyword search input
│   │   ├── SelectBox/           # Dropdown select
│   │   └── Table/               # Generic table wrapper
│   │
│   ├── Customers/               # Customer dashboard table
│   │   ├── Header/              # Top bar: breadcrumb, language switcher, avatar
│   │   ├── ProfileNav/          # Profile navigation panel
│   │   ├── SavedBtn/            # Saved indicator button
│   │   ├── index.tsx
│   │   └── index.scss
│   │
│   ├── icons/                   # 19 custom SVG icon components
│   │   ├── Addicon.tsx
│   │   ├── BulletPoint.tsx
│   │   ├── CameraEdit.tsx
│   │   ├── ChangeIcon.tsx
│   │   ├── Cubeicon.tsx
│   │   ├── Deleteicon.tsx
│   │   ├── Editicon.tsx
│   │   ├── Export.tsx
│   │   ├── Eyeinvisible.tsx
│   │   ├── Eyevisible.tsx
│   │   ├── Homeicon.tsx
│   │   ├── Lockicon.tsx
│   │   ├── Logouticon.tsx
│   │   ├── MoreOutlined.tsx
│   │   ├── Searchicon.tsx
│   │   ├── Separator.tsx
│   │   ├── Setting.tsx
│   │   ├── Trashicon.tsx
│   │   └── Warning.tsx
│   │
│   ├── popups/
│   │   ├── Customers/           # Lock screen & logout popups
│   │   │   ├── lock.tsx / lock.scss
│   │   │   └── logout.tsx / logout.scss
│   │   └── System-settings/
│   │       └── Users/           # User management popups
│   │           ├── ChangeStatusPop.tsx / .scss
│   │           ├── ConfirmDelete.tsx
│   │           ├── ConfrimDelete.scss
│   │           └── ProfilePopup.tsx / .scss
│   │
│   └── System-settings/         # Admin user management
│       ├── BreadCrumbs/         # Breadcrumb navigation
│       ├── FlexBar/             # Search + Role filter bar
│       ├── Right-Menu/          # Floating action menu
│       ├── Table/               # Reusable table wrapper
│       └── Users/               # User listing page
│           ├── index.tsx
│           └── index.scss
│
├── entities/                    # TypeScript interfaces
│   ├── customer/entity.ts
│   ├── error/entity.ts
│   ├── user/entity.ts
│   └── pagination.ts
│
├── locale/                      # i18n configuration
│   ├── i18n.ts                  # i18next setup
│   ├── en/translation.json      # English translations
│   └── vi/translation.json      # Vietnamese translations
│
├── pages/
│   ├── Auth/
│   │   ├── Login.tsx            # Login page
│   │   └── Login.scss
│   ├── Dashboard/
│   │   ├── Dashboard.tsx        # Main layout with sidebar
│   │   ├── Dasboard.scss
│   │   ├── Profile.tsx          # Profile page
│   │   └── Profile.scss
│   └── Layout/
│       ├── privateLayout.tsx
│       └── publicLayout.tsx
│
├── presenters/                  # Redux state management
│   ├── store.ts                 # Redux store with persist config
│   ├── hooks.ts                 # Typed hooks (useAppDispatch, useAppSelector)
│   └── slices/
│       ├── authSlice.ts         # Auth (login, logout, JWT refresh)
│       ├── customerSlice.ts     # Customer data
│       ├── localeSlice.ts       # Language switching
│       ├── profileSlice.ts      # Profile data
│       └── userSlice.ts         # User CRUD
│
├── repositories/                # API service layer
│   ├── api.ts                   # Axios instance + JWT interceptors
│   ├── auth/auth.ts
│   ├── customer/customer.ts
│   └── user/user.ts
│
├── routes/
│   ├── PrivateRoutes.tsx        # Private route wrapper
│   └── PublicRoutes.tsx         # Public route wrapper
│
├── styles/
│   └── color.scss               # SCSS variables (colors, fonts)
│
├── App.tsx / App.css            # Root component with PersistGate + routing
├── index.css
└── main.tsx                     # Application entry point
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
