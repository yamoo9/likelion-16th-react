import { useState } from 'react'
import { wait } from '@/utils'
import S from './style.module.css'

export default function PostPage() {
  // useModal 커스텀 훅을 사용해 모달 다이얼로그를 띄워봅니다.

  const [isDelete, setIsDelete] = useState(false)

  // 포스트 삭제 시뮬레이션 함수
  const deletePostApi = async () => {
    await wait(1500)
    setIsDelete(true)
    console.log('게시물이 성공적으로 삭제되었습니다.')
  }

  const handleOpenDeleteModal = () => {
    // '포스트 삭제 확인' 다이얼로그를 화면에 띄우세요.
    // ConfirmDelete 컴포넌트를 설정합니다.

    // 사용자가 확인하면 deletePostApi 함수를 실행하도록 설정하세요.
    // 사용자가 취소하면 모달 다이얼로그를 닫습니다. 
    deletePostApi()
  }

  return (
    <main className={S.container}>
      <h1>블로그 포스트</h1>

      <div className={S.postCard}>
        {isDelete ? (
          <p>포스트가 성공적으로 삭제되었습니다.</p>
        ) : (
          <>
            <p>리액트 19의 새로운 기능들을 알아봅시다.</p>
            <p>
              특히 <code>startTransition</code>과 <code>useTransition</code>을
              활용하면 사용자 경험을 해치지 않고도 무거운 작업을 부드럽게 처리할
              수 있습니다.
            </p>

            <button
              type="button"
              className={S.deleteButton}
              onClick={handleOpenDeleteModal}
            >
              포스트 삭제
            </button>
          </>
        )}
      </div>
    </main>
  )
}
