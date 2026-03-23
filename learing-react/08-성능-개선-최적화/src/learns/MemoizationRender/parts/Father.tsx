import { memo } from 'react'
import fatherImage from '@/assets/icons/father.png'
import Child from './Child'
import S from './style.module.css'

const iconSize = 20

function Father() {
  
  console.log('%cFather 렌더링', 'color: #3a9874')

  return (
    <div className={S.father}>
      <h3 className={S.title}>
        <img src={fatherImage} alt="" width={iconSize} height={iconSize} />
        중간에 낀 파더
      </h3>
      <p>나는 Props도 State도 없지만 부모(상위) 컴포넌트가 렌더링되면 다시 그려집니다.</p>
      <Child />
    </div>
  )
}

export default memo(Father)