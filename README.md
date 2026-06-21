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
| Linting        | [ESLint](https://eslint.org) 10 + typescript-eslint          |

---

## Project Structure

```
src/
├── assets/              # Static assets (logo, icons)
│   └── logo.png
├── components/          # Reusable UI components
│   ├── dashboardTable.tsx      # Customer list table
│   └── dashboardStyle.scss     # Table and header styles
├── entities/            # TypeScript interfaces
│   ├── customer/entity.ts      # Customer interface
│   └── error/entity.ts         # Error interface (placeholder)
├── lib/
│   └── data.ts          # Mock customer data
├── pages/
│   └── Dashboard/
│       ├── dashboard.tsx       # Main dashboard layout with sidebar
│       ├── dasboard.scss       # Dashboard layout styles
│       ├── profile.tsx         # Profile page (placeholder)
│       └── profile.scss        # Profile styles (placeholder)
├── repositories/
│   └── customer.ts      # Customer repository (placeholder)
├── styles/
│   └── color.scss       # SCSS variables (colors, fonts)
├── App.tsx              # Root component with routing
├── App.css              # App-level styles
├── index.css            # Global styles (empty)
└── main.tsx             # Application entry point
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
- **Customer management** — Table view displaying customer data (name, phone, oil change history, status)
- **Segmented navigation** — Switch between Dashboard and Customers views
- **Responsive layout** — Adapts to tablet and mobile screen sizes

### Planned (via API)

Full REST API integration for the following modules (see [`api.md`](api.md) for complete endpoint documentation):

| Module              | Description                           |
| ------------------- | ------------------------------------- |
| Authentication      | Login, logout, token refresh          |
| Users               | User CRUD, profile management         |
| Roles & Permissions | Role-based access control             |
| Devices             | Oil change device management          |
| Device Groups       | Device grouping                       |
| Products            | Product and oil-change settings       |
| Customers           | Customer CRUD                         |
| Revenues            | Revenue tracking and export           |
| Errors / Logs       | Error monitoring and processing       |
| Coupons & Vouchers  | Promotional code management           |
| Referral Codes      | Referral program                      |
| Points & Settings   | Loyalty points system                 |
| Instructional Videos| Video content management              |
| Locations           | Province, district, commune data      |

---

## Architecture

### Current Data Flow

```
main.tsx → App.tsx → Dashboard
                        ├── Sider (logo + navigation)
                        └── Content
                              ├── Segmented (Dashboard / Customers)
                              └── Table ← mockCustomers (mock data)
```

### Planned Data Flow

```
main.tsx → App.tsx → Dashboard
                        ├── Sider (logo + navigation)
                        └── Content
                              ├── Segmented (Dashboard / Customers)
                              └── Table ← API Service → Repository → REST API
```

The `repositories/` directory is prepared for the API integration layer. The API contract is fully defined in [`api.md`](api.md) with a base URL of `https://apsp-oilchange-api.dev.altasoftware.vn`.

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

Private — All rights reserved.
