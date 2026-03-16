const { VITE_API_URL } = import.meta.env

export const getPosts = async (page = 1, limit = 5) => {
  try {
    const response = await fetch(`${VITE_API_URL}/api/posts?page=${page}&limit=${limit}`)
    
    if (!response.ok) {
      throw new Error('포스트 리스트 데이터 가져오기에 실패했습니다.')
    }

    return response.json()
  } catch(error) {
    return error
  }
}