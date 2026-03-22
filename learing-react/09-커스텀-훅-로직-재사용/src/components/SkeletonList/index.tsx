import S from './style.module.css'

interface Props {
  count?: number
  color?: string
}

export default function ListSkeleton({ count = 3, color }: Props) {
  return (
    <div className={S.skeletonList}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={S.skeletonItem}
          style={color ? { '--skeleton-color': color } : undefined}
        >
          <div className={S.lineTitle} />
          <div className={S.lineBody} />
          <div className={S.lineBody} />
        </div>
      ))}
    </div>
  )
}
