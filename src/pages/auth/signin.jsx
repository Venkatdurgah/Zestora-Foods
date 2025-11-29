import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SignIn() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    // Redirect if already logged in
    if (status === 'authenticated' && session?.user) {
      router.push('/')
    }
  }, [status, session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-green to-emerald-800">
        <div className="text-white text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-green to-emerald-800">
        <div className="text-white text-center">
          <div className="mb-4 text-4xl">✅</div>
          <p className="text-lg">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-green to-emerald-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-12">
            <Link href="/">
              <h1 className="text-4xl font-serif font-bold text-dark-green mb-2">
                Zestora<span className="text-gold">.</span>
              </h1>
            </Link>
            <p className="text-gray-600 text-lg">Welcome Back</p>
          </div>

          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full py-4 px-4 bg-dark-green text-white rounded-lg font-semibold text-lg hover:bg-emerald-700 transition"
          >
            📧 Sign in with Google
          </button>

          {/* Dev credentials form (only shown when the client env flag is enabled) */}
          {process.env.NEXT_PUBLIC_ENABLE_DEV_CREDENTIALS === 'true' && (
            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">Or sign in with credentials (dev)</p>
              <CredentialsForm />
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm mb-4">
              Sign in with your Google account to continue
            </p>
            <Link href="/" className="text-dark-green hover:text-emerald-700 font-semibold">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function CredentialsForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    const res = await signIn('credentials', { redirect: true, email, password, callbackUrl: '/' })
    // signIn will redirect on success; if not redirected, stop loading
    setLoading(false)
  }

  return (
    <form onSubmit={submit} className="mt-2 space-y-2">
      <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
      <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
      <button type="submit" className="w-full py-2 bg-gray-800 text-white rounded">{loading ? 'Signing in…' : 'Sign in (dev)'}</button>
    </form>
  )
}
