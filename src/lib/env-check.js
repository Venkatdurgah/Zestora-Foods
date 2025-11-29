// lib/env-check.js
// This utility logs missing environment variables to help with debugging

export function checkEnv() {
  const required = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'DATABASE_URL',
    'STRIPE_SECRET_KEY',
    'CLOUDINARY_CLOUD_NAME',
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    console.warn(
      '⚠️  Missing environment variables:',
      missing.join(', ')
    )
    console.warn(
      'Please set these in your .env.local file or Vercel environment variables'
    )
  }

  return missing.length === 0
}
