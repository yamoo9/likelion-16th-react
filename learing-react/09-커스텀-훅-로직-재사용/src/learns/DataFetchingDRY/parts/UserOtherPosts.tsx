import { formatDate } from '@/utils'
import type { Post } from '../types/post'
import S from './PostDetailSection.module.css'

interface Props {
  data?: Post[]
  setPostId?: React.Dispatch<React.SetStateAction<number>>
}

export default function UserOtherPosts({ data, setPostId }: Props) {
  return (
    <ul className={S.otherPostList}>
      {data ? (
        data.map((userPost) => (
          <li key={userPost.id} className={S.otherPostItem}>
            <a
              href=""
              role="button"
              onClick={(e) => {
                e.preventDefault()
                setPostId?.(userPost.id)
              }}
            >
              <span className={S.otherPostTitle}>
                {userPost.title} <span className="sr-only">포스트로 이동</span>
              </span>
              <time dateTime={userPost.createdAt} className={S.otherPostDate}>
                {formatDate(userPost.createdAt)}
              </time>
            </a>
          </li>
        ))
      ) : (
        <p className={S.empty}>다른 포스트는 없습니다.</p>
      )}
    </ul>
  )
}
