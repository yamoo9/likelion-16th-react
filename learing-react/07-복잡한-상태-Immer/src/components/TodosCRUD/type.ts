export interface Metadata {
  createdAt: string
  updatedAt: string | null
}

export interface Todo {
  id: string
  text: string
  done: boolean
  metadata: Metadata
}
