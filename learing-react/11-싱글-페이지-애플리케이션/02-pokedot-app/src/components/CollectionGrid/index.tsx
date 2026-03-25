import { CollectionItem } from '@/components'
import type { CollectionItem as CollectionItemType, Pokemon } from '@/services/pokemon'
import S from './style.module.css'

interface Props {
  collection: CollectionItemType[]
  pokemons: Map<number, Pokemon>
  onUpdateNickname: (id: string, nickname: string) => Promise<void>
  onRemove: (id: string) => Promise<void>
  emptyMessage: string
}

export default function CollectionGrid({
  collection,
  pokemons,
  onUpdateNickname,
  onRemove,
  emptyMessage,
}: Props) {
  if (collection.length === 0) {
    return (
      <div className={S.emptyState} role="status">
        {emptyMessage}
      </div>
    )
  }

  return (
    <section className={S.collectionSection} aria-labelledby="collection-title">
      <h2 id="collection-title" className="sr-only">
        포켓몬 컬렉션
      </h2>
      <div
        className={S.collectionGrid}
        role="list"
        aria-label="포켓몬 컬렉션 목록"
      >
        {collection.map((item) => {
          const pokemon = pokemons.get(Number(item.pokemonId))
          if (!pokemon) return null

          return (
            <CollectionItem
              key={item.id}
              item={item}
              pokemon={pokemon}
              onUpdateNickname={onUpdateNickname}
              onRemove={onRemove}
            />
          )
        })}
      </div>
    </section>
  )
}
