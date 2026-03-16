// 데이터 가져오기 로직을 분리한 함수 작성 (재사용 가능)
// 유저 ID값을 전달받아 서버에 데이터 요청/응답 비동기 처리
// 응답 결과(성공/실패) 상태에 따라 결과값 반환 필요
// 유저 및 응답 타입 지정 필요

export interface User {
  id: number
  username: string
  email: string
  phone: string
  address: string
  createdAt: string
}

interface ResponseUserData {
  message: string
  user: User
}

const API_URL = import.meta.env.VITE_API_URL

export const getUser = async (userId: string): Promise<ResponseUserData> => {
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`)
    
    if (!response.ok) {
      throw new Error(`사용자 "${userId}" 요청에 실패했습니다.`)
    }

    return response.json()
  } catch(error) {
    throw error instanceof Error ? error : new Error(String(error))
    
    // if (error instanceof Error) {
    //   throw error
    // } else {
    //   throw new Error(String(error))
    // }
  }
}