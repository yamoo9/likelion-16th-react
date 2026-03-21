import { Switch } from '@/components'
import { blockThread } from '@/util/blockThread'
import S from '../SmartHomePanel.module.css'

interface DeviceItemProps {
  name: string
  status: boolean
  onToggle: (name: string) => void
}

const delay = 50

export function DeviceItem({ name, status, onToggle }: DeviceItemProps) {
  blockThread(delay)

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
