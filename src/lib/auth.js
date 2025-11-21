export function requireAdmin(user) {
  if (!user || user.role !== 'ADMIN') {
    const err = new Error('Unauthorized')
    err.status = 401
    throw err
  }
}
