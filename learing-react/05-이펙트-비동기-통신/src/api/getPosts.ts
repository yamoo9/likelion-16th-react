const { VITE_API_URL } = import.meta.env

export interface Post {
  id: number 
  title: string
  content: string
  imgUrl: string
  createdAt: string
  userId: number
}

interface ResponsePostsData {
  hasNextPage: boolean
  limit: number
  message: string
  page: number
  posts: Post[]
}


export const getPosts = async ({ page = 1, limit = 5 } = {}): Promise<ResponsePostsData> => {
  
  console.log(`${VITE_API_URL}/api/posts?page=${page}&limit=${limit}`)

  try {
    const response = await fetch(`${VITE_API_URL}/api/posts?page=${page}&limit=${limit}`)
    
    if (!response.ok) {
      // 응답이 성공하지 않은 경우, 에러를 생성해 전달합니다.
      throw new Error('포스트 리스트 데이터 가져오기에 실패했습니다.')
    }

    return response.json()
  } catch(error) {
    // 에러가 던져지면, 이를 다시 던져서 이 함수를 호출한 쪽에서 캐치(catch)할 수 있게 합니다.
    throw error instanceof Error ? error : new Error(String(error))
  }
}