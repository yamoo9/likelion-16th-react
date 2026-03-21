import { useEffect, useState } from 'react'
import { DeviceItem } from './parts/DeviceItem'
import S from './SmartHomePanel.module.css'

const INITIAL_DEVICES = [
  { name: '거실 전등', status: false },
  { name: '주방 전등', status: false },
  { name: '침실 에어컨', status: true },
  { name: '세탁기', status: false },
  { name: '로봇 청소기', status: true },
]

type Device = (typeof INITIAL_DEVICES)[0]

export default function SmartHomePanel() {
  
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES)

  const connectedCount = devices.filter(({ status }) => status).length

  const toggleDevice = (name: string) => {
    setDevices((prev) =>
      prev.map((d) => (d.name === name ? { ...d, status: !d.status } : d)),
    )
  }

  const [now, setNow] = useState(getNow)

  useEffect(() => {
    const timer = setInterval(() => setNow(getNow()), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <section className={S.panelContainer}>
      <header>
        <h2>스마트 홈 제어 센터</h2>
        <p>현재 시간: <time>{now.toLocaleTimeString()}</time></p>
        <p>현재 연결된 기기: <b>{connectedCount}</b>개</p>
      </header>

      <div aria-live="polite" className="sr-only">
        기기 상태가 변경되었습니다.
      </div>

      <ul className={S.deviceList}>
        {devices.map((device) => (
          <DeviceItem
            key={device.name}
            name={device.name}
            status={device.status}
            onToggle={toggleDevice}
          />
        ))}
      </ul>
    </section>
  )
}

function getNow() {
  return new Date()
}