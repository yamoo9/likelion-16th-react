import { useRef, useState } from 'react'
import { uploadFile } from './api/upload'
import type { ImageData } from './api/type'
import NickNameField from './parts/NickNameField'
import FileUploadField from './parts/FileUploadField'
import SaveButton from './parts/SaveButton'
import FileUploadResult from './parts/FileUploadResult'
import S from './FileUpload.module.css'

// --------------------------------------------------------------------------------------
// 실습 가이드
// --------------------------------------------------------------------------------------
// 1. `파일 참조(Ref)` 생성
//    - `useRef` 훅을 사용하여 파일 인풋 요소에 접근할 참조 객체를 생성합니다. ✅
//
// 2. 상태(State) 생성
//    - `previewUrl`: 선택한 이미지의 미리보기 주소 (string) ✅
//    - `isUploading`: 업로드 진행 상태 (boolean) ✅
//    - `uploadedData`: 업로드 완료 후 서버로부터 받은 데이터 (객체 또는 null) ✅
//    - `isCopied`: 클립보드 복사 완료 여부 (boolean) ✅
//
// 3. 파일 변경 핸들링 로직 작성 ✅
//    - 파일 인풋에서 첫 번째 파일 정보를 읽어옵니다. ✅
//    - 기존에 생성된 `previewUrl`이 있다면 `URL.revokeObjectURL()`로 메모리 해제를 수행합니다. ✅
//    - 새로운 파일이 있다면 `URL.createObjectURL(file)`로 미리보기 주소를 생성하고 상태를 업데이트합니다. ✅
//    - 새로운 파일 선택 시 기존 업로드 결과(`uploadedData`) 및 복사(`isCopied`) 상태를 초기화합니다. ✅
//
// 4. 미리보기 및 파일 참조 초기화 핸들러 로직 작성 ✅
//    - 파일 참조 객체의 값을 빈 문자열로 설정하여 인풋의 선택 상태를 물리적으로 제거합니다. ✅
//    - `previewUrl` 상태를 빈 값으로 변경하여 화면에서 미리보기를 지웁니다. ✅
//    - 관련 상태들(`uploadedData`, `isCopied`)을 초기화합니다. ✅
//
// 5. 파일 업로드 핸들러 로직 작성 ✅
//    - 폼의 기본 제출 작동을 방지합니다. ✅
//    - 중복 업로드 방지를 위해 `isUploading` 상태를 체크합니다. ✅
//    - `fileRef`를 통해 실제 파일 존재 여부와 크기를 검증합니다. ✅
//    - `FormData` 객체를 생성하고 파일을 첨부하여 지정된 API URL로 `POST` 요청을 보냅니다. ✅
//    - 업로드 성공 시 서버 응답 데이터를 `uploadedData`에 저장하고, 인풋과 미리보기를 초기화합니다. ✅
//
// 6. 클립보드 복사 핸들러 로직 작성 ✅
//    - `navigator.clipboard.writeText()`를 사용하여 전달받은 텍스트를 복사합니다. ✅
//    - 복사 성공 시 `isCopied` 상태를 변경하고, 일정 시간(예: 2초) 후 다시 원래대로 되돌립니다. ✅
// --------------------------------------------------------------------------------------

export default function FileUpload() {
  // [상태]
  const [previewUrl, setPreviewUrl] = useState('')

  // 업로드 상태 선언 (화면 변경 표시)
  const [isUploading, setIsUploading] = useState(false)

  // 업로드 된 파일
  const [uploadedData, setUploadedData] = useState<null|ImageData>(null)

  // [참조] FileUploadField 내부의 <input type="file" /> 요소를 참조하기 위한 Ref 객체 생성
  const fileRef = useRef<HTMLInputElement>(null) // { current: null } -> { current: HTMLInputElement }

  // [재사용 함수]
  // 업로드 파일 미리보기 및 파일 인풋 초기화 함수
  const resetPreviewAndFile = () => {

    // 미리보기 이미지 초기화
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl) 
      setPreviewUrl('')
    }

    // 인풋 파일의 값 초기화
    const file = fileRef.current
    if (file) file.value = ''
  }

  // [이벤트 핸들러]
  // 파일 업로드 (change 이벤트)
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    const file = files?.item(0)
    if (!file) return // 업로드 할 파일이 없다면 함수 종료 (early return)

    // 파일 선택 시, uploadedData 상태 초기화
    if (uploadedData) setUploadedData(null)

    // URL.revokeObjectURL (URL 해제, 메모리 정리)
    if (previewUrl) URL.revokeObjectURL(previewUrl) // 메모리 정리

    // URL.createObjectURL (URL 생성)
    const createdPreviewUrl = URL.createObjectURL(file)
    // 미리보기 이미지 URL을 previewUrl 상태 값으로 업데이트 (화면 변경)
    setPreviewUrl(createdPreviewUrl)
    
  }

  // 미리보기 이미지 및 파일 삭제 (click 이벤트)
  const handleDeleteFile = () => {
    // 업로드 파일 미리보기 및 파일 인풋 초기화
    resetPreviewAndFile()
  }

  // 파일 업로드 API 서버에 요청 (submit 이벤트)
  const handleUploadSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    // 브라우저 기본 작동 방지
    e.preventDefault()

    // 현재 서버에 저장 요청 중이라면 함수 실행 중단
    if (isUploading || isDisabled) return
    
    // 업로드할 파일 검사
    const file = fileRef.current?.files?.[0]
    if(!file) throw new Error('업로드할 파일을 선택하세요.')
    
    const formData = new FormData()
    formData.append('image', file)
    // console.log(Object.fromEntries(formData))

    try {
      setIsUploading(true)

      // 서버에 파일 업로드 요청
      // 폼 데이터(formData)
      const result = await uploadFile(formData)

      // 파일 업로드 성공이라면?
      if (result.success) {
        // 업로드된 파일 데이터를 uploadedData 상태 업데이트
        setUploadedData(result.data)

        // 업로드 파일 미리보기 및 파일 인풋 초기화
        resetPreviewAndFile()
        // 노티피케이션(알림)
        alert('파일 업로드 성공!')
      }
    } catch(error) {
      console.error(error)
    } finally {
      setIsUploading(false)
    }
    
  }

  // 파생된 상태: 미리보기 이미지가 화면에 표시된 상태인지 아닌지 여부
  const isDisabled = 1 > previewUrl.trim().length

  return (
    <section className={S.card}>
      <h2 className={S.title}>프로필 설정</h2>
      <form onSubmit={handleUploadSubmit} className={S.form}>
        <NickNameField />
        <FileUploadField
          ref={fileRef}
          previewUrl={previewUrl}
          onChangeFile={handleChangeFile}
          onDeleteFile={handleDeleteFile}
        />
        <SaveButton isDisabled={isDisabled} isUploading={isUploading} />
      </form>
      <FileUploadResult uploadedData={uploadedData} />
    </section>
  )
}
