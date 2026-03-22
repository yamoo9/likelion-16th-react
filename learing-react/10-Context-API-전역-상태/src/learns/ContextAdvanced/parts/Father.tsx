import Child from './Child'
import fatherIcon from '../icons/father.png'
import S from '../ContextAdvanced.module.css'

export default function Father() {
  return (
    <section className={S.box}>
      <h3 className={`${S.familyTitle} ${S.father}`}>
        <img src={fatherIcon} alt="" width={26} height={26} />{' '}
        아버지 (박준오)
      </h3>
      <p>(응? 뭐가 지나갔나?)</p>
      <Child />
    </section>
  )
}
