import { useId } from 'react'
import S from '../MultiFilesUpload.module.css'

export default function NameField() {
  const id = useId()

  return (
    <div className={S.field}>
      <label htmlFor={id} className={S.label}>
        갤러리 이름
      </label>
      <input
        type="text"
        id={id}
        name="galleryName"
        className={S.input}
        placeholder="예: 판타지움 갤러리"
      />
    </div>
  )
}