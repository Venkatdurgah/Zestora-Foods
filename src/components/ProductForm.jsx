import { useState } from 'react'
import axios from 'axios'

export default function ProductForm({ product, onSaved }) {
  const [title, setTitle] = useState(product?.title || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [price, setPrice] = useState(product?.price ? product.price/100 : 0)
  const [images, setImages] = useState(product?.images || [])
  const [description, setDescription] = useState(product?.description || '')
  const [inStock, setInStock] = useState(product?.inStock ?? true)

  async function upload(file) {
    const fd = new FormData()
    fd.append('file', file)
    const res = await axios.post('/api/admin/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
    return res.data.url
  }

  async function handleFile(e) {
    const url = await upload(e.target.files[0])
    setImages(prev => [...prev, url])
  }

  function removeImage(url) {
    setImages(prev => prev.filter(u => u !== url))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = { title, slug, description, price: Math.round(Number(price)*100), images, inStock }
    if (product) await axios.put(`/api/products/${product.id}`, payload)
    else await axios.post('/api/products', payload)
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
      <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="Slug" className="w-full p-2 border rounded" />
      <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price (INR)" type="number" className="w-full p-2 border rounded" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
      <div>
        <label className="block text-sm mb-1">Images</label>
        <input type="file" onChange={handleFile} />
        <div className="flex gap-2 mt-2 flex-wrap">
          {images.map((u,i)=> (
            <div key={i} className="relative">
              <img src={u} className="w-20 h-20 object-cover rounded" />
              <button type="button" onClick={()=>removeImage(u)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 text-xs border">×</button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" checked={inStock} onChange={e=>setInStock(e.target.checked)} />
          <span>In stock</span>
        </label>
      </div>
      <button className="px-4 py-2 bg-black text-white rounded">Save</button>
    </form>
  )
}
