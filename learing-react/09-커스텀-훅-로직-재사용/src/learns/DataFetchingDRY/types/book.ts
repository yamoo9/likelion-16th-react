// API 참고
// - https://koreandummyjson.vercel.app/docs/books

export interface ResponseBookData {
  message: string
  book: Book
}

export interface Book {
  id: number
  author: string
  genre: string
  title: string
  publicationDate: string
  totalPage: number
}

export interface ResponseReviewsData {
  message: string
  reviews: Reviews[]
}

export interface Reviews {
  id: number
  rating: number
  content: string
  createdAt: string
  userId: number
  bookId: number
}
