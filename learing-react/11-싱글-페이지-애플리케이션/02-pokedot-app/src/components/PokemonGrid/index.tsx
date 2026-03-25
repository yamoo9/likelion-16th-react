import type { Pokemon } from '@/services/pokemon'
import PokemonCard from '@/components/PokemonCard'
import S from './style.module.css'

interface Props {
  pokemons: Pokemon[]
}

export default function PokemonGrid({ pokemons }: Props) {
  return (
    <section
      className={S.gridSection}
      aria-labelledby="pokemon-grid-title"
    >
      <h2 id="pokemon-grid-title" className="sr-only">
        포켓몬 리스트
      </h2>
      <div className={S.grid} role="list" aria-label="포켓몬 목록">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} role="listitem">
            <PokemonCard pokemon={pokemon} />
          </div>
        ))}
      </div>
    </section>
  )
}
