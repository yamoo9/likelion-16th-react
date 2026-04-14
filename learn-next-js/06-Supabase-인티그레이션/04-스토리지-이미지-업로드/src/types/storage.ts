export interface StorageFile<T = unknown> {
  name: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: Record<string, T>
}

export interface UploadResponse {
  path: string
  fullPath: string
}

export interface FormState {
  success: boolean
  message?: string
  errors?: string[]
  url?: string
}
