import '@/styles/globals.css'

export default function RootLayout({ children }: React.PropsWithChildren) {
  
  // [서버 사이드 렌더링]
  // React 서버 컴포넌트(RSC) → HTML 페이지 렌더링 → 클라이언트(브라우저)에 전송
  return (
    <html lang="ko-KR">
      <body className="overflow-y-scroll">{children}</body>
    </html>
  )
}
