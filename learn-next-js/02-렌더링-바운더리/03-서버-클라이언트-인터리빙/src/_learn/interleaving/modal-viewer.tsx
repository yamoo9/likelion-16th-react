'use client'

import { useState } from 'react'
import { cn } from '@/utils'
import Modal from './modal'
import Product from './product'

export default function ModalViewer({ children }: React.PropsWithChildren) {
  const [isView, setIsView] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsView(true)}
        className={cn(
          'cursor-pointer',
          'inline-flex items-center justify-center',
          'rounded-full px-4 pt-2 pb-2.5 text-sm font-bold leading-none',
          'bg-slate-900 text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]',
          'hover:-translate-y-0.5 hover:bg-slate-800 active:scale-95',
          'focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
          'transition-all duration-200 ease-out',
        )}
      >
        장바구니 열기
      </button>
      {/* 
        [인터리빙의 핵심]
        Modal은 클라이언트 컴포넌트이지만, 그 자식인 서버에서 렌더링된 결과물을 그대로 주입받습니다.
      */}
      <Modal isOpen={isView} onClose={() => setIsView(false)}>
        <Product />
      </Modal>
    </>
  )
}
