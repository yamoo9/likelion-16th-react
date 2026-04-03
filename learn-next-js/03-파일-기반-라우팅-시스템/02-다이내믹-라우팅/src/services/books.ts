// src/database/books.json 파일 읽기
// 서비스 함수 작성: 도서 데이터 반환

import { isErrorObject } from '@/utils'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

interface Book {
  title: string
  link: string
  image: string
  author: string
  discount: string
  publisher: string
  pubdate: string
  isbn: string
  description: string
}

const filePath = path.join(process.cwd(), 'src/database/books.json')

// 모든 도서 정보를 가져오는 서비스 함수
export async function getAllBooks() {
  try {
    const booksString = await readFile(filePath, 'utf-8') // jsonString
    const allBooks = JSON.parse(booksString) as Book[]
    return allBooks
  } catch (error) {
    handleError(error)
  }
}

// ISBN 정보로 도서 찾아 반환하는 서비스 함수
export async function getBookByISBN(isbn: Book['isbn']) {
  try {
    const allBooks = await getAllBooks()
    const book = allBooks?.find((book) => book.isbn === isbn)
    if (!book) throw new Error('도서를 찾을 수 없습니다.')
    return book
  } catch (error) {
    handleError(error)
  }
}

function handleError(error: unknown) {
  throw isErrorObject(error) ? error : new Error(String(error))
}