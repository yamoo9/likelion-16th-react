'use client'

// import { use } from 'react'
import { useParams } from 'next/navigation'

// 페이지 컴포넌트가 클라이언트 컴포넌트인 경우
// 라우트 다이내믹(동적) 세그먼트를 사용했을 때
export default function BlogPostPage(
  // { params }: PageProps<'/blog/[slug]'>
) {
  // 클라이언트 컴포넌트이므로 비동기(async) 컴포넌트로 사용할 수 없음
  // 이런 경우, 동적 세그먼트 값을 읽으려면 두 가지 방법이 있음
  // 방법 1. React.use() 함수 활용
  // const { slug } = use(params)

  // 방법 2. Next.js의 useParams 훅 함수 활용
  const pageParams = useParams<{ slug: string }>()
  console.log(pageParams.slug)

  return <>{pageParams.slug}</>
}
