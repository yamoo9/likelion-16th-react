import S from '../style.module.css'
import Sk from './SkeletonMovieList.module.css'

export default function SkeletonMovieList({ count = 4 }) {
  return (
    <div
      role="status"
      aria-busy="true"
      className={`${S.container} ${S.movieGrid}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div role="presentation" key={index} className={`${S.movieCard} ${Sk.skeletonBase}`}>
          <div className={`${S.posterWrapper} ${Sk.shimmer}`} />
          <div className={S.info}>
            <div className={`${Sk.titleLine} ${Sk.shimmer}`} />
            <div className={`${Sk.descLine}`}>
              <div className={`${Sk.line} ${Sk.shimmer}`} />
              <div className={`${Sk.line} ${Sk.shimmer}`} />
            </div>
            <div className={S.footer}>
              <div className={`${Sk.footerItem} ${Sk.shimmer}`} />
              <div className={`${Sk.footerItem} ${Sk.shimmer}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
