import { cn } from '@/utils'
import { Feather, Mail, ShieldHalf } from 'lucide-react'

/**
 * [UI 컴포넌트] SiteInfo (Footer)
 * 서비스 하단에 위치하여 저작권 정보, 기술 스택, 소셜 링크 등을 표시합니다.
 */
export default function SiteInfo() {

  // [공통 스타일] 소셜 아이콘의 기본 색상 및 호버 시 색상 반전 효과
  const socialIconStyle = cn(
    'text-zinc-400 transition-colors duration-200',
    'hover:text-black dark:hover:text-white',
  )

  return (
    <footer
      className={cn(
        // [레이아웃] 상단 여백, 테두리, 패딩 및 배경색 설정
        'mt-20 w-full border-t px-6 py-8 transition-colors duration-300',
        // [라이트 모드] 연한 회색 테두리와 흰색 배경
        'border-gray-100 bg-white',
        // [다크 모드] 짙은 회색 테두리와 아주 어두운 배경(zinc-950)
        'dark:border-zinc-800 dark:bg-zinc-950',
      )}
    >
      <h2 className="sr-only">사이트 정보</h2>

      <div className="mx-auto max-w-6xl">
        <div
          className={cn(
            'flex flex-col items-center justify-between gap-6 md:flex-row',
            'border-zinc-50 dark:border-zinc-900',
          )}
        >
          {/* [저작권 및 정보 섹션] */}
          <small lang="en" className="flex flex-col items-center gap-1 md:items-start">
            {/* 현재 연도를 동적으로 표시 */}
            <span className="block text-xs text-zinc-400 dark:text-zinc-500">
              © {new Date().getFullYear()} URBAN LIB. All rights reserved.
            </span>
            {/* 사용된 기술 스택 표시 */}
            <span className="block text-[10px] text-zinc-300 dark:text-zinc-600">
              Powered by Next.js · Tailwind CSS · Vercel
            </span>
          </small>

          {/* [소셜 및 외부 링크 섹션] */}
          <div className="flex gap-6">
            <a href="#" aria-label="블로그" className={socialIconStyle}>
              <Feather size={20} />
            </a>
            <a href="#" aria-label="보안 정책" className={socialIconStyle}>
              <ShieldHalf size={20} />
            </a>
            <a
              href="mailto:contact@urbanlib.com"
              className={socialIconStyle}
              aria-label="이메일 문의"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}