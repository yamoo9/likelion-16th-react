import { COLORS, type Colors } from '@/constants/colors'
import type { PokemonType } from '@/services/pokemon'
import S from './style.module.css'

interface TypeFilterProps {
  selectedType: PokemonType | '전체'
  onFilterChange: (type: PokemonType | '전체') => void
}

export default function TypeFilter({
  selectedType, onFilterChange,
}: TypeFilterProps) {
  // 모든 타입 + '전체' 옵션
  const allTypes: (PokemonType | '전체')[] = [
    '전체',
    ...(Object.keys(COLORS) as PokemonType[]),
  ]

  return (
    <div
      className={S.filterContainer}
      role="region"
      aria-label="포켓몬 타입 필터"
    >
      <h2 className={S.filterTitle}>타입별 필터링</h2>
      <div
        className={S.typeButtons}
        role="radiogroup"
        aria-label="타입 선택"
      >
        {allTypes.map((type) => (
          <button
            key={type}
            className={`${S.typeButton} ${selectedType === type ? S.selected : ''}`}
            style={{
              borderColor: type !== '전체' ? COLORS[type as Colors] : '#ccc',
              backgroundColor: selectedType === type
                ? type !== '전체'
                  ? COLORS[type as Colors]
                  : '#666'
                : 'transparent',
            }}
            onClick={() => onFilterChange(type)}
            aria-pressed={selectedType === type}
            aria-label={`${type} 타입 필터링`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  )
}
