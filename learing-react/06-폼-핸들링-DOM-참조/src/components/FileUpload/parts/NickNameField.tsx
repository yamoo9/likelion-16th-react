import S from '../FileUpload.module.css'

export default function NickNameField() {
  return (
    <div className={S.field}>
      <label htmlFor="nickname" className={S.label}>
        닉네임
      </label>
      <input
        type="text"
        id="nickname"
        name="nickname"
        className={S.input}
        placeholder="사용자 닉네임"
      />
    </div>
  )
}