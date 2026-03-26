import { Link } from 'react-router-dom'

import { getTypeColor, type Colors } from '@/constants/colors'
import type { Pokemon } from '@/services/pokemon'
import S from './style.module.css'

interface Props {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: Props) {
  const { id, name, image, types } = pokemon

  return (
    <Link
      to={`/pokemon/${id}`}
      className={S.card}
      aria-label={`${name} 상세 정보 보기`}
    >
      <figure className={S.imageContainer}>
        <img
          src={image}
          alt={`${name} 이미지`}
          className={S.image}
          loading="lazy" />
      </figure>

      <article className={S.info}>
        <p className={S.id} aria-label="포켓몬 번호">
          #{id.toString().padStart(3, '0')}
        </p>
        <h3 className={S.name}>{name}</h3>
        <ul className={S.types} aria-label="포켓몬 타입">
          {types.map((type) => (
            <li
              key={type}
              className={S.type}
              style={{ backgroundColor: getTypeColor(type as Colors) }}
            >
              {type}
            </li>
          ))}
        </ul>
      </article>
    </Link>
  )
}