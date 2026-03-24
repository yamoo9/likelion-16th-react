import { useState } from 'react'
import { DeviceItem } from './parts/DeviceItem'
import SmartHeader from './parts/SmartHeader'
import S from './style.module.css'

const INITIAL_DEVICES = [
  { name: '거실 전등', status: false },
  { name: '주방 전등', status: false },
  { name: '침실 에어컨', status: true },
  { name: '세탁기', status: false },
  { name: '로봇 청소기', status: true },
]

export type Device = (typeof INITIAL_DEVICES)[0]

export default function SmartHomePanel() {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES)

  const connectedCount = devices.filter(({ status }) => status).length

  console.log('%c⚙️ SmartHomePanel 렌더링', 'color: #0272bc; font-weight: 700')

  return (
    <section className={S.panelContainer}>
      <SmartHeader connectedCount={connectedCount} />

      <div aria-live="polite" className="sr-only">
        기기 상태가 변경되었습니다.
      </div>

      <ul className={S.deviceList}>
        {devices.map((device) => (
          <DeviceItem
            key={device.name}
            name={device.name}
            status={device.status}
            setDevices={setDevices}
          />
        ))}
      </ul>
    </section>
  )
}


