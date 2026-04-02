interface Props {
  englishTitle: string
}

export default function SubjectEnglishTitle({ englishTitle }: Props) {
  return (
    <span
      lang="en"
      className="inline-block -translate-y-2.5 text-xl text-slate-500"
    >
      {englishTitle}
    </span>
  )
}
