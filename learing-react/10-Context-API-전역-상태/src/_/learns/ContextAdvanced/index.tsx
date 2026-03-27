import { useModal, useTheme } from '@/contexts'
import GrandFather from './parts/GrandFather'
import S from './style.module.css'
import { ConfirmDelete } from '@/components/ConfirmDelete'
import { wait } from '@/utils'

export default function ContextAdvanced() {
  const { toggle } = useTheme()

  const { open } = useModal()

  return (
    <section className={`${S.box} ${S.container}`}>
      <h1 className={S.title}>깊숙히 컴포넌트 Props 전달</h1>
      <button type="button" onClick={toggle}>
        테마 스위치
      </button>
      <button
        type="button"
        onClick={() => {
          open(
            '모달은 전역 상태로 관리해요!',
            <ConfirmDelete
              onConfirm={async () => {
                await wait(600)
                alert('승인')
              }}
              onCancel={() => {
                alert('거절!')
              }}
            />,
          )
        }}
      >
        모달 열기
      </button>
      <GrandFather />
    </section>
  )
}
