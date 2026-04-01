import { cn } from '@/utils'
import ModalViewer from './modal-viewer'

export default function InterleavingDemo() {
  return (
    <div
      className={cn(
        'min-h-70 rounded-xl border-2 border-dashed py-6 px-8',
        'flex flex-col items-center justify-center',
        'border-slate-200 bg-slate-50 transition-colors hover:bg-slate-100/50',
      )}
    >
      <div className="space-y-6 text-center">
        <section className="space-y-2">
          <h2
            className={cn(
              'text-2xl md:text-3xl font-light tracking-normal',
              'text-foreground',
            )}
          >
            인터리빙
          </h2>
          <p
            className={cn(
              'max-w-md mx-auto text-sm leading-relaxed',
              'font-normal text-foreground/70',
            )}
          >
            클라이언트 컴포넌트가 서버 컴포넌트를 자식으로 받아<br />
            렌더링하는 최적화 구조를 말합니다.
          </p>
        </section>
        <ModalViewer />
      </div>
    </div>
  )
}
