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

