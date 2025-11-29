# Zestora Foods — Next.js Store

This repository contains a Next.js + Tailwind e-commerce starter tailored for Zestora Foods. It includes:

- NextAuth (Google) sign-in with Prisma adapter
- Admin dashboard for products and orders
- Cloudinary image uploads
- Stripe Checkout integration and webhook handling
- Cart, product pages, and checkout flow

Quick start (development):

1. Copy .env.example to `.env` and set values:
   - DATABASE_URL (Postgres)
   - NEXTAUTH_URL, NEXTAUTH_SECRET
   - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
   - STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
   - CLOUDINARY_* variables
2. Install dependencies:

```bash
npm install
```

3. Run Prisma migrations and seed (after DATABASE_URL set):

```bash
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
```

4. Run the dev server:

```bash
npm run dev
```

Deployment: Vercel is recommended. Add required environment variables to your Vercel project.

If you want, I can finalize the premium UI, add automated tests, and prepare a production-ready deployment configuration.
# Zestora Foods LLP — Premium Next.js Store (Deployable)

This repository is a deployable starter for a premium e-commerce store built with Next.js, Tailwind,
NextAuth (Google sign-in), Prisma/Postgres, Stripe, and Cloudinary.

## Quick start (local)
1. Copy `.env.example` to `.env.local` and fill values.
2. Install dependencies: `pnpm install` (or `npm install`).
3. Run Prisma migrations: `pnpm prisma:migrate`.
4. Seed sample products (if provided): `node prisma/seed.js`.
5. Run dev server: `pnpm dev`.

## Deployment
Recommended: Vercel. Set environment variables in Vercel dashboard (use `.env.example`).
Configure Stripe webhook to: `https://<your-site>/api/stripe/webhook`

