/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useId } from 'react'

import { useDebounce, useInput } from '@/hooks'
import SearchIcon from './SearchIcon'
import S from './style.module.css'

interface PokemonSearchProps {
  onSearch: (searchTerm: string) => void
}

/**
 * [검색 컴포넌트: PokemonSearch]
 * - 사용자의 입력값을 URL 쿼리 스트링(?q=...)과 동기화합니다.
 * - 새로고침을 해도 검색어가 유지되도록 설계되었습니다.
 */
export default function PokemonSearch({ onSearch }: PokemonSearchProps) {
  /* 
    [useNavigate 훅 사용]
    - 프로그래밍 방식으로 경로를 이동시키기 위한 navigate 함수를 가져오세요.
    - 참고: https://reactrouter.com/api/hooks/useNavigate
  */
  const navigate = undefined

  /* 
    [쿼리 스트링 읽기]
    - useSearchParams: URL의 쿼리 파라미터를 읽고 수정할 수 있는 훅입니다.
    - 예: `/?q=피카츄` → searchParams.get('q')는 '피카츄'를 반환합니다.
    - 참고: https://reactrouter.com/api/hooks/useSearchParams
  */
  const searchParams = undefined

  const searchId = useId()
  
  /* 
    [URL 검색어 초기화]
    - URL에 'q' 파라미터가 있다면 그 값을 초기값으로 사용하고, 없다면 빈 문자열('')을 할당하세요.
  */
  const initialQuery = ''

  const searchTermInput = useInput(initialQuery)
  
  /* 
    [성능 최적화: Debounce]
    - 사용자가 입력을 멈춘 후 500ms가 지나야 실제 검색(URL 업데이트)이 실행됩니다.
    - 매 타이핑마다 페이지가 이동하거나 API를 호출하는 것을 방지합니다.
  */
  const [debouncedSearch] = useDebounce(searchTermInput.props.value, 500)

  /* 
    [URL 동기화 로직]
    - 사용자가 입력을 멈추면 URL의 쿼리 스트링을 업데이트합니다.
    - 사용자가 입력한 검색어(debouncedSearch)를 URL의 ?q=... 부분에 반영합니다.
    - navigate 함수를 통해 현재 경로 뒤에 쿼리 스트링을 붙여줍니다.
  */
  useEffect(() => {
    const query = debouncedSearch.trim()
    console.log({ query })

    // navigate 함수 코드 작성
    // - query가 있으면 `?q=${encodeURIComponent(query)}`로 이동
    // - query가 없으면 빈 문자열('')로 이동
    // - 옵션: replace = true 설정하여 히스토리 중복 방지

  }, [debouncedSearch])

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    
    const searchTerm = searchTermInput.props.value
    const query = searchTerm.trim()
    
    // navigate 함수 작성
    // - 엔터를 눌러 즉시 검색할 때도 URL을 업데이트합니다.
    // - navigate를 사용하여 위와 동일한 로직으로 URL을 업데이트하세요.
    // - 동일 코드가 반복된 경우, 별도 함수로 분리해 재사용하세요.

    onSearch(searchTerm)
  }

  return (
    <form className={S.searchContainer} onSubmit={handleSubmit}>
      <label htmlFor={searchId} className="sr-only">
        포켓몬 검색
      </label>
      <input
        type="text"
        id={searchId}
        className={S.searchInput}
        placeholder="포켓몬 이름으로 검색"
        {...searchTermInput.props}
      />
      <button
        type="submit"
        className={S.searchButton}
        aria-label="검색"
        aria-disabled={!searchTermInput.props.value.trim()}
      >
        <SearchIcon />
      </button>
    </form>
  )
}