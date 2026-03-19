import type { ResponseData } from './type'

const { VITE_IMGBB_URL: apiUrl, VITE_IMGBB_API_KEY: apiKey } = import.meta.env

/**
 * API 엔드포인트 URL을 생성합니다.
 */
const getApiEndpoint = () => {
  const url = new URL(apiUrl)
  url.searchParams.append('key', apiKey)
  return url.toString()
}

/**
 * 파일 하나를 imgbb API를 사용해 업로드합니다.
 */
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch(getApiEndpoint(), {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`파일 업로드 실패! (상태 코드: ${response.status})`)
    }

    const responseData: ResponseData = await response.json()
    return responseData
  } catch (error) {
    console.error('업로드 API 에러:', error)
    throw error instanceof Error ? error : new Error(String(error))
  }
}

/**
 * 여러 파일을 imgbb API를 사용해 업로드합니다.
 */
export const uploadFiles = async (fileList: FileList | File[]) => {
  if (!fileList || fileList.length === 0) return []

  const uploadPromises = Array.from(fileList).map((file) => uploadFile(file))

  try {
    return Promise.allSettled(uploadPromises)
  } catch (error) {
    console.error('멀티 업로드 API 에러:', error)
    throw error instanceof Error ? error : new Error(String(error))
  }
}

/**
 * 업로드 결과에서 성공한 응답만 필터링하여 데이터를 추출합니다.
 */
export const extractSuccessData = (
  results: PromiseSettledResult<ResponseData>[],
) => {
  return results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value.data)
}

/**
 * 업로드 결과에서 실패한 응답만 필터링하여 에러 메시지를 추출합니다.
 */
export const extractFailData = (
  results: PromiseSettledResult<ResponseData>[],
) => {
  return results
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason?.message ?? '알 수 없는 에러가 발생.')
}

/**
 * 업로드 결과를 분석하여 성공/실패 요약 정보를 반환합니다.
 */
export const getUploadSummary = (
  results: PromiseSettledResult<ResponseData>[],
) => {
  const success = extractSuccessData(results)
  const failReasons = extractFailData(results)

  return {
    total: results.length,
    successCount: success.length,
    failCount: failReasons.length,
    successData: success,
    errors: failReasons,
  }
}
