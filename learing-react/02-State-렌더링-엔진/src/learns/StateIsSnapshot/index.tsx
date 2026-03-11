import SnapshotTest from './SnapshotTest'
import S from './style.module.css'

function StateIsSnapshot() {
  return (
    <div className={S.container}>
      <SnapshotTest />
    </div>
  )
}

export default StateIsSnapshot
