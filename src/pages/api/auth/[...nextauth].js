import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'

const providers = []

// Add Google Provider only if real credentials exist
if (process.env.GOOGLE_CLIENT_ID && 
    process.env.GOOGLE_CLIENT_SECRET && 
    !process.env.GOOGLE_CLIENT_ID.includes('your-google')) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

// Enable a development credentials provider when requested via env var
// This allows logging in locally without OAuth (development only).
if (process.env.ENABLE_DEV_CREDENTIALS === 'true' || process.env.NODE_ENV !== 'production') {
  providers.push(
    CredentialsProvider({
      name: 'Credentials (dev)',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'admin@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // Very small dev-only auth: accept any email/password and mark admin if listed
        if (!credentials?.email) return null
        const email = credentials.email
        const adminEmails = (process.env.ADMIN_EMAILS || '')
          .split(',')
          .map(e => e.trim())
          .filter(e => e.length > 0)

        const user = {
          id: email,
          name: email.split('@')[0],
          email,
          role: adminEmails.includes(email) ? 'ADMIN' : 'CUSTOMER'
        }
        return user
      }
    })
  )
}

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, user }) {
      // Add role and id to the session object
      if (session?.user) {
        session.user.id = user.id;
        session.user.role = user.role; // The 'role' is already on the user model in the database
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
})
