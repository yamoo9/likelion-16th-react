'use server'

import { revalidatePath } from 'next/cache'

import { createSupabase } from '@/lib/supabase/helpers'
import { getErrorMessage } from '@/utils'
import { v4 as uuidv4 } from 'uuid'

// 공통 응답 타입 정의
export interface StorageActionResponse {
  success: boolean
  message: string
  url?: string    // 싱글 업로드 결과
  urls?: string[] // 멀티 업로드 결과
}

/* 헬퍼 함수 (Helpers) ---------------------------------------------------------- */

/**
 * 파일명을 안전하게 정규화합니다. (한글/특수문자 이슈 방지)
 * 예: "내 사진.png" -> "1712345678-uuid.png"
 */
const getSafeFileName = (originalName: string) => {
  const extension = originalName.split('.').pop()
  return `${Date.now()}-${uuidv4()}.${extension}`
}

// 갱신할 페이지 경로
const REVALIDATE_PATH = '/upload-profile-image'


/* 서버 액션 (Actions) ---------------------------------------------------------- */

/**
 * [CREATE] 싱글 파일 업로드 (프로필 사진 - Public)
 */
export async function uploadProfileActions(
  prevState: StorageActionResponse,
  formData: FormData,
): Promise<StorageActionResponse> {
  try {

    const supabase = await createSupabase()
    
    // 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { success: false, message: '로그인 사용자만 이용할 수 있습니다.' }
    }

    // 파일 존재 여부 확인
    const file = formData.get('image') as File
    
    if (!file || file.size === 0) {
      return { success: false, message: '업로드할 파일을 선택해주세요.' }
    }

    // 파일 경로 설정 (유저ID 폴더 구조 + 정규화된 파일명)
    const safeName = getSafeFileName(file.name)
    const filePath = `${user.id}/${safeName}`

    // 스토리지 업로드 실행
    const { data, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { 
        upsert: true,
        contentType: file.type // 브라우저가 타입을 오판하지 않도록 명시
      })

    if (uploadError) throw uploadError

    // 공개 URL 생성
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(data.path)

    revalidatePath(REVALIDATE_PATH)

    return {
      success: true,
      message: '프로필 사진이 성공적으로 업데이트되었습니다.',
      url: urlData.publicUrl,
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error)

    console.error('프로필 업로드 에러:', errorMessage)
    return {
      success: false,
      message: `업로드 실패: ${errorMessage}`,
    }
  }
}

/**
 * [CREATE] 멀티 파일 업로드 (공용 갤러리 - Public)
 */
export async function uploadGalleryActions(
  prevState: StorageActionResponse,
  formData: FormData,
): Promise<StorageActionResponse> {
  try {
    const supabase = await createSupabase()
    const files = formData.getAll('images') as File[]

    // 빈 파일 필터링
    const validFiles = files.filter(file => file.size > 0)
    if (validFiles.length === 0) {
      return { success: false, message: '업로드할 파일을 하나 이상 선택해주세요.' }
    }

    // 병렬 업로드 처리
    const uploadPromises = validFiles.map(async (file) => {
      const safeName = getSafeFileName(file.name)
      const path = `uploads/${safeName}`

      const { data, error } = await supabase.storage
        .from('assets')
        .upload(path, file)

      if (error) throw error

      const { data: urlData } = supabase.storage
        .from('assets')
        .getPublicUrl(data.path)

      return urlData.publicUrl
    })

    const urls = await Promise.all(uploadPromises)

    revalidatePath(REVALIDATE_PATH)

    return {
      success: true,
      message: `${urls.length}개의 파일이 갤러리에 추가되었습니다.`,
      urls,
    }
  } catch (error) {
    console.error('Gallery Upload Error:', getErrorMessage(error))
    return {
      success: false,
      message: `멀티 업로드 실패: ${getErrorMessage(error)}`,
    }
  }
}

/**
 * [CREATE] 보호된 파일 업로드 (비공개 문서 - Private)
 */
export async function uploadSecureDocActions(
  prevState: StorageActionResponse,
  formData: FormData,
): Promise<StorageActionResponse> {
  try {
    const supabase = await createSupabase()
    const file = formData.get('document') as File

    if (!file || file.size === 0) {
      return { success: false, message: '업로드할 문서 파일이 없습니다.' }
    }

    // 보안 문서는 추측 불가능한 경로 권장
    const safeName = getSafeFileName(file.name)
    const path = `secure/${safeName}`

    const { data, error: uploadError } = await supabase.storage
      .from('private-docs')
      .upload(path, file)

    if (uploadError) throw uploadError

    // 60초 동안만 유효한 서명된 URL 생성
    const { data: signedData, error: signedError } = await supabase.storage
      .from('private-docs')
      .createSignedUrl(data.path, 60)

    if (signedError) throw signedError

    return {
      success: true,
      message: '보안 문서 업로드 완료 (링크는 60초간 유효합니다)',
      url: signedData.signedUrl,
    }
  } catch (error) {
    console.error('Secure Doc Upload Error:', getErrorMessage(error))
    return {
      success: false,
      message: `보안 업로드 실패: ${getErrorMessage(error)}`,
    }
  }
}
