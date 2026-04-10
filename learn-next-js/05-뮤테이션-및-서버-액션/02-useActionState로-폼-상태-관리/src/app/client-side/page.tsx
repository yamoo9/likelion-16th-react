'use client'

import { useCallback, useState } from 'react'
import { CreateActionForm } from './_components/create-action-form'

export default function ClientSidePage() {
  const [resetKey, setResetKey] = useState(0)
  const handleReset = useCallback(() => setResetKey((key) => key + 1), [])

  return (
    <div className="flex grow items-center justify-center p-4">
      <CreateActionForm key={resetKey} onReset={handleReset} />
    </div>
  )
}