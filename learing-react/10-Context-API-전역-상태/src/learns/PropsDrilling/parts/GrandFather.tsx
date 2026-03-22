import Father from './Father'
import grandFatherIcon from '../icons/grand-father.png'
import S from '../PropsDrilling.module.css'

export default function GrandFather() {
  const name = '박하루'
  const email = 'haru@child.family'
  const checked = false

  return (
    <article>
      <h2 className={`${S.familyTitle} ${S.grandFather}`}>
        <img src={grandFatherIcon} alt="" width={28} height={28} />{' '}
        할아버지 (박덕문)
      </h2>
      <p>(난 상태만 필요한데...)</p>

      <div className={S.summary}>
        <p>
          <strong>이름:</strong> {name}
        </p>
        <p>
          <strong>이메일:</strong> {email}
        </p>
        <p>
          <strong>항렬자 사용:</strong> {checked ? '✅' : '❎'}
        </p>
      </div>

      <Father />
    </article>
  )
}
