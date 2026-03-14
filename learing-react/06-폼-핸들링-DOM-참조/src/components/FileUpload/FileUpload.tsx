import NickNameField from './parts/NickNameField'
import FileUploadField from './parts/FileUploadField'
import SaveButton from './parts/SaveButton'
import FileUploadResult from './parts/FileUploadResult'
import S from './FileUpload.module.css'

export default function FileUpload() {

  return (
    <section className={S.card}>
      <h2 className={S.title}>프로필 설정</h2>

      <form className={S.form} onSubmit={(e) => e.preventDefault()}>
        <NickNameField />
        <FileUploadField />
        <SaveButton />
      </form>

      <FileUploadResult />
    </section>
  )
}
