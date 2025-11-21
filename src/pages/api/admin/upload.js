import nextConnect from 'next-connect'
import formidable from 'formidable'
import cloudinary from '@/lib/cloudinary'

export const config = { api: { bodyParser: false } }

const handler = nextConnect()
handler.post(async (req, res) => {
  const form = new formidable.IncomingForm()
  await form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload error' })
    const file = files.file
    const result = await cloudinary.uploader.upload(file.filepath, { folder: 'zestora' })
    return res.json({ url: result.secure_url })
  })
})

export default handler
