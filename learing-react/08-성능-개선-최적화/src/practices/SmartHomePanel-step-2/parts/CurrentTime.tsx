import { useEffect, useState } from 'react'

export default function CurrentTime() {
  const [now, setNow] = useState(getNow)

  useEffect(() => {
    const timer = setInterval(() => setNow(getNow()), 1000)
    return () => clearInterval(timer)
  }, [])

  console.log('%c⚙️ CurrentTime 렌더링', 'color: #5c8e26; font-weight: 700')

  return (
    <p>
      현재 시간: <time>{now.toLocaleTimeString()}</time>
    </p>
  )
}

function getNow() {
  return new Date()
}
