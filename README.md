<div align="center">

<a href="https://fixora-client.vercel.app">
    <img src="https://i.ibb.co.com/CxnFkxc/fixora-logo-no-bg-removebg-preview.png" alt="FixOra Logo" width="320" />
  </a>
  
#

### Your Trusted Home Service Marketplace

FixOra enables customers to discover home services, connect with qualified technicians, schedule services, manage bookings, complete secure Stripe payments, and submit reviews while technicians and administrators manage their respective workflows through dedicated dashboards.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge\&logo=next.js\&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4-5A0EF8?style=for-the-badge\&logo=daisyui\&logoColor=white)](https://daisyui.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Radix-000000?style=for-the-badge)](https://ui.shadcn.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge\&logo=framer\&logoColor=white)](https://www.framer.com/motion/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?style=for-the-badge\&logo=stripe\&logoColor=white)](https://stripe.com/)

</div>

---

## 📖 Project Overview

**FixOra** is a modern and responsive **Next.js home services marketplace** that connects customers with qualified service professionals.

Customers can browse available services, explore technician profiles, select available time slots, create bookings, make secure payments through Stripe, track booking progress, and leave reviews after completed services.

Technicians can manage professional profiles, create services, configure availability, and handle incoming bookings.

Administrators can manage users, technicians, service categories, bookings, payments, and overall platform activity through a dedicated dashboard.

> 💡 **Architecture:** FixOra Client is a frontend application that consumes the FixOra REST API for authentication, services, bookings, payments, reviews, technician management, and administration.

### 🌐 Live Website

<p align="center">

<a href="YOUR_LIVE_FRONTEND_URL">
<img src="https://img.shields.io/badge/🚀%20Live%20Demo-FixOra-0ea5e9?style=for-the-badge" alt="Live Demo" />
</a>

</p>

**Live Website:** `YOUR_LIVE_FRONTEND_URL`

### 🔗 Backend API

**Live API:** `https://fixora-api-chi.vercel.app/api`

---

# ✨ Core Features

<table>
<tr>

<td align="center" width="20%">

### 🌐

**Marketplace**

Browse services, categories, and qualified technicians.

</td>

<td align="center" width="20%">

### 👤

**Customer**

Book services, manage bookings, payments, and reviews.

</td>

<td align="center" width="20%">

### 🛠️

**Technician**

Manage profile, services, availability, and jobs.

</td>

<td align="center" width="20%">

### 🛡️

**Admin**

Manage users, technicians, categories, and platform activity.

</td>

<td align="center" width="20%">

### 🔐

**Authentication**

JWT authentication with role-based access control.

</td>

</tr>
</table>

---

## 💳 Payment Integration

<table>
<tr>

<td align="center" width="20%">

### 💳

**Stripe Checkout**

Secure online payments through Stripe.

</td>

<td align="center" width="20%">

### 🔒

**Secure**

Secret keys remain server-side.

</td>

<td align="center" width="20%">

### 🔄

**Payment Flow**

Booking → Checkout → Payment.

</td>

<td align="center" width="20%">

### ✅

**Verification**

Payment status verified by backend and Stripe.

</td>

<td align="center" width="20%">

### ↩️

**Redirect**

Dedicated success and cancel pages.

</td>

</tr>
</table>

```text
Customer creates booking
        ↓
Technician accepts
        ↓
Stripe Checkout
        ↓
Payment completed
        ↓
Backend verifies payment
        ↓
Customer returns to FixOra
```

> 🔒 Stripe secret keys are never exposed to the frontend.

---

## 🔄 Booking Lifecycle

<table>
<tr>

<td align="center" width="20%">

### 📩

**REQUESTED**

Customer submits a booking request.

</td>

<td align="center" width="20%">

### ✅

**ACCEPTED**

Technician accepts the request.

</td>

<td align="center" width="20%">

### 💳

**PAID**

Customer completes Stripe payment.

</td>

<td align="center" width="20%">

### 🔧

**IN PROGRESS**

Technician starts the job.

</td>

<td align="center" width="20%">

### 🏁

**COMPLETED**

Job is finished and review is enabled.

</td>

</tr>
</table>

```text
REQUESTED → ACCEPTED → PAID → IN_PROGRESS → COMPLETED
     │
     ├── DECLINED
     │
     └── CANCELLED
```

### Booking Status

| Status        | Meaning             | Action            |
| :------------ | :------------------ | :---------------- |
| `REQUESTED`   | Booking submitted   | Accept / Decline  |
| `ACCEPTED`    | Technician accepted | Customer can pay  |
| `DECLINED`    | Request declined    | No further action |
| `PAID`        | Payment completed   | Start job         |
| `IN_PROGRESS` | Job active          | Complete job      |
| `COMPLETED`   | Service completed   | Leave review      |
| `CANCELLED`   | Booking cancelled   | No further action |

---

## 🎨 UI/UX Architecture

<table>
<tr>

<td align="center" width="20%">

### 📱

**Responsive**

Optimized for mobile, tablet, and desktop.

</td>

<td align="center" width="20%">

### 🎨

**Design System**

Reusable and consistent UI components.

</td>

<td align="center" width="20%">

### ⚡

**Loading**

Skeleton loaders and smooth loading states.

</td>

<td align="center" width="20%">

### 💬

**Feedback**

Clear validation, errors, and success messages.

</td>

<td align="center" width="20%">

### ✨

**Animation**

Smooth transitions and micro-interactions.

</td>

</tr>
</table>

### UI Technologies

* **Tailwind CSS** — Utility-first styling
* **DaisyUI** — Reusable Tailwind components
* **shadcn/ui** — Accessible UI primitives
* **Framer Motion** — Animations and transitions
* **Sonner** — Toast notifications
* **React Hook Form** — Form management
* **Zod** — Client-side validation

---

## 🔎 Search & Filtering

<table>
<tr>

<td align="center" width="20%">

### 🔎

**Search**

Search services and technicians.

</td>

<td align="center" width="20%">

### 📂

**Category**

Filter by service category.

</td>

<td align="center" width="20%">

### 📍

**Location**

Filter services by location.

</td>

<td align="center" width="20%">

### 💰

**Price**

Filter by minimum and maximum price.

</td>

<td align="center" width="20%">

### ⭐

**Rating**

Filter by minimum rating.

</td>

</tr>
</table>

---

## 📅 Availability & Scheduling

<table>
<tr>

<td align="center" width="20%">

### 📆

**Working Days**

Configure available working days.

</td>

<td align="center" width="20%">

### ⏰

**Time Slots**

Configure working hours.

</td>

<td align="center" width="20%">

### 🔄

**Update**

Modify existing availability.

</td>

<td align="center" width="20%">

### 🚫

**Unavailable**

Prevent unavailable slot selection.

</td>

<td align="center" width="20%">

### 🎯

**Booking Slots**

Customers select available times.

</td>

</tr>
</table>

---

## 👥 Roles & Permissions

<table>
<tr>

<td align="center" width="33%">

### 👤 CUSTOMER

Browse services, create bookings, make payments, manage bookings, and submit reviews.

</td>

<td align="center" width="33%">

### 🛠️ TECHNICIAN

Manage profile, services, availability, bookings, and job status.

</td>

<td align="center" width="33%">

### 🛡️ ADMIN

Manage users, technicians, categories, bookings, payments, and platform statistics.

</td>

</tr>
</table>

> **Role-based access:** Navigation, dashboards, actions, and protected routes adapt according to the authenticated user's role.

---

# 🔐 Authentication & Authorization

FixOra uses **JWT-based authentication** integrated with the backend API.

<table>
<tr>

<td align="center" width="20%">

### 📝

**Registration**

Customer and technician registration.

</td>

<td align="center" width="20%">

### 🔑

**Login**

Secure credential-based authentication.

</td>

<td align="center" width="20%">

### 🔄

**Refresh Token**

Maintain authenticated sessions.

</td>

<td align="center" width="20%">

### 🛡️

**Protected Routes**

Restrict authenticated application areas.

</td>

<td align="center" width="20%">

### 👥

**RBAC**

Role-based route and action protection.

</td>

</tr>
</table>

### Protected Areas

```text
Public
 ├── Home
 ├── Services
 ├── Categories
 ├── Technicians
 └── Authentication

CUSTOMER
 ├── Dashboard
 ├── Bookings
 ├── Payments
 ├── Reviews
 └── Profile

TECHNICIAN
 ├── Dashboard
 ├── Profile
 ├── Services
 ├── Availability
 └── Bookings

ADMIN
 ├── Dashboard
 ├── Users
 ├── Technicians
 ├── Categories
 ├── Bookings
 └── Payments
```

---

# 🔌 API Integration

The frontend communicates with the FixOra REST API.

### Base URL

```text
https://fixora-api-chi.vercel.app/api
```

## Authentication

| Method | Endpoint              | Access        |
| :----- | :-------------------- | :------------ |
| `POST` | `/auth/register`      | Public        |
| `POST` | `/auth/login`         | Public        |
| `POST` | `/auth/refresh-token` | Public        |
| `POST` | `/auth/logout`        | Authenticated |
| `GET`  | `/auth/me`            | Authenticated |

## User Profile

| Method | Endpoint    | Access        |
| :----- | :---------- | :------------ |
| `GET`  | `/users/me` | Authenticated |
| `PUT`  | `/users/me` | Authenticated |

## Public Services

| Method | Endpoint                            | Access |
| :----- | :---------------------------------- | :----- |
| `GET`  | `/categories`                       | Public |
| `GET`  | `/services`                         | Public |
| `GET`  | `/services/:id`                     | Public |
| `GET`  | `/technicians`                      | Public |
| `GET`  | `/technicians/:id`                  | Public |
| `GET`  | `/reviews/technician/:technicianId` | Public |

## Bookings

| Method  | Endpoint               | Access                     |
| :------ | :--------------------- | :------------------------- |
| `POST`  | `/bookings`            | Customer                   |
| `GET`   | `/bookings`            | Customer / Technician      |
| `GET`   | `/bookings/:id`        | Owner / Technician / Admin |
| `PATCH` | `/bookings/:id/cancel` | Customer                   |

## Payments

| Method | Endpoint            | Access        |
| :----- | :------------------ | :------------ |
| `POST` | `/payments/create`  | Customer      |
| `POST` | `/payments/confirm` | Authenticated |
| `GET`  | `/payments`         | Authenticated |
| `GET`  | `/payments/:id`     | Owner / Admin |

## Technician

| Method   | Endpoint                   | Access     |
| :------- | :------------------------- | :--------- |
| `PUT`    | `/technician/profile`      | Technician |
| `GET`    | `/technician/availability` | Technician |
| `PUT`    | `/technician/availability` | Technician |
| `GET`    | `/technician/bookings`     | Technician |
| `PATCH`  | `/technician/bookings/:id` | Technician |
| `POST`   | `/services`                | Technician |
| `GET`    | `/services/my-services`    | Technician |
| `PATCH`  | `/services/:id`            | Technician |
| `DELETE` | `/services/:id`            | Technician |

## Reviews

| Method | Endpoint              | Access   |
| :----- | :-------------------- | :------- |
| `POST` | `/reviews`            | Customer |
| `GET`  | `/reviews/my-reviews` | Customer |

## Admin

| Method   | Endpoint                        | Access |
| :------- | :------------------------------ | :----- |
| `GET`    | `/admin/stats`                  | Admin  |
| `GET`    | `/admin/users`                  | Admin  |
| `GET`    | `/admin/users/:id`              | Admin  |
| `PATCH`  | `/admin/users/:id`              | Admin  |
| `PATCH`  | `/admin/technicians/:id/verify` | Admin  |
| `GET`    | `/admin/bookings`               | Admin  |
| `GET`    | `/admin/payments`               | Admin  |
| `GET`    | `/admin/categories`             | Admin  |
| `POST`   | `/admin/categories`             | Admin  |
| `PATCH`  | `/admin/categories/:id`         | Admin  |
| `DELETE` | `/admin/categories/:id`         | Admin  |

> 📚 For detailed component-to-endpoint mapping, request flows, authentication handling, and API integration details, see **[API_INTEGRATION.md](./API_INTEGRATION.md)**.

---

# 🗺️ Frontend Routes

<table>
<tr>

<td align="center" width="20%">

### 🌐 PUBLIC

`/`
`/services`
`/services/[id]`
`/categories`
`/technicians`
`/technicians/[id]`

</td>

<td align="center" width="20%">

### 👤 CUSTOMER

`/customer`
`/customer/bookings`
`/customer/bookings/[id]`
`/customer/payments`

</td>

<td align="center" width="20%">

### 🛠️ TECHNICIAN

`/technician`
`/technician/services`
`/technician/availability`
`/technician/bookings`

</td>

<td align="center" width="20%">

### 🛡️ ADMIN

`/admin`
`/admin/users`
`/admin/categories`
`/admin/bookings`
`/admin/payments`

</td>

<td align="center" width="20%">

### 💳 PAYMENT

`/payment/success`
`/payment/cancel`

</td>

</tr>
</table>

---

# 🧭 User Journeys

## 👤 Customer Journey

```text
Register / Login
      ↓
Browse Services
      ↓
Search & Filter
      ↓
View Technician
      ↓
Select Service
      ↓
Choose Available Time
      ↓
Submit Booking
      ↓
Technician Accepts
      ↓
Stripe Checkout
      ↓
Payment Successful
      ↓
Track Booking
      ↓
Service Completed
      ↓
Leave Review
```

## 🛠️ Technician Journey

```text
Register / Login
      ↓
Setup Profile
      ↓
Create Services
      ↓
Configure Availability
      ↓
Receive Booking
      ↓
Accept / Decline
      ↓
Customer Payment
      ↓
Start Job
      ↓
Complete Job
```

## 🛡️ Admin Journey

```text
Admin Login
      ↓
Dashboard
      ↓
View Statistics
      ↓
Manage Users
      ↓
Verify Technicians
      ↓
Manage Categories
      ↓
Monitor Bookings
      ↓
Monitor Payments
```

---

# ⚠️ Error Handling

FixOra provides structured and user-friendly error feedback throughout the application.

<table>
<tr>

<td align="center" width="20%">

### 🚨

**API Errors**

Readable backend error messages.

</td>

<td align="center" width="20%">

### 📝

**Validation**

Inline form validation feedback.

</td>

<td align="center" width="20%">

### 🔐

**Authorization**

Protected route and permission handling.

</td>

<td align="center" width="20%">

### 🌐

**Network**

Graceful network failure handling.

</td>

<td align="center" width="20%">

### 🍞

**Toast**

Success and error notifications.

</td>

</tr>
</table>

### Structured API Error

```json
{
  "success": false,
  "message": "Validation Error",
  "errorDetails": [
    {
      "path": "email",
      "message": "Provide a valid email address"
    }
  ]
}
```

The frontend transforms backend responses into clear and actionable UI feedback instead of exposing raw server errors.

---

# 🧱 Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── admin/
│   │   ├── users/
│   │   ├── categories/
│   │   ├── bookings/
│   │   └── payments/
│   │
│   ├── customer/
│   │   ├── bookings/
│   │   ├── payments/
│   │   └── ...
│   │
│   ├── technician/
│   │   ├── services/
│   │   ├── availability/
│   │   ├── bookings/
│   │   └── ...
│   │
│   ├── services/
│   ├── technicians/
│   ├── categories/
│   ├── payment/
│   ├── profile/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── lib/
│   ├── api/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── services/
│   │   ├── technicians/
│   │   ├── bookings/
│   │   ├── payments/
│   │   ├── reviews/
│   │   └── admin/
│   │
│   ├── auth/
│   └── utils.ts
│
├── providers/
├── types/
└── middleware.ts
```

---

# 🛠️ Tech Stack

<table>
<tr>

<td align="center" width="20%">

### ▲

**Next.js 14**

App Router and routing.

</td>

<td align="center" width="20%">

### 🔷

**TypeScript**

Type-safe development.

</td>

<td align="center" width="20%">

### 🎨

**Tailwind CSS**

Responsive utility-first styling.

</td>

<td align="center" width="20%">

### 🌸

**DaisyUI**

Reusable Tailwind components.

</td>

<td align="center" width="20%">

### 🧩

**shadcn/ui**

Accessible UI primitives.

</td>

</tr>
</table>

<table>
<tr>

<td align="center" width="20%">

### 🎬

**Framer Motion**

Animations and transitions.

</td>

<td align="center" width="20%">

### 📝

**React Hook Form**

Form management.

</td>

<td align="center" width="20%">

### ✅

**Zod**

Schema validation.

</td>

<td align="center" width="20%">

### 🗃️

**Zustand**

Client-side state management.

</td>

<td align="center" width="20%">

### ⚡

**Axios**

REST API communication.

</td>

</tr>
</table>

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js 18+
* npm
* Git

## 1. Clone the Repository

```bash
git clone https://github.com/MeNafi/FixOra-Client.git
cd FixOra-Client
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Configure:

```env
NEXT_PUBLIC_API_URL=https://fixora-api-chi.vercel.app/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

> 🔒 Never commit `.env` or `.env.local` to GitHub.

## 4. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🔑 Demo Credentials

## 🛡️ Admin

```text
Email:    admin@fixitnow.com
Password: Admin@1234
```

## 🛠️ Technician

```text
Email:    karim.tech@fixitnow.com
Password: Tech@1234
```

## 👤 Customer

Create a customer account through the registration page.

> **Note:** Demo credentials depend on the backend seed configuration. If the backend credentials have been changed, use the updated credentials.

---

# 📦 Environment Variables

| Variable                             | Description              | Required |
| :----------------------------------- | :----------------------- | :------: |
| `NEXT_PUBLIC_API_URL`                | FixOra backend API URL   |     ✅    |
| `NEXT_PUBLIC_APP_URL`                | Frontend application URL |     ✅    |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key   | Optional |

### 🔒 Security

Never expose these frontend-side:

```text
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
DATABASE_URL
JWT_SECRET
```

Only publishable client-side variables should use the `NEXT_PUBLIC_` prefix.

---

# 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server.

### Production Build

```bash
npm run build
```

Creates a production build.

### Production Server

```bash
npm run start
```

Starts the production server.

### Lint

```bash
npm run lint
```

Runs ESLint checks.

---

# 📚 Documentation

## API Integration

Detailed frontend-to-backend integration documentation:

**[API_INTEGRATION.md](./API_INTEGRATION.md)**

Includes:

* Endpoint mapping
* Authentication flows
* Role-based access
* Request and response handling
* Booking flow
* Payment flow
* Error handling
* Frontend component integration

## Backend API

**Live API:**

```text
https://fixora-api-chi.vercel.app/api
```

## Backend Repository

**FixOra API:**

```text
https://github.com/MeNafi/FixOra-API
```

---

# 🔗 Related Project

## FixOra API

The backend powering the FixOra marketplace provides:

<table>
<tr>

<td align="center" width="20%">

### 🔌

**REST API**

</td>

<td align="center" width="20%">

### 🔐

**JWT Auth**

</td>

<td align="center" width="20%">

### 👥

**RBAC**

</td>

<td align="center" width="20%">

### 🗃️

**PostgreSQL**

</td>

<td align="center" width="20%">

### 💳

**Stripe**

</td>

</tr>
</table>

Additional backend functionality includes booking management, technician management, review management, admin management, and API documentation.

---

# 🎯 Assignment Requirements Covered

<table>
<tr>

<td align="center" width="20%">

### ▲

**Next.js**

✅ App Router

</td>

<td align="center" width="20%">

### 🔷

**TypeScript**

✅ Implemented

</td>

<td align="center" width="20%">

### 📱

**Responsive UI**

✅ Implemented

</td>

<td align="center" width="20%">

### 🎨

**Tailwind**

✅ Implemented

</td>

<td align="center" width="20%">

### 🌸

**DaisyUI**

✅ Implemented

</td>

</tr>
</table>

<table>
<tr>

<td align="center" width="20%">

### 🔐

**JWT Auth**

✅ Implemented

</td>

<td align="center" width="20%">

### 🛡️

**Protected Routes**

✅ Implemented

</td>

<td align="center" width="20%">

### 👥

**RBAC**

✅ Implemented

</td>

<td align="center" width="20%">

### 📅

**Bookings**

✅ Implemented

</td>

<td align="center" width="20%">

### 💳

**Stripe**

✅ Implemented

</td>

</tr>
</table>

<table>
<tr>

<td align="center" width="20%">

### ⭐

**Reviews**

✅ Implemented

</td>

<td align="center" width="20%">

### 🔎

**Search**

✅ Implemented

</td>

<td align="center" width="20%">

### 📊

**Dashboards**

✅ Implemented

</td>

<td align="center" width="20%">

### ⚠️

**Error Handling**

✅ Implemented

</td>

<td align="center" width="20%">

### 📚

**API Docs**

✅ Implemented

</td>

</tr>
</table>

---

# 🏗️ Production Considerations

FixOra follows production-oriented frontend practices including:

<table>
<tr>

<td align="center" width="20%">

### 🧩

**Reusable**

Reusable UI and API modules.

</td>

<td align="center" width="20%">

### 🔷

**Type Safe**

Type-safe API communication.

</td>

<td align="center" width="20%">

### 🛡️

**Secure**

Protected routes and role-based access.

</td>

<td align="center" width="20%">

### ⚠️

**Reliable**

Structured errors and fallback states.

</td>

<td align="center" width="20%">

### 📱

**Responsive**

Optimized across devices.

</td>

</tr>
</table>

Additional practices include:

* Centralized API client
* Environment-based configuration
* Form validation
* Loading and empty states
* Secure payment redirection
* Separation of UI and API logic
* Reusable components
* Structured authentication handling

---

# 📄 License

This project is private and developed for the **FixOra home service marketplace**.

© FixOra. All rights reserved.

---

<div align="center">

### 🔧 FixOra

**Connecting Customers with Trusted Home Service Professionals**

Built with ❤️ using Next.js & TypeScript

</div>
