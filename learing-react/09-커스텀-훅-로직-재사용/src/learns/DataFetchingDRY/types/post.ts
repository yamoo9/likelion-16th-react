// API 참고
// - https://koreandummyjson.vercel.app/docs/posts

export interface Post {
  id: number
  title: string
  content: string
  imgUrl: string
  createdAt: string
  userId: number
}

export interface Comment {
  postId: number
  commentId: number
  content: string
  createdAt: string
}

export interface ResponsePostData {
  message: string
  post: Post
}

export interface ResponseCommentsData {
  message: string
  comments: Comment[]
}

export interface ResponseUserPostsData {
  message: string
  posts: Post[]
}