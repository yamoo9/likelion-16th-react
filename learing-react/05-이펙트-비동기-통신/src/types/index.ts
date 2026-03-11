export interface Post {
  id: number
  title: string
  content: string
  imgUrl: string
  userId: number
  createdAt: string | Date
}

export interface ResponsePostsData { 
  hasNextPage: boolean 
  limit: number
  message: string
  page: number
  posts: Post[]
}

export interface User {
  id: number
  email: string 
  username: string
  address: string 
  createdAt: string | Date 
  phone: string
}

export interface ResponseUserData { 
  message: string
  user: User
}