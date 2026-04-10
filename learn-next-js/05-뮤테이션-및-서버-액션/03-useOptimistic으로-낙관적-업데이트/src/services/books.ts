import { isErrorObject } from '@/utils'
import { readFile } from 'fs/promises'
import path from 'path'

/**
 * [Type Definition] 도서 원본 데이터 구조
 */
export interface Book {
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

/**
 * [Type Definition] 목록 화면용 핵심 정보 추출 (Pick 활용)
 * 메모리 사용량을 줄이고 필요한 데이터만 전송하기 위해 사용합니다.
 */
export type BookSummary = Pick<Book, 'isbn' | 'title' | 'author'>

/** [Type Definition] 정렬 관련 타입 */
export type SortOrder = 'asc' | 'desc'
export type BookSortKey = keyof Book

/**
 * [Interface] 공통 페이지네이션 응답 규격
 * 제네릭 <T>를 사용하여 어떤 데이터 배열이라도 페이지네이션 정보와 함께 반환합니다.
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    currentPage: number
    totalCount: number
    totalPages: number
    hasNextPages: boolean
  }
}

// 데이터 파일 경로 설정 (절대 경로)
const FILE_PATH = path.join(process.cwd(), 'src/database/books.json')

/**
 * [Helper] 공통 정렬 로직
 * @param books - 정렬할 데이터 배열
 * @param sortKey - 정렬 기준 필드 (기본값: 'pubdate')
 * @param orderBy - 정렬 순서 (기본값: 'desc')
 */
function sortBooks<T extends Partial<Book>>(
  books: T[],
  sortKey: keyof T = 'pubdate' as keyof T,
  orderBy: SortOrder = 'desc'
): T[] {
  // toSorted: 원본 배열을 수정하지 않고 정렬된 새 배열을 반환 (Node.js 20+ 지원)
  return books.toSorted((a, b) => {
    const valueA = String(a[sortKey] ?? '')
    const valueB = String(b[sortKey] ?? '')

    // localeCompare: 문자열을 사전순으로 비교 (숫자, 특수문자 포함 정확한 비교 가능)
    const comparison = valueA.localeCompare(valueB)
    
    // 오름차순(asc)이면 그대로, 내림차순(desc)이면 결과를 반전(-1)
    return orderBy === 'asc' ? comparison : -comparison
  })
}

/**
 * [Helper] 공통 페이지네이션 처리 로직
 * @param data - 전체 데이터 배열
 * @param page - 요청 페이지 번호
 * @param limit - 한 페이지당 아이템 개수
 */
function paginate<T>(
  data: T[],
  page: number,
  limit: number,
): PaginatedResponse<T> {
  const safePage = Math.max(1, page)
  const safeLimit = Math.max(1, limit)
  const totalCount = data.length
  const startIndex = (safePage - 1) * safeLimit

  // 현재 페이지 구간의 데이터만 추출
  const pagedData = data.slice(startIndex, startIndex + safeLimit)

  return {
    data: pagedData,
    pagination: {
      currentPage: safePage,
      totalCount,
      totalPages: Math.ceil(totalCount / safeLimit),
      hasNextPages: startIndex + safeLimit < totalCount,
    },
  }
}

/**
 * [Service] 모든 도서 데이터 가져오기
 * JSON 파일을 읽어 객체로 변환한 뒤 기본 정렬을 수행합니다.
 */
export async function getAllBooks(
  sortKey: BookSortKey = 'pubdate',
  orderBy: SortOrder = 'desc',
): Promise<Book[]> {
  try {
    const booksString = await readFile(FILE_PATH, 'utf-8')
    const allBooks = JSON.parse(booksString) as Book[]

    return sortBooks(allBooks, sortKey, orderBy)
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * [Service] 요약된 도서 목록 조회 (메인/목록용)
 * 특정 필드만 추출하여 데이터 전송량을 최적화합니다.
 */
export async function getAllBooksSummary({
  page = 1,
  limit = 20,
  sortKey = 'title',
  orderBy = 'asc',
}: {
  page?: number
  limit?: number
  sortKey?: keyof BookSummary
  orderBy?: SortOrder
} = {}): Promise<PaginatedResponse<BookSummary>> {
  try {
    const allBooks = await getAllBooks()

    // 필요한 필드(isbn, title, author)만 추출
    const summaries: BookSummary[] = allBooks.map(
      ({ isbn, title, author }) => ({ isbn, title, author }),
    )

    const sortedData = sortBooks(summaries, sortKey, orderBy)
    return paginate(sortedData, page, limit)
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * [Service] 도서 검색 및 통합 조회
 * 검색어 필터링과 페이지네이션을 동시에 처리합니다.
 */
export async function getBooks({
  page = 1,
  limit = 20,
  searchTerm = '',
  sortKey = 'pubdate',
  orderBy = 'desc',
}: {
  page?: number
  limit?: number
  searchTerm?: string
  sortKey?: BookSortKey
  orderBy?: SortOrder
} = {}): Promise<PaginatedResponse<Book>> {
  try {
    const allBooks = await getAllBooks(sortKey, orderBy)

    // 제목 또는 저자명에 검색어가 포함된 도서 필터링 (대소문자 구분 없음)
    const filtered = searchTerm
      ? allBooks.filter(
          (b) =>
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.author.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : allBooks

    return paginate(filtered, page, limit)
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * [Service] 특정 도서 상세 조회 (ISBN 기준)
 */
export async function getBookByISBN(isbn: string): Promise<Book> {
  try {
    const allBooks = await getAllBooks()
    const book = allBooks.find((b) => b.isbn === isbn)

    if (!book)
      throw new Error(`ISBN(${isbn})에 해당하는 도서를 찾을 수 없습니다.`)

    return book
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * [Service] 특정 도서 상세 조회 (제목 기준)
 */
export async function getBookByTitle(title: Book['title']): Promise<Book> {
  try {
    const allBooks = await getAllBooks()
    const book = allBooks.find(book => book.title === title)
    
    if (!book) 
      throw new Error(`해당 제목(${title})으로 도서를 찾을 수 없습니다.`)
    
    return book
  } catch (error) {
    throw handleError(error)
  }
}

/**
 * [Utility] 에러 객체 표준화 핸들러
 * 다양한 형태의 에러를 일관된 Error 객체로 변환합니다.
 */
function handleError(error: unknown): Error {
  const message = isErrorObject(error) ? error.message : String(error)
  return new Error(message)
}