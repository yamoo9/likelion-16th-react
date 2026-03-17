import S from '../FileUpload.module.css'
import { CheckIcon, CopyIcon } from './SvgIcon'

export type UploadedData = {
  url: string
  displayUrl: string
} | null

export default function UploadResult() {

  const uploadedData: UploadedData = { url: '', displayUrl: '' }
  const isCopied = false

  if (!uploadedData) return null

  return (
    <section className={S.resultArea}>
      <h3 className={S.resultTitle}>업로드 완료</h3>
      <div className={S.resultContent}>
        <img
          src={uploadedData.displayUrl}
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
            >
              {isCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
