import { memo } from 'react'
import { blockThread } from '@/util/blockThread'
import childImage from '@/assets/icons/child.png'
import { blockThreadTime } from './GrandFather'
import S from './style.module.css'

const iconSize = 18

function Child() {
  
  // 의도적인 부하 생성 (100ms 동안 브라우저를 멈추게 함)
  blockThread(blockThreadTime * 1000)

  console.log(`%cChild 렌더링 (${blockThreadTime}초 소요)`, 'color: #fa5e5b; font-weight: 800;')

  return (
    <div className={S.child}>
      <h4 className={`${S.title} ${S.heavyText}`}>
        <img src={childImage} alt="" width={iconSize} height={iconSize} />
        나는 무거운 차일드입니다.
      </h4>
      <p>
        그랜 파더가 숫자를 바꿀 때마다 저도 다시 렌더링됩니다. 
        다시 렌더링될 때마다 화면을 {blockThreadTime}초씩 멈추게 합니다.
      </p>
    </div>
  )
}

export default memo(Child)