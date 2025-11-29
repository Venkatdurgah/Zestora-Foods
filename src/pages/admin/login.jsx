import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AdminLogin() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // If user is already authenticated and is admin, redirect to admin page
    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [status, session, router])

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', {
      redirect: false,
      callbackUrl: '/admin',
    })
    
    if (result?.error) {
      console.error('Sign in error:', result.error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Zestora Foods
          </h1>
          <h2 className="text-xl font-semibold text-orange-600 mt-2">
            Admin Portal
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            Sign in to manage products and orders
          </p>
        </div>

        {/* Authentication Status */}
        {status === 'loading' && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        )}

        {status === 'authenticated' && session?.user?.role === 'ADMIN' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              ✓ Welcome, {session.user.name}! You have admin access.
            </p>
          </div>
        )}

        {status === 'authenticated' && session?.user?.role !== 'ADMIN' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm font-semibold">
              ⚠ Access Denied
            </p>
            <p className="text-yellow-700 text-xs mt-1">
              Your account ({session.user.email}) doesn't have admin privileges. 
              Contact the site administrator for access.
            </p>
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="mt-3 w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition text-sm"
            >
              Sign In With Different Account
            </button>
          </div>
        )}

        {status === 'unauthenticated' && (
          <>
            <div className="mb-6">
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-50 transition shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>

            <div className="text-center text-gray-600 text-sm">
              <p className="mb-4">
                Only authorized administrators can access the admin panel.
              </p>
              <Link href="/" className="text-orange-600 hover:text-orange-700 font-semibold">
                ← Back to Store
              </Link>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>For admin access, contact your administrator.</p>
        </div>
      </div>
    </div>
  )
}
