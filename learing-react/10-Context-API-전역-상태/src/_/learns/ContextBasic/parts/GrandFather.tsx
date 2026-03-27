import { useContext } from 'react'

import { FamilyContext } from '@/contexts/FamilyContext/context'
import grandFatherIcon from '../icons/grand-father.png'
import Father from './Father'
import S from '../style.module.css'

export default function GrandFather() {

  // 컨텍스트 값 사용하기
  const contextValue = useContext(FamilyContext)

  return (
    <article>
      <h2 className={`${S.familyTitle} ${S.grandFather}`}>
        <img src={grandFatherIcon} alt="" width={28} height={28} />{' '}
        할아버지 (박덕문)
      </h2>
      <p>(난 상태만 필요한데...)</p>

      <div className={S.summary}>
        <p>
          <strong>이름:</strong> {contextValue?.name}
        </p>
        <p>
          <strong>이메일:</strong> {contextValue?.email}
        </p>
        <p>
          <strong>항렬자 사용:</strong> {contextValue?.checked ? '✅' : '❎'}
        </p>
      </div>

      <Father />
    </article>
  )
}
