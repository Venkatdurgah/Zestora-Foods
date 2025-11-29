import { useEffect, useState } from 'react'
import axios from 'axios'
import { getSession } from 'next-auth/react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  useEffect(()=>{ load() }, [])
  async function load(){
    const res = await axios.get('/api/account')
    setUser(res.data)
    setName(res.data.name || '')
    setImage(res.data.image || '')
  }

  async function save(){
    await axios.put('/api/account', { name, image })
    alert('Saved')
  }

  if (!user) return <div className="max-w-4xl mx-auto p-6">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm">Image URL</label>
          <input value={image} onChange={e=>setImage(e.target.value)} className="w-full p-2 border rounded" />
        </div>
        <div>
          <button onClick={save} className="px-4 py-2 bg-black text-white rounded">Save</button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) return { redirect: { destination: '/api/auth/signin', permanent: false } }
  return { props: {} }
}
