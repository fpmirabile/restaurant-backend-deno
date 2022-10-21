import { v2 } from 'cloudinary'
import { executeConfig as configCloudinary } from '../../config/cloudinary'
import { CloudinaryError } from '../../error/other/CloudinaryError'

export class CloudinaryService {

  private baseFile = "recetas/"

  constructor() {
    this.config()
  }

  private config() {
    configCloudinary()
  }

  public async uploadImage(imagen: string): Promise<string> {

//deprecated

    try {
      const reelUpload = await v2.uploader.upload(imagen, {
        folder: "recetas",
        unique_filename: true,
        use_filename: true,
        access_mode: 'public',
      })
      const imageUrl = reelUpload.url
      return imageUrl
    } catch (e) {
      console.log(e)
      throw new CloudinaryError()
    }
  }
}

const cloudinaryService = new CloudinaryService()
export default cloudinaryService