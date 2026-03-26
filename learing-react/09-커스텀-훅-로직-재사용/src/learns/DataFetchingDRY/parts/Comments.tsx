import { formatDate } from '@/utils'
import type { Comment } from '../types/post'
import S from './PostDetailSection.module.css'

interface Props {
  data?: Comment[]
}

export default function Comments({ data }: Props) {

  if (!data) return null

  return (
    <ul className={S.commentList}>
      {data?.map((comment) => (
        <li key={comment.commentId} className={S.commentItem}>
          <div className={S.commentHeader}>
            <span className={S.commentUser}>댓글 #{comment.commentId}</span>
            <time dateTime={comment.createdAt} className={S.commentDate}>
              {formatDate(comment.createdAt)}
            </time>
          </div>
          <p className={S.commentText}>{comment.content}</p>
        </li>
      ))}
    </ul>
  )
}
