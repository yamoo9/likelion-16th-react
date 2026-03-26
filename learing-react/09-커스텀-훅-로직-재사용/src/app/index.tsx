// import { DataFetchingDRY } from '@/learns'
import { useFetch, useInput } from '@/hooks'
import S from './style.module.css'
import { useState } from 'react'

export default function App() {
  const nameInput = useInput('')
  const [userId, setUserId] = useState(1)

  const { isLoading, data, refetch } = useFetch<{
    id: number
    name: string
  }>({
    url: `https://jsonplaceholder.typicode.com/users/${userId}`,
    dependencies: [userId],
  })

  return (
    <div className={S.container}>
      <input type="text" aria-label="사용자 이름" {...nameInput.props} />
      <button type="button" onClick={() => setUserId(userId + 1)}>
        사용자 ID {userId}
      </button>
      <button type="button" onClick={refetch}>
        재요청(refetch)
      </button>

      {isLoading ? <p role="status">데이터 로딩 중...</p> : <p>{data?.name}</p>}

      {/* <DataFetchingDRY /> */}
    </div>
  )
}
