import CurrentTime from './CurrentTime'

interface Props {
  connectedCount: number
}

export default function SmartHeader({ connectedCount }: Props) {
  return (
    <header>
      <h2>스마트 홈 제어 센터</h2>
      <CurrentTime />
      <p>
        현재 연결된 기기: <b>{connectedCount}</b>개
      </p>
    </header>
  )
}
