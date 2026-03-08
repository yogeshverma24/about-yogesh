# BuildMart - Hardware & Construction Marketplace

A comprehensive B2B and B2C online marketplace for hardware and construction products built with Next.js 16 and Tailwind CSS.

## Features

### Customer Portal (B2B + B2C)
- Product browsing with category filters
- Product detail pages with B2B/B2C pricing, MOQ
- Shopping cart with multi-vendor support
- Checkout with address and payment flow
- Request for Quotation (RFQ)
- Order tracking
- GST invoicing support

### Vendor Panel
- Dashboard with sales overview
- Product management
- Order management
- RFQ inbox and quotation handling
- Analytics and reports
- Store settings

### Admin Panel
- Dashboard with system metrics
- User management
- Vendor management and approval
- Product approvals
- Order monitoring
- Finance & commission management
- Promotions and ads
- Analytics

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **State:** Zustand (cart persistence)
- **Icons:** Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (customer pages)    # Home, products, cart, checkout
│   ├── vendor/             # Vendor panel
│   └── admin/              # Admin panel
├── components/
│   ├── ui/                 # Reusable UI (Button, Input, Card)
│   ├── layout/             # Header, Footer, ConditionalLayout
│   ├── customer/           # ProductCard
│   ├── vendor/             # VendorSidebar
│   └── admin/              # AdminSidebar
├── lib/
│   ├── constants/          # Colors, routes, config
│   ├── data/               # Dummy data
│   └── utils/              # cn, formatPrice
├── store/                  # Zustand cart store
└── types/                  # TypeScript interfaces
```

## Color Constants

Colors are centralized in `src/lib/constants/colors.ts` for consistent theming:
- Primary: Blue (#2563eb) - Professional, trust
- Accent: Orange (#f97316) - Construction, hardware
- Semantic: Success, warning, error

## Getting Started

```bash
# Install dependencies (if npm install had issues, try:)
npm install --cache /tmp/npm-cache

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Key Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/products` | Product listing |
| `/products/[slug]` | Product detail |
| `/categories` | All categories |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/orders` | My orders |
| `/rfq` | Request for Quotation |
| `/vendor/dashboard` | Vendor panel |
| `/admin/dashboard` | Admin panel |

## Dummy Data

All data is currently dummy/mock data in `src/lib/data/dummy.ts`. Replace with API calls when connecting to backend.
