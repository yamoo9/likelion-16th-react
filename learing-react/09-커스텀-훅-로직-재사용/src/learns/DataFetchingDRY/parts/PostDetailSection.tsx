import { useState, useEffect } from 'react'
import { formatDate } from '@/utils'
import S from './PostDetailSection.module.css'

// API 참고
// - https://koreandummyjson.vercel.app/docs/posts

interface Post {
  id: number
  title: string
  content: string
  imgUrl: string
  createdAt: string
  userId: number
}

interface Comment {
  postId: number
  commentId: number
  content: string
  createdAt: string
}

interface ResponsePostData {
  message: string
  post: Post
}

interface ResponseCommentsData {
  message: string
  comments: Comment[]
}

interface ResponseUserPostsData {
  message: string
  posts: Post[]
}

const getEndpoint = (path: string) => `${import.meta.env.VITE_API_URL}${path}`

// -----------------------------------------------------------------------------
// 현재 작성된 코드 문제 검토
// -----------------------------------------------------------------------------
// - [상태 파편화]
//    isPostLoading, isCommentsLoading, isUserPostsLoading 등
//    유사한 상태 변수가 너무 많아 컴포넌트 코드가 비대해졌습니다. (현재 약 150라인)
// - [동일 패턴의 반복]
//    AbortController 생성, isLoading/Error 상태 관리,
//    try-catch-finally 블록의 구조가 90% 이상 일치합니다.
// - [유지보수 어려움]
//    현재 작동에 문제는 없지만, API 호출 방식(예: 헤더 추가)이 변경될 경우
//    아래 코드는 호출이 사용된 세 군데를 모두 수정해야 합니다.
// -----------------------------------------------------------------------------

