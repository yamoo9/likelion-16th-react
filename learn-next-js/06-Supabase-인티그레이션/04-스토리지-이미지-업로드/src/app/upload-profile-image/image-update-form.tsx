'use client'

import React, { useState, useActionState, useEffect } from 'react'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

import { cn } from '@/utils'
import { uploadProfileActions } from '@/actions/storage-actions'

const initialState = { success: false, message: '', url: '' }

export default function ImageUploadForm() {
  const [preview, setPreview] = useState<string | null>(null)
  const [fileSelected, setFileSelected] = useState(false)

  // 최신 서버 액션 연결
  const [state, formAction, isPending] = useActionState(
    uploadProfileActions,
    initialState,
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      setFileSelected(true)
    } else {
      setPreview(null)
      setFileSelected(false)
    }
  }

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className="space-y-6">
      <form action={formAction} className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            <span className="sr-only">파일 선택</span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isPending}
              className={cn(
                'block w-full text-sm text-slate-500',
                'file:mr-4 file:px-4 file:py-2',
                'file:rounded-full file:border-0',
                'file:text-sm file:font-semibold',
                'file:bg-blue-50 file:text-blue-700',
                'cursor-pointer hover:file:bg-blue-100 disabled:opacity-50',
              )}
            />
          </label>

          {/* 이미지 프리뷰 영역 (이미지 UI와 동일하게 유지) */}
          {(preview || state.url) && !state.success && (
            <div className="relative mx-auto h-72 w-full max-w-75 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <img
                src={state.url || preview || ''}
                alt="Preview"
                className="size-full object-contain"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          aria-disabled={isPending || !fileSelected || state.success}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all',
            'aria-disabled:cursor-not-allowed aria-disabled:bg-slate-100 aria-disabled:text-slate-400',
            isPending
              ? 'bg-slate-100 text-slate-400'
              : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-100',
          )}
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : state.success ? (
            '업로드 완료'
          ) : (
            '프로필 이미지 변경하기 →'
          )}
        </button>
      </form>

      {/* 결과 및 에러 메시지 영역 */}
      {state.message && (
        <div
          className={cn(
            'flex items-start gap-3 rounded-2xl p-4 text-sm animate-in fade-in slide-in-from-top-2',
            state.success
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
              : 'bg-red-50 text-red-700 border border-red-100',
          )}
        >
          {state.success ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          )}

          <div className="flex flex-col gap-2">
            <p className="font-semibold">{state.message}</p>
            
            {/* 성공 시 결과 확인 이미지 */}
            {state.success && state.url && (
              <div className="mt-2 overflow-hidden rounded-lg border border-emerald-200">
                <img 
                  src={state.url} 
                  alt="Uploaded result" 
                  className="max-h-40 w-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
