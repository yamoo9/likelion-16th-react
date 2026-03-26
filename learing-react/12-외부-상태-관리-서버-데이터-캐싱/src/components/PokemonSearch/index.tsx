import { LucideSearch } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useDebounce } from '@/hooks'
import S from './style.module.css'

interface PokemonSearchProps {
  onSearch: (searchTerm: string) => void
}

export default function PokemonSearch({ onSearch }: PokemonSearchProps) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const searchId = useId()
  const initialQuery = searchParams.get('q') ?? ''

  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [debouncedSearch] = useDebounce(searchTerm, 500)

  useEffect(() => {
    navigate(
      debouncedSearch.trim()
        ? `?q=${encodeURIComponent(debouncedSearch.trim())}`
        : '',
    )
  }, [debouncedSearch, navigate])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    navigate(
      searchTerm.trim() ? `?q=${encodeURIComponent(searchTerm.trim())}` : '',
    )
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
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        type="submit"
        className={S.searchButton}
        aria-label="검색"
        aria-disabled={!searchTerm.trim()}
      >
        <LucideSearch />
      </button>
    </form>
  )
}
