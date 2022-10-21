import { v2 as cloudinary } from 'cloudinary'

export const executeConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || "ddtvzm8fj",
    api_key: process.env.CLOUD_API_KEY || "813888581888648",
    api_secret: process.env.CLOUD_SECRET_KEY || "gqbAE0HG_0sI1pY4NumUEScBeiY",
  })
}
