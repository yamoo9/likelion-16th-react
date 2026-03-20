import S from '../FileUpload.module.css'

interface Props {
  isUploading?: boolean
  isDisabled?: boolean
}

export default function SaveButton({ 
  isUploading = false, 
  isDisabled = false 
}: Props) {
  
  return (
    <button
      type="submit"
      className={S.submitButton}
      aria-disabled={isDisabled || isUploading}
    >
      {isUploading ? '저장 중...' : '저장'}
    </button>
  )
}