export default function PostDetailSection() {
  const [postId, setPostId] = useState(1)

  // 중복 로직 1: 포스트 상세 정보
  const [post, setPost] = useState<Post | null>(null)
  const [isPostLoading, setIsPostLoading] = useState(false)
  const [postError, setPostError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchPost = async () => {
      setIsPostLoading(true)
      setPostError(null)

      try {
        const response = await fetch(getEndpoint(`/api/posts/${postId}`), {
          signal,
        })

        if (!response.ok) throw new Error('포스트를 불러오지 못했습니다.')

        const responseData: ResponsePostData = await response.json()
        setPost(responseData.post)
      } catch (error) {
        const isError = error instanceof Error
        if (isError && error.name === 'AbortError') return
        const errorMessage = isError ? error.message : '알 수 없는 에러 발생'
        setPostError(errorMessage)
      } finally {
        if (!signal.aborted) setIsPostLoading(false)
      }
    }

    fetchPost()

    return () => {
      controller.abort()
    }
  }, [postId])

  // 중복 로직 2: 댓글 목록
  const [comments, setComments] = useState<Comment[]>([])
  const [isCommentsLoading, setIsCommentsLoading] = useState(false)
  const [commentsError, setCommentsError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const fetchComments = async () => {
      setIsCommentsLoading(true)

      try {
        const response = await fetch(
          getEndpoint(`/api/posts/${postId}/comments`),
          { signal },
        )

        if (!response.ok) throw new Error('댓글을 불러오지 못했습니다.')

        const responseData: ResponseCommentsData = await response.json()
        setComments(responseData.comments)
      } catch (error) {
        const isError = error instanceof Error
        if (isError && error.name === 'AbortError') return
        const errorMessage = isError ? error.message : '알 수 없는 에러 발생'
        setCommentsError(errorMessage)
      } finally {
        if (!signal.aborted) setIsCommentsLoading(false)
      }
    }

    fetchComments()

    return () => {
      controller.abort()
    }
  }, [postId])

  // 중복 로직 3: 작성자의 다른 글 (post.userId가 있을 때만 실행)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [isUserPostsLoading, setIsUserPostsLoading] = useState(false)
  const [userPostsError, setUserPostsError] = useState<string | null>(null)

  useEffect(() => {
    if (!post?.userId) return

    const controller = new AbortController()
    const { signal } = controller

    const fetchUserPosts = async () => {
      setIsUserPostsLoading(true)

      try {
        const res = await fetch(
          getEndpoint(`/api/posts?userId=${post.userId}`),
          { signal },
        )

        const responseData = (await res.json()) as ResponseUserPostsData
        // 현재 보고 있는 글은 제외하고 필터링
        const otherPosts = responseData.posts.filter(
          (post) => post.id !== postId,
        )
        setUserPosts(otherPosts)
      } catch (error) {
        const isError = error instanceof Error
        if (isError && error.name === 'AbortError') return
        const errorMessage = isError ? error.message : '알 수 없는 에러 발생'
        setUserPostsError(errorMessage)
      } finally {
        if (!controller.signal.aborted) setIsUserPostsLoading(false)
      }
    }
    fetchUserPosts()
    return () => controller.abort()
  }, [post?.userId, postId])

  return (
    <section className={S.container}>
      <header className={S.header}>
        <h2 className={S.title}>커뮤니티 포스트</h2>
        <nav className={S.pagination} aria-label="포스트 탐색">
          <a
            href={`/posts/${Math.max(1, postId - 1)}`}
            role="button"
            aria-disabled={postId < 2}
            className={S.navLink}
            aria-label="이전 포스트로 이동"
            title="이전 포스트로 이동"
            onClick={(e) => {
              e.preventDefault()
              if (postId < 2) return
              setPostId((postId) => Math.max(1, postId - 1))
            }}
          >
            ←
          </a>
          <span className={S.idBadge}>
            <span className="sr-only">현재 포스트 ID:</span> {postId}
          </span>
          <a
            href={`/posts/${postId + 1}`}
            role="button"
            className={S.navLink}
            aria-label="다음 포스트로 이동"
            title="다음 포스트로 이동"
            onClick={(e) => {
              e.preventDefault()
              setPostId((postId) => postId + 1)
            }}
          >
            →
          </a>
        </nav>
      </header>

      <div className={S.mainLayout}>
        <section className={S.contentArea}>
          <article className={S.postCard}>
            {isPostLoading ? (
              <div role="status" className={S.skeleton}>
                포스트 로딩 중...
              </div>
            ) : postError ? (
              <div role="alert" className={S.errorBox}>
                {postError}
              </div>
            ) : (
              post && (
                <>
                  <h3 className={S.postTitle}>{post.title}</h3>
                  <div className={S.postMeta}>
                    <span>작성자 ID: {post.userId}</span>
                    <span aria-hidden="true">•</span>
                    <time dateTime={post.createdAt}>
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                  <p className={S.postContent}>{post.content}</p>
                </>
              )
            )}
          </article>

          <article className={S.commentSection}>
            <h3 className={S.sectionTitle}>댓글 ({comments.length})</h3>
            {isCommentsLoading ? (
              <div role="status" className={S.skeleton}>
                댓글 로딩 중...
              </div>
            ) : commentsError ? (
              <div role="alert" className={S.errorBox}>
                {commentsError}
              </div>
            ) : (
              <ul className={S.commentList}>
                {comments.map((comment) => (
                  <li key={comment.commentId} className={S.commentItem}>
                    <div className={S.commentHeader}>
                      <span className={S.commentUser}>
                        댓글 #{comment.commentId}
                      </span>
                      <time
                        dateTime={comment.createdAt}
                        className={S.commentDate}
                      >
                        {formatDate(comment.createdAt)}
                      </time>
                    </div>
                    <p className={S.commentText}>{comment.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </section>

        <aside className={S.sidebar}>
          <article className={S.sidebarCard}>
            <h3 className={S.sectionTitle}>작성자의 다른 포스트</h3>
            {isUserPostsLoading ? (
              <div className={S.skeleton}>포스트 리스트 로딩 중...</div>
            ) : userPostsError ? (
              <div role="alert" className={S.errorBox}>
                {userPostsError}
              </div>
            ) : (
              <ul className={S.otherPostList}>
                {userPosts.length > 0 ? (
                  userPosts.map((userPost) => (
                    <li key={userPost.id} className={S.otherPostItem}>
                      <a
                        href=""
                        role="button"
                        onClick={(e) => {
                          e.preventDefault()
                          setPostId(userPost.id)
                        }}
                      >
                        <span className={S.otherPostTitle}>
                          {userPost.title}{' '}
                          <span className="sr-only">포스트로 이동</span>
                        </span>
                        <time
                          dateTime={userPost.createdAt}
                          className={S.otherPostDate}
                        >
                          {formatDate(userPost.createdAt)}
                        </time>
                      </a>
                    </li>
                  ))
                ) : (
                  <p className={S.empty}>다른 포스트는 없습니다.</p>
                )}
              </ul>
            )}
          </article>
        </aside>
      </div>
    </section>
  )
}
