import Child from './Child'
import fatherIcon from '../icons/father.png'
import type { ReturnInputType, ReturnToggleType } from '@/hooks'
import S from '../style.module.css'

export interface FatherProps {
  nameInput: ReturnInputType
  emailInput: ReturnInputType
  checked: ReturnToggleType[0]
  toggleChecked: ReturnToggleType[1]
}

export default function Father({
  nameInput,
  emailInput,
  checked,
  toggleChecked,
}: FatherProps) {
  return (
    <section className={S.box}>
      <h3 className={`${S.familyTitle} ${S.father}`}>
        <img src={fatherIcon} alt="" width={26} height={26} /> 아버지 (박준오)
      </h3>
      <p>(나는 왜... 중간에서 배달을...)</p>
      <Child 
        nameInput={nameInput}
        emailInput={emailInput}
        checked={checked}
        toggleChecked={toggleChecked}
      />
    </section>
  )
}
