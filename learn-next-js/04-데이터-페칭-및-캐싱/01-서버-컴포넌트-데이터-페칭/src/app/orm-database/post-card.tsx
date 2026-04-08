import { Hash, User, ExternalLink } from 'lucide-react'
import { cn } from '@/utils'

export interface Post {
  id: number
  title: string
  content: string
  published: boolean
  authorId: number
}

interface Props {
  post: Post
  authorName: string
}


export function PostCard({ post, authorName }: Props) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10',
        'flex flex-col gap-4',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Hash size={14} className="mt-0.5" />
          <span className="text-xs font-bold tracking-wider">
            {String(post.id).padStart(3, '0')}
          </span>
        </div>
        <div
          className={cn(
            'h-2 w-2 rounded-full',
            post.published ? 'animate-pulse bg-emerald-400' : 'bg-slate-300',
          )}
        />
      </div>

      <div className="space-y-2">
        <h3
          className={cn(
            'text-xl leading-tight font-bold text-slate-900',
            'transition-colors group-hover:text-indigo-600',
          )}
        >
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
          {post.content}
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-4">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 ring-inset">
            #Prisma
          </span>
          <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-700/10 ring-inset">
            #Next.js
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <User size={14} />
            </div>
            <span className="text-xs font-semibold text-slate-700">
              {authorName}
            </span>
          </div>
          <button className="text-slate-400 transition-colors hover:text-indigo-600">
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
