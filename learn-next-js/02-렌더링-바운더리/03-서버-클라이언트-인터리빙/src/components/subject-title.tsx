import { cn } from '@/utils'
import SubjectEnglishTitle from './subject-english-title'

interface Props {
  title: {
    ko: string
    en: string
  }
}

export default function SubjectTitle({ title }: Props) {
  return (
    <>
      <h1
        className={cn(
          'text-foreground text-center text-4xl font-extralight',
          'selection:bg-foreground selection:text-background',
        )}
      >
        {title.ko}
        <br />
        <SubjectEnglishTitle englishTitle={title.en} />
      </h1>
    </>
  )
}
