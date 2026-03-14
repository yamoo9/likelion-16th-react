import S from '../FileUpload.module.css'
import { CloseIcon, UploadIcon } from './SvgIcon'

interface Props {
  previewUrl?: string | undefined
}

export default function FileUploadField({ previewUrl }: Props) {
  return (
    <div className={S.field}>
      <span className={S.label}>프로필 사진</span>
      <div className={S.uploadWrapper}>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          className={S.hiddenInput}
        />

        {!previewUrl ? (
          <label htmlFor="profileImage" className={S.uploadZone}>
            <UploadIcon />
            <p className={S.uploadText}>
              <strong>클릭하여 업로드</strong>
            </p>
          </label>
        ) : (
          <div className={S.previewContainer}>
            <img src={previewUrl} className={S.previewImg} alt="미리보기" />
            <button type="button" className={S.removeButton} aria-label="삭제">
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
