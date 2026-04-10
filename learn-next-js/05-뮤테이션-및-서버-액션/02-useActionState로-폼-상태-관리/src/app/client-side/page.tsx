'use client'

import { useCallback, useRef, useState } from 'react'
import { CreateActionForm } from './_components/create-action-form'

export default function ClientSidePage() {

  const imperativeHandleRef = useRef({
    focus: () => {}
  })

  const [resetKey, setResetKey] = useState(0)

  const handleReset = useCallback(() => {
    setResetKey((key) => key + 1)
    // 자식 컴포넌트의 명령형 핸들(함수) 실행
    // 컴포넌트 초기화 한 후에 하위 컴포넌트의 인풋 요소에 초점 이동
    setTimeout(() => imperativeHandleRef.current.focus(), 50)
  }, [])

  return (
    <div className="flex grow items-center justify-center p-4">
      <CreateActionForm ref={imperativeHandleRef} key={resetKey} onReset={handleReset} />
    </div>
  )
}