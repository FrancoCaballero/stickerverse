
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  secure: true,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})

export default async function handler (req, res) {
  console.log(req)
  const { url } = req.query
  const response = await cloudinary.uploader.upload(url)

  return res.status(200).json({
    status: 'Ok',
    data: response
  })
}
