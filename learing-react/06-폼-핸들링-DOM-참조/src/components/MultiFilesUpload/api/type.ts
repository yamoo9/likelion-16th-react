export interface ImageDetails {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}

export interface ImageData {
  id: string
  title: string
  url_viewer: string
  url: string
  display_url: string
  width: string
  height: string
  size: string
  time: string
  expiration: string
  image: ImageDetails
  thumb: ImageDetails
  medium: ImageDetails
  delete_url: string
}

export interface ResponseData {
  data: ImageData
  success: boolean
  status: number
}
