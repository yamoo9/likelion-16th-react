import { CloseIcon, UploadIcon } from './SvgIcon'
import S from '../FileUpload.module.css'

interface Props {
  previewUrl: string
  ref: React.RefObject<HTMLInputElement | null>
  onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDeleteFile: () => void
}

export default function FileUploadField({
  ref,
  previewUrl,
  onChangeFile: onFileChange,
  onDeleteFile,
}: Props) {
  return (
    <div className={S.field}>
      <span className={S.label}>프로필 사진</span>
      <div className={S.uploadWrapper}>
        <input
          ref={ref}
          onChange={onFileChange}
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
            <button
              type="button"
              className={S.removeButton}
              aria-label="삭제"
              onClick={onDeleteFile}
            >
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
