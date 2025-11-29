import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminOrders(){
  const [orders, setOrders] = useState([])
  async function load(){
    const res = await axios.get('/api/admin/orders')
    setOrders(res.data)
  }
  useEffect(()=>{ load() }, [])

  async function updateOrder(id, payload) {
    await axios.put(`/api/admin/orders/${id}`, payload)
    load()
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="space-y-3">
        {orders.map(o=> (
          <div key={o.id} className="border p-3 rounded">
            <div className="font-semibold">Order {o.id}</div>
            <div className="text-sm">User: {o.userId}</div>
            <div>Status: {o.status} {o.verified ? '(Verified)' : ''}</div>
            <div>Amount: ₹{(o.amount/100).toFixed(2)}</div>
            <div className="mt-2">
              <label className="block text-sm">Status</label>
              <select defaultValue={o.status} onChange={e=>updateOrder(o.id, { status: e.target.value })} className="p-1 border rounded">
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="block text-sm">Tracking Number</label>
              <input defaultValue={o.trackingNo || ''} onBlur={e=>updateOrder(o.id, { trackingNo: e.target.value })} className="p-1 border rounded w-full" />
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center gap-2"><input type="checkbox" checked={o.verified} onChange={e=>updateOrder(o.id, { verified: e.target.checked })} /> Verified</label>
            </div>
          </div>
        ))}
      </div>
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
