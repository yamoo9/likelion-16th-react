import { useState } from 'react'
import { CheckIcon, CopyIcon } from './SvgIcon'
import type { ImageData } from '../api/type.ts'
import S from '../MultiFilesUpload.module.css'

// 복사 완료 후 아이콘을 원래대로 되돌리는 대기 시간(ms)
const COPYED_WAIT_TIME = 2000

interface Props {
  data: ImageData
}

export default function FileUploadResult({ data }: Props) {
  
  // 복사 버튼 상태 관리 (복사 완료 여부)
  const [isCopied, setIsCopied] = useState(false)

  // 이미지 URL 클립보드 복사 함수
  const handleCopy = async (url: string) => {
    try {
      // 클립보드에 이미지 URL 복사
      await navigator.clipboard.writeText(url)
      // 복사 완료 상태로 변경
      setIsCopied(true)
      // 특정 시간이 지나면 복사 상태 초기화
      setTimeout(() => setIsCopied(false), COPYED_WAIT_TIME)
    } catch (error) {
      console.error('클립보드 복사 실패', error)
    }
  }

  return (
    <div className={S.resultContent}>
      <div className={S.resultInner}>
        <img
          src={data.display_url}
          alt="업로드"
          className={S.resultImg}
          style={{ margin: 0 }}
        />

        <div className={S.urlBox}>
          <p className={S.urlLabel}>{data.title}</p>
          <div className={S.copyWrapper}>
            <code className={S.urlText}>{data.url}</code>
            <button
              type="button"
              className={S.copyButton}
              onClick={() => handleCopy(data.url)}
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
