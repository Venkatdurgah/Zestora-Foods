export function requireAdmin(user) {
  // Accept explicit role or fallback to ADMIN_EMAILS match for resilience in dev
  if (user && user.role === 'ADMIN') return

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean)

  if (user && user.email && adminEmails.includes(user.email)) return

  const err = new Error('Unauthorized')
  err.status = 401
  throw err
}
