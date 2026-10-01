# FixOra Frontend

Production-ready home-service marketplace frontend built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **DaisyUI**, and **Framer Motion**.

Connected to the live FixOra API: `https://fixora-api-chi.vercel.app/api`

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local

# 3. (Optional) Add your Stripe publishable key
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# 4. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to log in as Admin

1. Open **http://localhost:3000/login** (same login page for everyone).
2. Use the **seeded admin** credentials from the FixOra-API `.env` / seed:

```
Admin Email:    admin@fixitnow.com
Admin Password: Admin@1234
```

These are the defaults in the backend `.env.example`:

```env
ADMIN_EMAIL=admin@fixitnow.com
ADMIN_PASSWORD=Admin@1234
```

If you changed them when seeding the API, use **your** values instead.

3. After a successful login you are redirected to **`/admin`** (Admin Dashboard).

> The frontend calls `POST /auth/login` first, then falls back to `POST /admin/login` so both regular users and admins work from the same form.

### Other demo accounts (from API seed)

| Role        | Email                       | Password   |
|-------------|-----------------------------|------------|
| Admin       | `admin@fixitnow.com`        | `Admin@1234` |
| Technician  | `karim.tech@fixitnow.com`   | `Tech@1234`  |
| Customer    | Register freely via UI      | —            |

> **Note:** Admins cannot self-register on the public register page. They are created only via the backend seed (`npm run seed`) or `POST /api/admin/register`.

## Features

### Authentication & roles
- Register (Customer / Technician)
- Login / Logout
- JWT access + refresh token handling
- Protected routes & role-based navigation
- Profile update

### Customer
- Home / service discovery, categories, services, service details
- Technician list & details
- Create booking, my bookings, booking details, cancel
- Stripe Checkout payment flow (create → redirect → confirm)
- Payment history
- Submit review after completed booking

### Technician
- Dashboard overview
- Profile & availability management
- Service CRUD
- Booking management (accept / decline / start / complete)

### Admin
- Dashboard stats
- User management (ban / unban)
- Category management (create / delete)
- Booking overview

## Tech stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | Next.js 14 App Router               |
| Language     | TypeScript                          |
| Styling      | Tailwind CSS + DaisyUI              |
| Components   | shadcn/ui (Radix primitives)        |
| Animation    | Framer Motion                       |
| Forms        | React Hook Form + Zod               |
| State        | Zustand (auth)                      |
| HTTP         | Axios with interceptors             |
| Payments     | Stripe Checkout (via backend)       |
| Toasts       | Sonner                              |

## Project structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/           # login, register
│   ├── admin/            # admin dashboard & management
│   ├── customer/         # customer dashboard, bookings, payments
│   ├── technician/       # technician dashboard, bookings, services
│   ├── services/         # public service listing & detail
│   ├── technicians/      # public technician listing & detail
│   ├── categories/       # public categories
│   ├── payment/          # success & cancel pages
│   └── profile/          # shared profile settings
├── components/
│   ├── ui/               # shadcn primitives
│   ├── layout/           # navbar, footer, protected-route
│   └── shared/           # loading, empty, status badges
├── lib/
│   ├── api/              # API client & domain modules
│   ├── auth/             # Zustand auth store
│   └── utils.ts
├── types/                # shared TypeScript types
└── providers/            # auth & theme providers
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |
| `NEXT_PUBLIC_APP_URL` | Frontend URL (for Stripe redirects) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (optional for Checkout redirect flow) |

**Never** put `STRIPE_SECRET_KEY` or webhook secrets in the frontend.

## Documentation

See [API_INTEGRATION.md](./API_INTEGRATION.md) for endpoint mapping, flows, and error handling.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # production server
npm run lint     # ESLint
```

## License

Private — for use with the FixOra platform.
