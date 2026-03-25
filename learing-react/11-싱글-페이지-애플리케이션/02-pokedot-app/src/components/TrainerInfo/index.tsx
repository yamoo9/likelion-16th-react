import S from './style.module.css'

interface Props {
  name: string
  rank: string
  emoji: string
  collectionCount: number
}

export default function TrainerInfo({
  name,
  rank,
  emoji,
  collectionCount,
}: Props) {
  return (
    <section className={S.trainerInfoSection} aria-label="트레이너 정보">
      <h2 className={S.trainerName}>{name || '트레이너'}</h2>
      <p className={S.trainerRank} aria-label={`트레이너 랭크: ${rank}`}>
        {emoji} {rank} 트레이너
      </p>
      <p className={S.collectionCount} aria-label="수집한 포켓몬 수">
        수집한 포켓몬: {collectionCount}마리
      </p>
    </section>
  )
}
