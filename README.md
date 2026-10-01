<div align="center">

<a href="https://fixora-client.vercel.app">
    <img src="https://i.ibb.co.com/CxnFkxc/fixora-logo-no-bg-removebg-preview.png" alt="FixOra Logo" width="280" />
  </a>
  
#

### Your Trusted Home Service Marketplace

FixOra enables customers to discover home services, connect with qualified technicians, schedule services, manage bookings, complete secure Stripe payments, and submit reviews while technicians and administrators manage their respective workflows through dedicated dashboards.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge\&logo=next.js\&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4-5A0EF8?style=for-the-badge\&logo=daisyui\&logoColor=white)](https://daisyui.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Radix-000000?style=for-the-badge)](https://ui.shadcn.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-0055FF?style=for-the-badge\&logo=framer\&logoColor=white)](https://www.framer.com/motion/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?style=for-the-badge\&logo=stripe\&logoColor=white)](https://stripe.com/)
</div>

---

## 📌 Project Overview

> FixOra is a full-featured home service marketplace that connects customers with trusted service professionals.

> Customers can browse services, search for technicians, select available time slots, create bookings, make secure payments, track booking status, and submit reviews.

> Technicians can manage their profiles, services, availability, and bookings, while administrators can manage users, technicians, categories, bookings, payments, and platform statistics.

> The frontend communicates with the **FixOra REST API** for authentication, marketplace data, booking management, payments, reviews, and administration.

#

> ### 🌐 Live Demo
>
> | Service | Deployment | Direct Link |
> | :--- | :--- | :--- |
> | 🚀 **Live Website** | [<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" height="28" />](https://fixora-virid-nu.vercel.app/) | [fixora-virid-nu.vercel.app](https://fixora-virid-nu.vercel.app/) |
> | ⚡ **Backend API** | [<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" height="28" />](https://fixora-api-chi.vercel.app) | [fixora-api-chi.vercel.app](https://fixora-api-chi.vercel.app) |

---

## 🛠️ Tech Stack

| Technology             | Purpose                                        |
| :--------------------- | :--------------------------------------------- |
| ⚡ **Next.js 14**       | App Router, routing, and frontend architecture |
| 🔷 **TypeScript**      | Type-safe application development              |
| 🎨 **Tailwind CSS**    | Responsive utility-first styling               |
| 🌼 **DaisyUI**         | Reusable Tailwind UI components                |
| 🧩 **shadcn/ui**       | Accessible and reusable UI primitives          |
| ✨ **Framer Motion**    | Animations and smooth transitions              |
| 📝 **React Hook Form** | Form management                                |
| ✅ **Zod**              | Client-side schema validation                  |
| 🗃️ **Zustand**        | Lightweight state management                   |
| 🔌 **Axios**           | REST API communication                         |
| 🔐 **JWT**             | Authentication and protected access            |
| 💳 **Stripe Checkout** | Secure online payments                         |
| 🍞 **Sonner**          | Toast notifications                            |
| 🚀 **FixOra REST API** | Backend services and data                      |

---

## ✨ Core Features

| Feature                        | Description                                                   |
| :----------------------------- | :------------------------------------------------------------ |
| 🌐 **Service Marketplace**     | Discover and browse available home services                   |
| 🛠️ **Technician Discovery**   | Explore technician profiles, skills, rates, and reviews       |
| 🔎 **Search & Filtering**      | Search and filter services and technicians                    |
| 📅 **Availability Scheduling** | View and manage technician working slots                      |
| 📋 **Booking Management**      | Create, track, accept, decline, cancel, and complete bookings |
| 💳 **Stripe Payments**         | Secure online payments through Stripe Checkout                |
| ⭐ **Reviews & Ratings**        | Review technicians after completed services                   |
| 🔐 **JWT Authentication**      | Secure login, registration, refresh token, and logout         |
| 👥 **Role-Based Access**       | Customer, Technician, and Admin workflows                     |
| 📊 **Dashboards**              | Dedicated dashboards for each user role                       |
| 📱 **Responsive UI**           | Mobile, tablet, and desktop support                           |
| ⚡ **Loading States**           | Skeleton loaders and loading feedback                         |
| ⚠️ **Error Handling**          | Structured API errors and fallback UI                         |
| ✨ **Animations**               | Smooth transitions and micro-interactions                     |

---

## 👥 Roles & Permissions

| Role               | Description                  | Main Capabilities                                                         |
| :----------------- | :--------------------------- | :------------------------------------------------------------------------ |
| 👤 **CUSTOMER**    | Users who book home services | Browse, book, pay, cancel, track, and review                              |
| 🛠️ **TECHNICIAN** | Home service professionals   | Manage profile, services, availability, bookings, and jobs                |
| 🛡️ **ADMIN**      | Platform administrators      | Manage users, technicians, categories, bookings, payments, and statistics |

> **Role-based access:** Navigation, dashboards, actions, and protected routes adapt according to the authenticated user's role.

---

## 🔐 Authentication & Authorization

FixOra uses **JWT-based authentication** integrated with the backend API.

| Feature                      | Description                                  |
| :--------------------------- | :------------------------------------------- |
| 📝 **Registration**          | Customer and technician account registration |
| 🔑 **Login**                 | Secure credential-based authentication       |
| 🔄 **Refresh Token**         | Maintain authenticated sessions              |
| 🚪 **Logout**                | Secure session termination                   |
| 🛡️ **Protected Routes**     | Restrict authenticated application areas     |
| 👥 **RBAC**                  | Role-based route and action protection       |
| 🚫 **Unauthorized Handling** | Handle restricted resource access            |
| 👤 **Profile**               | Manage authenticated user information        |

### Protected Areas

| Area               | Routes                                                        |
| :----------------- | :------------------------------------------------------------ |
| 🌐 **Public**      | Home, Services, Categories, Technicians, Authentication       |
| 👤 **Customer**    | Dashboard, Bookings, Payments, Reviews, Profile               |
| 🛠️ **Technician** | Dashboard, Profile, Services, Availability, Bookings          |
| 🛡️ **Admin**      | Dashboard, Users, Technicians, Categories, Bookings, Payments |

---

## 💳 Payment Integration

FixOra uses **Stripe Checkout** for secure online payments.

| Feature                | Description                        |
| :--------------------- | :--------------------------------- |
| 💳 **Stripe Checkout** | Secure online payment processing   |
| 🔒 **Secure Keys**     | Secret keys remain on the backend  |
| 🔄 **Checkout Flow**   | Booking → Checkout → Payment       |
| ✅ **Verification**     | Backend verifies payment status    |
| ↩️ **Success Page**    | Redirect after successful payment  |
| ❌ **Cancel Page**      | Redirect when payment is cancelled |
| 🧾 **Payment History** | View previous payments             |
| 🔍 **Payment Details** | View individual transactions       |

### Payment Flow

```text
Customer creates booking
        ↓
Technician accepts booking
        ↓
Customer clicks Pay Now
        ↓
Stripe Checkout Session
        ↓
Stripe Payment
        ↓
Backend Verification
        ↓
Payment Successful
        ↓
Customer returns to FixOra
```

---

## 🔄 Booking Lifecycle

| Status             | Meaning                     | Available Action                |
| :----------------- | :-------------------------- | :------------------------------ |
| 📩 **REQUESTED**   | Customer submitted booking  | Technician can Accept / Decline |
| ✅ **ACCEPTED**     | Technician accepted booking | Customer can Pay                |
| ❌ **DECLINED**     | Technician declined booking | No further action               |
| 💳 **PAID**        | Payment completed           | Technician can Start            |
| 🔧 **IN_PROGRESS** | Job is currently active     | Technician can Complete         |
| 🏁 **COMPLETED**   | Service completed           | Customer can Review             |
| 🚫 **CANCELLED**   | Booking cancelled           | No further action               |

**Main Flow:**

`REQUESTED → ACCEPTED → PAID → IN_PROGRESS → COMPLETED → REVIEW`

---

## 🎨 UI/UX Architecture

| Principle                  | Description                               |
| :------------------------- | :---------------------------------------- |
| 📱 **Responsive Design**   | Mobile, tablet, and desktop support       |
| 🎨 **Design System**       | Consistent reusable UI components         |
| ♿ **Accessibility**        | Accessible interactive components         |
| ⚡ **Loading States**       | Skeleton loaders and loading feedback     |
| 📭 **Empty States**        | Helpful empty-state experiences           |
| 💬 **User Feedback**       | Clear success and error messages          |
| 🍞 **Toast Notifications** | Instant feedback with Sonner              |
| 📝 **Form Validation**     | Client-side validation with Zod           |
| ⚠️ **Error Boundaries**    | Route-level fallback experiences          |
| ✨ **Animations**           | Smooth transitions and micro-interactions |
| 📱 **Mobile UX**           | Touch-friendly responsive interfaces      |

---

## 🔎 Search & Filtering

| Filter             | Description                         |
| :----------------- | :---------------------------------- |
| 🔎 **Search Term** | Search services and technicians     |
| 📂 **Category**    | Filter by service category          |
| 📍 **Location**    | Filter by service location          |
| 💰 **Price Range** | Filter by minimum and maximum price |
| ⭐ **Rating**       | Filter by minimum rating            |
| ↕️ **Sorting**     | Sort marketplace results            |
| 📄 **Pagination**  | Navigate large result sets          |

---

## 📅 Availability & Scheduling

| Feature                    | Description                        |
| :------------------------- | :--------------------------------- |
| 📆 **Working Days**        | Select available working days      |
| ⏰ **Time Slots**           | Configure available service hours  |
| 🔄 **Update Availability** | Modify existing schedules          |
| 🚫 **Unavailable Slots**   | Prevent unavailable selections     |
| 👀 **Availability View**   | Customers can view available slots |
| 🎯 **Slot Selection**      | Select a suitable service time     |

---

## ⭐ Reviews & Ratings

| Feature                  | Description                           |
| :----------------------- | :------------------------------------ |
| ⭐ **Technician Reviews** | View technician reviews               |
| 📝 **Submit Review**     | Review completed services             |
| 📊 **Ratings**           | Display technician ratings            |
| 👤 **My Reviews**        | View submitted reviews                |
| 🔒 **Protected Reviews** | Review actions require authentication |

---

## ⚠️ Error Handling

| Error Type                   | UI Response                     |
| :--------------------------- | :------------------------------ |
| 🚨 **API Errors**            | User-friendly server messages   |
| 📝 **Validation Errors**     | Inline field-level feedback     |
| 🔐 **Authentication Errors** | Login and session feedback      |
| 🚫 **Authorization Errors**  | Protected resource handling     |
| 🌐 **Network Errors**        | Connection failure feedback     |
| 💳 **Payment Errors**        | Payment-specific messages       |
| 📭 **Empty States**          | Helpful empty content           |
| 💀 **Loading States**        | Skeleton and loading indicators |
| 🍞 **Toast Feedback**        | Success and error notifications |
| 🧱 **Error Boundaries**      | Route-level fallback UI         |

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

---

## 🔌 API Integration

**Base URL:**

`https://fixora-api-chi.vercel.app/api`

### Authentication

| Method | Endpoint              | Access        |
| :----- | :-------------------- | :------------ |
| POST   | `/auth/register`      | Public        |
| POST   | `/auth/login`         | Public        |
| POST   | `/auth/refresh-token` | Public        |
| POST   | `/auth/logout`        | Authenticated |
| GET    | `/auth/me`            | Authenticated |

### Marketplace

| Method | Endpoint                            | Access |
| :----- | :---------------------------------- | :----- |
| GET    | `/categories`                       | Public |
| GET    | `/services`                         | Public |
| GET    | `/services/:id`                     | Public |
| GET    | `/technicians`                      | Public |
| GET    | `/technicians/:id`                  | Public |
| GET    | `/reviews/technician/:technicianId` | Public |

### Bookings & Payments

| Method | Endpoint               | Access                     |
| :----- | :--------------------- | :------------------------- |
| POST   | `/bookings`            | Customer                   |
| GET    | `/bookings`            | Customer / Technician      |
| GET    | `/bookings/:id`        | Owner / Technician / Admin |
| PATCH  | `/bookings/:id/cancel` | Customer                   |
| POST   | `/payments/create`     | Customer                   |
| POST   | `/payments/confirm`    | Authenticated              |
| GET    | `/payments`            | Authenticated              |
| GET    | `/payments/:id`        | Owner / Admin              |

### Technician

| Method | Endpoint                   | Access     |
| :----- | :------------------------- | :--------- |
| PUT    | `/technician/profile`      | Technician |
| GET    | `/technician/availability` | Technician |
| PUT    | `/technician/availability` | Technician |
| GET    | `/technician/bookings`     | Technician |
| PATCH  | `/technician/bookings/:id` | Technician |
| POST   | `/services`                | Technician |
| GET    | `/services/my-services`    | Technician |
| PATCH  | `/services/:id`            | Technician |
| DELETE | `/services/:id`            | Technician |

### Reviews

| Method | Endpoint              | Access   |
| :----- | :-------------------- | :------- |
| POST   | `/reviews`            | Customer |
| GET    | `/reviews/my-reviews` | Customer |

### Admin

| Method | Endpoint                        | Access |
| :----- | :------------------------------ | :----- |
| GET    | `/admin/stats`                  | Admin  |
| GET    | `/admin/users`                  | Admin  |
| GET    | `/admin/users/:id`              | Admin  |
| PATCH  | `/admin/users/:id`              | Admin  |
| PATCH  | `/admin/technicians/:id/verify` | Admin  |
| GET    | `/admin/bookings`               | Admin  |
| GET    | `/admin/payments`               | Admin  |
| GET    | `/admin/categories`             | Admin  |
| POST   | `/admin/categories`             | Admin  |
| PATCH  | `/admin/categories/:id`         | Admin  |
| DELETE | `/admin/categories/:id`         | Admin  |

---

## 🗂️ Sample Project Folder Structure

```text
FixOra-Client/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── customer/
│   │   ├── technician/
│   │   ├── admin/
│   │   ├── services/
│   │   ├── technicians/
│   │   ├── categories/
│   │   └── payment/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   └── shared/
│   │
│   ├── lib/
│   │   ├── api/
│   │   ├── auth/
│   │   └── utils.ts
│   │
│   ├── providers/
│   ├── types/
│   └── middleware.ts
│
├── public/
├── API_INTEGRATION.md
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

> This is a **sample folder structure** showing the main application organization.

---

## 🧭 Application Routes

| Area                  | Main Routes                                                                               |
| :-------------------- | :---------------------------------------------------------------------------------------- |
| 🌐 **Public**         | `/`, `/services`, `/categories`, `/technicians`                                           |
| 🔐 **Authentication** | `/login`, `/register`                                                                     |
| 👤 **Customer**       | `/customer`, `/customer/bookings`, `/customer/payments`                                   |
| 🛠️ **Technician**    | `/technician`, `/technician/services`, `/technician/availability`, `/technician/bookings` |
| 🛡️ **Admin**         | `/admin`, `/admin/users`, `/admin/categories`, `/admin/bookings`, `/admin/payments`       |
| 💳 **Payment**        | `/payment/success`, `/payment/cancel`                                                     |
| 👤 **Profile**        | `/profile`                                                                                |

---

## 👤 Customer Journey

| Step   | Action                  |
| :----- | :---------------------- |
| 1️⃣    | Register / Login        |
| 2️⃣    | Browse services         |
| 3️⃣    | Search and filter       |
| 4️⃣    | Explore technician      |
| 5️⃣    | Select service and time |
| 6️⃣    | Submit booking          |
| 7️⃣    | Wait for technician     |
| 8️⃣    | Technician accepts      |
| 9️⃣    | Complete Stripe payment |
| 🔟     | Track booking           |
| 1️⃣1️⃣ | Service completed       |
| 1️⃣2️⃣ | Submit review           |

---

## 🛠️ Technician Journey

`Register → Login → Profile → Services → Availability → Receive Booking → Accept / Decline → Customer Payment → Start Job → Complete Job`

---

## 🛡️ Admin Journey

`Login → Dashboard → Statistics → Users → Technician Verification → Categories → Bookings → Payments`

---

## ✨ Added Features

| Feature                    | Description                                           |
| :------------------------- | :---------------------------------------------------- |
| 🌙 **Modern UI**           | Clean and professional marketplace interface          |
| 📱 **Fully Responsive**    | Optimized for mobile, tablet, and desktop             |
| 🎨 **DaisyUI Components**  | Reusable Tailwind-based components                    |
| 🧩 **shadcn/ui**           | Accessible reusable UI primitives                     |
| ✨ **Motion Effects**       | Smooth page transitions and interactions              |
| 🔎 **Advanced Filtering**  | Search, category, location, price, and rating filters |
| 📅 **Smart Scheduling**    | Technician availability and time-slot selection       |
| 💳 **Real Stripe Payment** | Production-style online payment flow                  |
| 🔐 **JWT + RBAC**          | Secure role-based application access                  |
| 📊 **Role Dashboards**     | Customer, Technician, and Admin dashboards            |
| 🍞 **Toast Notifications** | Real-time user feedback                               |
| 📝 **Form Validation**     | React Hook Form + Zod validation                      |
| ⚠️ **Error Boundaries**    | Graceful route-level error handling                   |
| 💀 **Skeleton Loading**    | Better loading experiences                            |
| 📭 **Empty States**        | Helpful feedback when data is unavailable             |
| 📖 **API Documentation**   | Frontend-to-backend endpoint mapping                  |

---

## 🚀 Why This Project

This project demonstrates modern frontend development practices and provides a scalable foundation for a real-world service marketplace.

| Benefit                       | Description                                        |
| :---------------------------- | :------------------------------------------------- |
| 🧱 **Component Architecture** | Reusable and maintainable UI components            |
| 🔒 **Secure Authentication**  | JWT authentication and protected routes            |
| 👥 **Role-Based Access**      | Separate customer, technician, and admin workflows |
| ⚡ **Type Safety**             | Reduces frontend bugs with TypeScript              |
| 🔌 **API Integration**        | Centralized communication with REST APIs           |
| 💳 **Real Payments**          | Stripe Checkout integration                        |
| 📅 **Booking System**         | Complete service booking lifecycle                 |
| 🎨 **Modern UI/UX**           | Responsive design with animations                  |
| 📦 **Modular Structure**      | Organized feature-based architecture               |
| 🚀 **Scalable Design**        | Suitable for real-world marketplace applications   |

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://fixora-api-chi.vercel.app/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

| Variable                             | Required | Purpose                   |
| :----------------------------------- | :------- | :------------------------ |
| `NEXT_PUBLIC_API_URL`                | ✅        | Backend API URL           |
| `NEXT_PUBLIC_APP_URL`                | ✅        | Frontend application URL  |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | ⚪        | Stripe client integration |

> Never expose `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `DATABASE_URL`, or `JWT_SECRET` in the frontend.

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version            |
| :---------- | :----------------- |
| Node.js     | 18+                |
| npm         | Latest recommended |
| Git         | Latest recommended |

### Installation

```bash
git clone https://github.com/MeNafi/FixOra-Client.git

cd FixOra-Client

npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Demo Credentials

| Role               | Email                     | Password     |
| :----------------- | :------------------------ | :----------- |
| 🛡️ **Admin**      | `admin@fixitnow.com`      | `Admin@1234` |
| 🛠️ **Technician** | `karim.tech@fixitnow.com` | `Tech@1234`  |
| 👤 **Customer**    | Register a new account    | —            |

> Demo credentials depend on the backend seed configuration.

---

## 📜 Available Scripts

| Command         | Purpose                      |
| :-------------- | :--------------------------- |
| `npm run dev`   | Start development server     |
| `npm run build` | Build production application |
| `npm run start` | Start production server      |
| `npm run lint`  | Run ESLint                   |

---

## 📖 Documentation

| Document                  | Description                                    |
| :------------------------ | :--------------------------------------------- |
| 📄 **API_INTEGRATION.md** | Frontend component-to-backend endpoint mapping |
| 🔌 **FixOra API**         | Backend REST API                               |
| 📦 **Postman Collection** | API testing and endpoint documentation         |

**Backend Repository:**
`https://github.com/MeNafi/FixOra-API`

---

## 🔗 Related Project

| Backend Feature           | Included |
| :------------------------ | :------- |
| 🔌 REST API               | ✅        |
| 🔐 JWT Authentication     | ✅        |
| 👥 RBAC                   | ✅        |
| 🗄️ PostgreSQL            | ✅        |
| 🧩 Prisma ORM             | ✅        |
| 💳 Stripe                 | ✅        |
| 📋 Booking Management     | ✅        |
| 🛠️ Technician Management | ✅        |
| ⭐ Review Management       | ✅        |
| 🛡️ Admin Management      | ✅        |
| 📖 API Documentation      | ✅        |

---

## 🚀 Production Considerations

| Area                        | Implementation                       |
| :-------------------------- | :----------------------------------- |
| 🧱 **Reusable Components**  | Modular UI and API components        |
| 🔷 **Type Safety**          | TypeScript across the application    |
| 🔌 **Centralized API**      | Organized API service layer          |
| 🔐 **Protected Routes**     | JWT-based route protection           |
| 👥 **RBAC**                 | Role-based access control            |
| ⚠️ **Error Handling**       | Structured API and UI error handling |
| 📱 **Responsive Design**    | Mobile-first responsive interface    |
| 🔒 **Secure Configuration** | Environment-based configuration      |
| 💳 **Secure Payments**      | Stripe Checkout                      |
| 📝 **Validation**           | Client-side form validation          |

---

## 📄 License

This project is a private project developed for the FixOra home service marketplace.

**© FixOra — All Rights Reserved**

---

<div align="center">

<a href="https://fixora-client.vercel.app">
    <img src="https://i.ibb.co.com/CxnFkxc/fixora-logo-no-bg-removebg-preview.png" alt="FixOra Logo" width="270" />
  </a>

**Connecting Customers with Trusted Home Service Professionals**

Built with ❤️ using **Next.js & TypeScript**

</div>
