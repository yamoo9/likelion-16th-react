import { useState } from 'react'

import { PokemonCard } from '@/components'
import type { CollectionItem as CollectionItemType, Pokemon, } from '@/services/pokemon'
import S from './style.module.css'

interface CollectionItemProps {
  item: CollectionItemType
  pokemon: Pokemon
  onUpdateNickname: (id: string, nickname: string) => Promise<void>
  onRemove: (id: string) => Promise<void>
}

export default function CollectionItem({
  item, pokemon, onUpdateNickname, onRemove,
}: CollectionItemProps) {
  const [editingNickname, setEditingNickname] = useState(false)
  const [nickname, setNickname] = useState(item.nickname || '')

  const handleEditNickname = () => {
    setEditingNickname(true)
  }

  const handleSaveNickname = async () => {
    try {
      await onUpdateNickname(item.id, nickname)
      setEditingNickname(false)
    } catch (error) {
      console.error('별명 업데이트 중 오류 발생:', error)
    }
  }

  const handleRemove = async () => {
    if (window.confirm('정말로 이 포켓몬을 컬렉션에서 제거하시겠습니까?')) {
      try {
        await onRemove(item.id)
      } catch (error) {
        console.error('컬렉션에서 제거 중 오류 발생:', error)
      }
    }
  }

  return (
    <article className={S.collectionItem} role="listitem">
      <PokemonCard pokemon={pokemon} />

      <div className={S.collectionItemActions}>
        {editingNickname ? (
          <div className={S.nicknameEdit}>
            <label htmlFor={`nickname-${item.id}`} className="sr-only">
              포켓몬 별명
            </label>
            <input
              id={`nickname-${item.id}`}
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={S.nicknameInput}
              placeholder="별명 입력"
              aria-label="포켓몬 별명 입력" />
            <button
              onClick={handleSaveNickname}
              className={S.saveButton}
              aria-label="별명 저장"
            >
              저장
            </button>
          </div>
        ) : (
          <div className={S.nickname}>
            {item.nickname ? (
              <span className={S.nicknameText} aria-label="포켓몬 별명">
                별명: {item.nickname}
              </span>
            ) : (
              <span className={S.noNickname} aria-label="별명 없음">
                별명 없음
              </span>
            )}
            <button
              onClick={handleEditNickname}
              className={S.editButton}
              aria-label="별명 수정"
            >
              수정
            </button>
          </div>
        )}

        <div className={S.collectionDate} aria-label="컬렉션 추가일">
          추가일: {new Date(item.addedAt).toLocaleDateString()}
        </div>

        <button
          onClick={handleRemove}
          className={S.removeButton}
          aria-label="컬렉션에서 제거"
        >
          컬렉션에서 제거
        </button>
      </div>
    </article>
  )
}
