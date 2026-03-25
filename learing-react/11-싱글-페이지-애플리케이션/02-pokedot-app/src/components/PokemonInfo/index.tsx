import { getTypeColor, type Colors } from '@/constants/colors'
import type { Pokemon } from '@/services/pokemon'
import S from './style.module.css'

interface PokemonInfoProps {
  pokemon: Pokemon
}

export default function PokemonInfo({ pokemon }: PokemonInfoProps) {
  return (
    <section className={S.infoSection} aria-labelledby="pokemon-info">
      <header className={S.header}>
        <h2 id="pokemon-info" className={S.name}>
          {pokemon.name}
        </h2>
        <div className={S.id} aria-label="포켓몬 번호">
          #{pokemon.id.padStart(3, '0')}
        </div>
      </header>

      <div className={S.content}>
        <div className={S.imageSection}>
          <img
            src={pokemon.image}
            alt={`${pokemon.name} 이미지`}
            className={S.image}
          />
          <div className={S.types} aria-label="포켓몬 타입">
            {pokemon.types.map((type) => (
              <span
                key={type}
                className={S.type}
                style={{ backgroundColor: getTypeColor(type as Colors) }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className={S.detailsSection}>
          <p className={S.description}>{pokemon.description}</p>

          <div className={S.infoGrid} role="list" aria-label="포켓몬 상세 정보">
            <div className={S.infoItem} role="listitem">
              <span className={S.infoLabel}>분류</span>
              <span className={S.infoValue}>{pokemon.genus}</span>
            </div>
            <div className={S.infoItem} role="listitem">
              <span className={S.infoLabel}>키</span>
              <span className={S.infoValue}>
                {(pokemon.height / 10).toFixed(2)}m
              </span>
            </div>
            <div className={S.infoItem} role="listitem">
              <span className={S.infoLabel}>몸무게</span>
              <span className={S.infoValue}>
                {(pokemon.weight / 10).toFixed(2)}kg
              </span>
            </div>
            <div className={S.infoItem} role="listitem">
              <span className={S.infoLabel}>성별</span>
              <span className={S.infoValue}>{pokemon.gender}</span>
            </div>
            <div className={S.infoItem} role="listitem">
              <span className={S.infoLabel}>특성</span>
              <span className={S.infoValue}>
                {pokemon.abilities.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
