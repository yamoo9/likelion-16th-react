import { PokemonList } from '@/components/ui/pokemon-list'
import { Pokemon } from '@/types/pokemon'
import { LucideServer } from 'lucide-react'

/**
 * [서버 컴포넌트 데이터 페칭]
 * 
 * - 직접적인 데이터 접근 : 서버에서 API를 호출하므로 API Key 등 민감한 정보를 안전하게 다룰 수 있습니다.
 * - 제로 번들 사이즈 : 페칭 로직이 브라우저로 전송되지 않아 클라이언트 자바스크립트 부담이 줄어듭니다.
 * - SEO 최적화 : 데이터가 포함된 완성된 HTML이 브라우저에 도달하여 검색 엔진 노출에 유리합니다.
 */

const pokemonApiUrl = `${process.env.MOCK_API_URL}/pokemon`

export default async function ServerSidePage() {
  
  // 서버 컴포넌트는 async/await를 사용하여 컴포넌트 수준에서 직접 데이터를 호출합니다.
  const response = await fetch(pokemonApiUrl)

  // 에러 핸들링: 서버에서 응답 상태를 확인하고 실패 시 에러를 던집니다. 
  if (!response.ok) throw new Error('데이터 가져오기에 실패했습니다.')
  
  // JSON 파싱: 서버 환경에서 데이터를 객체 형태로 변환합니다.
  const data = await response.json() as Pokemon[] /* 타입 단언 */

  return (
    <section className="m-6 space-y-6 md:mx-0">
      <header className="border-b border-b-slate-200 pb-4">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <span className="h-8 w-1 rounded-full bg-blue-500" />
          서버 사이드 데이터 페칭
        </h1>
        <p className="mt-2 flex items-center gap-3 text-sm text-slate-500">
          <LucideServer className="size-4" />
          서버에서 데이터를 직접 조회하여 완성된 HTML을 전달하므로<br className='md:hidden' />
          초기 로딩 속도가 빠르고 SEO에 최적화되어 있습니다.
        </p>
      </header>

      {/* 데이터 렌더링 : 서버에서 이미 준비된 데이터를 PokemonList 컴포넌트에 전달합니다. */}
      {/* <p className='text-sm text-slate-500'>서버 측에서 데이터를 불러오는 코드를 작성하세요.</p> */}
      <PokemonList data={data} />
    </section>
  )
}
