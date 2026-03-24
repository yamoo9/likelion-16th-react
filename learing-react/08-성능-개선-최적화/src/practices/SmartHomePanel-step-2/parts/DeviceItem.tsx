import { Switch } from '@/components'
import { blockThread } from '@/util/blockThread'
import S from '../style.module.css'

interface DeviceItemProps {
  name: string
  status: boolean
  onToggle: (name: string) => void
}

const delay = 100

export function DeviceItem({ name, status, onToggle }: DeviceItemProps) {
  blockThread(delay)

  // console.log(`%c🔌 DeviceItem ${name} 렌더링`, 'color: #5856d6; font-weight: 500')

  return (
    <li className={S.deviceItem}>
      <span className={S.deviceName}>{name}</span>
      <div className={S.controls} aria-live="polite">
        <Switch 
          isOn={status} 
          onToggle={() => onToggle(name)} 
          label={`${name} 전원 제어`}
        />
        <span className={S.statusText}>{status ? 'ON' : 'OFF'}</span>
      </div>
    </li>
  )
}
