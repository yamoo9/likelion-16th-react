import S from './FileUpload.module.css'

/**
 * [실습 목표]
 * 1. useRef를 활용한 파일 입력 제어
 * 2. URL.createObjectURL을 이용한 이미지 미리보기 구현
 * 3. FormData와 Fetch API를 이용한 외부 이미지 서버(imgBB) 업로드
 * 4. 웹 접근성(Focus, Label) 고려한 UI 구성
 */

// ⚠️ .env 파일에 VITE_IMGBB_API_KEY가 설정되어 있어야 합니다.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY

export default function FileUpload() {
  // [STEP 1] DOM 요소에 직접 접근하기 위한 Ref 생성
  // - <input type="file"> 요소에 연결하여 파일 데이터를 가져올 때 사용합니다.

  // [STEP 2] 상태 관리
  // - 미리보기 이미지 주소
  const previewUrl = false
  // - 업로드 중 상태 (버튼 비활성화용)
  const isUploading = false

  // [STEP 3] 메모리 관리 (Cleanup)
  // - 미리보기 URL은 브라우저 메모리를 사용하므로, 컴포넌트가 사라지거나 URL이 바뀔 때 해제해야 합니다.

  // 파일 선택 시 실행되는 핸들러
  const handleFileChange = () => {
    // 1. 선택된 파일 가져오기
    // 2. 기존 미리보기 URL이 있다면 메모리 해제
    // 3. 새로운 미리보기 URL 생성 및 상태 업데이트
  }

  // 선택된 파일 제거 핸들러
  const handleRemove = () => {
    // 1. input 요소의 value 초기화 (같은 파일 재선택 가능하도록)
    // 2. 미리보기 상태 초기화
  }

  // 폼 제출(업로드) 핸들러
  const handleSubmit = async () => {
    // 1. Ref를 통해 현재 선택된 파일 데이터 확보
    // 2. API 전송을 위한 FormData 객체 생성
    // imgBB API 규격에 맞춰 'image' 키에 파일 객체를 담습니다.
    // 3. Fetch API를 이용한 비동기 통신
  }

  return (
    <div className={S.card}>
      <h2 className={S.title}>프로필 설정</h2>

      <form className={S.form} onSubmit={handleSubmit}>
        {/* 닉네임 입력 영역 */}
        <div className={S.field}>
          <label htmlFor="nickname" className={S.label}>
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className={S.input}
            placeholder="예: 프로파일러"
          />
        </div>

        {/* 파일 업로드 영역 */}
        <div className={S.field}>
          <span className={S.label}>프로필 사진</span>
          <div className={S.uploadWrapper}>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={S.hiddenInput}
            />

            {!previewUrl ? (
              /* 파일 선택 전 UI */
              <label htmlFor="file-input" className={S.uploadZone}>
                <UploadIcon />
                <p className={S.uploadText}>
                  <strong>클릭하여 업로드</strong>
                </p>
              </label>
            ) : (
              /* 파일 선택 후 UI */
              <div className={S.previewContainer}>
                <img
                  src={previewUrl}
                  className={S.previewImg}
                  alt="업로드 사진 미리보기"
                />
                <button
                  type="button"
                  className={S.removeBtn}
                  onClick={handleRemove}
                  aria-label="업로드 사진 삭제"
                >
                  <CloseIcon />
                </button>
              </div>
            )}
          </div>
          <p className={S.helperText}>이미지 파일(jpg, png)만 가능합니다.</p>
        </div>

        <button
          type="submit"
          className={S.submitBtn}
          aria-disabled={isUploading}
        >
          {isUploading ? '저장 중...' : '저장'}
        </button>
      </form>
    </div>
  )
}

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="#71717a">
    <path d="M11 15V5.414L8.707 7.707L7.293 6.293L12 1.586L16.707 6.293L15.293 7.707L13 5.414V15H11ZM5 18H19V11H21V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V11H5V18Z" />
  </svg>
)

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#000000">
    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
  </svg>
)
