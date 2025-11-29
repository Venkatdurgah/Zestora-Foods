import { useEffect, useState } from 'react'
import ProductForm from '@/components/ProductForm'
import axios from 'axios'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session || session.user?.role !== 'ADMIN') {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

export default function AdminProducts(){
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)

  async function load(){
    const res = await axios.get('/api/products')
    setProducts(res.data)
  }
  useEffect(()=>{ load() }, [])

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold mb-2">Create / Edit</h2>
          <ProductForm product={editing} onSaved={()=>{ setEditing(null); load() }} />
        </div>
        <div>
          <h2 className="font-semibold mb-2">All products</h2>
          <div className="space-y-3">
            {products.map(p=> (
              <div key={p.id} className="border p-3 rounded flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={p.images?.[0]} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm">₹{(p.price/100).toFixed(2)}</div>
                    <div className="text-sm">{p.inStock ? 'In stock' : 'Out of stock'}</div>
                  </div>
                </div>
                <div className="space-x-2">
                  <button onClick={()=>setEditing(p)} className="px-3 py-1 border rounded">Edit</button>
                  <button onClick={async()=>{ await axios.delete(`/api/products/${p.id}`); load() }} className="px-3 py-1 border rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
