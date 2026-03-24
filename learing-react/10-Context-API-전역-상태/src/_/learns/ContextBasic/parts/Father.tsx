import fatherIcon from '../icons/father.png'
import type { FamilyProps } from './GrandFather'
import Child from './Child'
import S from '../style.module.css'

export default function Father(props: FamilyProps) {
  return (
    <section className={S.box}>
      <h3 className={`${S.familyTitle} ${S.father}`}>
        <img src={fatherIcon} alt="" width={26} height={26} />{' '}
        아버지 (박준오)
      </h3>
      <p>(나는 왜... 중간에서 배달을...)</p>
      <Child {...props} />
    </section>
  )
}
