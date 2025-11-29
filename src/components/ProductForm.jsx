import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ProductForm({ product, onSaved }) {
  const [title, setTitle] = useState(product?.title || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [price, setPrice] = useState(product?.price ? product.price/100 : 0)
  const [images, setImages] = useState(product?.images || [])
  const [description, setDescription] = useState(product?.description || '')
  const [inStock, setInStock] = useState(product?.inStock ?? true)
  const [saving, setSaving] = useState(false)

  // Keep local form state in sync when `product` prop changes (editing a different product)
  // without forcing a remount of the component.
  useEffect(() => {
    setTitle(product?.title || '')
    setSlug(product?.slug || '')
    setPrice(product?.price ? product.price/100 : 0)
    setImages(product?.images || [])
    setDescription(product?.description || '')
    setInStock(product?.inStock ?? true)
  }, [product])

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
    setSaving(true)
    try {
      if (product) await axios.put(`/api/products/${product.id}`, payload)
      else await axios.post('/api/products', payload)
      onSaved?.()
    } catch (err) {
      console.error('Save product error', err)
      const resp = err?.response?.data
      if (resp && typeof resp === 'object') {
        // If dev debug info returned from API, show it to help debugging
        alert(`Failed to save product: ${resp.error || err.message}\n\nSession: ${JSON.stringify(resp.session || null)}`)
      } else {
        const message = resp?.error || err?.message || 'Save failed'
        alert(`Failed to save product: ${message}`)
      }
    } finally {
      setSaving(false)
    }
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
      <button className="px-4 py-2 bg-black text-white rounded" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
    </form>
  )
}

