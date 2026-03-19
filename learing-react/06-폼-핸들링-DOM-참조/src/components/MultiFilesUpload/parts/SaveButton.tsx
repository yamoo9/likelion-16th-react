import S from '../MultiFilesUpload.module.css'

interface Props {
  isUploading: boolean
  isDisabled: boolean
}

export default function SaveButton({ isUploading, isDisabled }: Props) {
  
  return (
    <button
      type="submit"
      className={S.submitButton}
      disabled={isUploading || isDisabled}
      aria-disabled={isUploading || isDisabled}
    >
      {isUploading ? '업로드 중...' : '업로드'}
    </button>
  )
}
