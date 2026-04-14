import { cn } from '@/lib/utils'
import { ImageUp } from 'lucide-react'

import ImageUploadForm from './image-update-form'

export default function StoragePage() {
  return (
    <section className="flex flex-col items-center justify-center space-y-10 p-10 pt-22">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          스토리지 이미지 업로드
        </h1>
        <p className="text-slate-500">
          Supabase Storage를 활용한 파일 관리 및 보안 정책 실습
        </p>
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-8">
        <div
          className={cn(
            'w-full rounded-[40px] bg-white p-10',
            'border border-blue-100 shadow-[0_20px_50px_rgba(0,100,255,0.05)]',
            'flex flex-col space-y-6',
          )}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <ImageUp className="size-7 text-blue-500" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">이미지 업로드</h2>
            <p className="leading-relaxed text-slate-500">
              파일을 선택하여 버킷에 업로드하고,
              생성된 Public URL을 확인합니다.
            </p>
          </div>

          <ImageUploadForm />
        </div>
      </div>
    </section>
  )
}
