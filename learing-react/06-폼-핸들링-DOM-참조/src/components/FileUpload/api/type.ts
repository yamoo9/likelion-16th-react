export interface ResponseData {
  success: boolean
  status: number
  data: ImageData
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
  image: ImageInfo
  thumb: ImageInfo
  medium: ImageInfo
  delete_url: string
}

export interface ImageInfo {
  filename: string
  name: string
  mime: string
  extension: string
  url: string
}
