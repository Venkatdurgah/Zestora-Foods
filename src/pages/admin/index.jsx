import Link from 'next/link'
import { getSession } from 'next-auth/react'

export default function AdminHome(){
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Admin</h1>
      <ul className="mt-4 space-y-2">
        <li><Link href="/admin/products">Manage Products</Link></li>
        <li><Link href="/admin/orders">Manage Orders</Link></li>
      </ul>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session || session.user?.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }
  return { props: {} }
}
