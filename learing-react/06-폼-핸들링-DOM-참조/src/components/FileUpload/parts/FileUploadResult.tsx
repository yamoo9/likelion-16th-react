import { useState } from 'react'
import { CheckIcon, CopyIcon } from './SvgIcon'
import type { ImageData } from '../api/type'
import S from '../FileUpload.module.css'
import { wait } from '@/utils'

interface Props {
  uploadedData?: ImageData | null
}

const COPIED_WAIT_TIME = 2000 // ms

export default function UploadResult({ uploadedData }: Props) {
  
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async (imageUrl: ImageData['url']) => {
    try {
      navigator.clipboard.writeText(imageUrl) // 클립보드 이미지 URL 저장
      setIsCopied(true)
      await wait(COPIED_WAIT_TIME) // 2초 대기 (체크 마크 아이콘이 화면에 표시)
      setIsCopied(false)
    } catch {
      alert('클립보드 저장 실패!')
    }
  }

  if (!uploadedData) return null

  return (
    <section className={S.resultArea}>
      <h3 className={S.resultTitle}>업로드 완료</h3>
      <div className={S.resultContent}>
        <img
          src={uploadedData.display_url}
          alt="업로드 이미지"
          className={S.resultImg}
        />
        <div className={S.urlBox}>
          <p className={S.urlLabel}>이미지 URL:</p>
          <div className={S.copyWrapper}>
            <code className={S.urlText}>{uploadedData.url}</code>
            <button
              type="button"
              className={S.copyButton}
              aria-label="URL 복사"
              onClick={() => copyToClipboard(uploadedData.url)}
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
