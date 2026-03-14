import S from '../FileUpload.module.css'

export default function SaveButton() {
  return (
    <button type="submit" className={S.submitButton}>
      저장
    </button>
  )
}
