import { useRef, useState, type ChangeEvent, type SubmitEvent } from 'react'
import { uploadFiles, getUploadSummary } from './api/imgbb'
import type { ImageData } from './api/type'
import FileUploadResults from './parts/FileUploadResults'
import FileUploadField from './parts/FileUploadField'
import SaveButton from './parts/SaveButton'
import S from './MultiFilesUpload.module.css'
import NameField from './parts/NameField'

// 미리보기 이미지의 타입 정의
export interface Preview {
  id: string // 미리보기 고유 ID
  url: string // 미리보기 URL
  file: File // 실제 파일 객체
}

export default function MultiFilesUpload() {
  // 미리보기 이미지 목록 상태
  const [previews, setPreviews] = useState<Preview[]>([])
  // 업로드 완료된 이미지 정보 상태
  const [uploadedImages, setUploadedImages] = useState<ImageData[]>([])
  // 업로드 진행 중 상태
  const [isUploading, setIsUploading] = useState(false)
  // 파일 입력 필드 참조
  const fileRef = useRef<HTMLInputElement>(null)

  // 파일 선택 시 호출되는 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) return

    // 선택된 파일들을 미리보기 객체로 변환
    const newPreviews = Array.from(files).map((file) => ({
      id: crypto.randomUUID(), // 고유 ID 생성
      url: URL.createObjectURL(file), // 브라우저 메모리에 객체 URL 생성
      file, // 원본 파일
    }))

    // 기존 미리보기에 새 미리보기 추가
    setPreviews((prev) => [...prev, ...newPreviews])
    // 파일 입력 필드 초기화
    if (fileRef.current) fileRef.current.value = ''
  }

  // 미리보기 삭제 핸들러
  const handleDeletePreview = (id: string, url: string) => {
    // 브라우저 메모리에서 객체 URL 해제 (메모리 누수 방지)
    URL.revokeObjectURL(url)
    // ID에 해당하는 미리보기 제거
    setPreviews((prev) => prev.filter((p) => p.id !== id))
  }

  // 폼 제출 및 파일 업로드 핸들러
  const handleUploadSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 업로드할 파일이 없으면 경고
    if (previews.length === 0) return alert('업로드할 파일을 선택하세요.')

    try {
      // 업로드 시작 상태 설정
      setIsUploading(true)

      // 미리보기에서 실제 파일 객체만 추출
      const fileList = previews.map((preview) => preview.file)
      // API를 통해 파일 업로드 실행
      const results = await uploadFiles(fileList)
      // 업로드 결과 요약 정보 가져오기
      const summary = getUploadSummary(results)

      // 성공적으로 업로드된 파일이 있는 경우
      if (summary.successCount > 0) {
        // 업로드된 이미지 정보 상태 업데이트
        setUploadedImages(summary.successData)
        // 모든 미리보기 URL 해제 (메모리 정리)
        previews.forEach((preview) => URL.revokeObjectURL(preview.url))
        // 미리보기 목록 초기화
        setPreviews([])
        console.log(`${summary.successCount}개의 파일 업로드 성공!`)
      }

      // 업로드 실패한 파일이 있는 경우
      if (summary.failCount > 0) {
        console.warn(`${summary.failCount}개의 파일 업로드에 실패했습니다.`)
      }
    } catch (error) {
      // 전체 업로드 프로세스 오류 처리
      console.error(error)
      alert('업로드 중 오류가 발생했습니다.')
    } finally {
      // 업로드 상태 종료 (성공/실패 상관없이)
      setIsUploading(false)
    }
  }

  // 저장 버튼 비활성화 여부
  const isDisabled = previews.length === 0

  return (
    <section className={S.card}>
      <h2 className={S.title}>갤러리 설정</h2>
      <form onSubmit={handleUploadSubmit} className={S.form}>
        <NameField />
        <FileUploadField
          ref={fileRef}
          previews={previews}
          onFileChange={handleFileChange}
          onDeleteFile={handleDeletePreview}
        />
        <SaveButton isUploading={isUploading} isDisabled={isDisabled} />
      </form>

      <FileUploadResults uploadedImages={uploadedImages} />
    </section>
  )
}
