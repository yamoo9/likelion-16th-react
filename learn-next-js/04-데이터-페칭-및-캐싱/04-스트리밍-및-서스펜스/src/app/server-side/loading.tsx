import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <>
      {/* <PokemonSkeleton /> */}
      <Spinner>포켓몬 데이터 로딩 중...</Spinner>
    </>
  )
}
