import { ClientComponent, ServerComponent } from '@/_learn'

import { cn } from '@/utils'
import Cart from '@/components/cart' // 서버 컴포넌트
import Modal from '@/components/modal' // 클라이언트 컴포넌트

export default function Page() {

  // 서버 컴포넌트 또는 클라이언트 컴포넌트에 서로를 포함해보세요.
  // 어떤 일이 일어나는지 확인하고, 문제가 발생한다면 해결 방법도 살펴봅시다.

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5',
        'bg-background min-h-screen',
      )}
    >
      <header hidden>
        <h1
          className={cn(
            'text-foreground text-center text-4xl font-extralight',
            'selection:bg-foreground selection:text-background',
          )}
        >
          인터리빙
          <br />
          <span
            lang="en"
            className="inline-block -translate-y-2.5 text-xl text-slate-500"
          >
            Interleaving
          </span>
        </h1>
      </header>

      <main className="flex flex-col gap-5 overflow-hidden transform-3d">
        
        {/* 클라이언트 컴포넌트 (동기 처리, 이벤트 핸들링, 상태 관리 등) */}
        <Modal>
          {/* 서버 컴포넌트 (비동기 처리, 사전 렌더링, 서버 데이터 가져오기 등) */}
          <Cart />
        </Modal>

        <ClientComponent hidden>
          {/* <slot></slot> <- props.children */}
          <ServerComponent />
        </ClientComponent>
      </main>
    </div>
  )
}