import { useEffect, useState } from 'react'
import axios from 'axios'
import { getSession } from 'next-auth/react'

export default function OrdersPage(){
  const [orders, setOrders] = useState([])
  async function load(){
    const res = await axios.get('/api/orders')
    setOrders(res.data)
  }
  useEffect(()=>{ load() }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <div className="space-y-4">
        {orders.map(o=> (
          <div key={o.id} className="border p-4 rounded">
            <div className="font-semibold">Order {o.id}</div>
            <div>Status: {o.status} {o.verified ? '(Verified)' : ''}</div>
            <div>Amount: ₹{(o.amount/100).toFixed(2)}</div>
            {o.trackingNo && <div>Tracking: {o.trackingNo}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) return {
    redirect: { destination: '/api/auth/signin', permanent: false }
  }
  return { props: {} }
}
