import { useContext } from 'react'
import grandFatherIcon from '../icons/grand-father.png'
import { FamilyContext } from '../ContextAdvanced'
import Father from './Father'
import S from '../ContextAdvanced.module.css'

export default function GrandFather() {

  const familyContextValue = useContext(FamilyContext)

  if (!familyContextValue) {
    throw new Error('familyContextValue가 존재하지 않습니다.')
  }

  const { name, email, checked } = familyContextValue

  return (
    <article>
      <h2 className={`${S.familyTitle} ${S.grandFather}`}>
        <img src={grandFatherIcon} alt="" width={28} height={28} />{' '}
        할아버지 (박덕문)
      </h2>

      <p>(내가 필요한 것만 챙겨도 되겠군.)</p>

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
