import { getTypeColor, type Colors } from '@/constants/colors'
import type { Pokemon } from '@/services/pokemon'
import S from './style.module.css'

interface Props {
  pokemon: Pokemon
}

/**
 * [공통 UI: PokemonCard 컴포넌트]
 * - 포켓몬의 요약 정보를 카드 형태로 표시합니다.
 * - 카드 전체를 클릭하면 해당 포켓몬의 상세 페이지로 이동합니다.
 */
export default function PokemonCard({ pokemon }: Props) {
  const { id, name, image, types } = pokemon

  return (
    /* 
      [React Router 가이드: 동적 경로 이동]
      - Link: 새로고침 없이 페이지를 전환하는 SPA의 핵심 컴포넌트입니다.
      - to: 이동할 경로를 지정합니다. 템플릿 리터럴을 사용하여 
        각 포켓몬의 고유 ID를 경로에 포함시킵니다. (예: /pokemon/1)
      - 이 경로는 App.tsx(또는 라우터 설정)의 path="/pokemon/:id"와 매칭됩니다.
      - 참고: https://reactrouter.com/api/components/Link
    */
    <a
      href={`/pokemon/${id}`}
      className={S.card}
      aria-label={`${name} 상세 정보 보기`}
    >
      {/* 포켓몬 이미지 영역 */}
      <figure className={S.imageContainer}>
        <img
          src={image}
          alt={`${name} 이미지`}
          className={S.image}
          loading="lazy" // 성능 최적화: 화면에 보일 때 이미지를 로드합니다.
        />
      </figure>

      {/* 포켓몬 정보 영역 */}
      <article className={S.info}>
        <p className={S.id} aria-label="포켓몬 번호">
          #{id.toString().padStart(3, '0')}
        </p>
        <h3 className={S.name}>{name}</h3>
        
        {/* 포켓몬 타입 목록 */}
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
    </a>
  )
}
