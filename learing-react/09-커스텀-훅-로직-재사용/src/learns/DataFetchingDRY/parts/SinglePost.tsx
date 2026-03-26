import { formatDate } from '@/utils'
import type { Post } from '../types/post'
import S from './PostDetailSection.module.css'

interface Props {
  data?: Post
}

export default function SinglePost({ data }: Props) {

  if (!data) return null

  return (
    <>
      <h3 className={S.postTitle}>{data.title}</h3>
      <div className={S.postMeta}>
        <span>작성자 ID: {data.userId}</span>
        <span aria-hidden="true">•</span>
        <time dateTime={data.createdAt}>
          {formatDate(data.createdAt)}
        </time>
      </div>
      <p className={S.postContent}>{data.content}</p>
    </>
  )
}
