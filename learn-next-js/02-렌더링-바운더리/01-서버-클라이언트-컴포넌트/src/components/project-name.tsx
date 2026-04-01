'use client' // 클라이언트 지시어(directive)

import { useEffect } from 'react'

export default function ProjectName() {

  console.log('프로젝트 네임 컴포넌트')

  // 이펙트 동기화
  useEffect(() => {
    // 사이드 이펙트 (부수 효과)
    document.documentElement.dataset.projectName = 'my-next'
  }, [])

  return null
}
