import { cn } from '@/utils'

interface Props {
  title: {
    ko: string
    en: string
  }
}

export default function SubjectTitle({ title }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5',
        'bg-background min-h-screen',
      )}
    >
      <header>
        <h2
          className={cn('text-foreground text-center text-4xl font-extralight')}
        >
          {title.ko}
          <br />
          <span
            lang="en"
            className="inline-block -translate-y-2.5 text-xl text-slate-500"
          >
            {title.en}
          </span>
        </h2>
      </header>
    </div>
  )
}
