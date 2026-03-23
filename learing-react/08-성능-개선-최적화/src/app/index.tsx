import { CompositionRender } from '@/learns'
import S from './style.module.css'
import GrandFather from '../learns/CompositonRender/parts/GrandFather'
import Father from '../learns/CompositonRender/parts/Father'
import Child from '../learns/CompositonRender/parts/Child'

export default function App() {
  return (
    <div className={S.container}>
      <CompositionRender>
        <GrandFather>
          <Father>
            <Child />
          </Father>
        </GrandFather>
      </CompositionRender>
    </div>
  )
}
