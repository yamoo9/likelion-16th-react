import { cn } from '@/utils'

interface Props {
  title: string
  description: string
}

export default function PageSectionTitle({ title, description }: Props) {
  return (
    <header
      className={cn(
        'flex flex-col gap-3 border-l-6 pl-6 transition-colors duration-500',
        'border-foreground',
      )}
    >
      <h2
        className={cn(
          'text-5xl font-black tracking-tighter uppercase md:text-6xl',
          'text-foreground',
        )}
      >
        {title}
      </h2>
      <p className="text-foreground/50 text-lg font-medium tracking-tight">
        {description}
      </p>
    </header>
  )
}
