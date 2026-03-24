import grandFatherIcon from '../icons/grand-father.png'
import Father from './Father'
import S from '../style.module.css'

type DispatchAction<T> = React.Dispatch<React.SetStateAction<T>>

export interface FamilyProps {
  name: string
  email: string
  checked: boolean
  setName: DispatchAction<string>
  setEmail: DispatchAction<string>
  setChecked: DispatchAction<boolean>
}

export default function GrandFather(props: FamilyProps) {

  return (
    <article>
      <h2 className={`${S.familyTitle} ${S.grandFather}`}>
        <img src={grandFatherIcon} alt="" width={28} height={28} />{' '}
        할아버지 (박덕문)
      </h2>
      <p>(난 상태만 필요한데...)</p>

      <div className={S.summary}>
        <p>
          <strong>이름:</strong> {props.name}
        </p>
        <p>
          <strong>이메일:</strong> {props.email}
        </p>
        <p>
          <strong>항렬자 사용:</strong> {props.checked ? '✅' : '❎'}
        </p>
      </div>

      <Father {...props} />
    </article>
  )
}
