import childIcon from '../icons/child.png'
import S from '../ContextBasic.module.css'
import type { FamilyProps } from './GrandFather'

export default function Child(props: FamilyProps) {
  const { name, setName, email, setEmail, checked, setChecked } = props

  return (
    <section className={`${S.box} ${S.active}`}>
      <h4 className={`${S.familyTitle} ${S.child}`}>
        <img src={childIcon} alt="" width={20} height={20} /> 손자 ({name || '이름 없음'})
      </h4>

      <p>(두분 정말 고생 많으시네. 나 때문에...)</p>

      <fieldset className={S.form}>
        <legend className={S.srOnly}>사용자 정보 수정 양식</legend>

        <div className={S.field}>
          <label htmlFor="user-name" className={S.label}>
            이름
          </label>
          <input
            type="text"
            id="user-name"
            className={S.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={S.field}>
          <label htmlFor="user-email" className={S.label}>
            이메일
          </label>
          <input
            type="email"
            id="user-email"
            className={S.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label className={S.checkboxGroup}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>항렬자 사용 ({checked ? '동의함' : '미동의'})</span>
        </label>
      </fieldset>
    </section>
  )
}
