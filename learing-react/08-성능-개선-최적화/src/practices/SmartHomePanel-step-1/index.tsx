import { useCallback, useEffect, useState } from 'react'
import { DeviceItem } from './parts/DeviceItem'
import S from './style.module.css'

const INITIAL_DEVICES = [
  { name: '거실 전등', status: false },
  { name: '주방 전등', status: false },
  { name: '침실 에어컨', status: true },
  { name: '세탁기', status: false },
  { name: '로봇 청소기', status: true },
]

type Device = (typeof INITIAL_DEVICES)[0]

export default function SmartHomePanel() {
  // 반응성 상태
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES)

  // 파생된 상태 (반응성 데이터에 의존)
  const connectedCount = devices.filter(({ status }) => status).length

  // 토글 기능(함수)
  const toggleDevice = useCallback((name: string) => {
    // 상태 업데이트 (렌더 트리거)
    setDevices((prev) => prev.map((device) =>
      device.name === name ? { ...device, status: !device.status } : device,
    ))
  }, [])

  // 반응성 상태 (1초에 한 번씩 업데이트: 빈번한 렌더링 요인)
  const [now, setNow] = useState(getNow)

  // 이펙트 (외부 시스템인 타이머와 리액트 앱 동기화)
  useEffect(() => {
    const timer = setInterval(() => setNow(getNow()), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  console.log('%c⚙️ SmartHomePanel 렌더링', 'color: #0272bc; font-weight: 700')

  return (
    <section className={S.panelContainer}>
      <header>
        <h2>스마트 홈 제어 센터</h2>
        <p>
          현재 시간: <time>{now.toLocaleTimeString()}</time>
        </p>
        <p>
          현재 연결된 기기: <b>{connectedCount}</b>개
        </p>
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
