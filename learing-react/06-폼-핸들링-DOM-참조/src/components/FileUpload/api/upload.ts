import type { ResponseData } from './type'

const { VITE_IMGBB_URL, VITE_IMGBB_API_KEY } = import.meta.env

const getEndpoint = () => {
  const url = new URL(VITE_IMGBB_URL)
  url.searchParams.append('key', VITE_IMGBB_API_KEY)
  return url.toString()
}

export const uploadFile = async (
  formData: FormData,
  options: RequestInit = {},
): Promise<ResponseData> => {
  try {
    const response = await fetch(getEndpoint(), {
      ...options,
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('파일 업로드 실패!')
    }

    return response.json()
  } catch (error) {
    console.error('에러 발생:', error)
    throw error instanceof Error ? error : new Error(String(error))
  }
}
