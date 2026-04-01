import { wait } from "@/utils"

export interface User {
  id: number
  username: string
  email: string
  phone: string
  address: string
  createdAt: string
}

export interface ResponseUserData {
  message: string
  users: User[]
}

export async function getUsers() {
  await wait(400) // 지연 로딩 시뮬레이션

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`)
  if (!response.ok) throw new Error('사용자를 가져오지 못했습니다.')
  return (await response.json()) as ResponseUserData
}
