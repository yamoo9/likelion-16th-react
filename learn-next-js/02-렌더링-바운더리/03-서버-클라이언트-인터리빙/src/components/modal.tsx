'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { LucidePlay, LucideX } from 'lucide-react'
import { cn } from '@/utils'

interface Props {
  children?: React.ReactNode
}

export default function Modal({ children }: Props) {
  const [isShow, setIsShow] = useState(false)

  const handleOpen = () => {
    // console.log('오픈 모달 다이얼로그')
    setIsShow(true)
  }

  const handleClose = () => {
    // console.log('클로즈 모달 다이얼로그')
    setIsShow(false)
  }

  // const modalElement = useMemo(
  //   () =>
  //     createPortal(
  //       <div
  //         data-dim="액티비티"
  //         className={cn(
  //           'fixed inset-0 z-50 flex items-center justify-center',
  //           'bg-slate-900/40 backdrop-blur-md transition-opacity',
  //         )}
  //       >
  //         <div
  //           role="modal"
  //           aria-modal="true"
  //           className={cn(
  //             'relative',
  //             'max-h-100 min-h-70 max-w-1/2 min-w-120',
  //             'bg-white text-slate-800',
  //             'rounded-xl p-10 shadow-2xl',
  //           )}
  //         >
  //           <div className="my-5 h-80 w-full overflow-y-auto">{children}</div>
  //           <button
  //             type="button"
  //             aria-label="닫기"
  //             onClick={handleClose}
  //             className={cn(
  //               'absolute top-4 right-4 rounded-full p-1',
  //               'text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600',
  //             )}
  //           >
  //             <LucideX />
  //           </button>
  //         </div>
  //       </div>,
  //       document.body,
  //     ),
  //   [children],
  // )

  return (
    <>
      <button
        type="button"
        aria-label="열기"
        onClick={handleOpen}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'cursor-pointer rounded-xl border border-sky-100 bg-white p-3 text-sky-600 shadow-sm',
          'transition-all hover:bg-sky-50 hover:shadow-md active:scale-95',
          'outline-sky-600 focus-visible:outline-offset-4',
        )}
      >
        <LucidePlay />
      </button>

      {/* Vue.js v-show 디렉티브(지시어) (DOM에 있음 감춰줬을 뿐) */}
      {/* <Activity mode={isShow ? 'visible' : 'hidden'}> */}
        {/* {modalElement} */}

        {/* <div
          data-dim="액티비티"
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center',
            'bg-slate-900/40 backdrop-blur-md transition-opacity',
          )}
        >
          <div
            role="modal"
            aria-modal="true"
            className={cn(
              'relative',
              'max-h-100 min-h-70 max-w-1/2 min-w-120',
              'bg-white text-slate-800',
              'rounded-xl p-10 shadow-2xl',
            )}
          >
            <div className='w-full h-80 overflow-y-auto my-5'>{children}</div>
            <button
              type="button"
              aria-label="닫기"
              onClick={handleClose}
              className={cn(
                'absolute top-4 right-4 rounded-full p-1',
                'text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600',
              )}
            >
              <LucideX />
            </button>
          </div>
        </div> */}
      {/* </Activity> */}

      {/* Vue.js v-if 디렉티브(지시어) (DOM에 없음, 실질적인 조건부 렌더링) */}
      {isShow &&
        createPortal(
          <div
            data-dim="조건부 렌더링"
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center',
              'bg-slate-900/40 backdrop-blur-md transition-opacity',
            )}
          >
            <div
              role="modal"
              aria-modal="true"
              className={cn(
                'relative',
                'max-h-100 min-h-70 max-w-1/2 min-w-120',
                'bg-white text-slate-800',
                'rounded-xl p-10 shadow-2xl',
              )}
            >
              <div className="my-5 h-80 w-full overflow-y-auto">{children}</div>
              <button
                type="button"
                aria-label="닫기"
                onClick={handleClose}
                className={cn(
                  'absolute top-4 right-4 rounded-full p-1',
                  'text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600',
                )}
              >
                <LucideX />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
