'use client'

import { useToast } from '@/contexts/toast-context'
import { cn } from '@/utils'
import { AlertTriangle, ShoppingBag } from 'lucide-react'

export default function ProductActions({children}: React.PropsWithChildren) {

  const { toast } = useToast()
  

  const handlePutInCart = () => {
    // toast 함수 호출
    // - 장바구니 담기 완료
    // - 선택하신 상품이 장바구니에 성공적으로 담겼습니다.
    // - success
    // console.log('장바구니 담기')
    toast(
      '장바구니 담기 완료',
      '선택한 상품이 장바구니에 성공적으로 담겼습니다',
      'success',
    )
  }

  const handlePayment = () => {
    // toast 함수 호출
    // - 결제 오류
    // - 네트워크 연결 상태를 확인한 후 다시 시도해주세요.
    // - error
    // console.log('결제하기')
    toast(
      '결제 오류',
      '네트워크 연결 상태를 확인한 후 다시 시도해주세요',
      'error',
    )
  }

  return (
    <div className="flex flex-wrap gap-1 rounded-full border border-slate-300 bg-white p-1 shadow-sm">

      {children}

      <button
        type="button"
        onClick={handlePutInCart}
        className={cn(
          'cursor-pointer',
          'flex items-center gap-2 rounded-l-full px-6 py-3 font-bold transition-all',
          'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95',
          'shadow-lg shadow-emerald-100',
        )}
      >
        <ShoppingBag aria-hidden="true" className="h-4 w-4" />
        장바구니 담기
      </button>

      <button
        type="button"
        onClick={handlePayment}
        className={cn(
          'cursor-pointer',
          'flex items-center gap-2 rounded-r-full px-6 py-3 font-bold transition-all',
          'bg-slate-700 text-white hover:bg-black active:scale-95',
          'shadow-lg shadow-slate-200',
        )}
      >
        <AlertTriangle aria-hidden="true" className="h-4 w-4" />
        결제하기
      </button>
    </div>
  )
}
