import { Switch } from '@/components'
import { blockThread } from '@/util/blockThread'
import type { Device } from '../index'
import S from '../style.module.css'
import { memo, useCallback } from 'react'

interface DeviceItemProps {
  name: string
  status: boolean
  setDevices: React.Dispatch<React.SetStateAction<Device[]>>
}

const delay = 100

export const DeviceItem = memo(function DeviceItem({
  name,
  status,
  setDevices,
}: DeviceItemProps) {
  blockThread(delay)

  const onToggle = useCallback(
    (name: string) => {
      setDevices((prev) =>
        prev.map((device) =>
          device.name === name ? { ...device, status: !device.status } : device,
        ),
      )
    },
    [setDevices],
  )

  console.log(
    `%c🔌 DeviceItem ${name} 렌더링`,
    'color: #5856d6; font-weight: 500',
  )

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
})
