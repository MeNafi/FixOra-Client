# FixOra Frontend — API Integration

## API base URL

```
NEXT_PUBLIC_API_URL=https://fixora-api-chi.vercel.app/api
```

All requests go through `src/lib/api/client.ts` (Axios instance with JWT interceptor and refresh handling).

---

## Authentication flow

1. **Register** → `POST /auth/register`  
   Body: `{ name, email, password, phone?, role: "CUSTOMER" | "TECHNICIAN" }`  
   Response stores `accessToken` (+ optional `refreshToken`) in `localStorage` and Zustand.

2. **Login** → `POST /auth/login`  
   Body: `{ email, password }`  
   Same token storage; redirect by role:
   - `ADMIN` → `/admin`
   - `TECHNICIAN` → `/technician`
   - `CUSTOMER` → `/customer`

3. **Current user** → `GET /auth/me` (on app load via `AuthProvider`)

4. **Profile update** → `PUT /users/me`

5. **Logout** → clears storage; optional `POST /auth/logout`

6. **401 handling** → attempts `POST /auth/refresh-token`; on failure redirects to `/login?session=expired`

---

## Page → endpoint mapping

| Page / action | Method | Endpoint |
|---------------|--------|----------|
| Register | POST | `/auth/register` |
| Login | POST | `/auth/login` |
| Logout | POST | `/auth/logout` |
| Current user | GET | `/auth/me` |
| Update profile | PUT | `/users/me` |
| List categories | GET | `/categories` |
| List services | GET | `/services` |
| Service detail | GET | `/services/:id` |
| List technicians | GET | `/technicians` |
| Technician detail | GET | `/technicians/:id` |
| Create booking | POST | `/bookings` |
| My bookings | GET | `/bookings` |
| Booking detail | GET | `/bookings/:id` |
| Cancel booking | PATCH | `/bookings/:id/cancel` |
| Create payment | POST | `/payments/create` |
| Confirm payment | POST | `/payments/confirm` |
| Payment history | GET | `/payments` |
| Payment detail | GET | `/payments/:id` |
| Submit review | POST | `/reviews` |
| Tech profile update | PUT | `/technician/profile` |
| Tech availability get | GET | `/technician/availability` |
| Tech availability put | PUT | `/technician/availability` |
| Tech bookings | GET | `/technician/bookings` |
| Tech booking action | PATCH | `/technician/bookings/:id` |
| Tech create service | POST | `/services` |
| Tech my services | GET | `/services/my-services` |
| Tech update service | PATCH | `/services/:id` |
| Tech delete service | DELETE | `/services/:id` |
| Admin stats | GET | `/admin/stats` |
| Admin users | GET | `/admin/users` |
| Admin update user | PATCH | `/admin/users/:id` |
| Admin verify tech | PATCH | `/admin/technicians/:id/verify` |
| Admin bookings | GET | `/admin/bookings` |
| Admin payments | GET | `/admin/payments` |
| Admin categories | GET/POST | `/admin/categories` |
| Admin update category | PATCH | `/admin/categories/:id` |
| Admin delete category | DELETE | `/admin/categories/:id` |

---

## Booking flow

```
Customer selects service → POST /bookings (status: REQUESTED)
       ↓
Technician accepts → PATCH /technician/bookings/:id { action: "accept" } (ACCEPTED)
       ↓
Customer pays → POST /payments/create → Stripe Checkout redirect
       ↓
Stripe success → POST /payments/confirm { sessionId } (booking → PAID)
       ↓
Technician starts → { action: "start" } (IN_PROGRESS)
       ↓
Technician completes → { action: "complete" } (COMPLETED)
       ↓
Customer reviews → POST /reviews
```

Customer may cancel (PATCH `/bookings/:id/cancel`) any time before `IN_PROGRESS`.

---

## Technician flow

1. Register as `TECHNICIAN` or log in.
2. Update profile (`PUT /technician/profile`) and availability (`PUT /technician/availability`).
3. Create services (`POST /services`).
4. Manage assigned bookings via dashboard (`GET /technician/bookings`, `PATCH .../:id` with action).

---

## Admin flow

1. Log in with seeded admin credentials.
2. View stats (`GET /admin/stats`).
3. Manage users (`GET /admin/users`, `PATCH /admin/users/:id` for ban/unban).
4. Manage categories (`POST/PATCH/DELETE /admin/categories`).
5. View all bookings (`GET /admin/bookings`).

---

## Stripe payment flow (real Checkout — no fake/COD)

```
ACCEPTED booking
      │
      ▼
Customer clicks "Pay with Stripe" (green button)
      │
      ▼
POST /api/payments/create  { bookingId }
      │
      ▼
Backend creates Stripe Checkout Session
returns { paymentUrl, sessionId, amount, ... }
      │
      ▼
Frontend redirects → paymentUrl (Stripe-hosted page)
      │
      ├── Customer pays on Stripe
      │         │
      │         ▼
      │   Stripe webhook → POST /api/payments/webhook (server)
      │   marks payment COMPLETED + booking PAID
      │
      └── Redirect to frontend
                │
                ├── /payment/success?session_id=cs_xxx&bookingId=...
                │         │
                │         ▼
                │   POST /api/payments/confirm { sessionId }
                │   (fallback if webhook not running)
                │
                └── /payment/cancel?bookingId=...
                      (booking stays ACCEPTED; can retry pay)
```

### Frontend implementation

| Step | File | Action |
|------|------|--------|
| Start pay | `customer/bookings/[id]` | `paymentsApi.create(bookingId)` → redirect to `paymentUrl` |
| Success | `payment/success` | Read `session_id` → `paymentsApi.confirm({ sessionId })` |
| Cancel | `payment/cancel` | Link back to booking to retry |

### Important backend config

Backend builds redirect URLs from **its** `APP_URL` env (not the frontend body):

```
success_url = ${APP_URL}/payment/success?bookingId=...&session_id={CHECKOUT_SESSION_ID}
cancel_url  = ${APP_URL}/payment/cancel?bookingId=...
```

Set backend `APP_URL=http://localhost:3000` (or your deployed frontend URL).

### Secrets

- **Never** put `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` in the frontend.
- Frontend only needs the public API URL. Stripe publishable key is optional for this redirect-based flow.

---

## Error-handling approach

- **Axios interceptor** centralizes 401 refresh / redirect.
- **`getErrorMessage(error)`** extracts `message` or `errorDetails[]` from the standard API error shape and shows a **Sonner toast**.
- **`getFieldErrors(error)`** maps path → message for inline form errors.
- Forms use **React Hook Form + Zod** for client-side validation before submit.
- Loading: skeletons / spinners; Empty: shared `EmptyState`; Success/Error: toasts.
- Duplicate submissions prevented via local `submitting` / `actionLoading` flags.
- Raw stack traces and technical codes are never shown to users.
