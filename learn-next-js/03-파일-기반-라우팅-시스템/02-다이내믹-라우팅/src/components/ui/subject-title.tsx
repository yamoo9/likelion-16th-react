/**
 * [타입 정의] SubjectTitleProps
 * @param title - 국문(ko)과 영문(en) 제목을 포함하는 객체
 */
interface Props {
  title: {
    ko: string
    en: string
  }
}

/**
 * [UI 컴포넌트] SubjectTitle
 * 페이지의 중앙에 위치하여 국문과 영문 제목을 표시합니다.
 */
export default function SubjectTitle({ title }: Props) {
  return (
    <div className="bg-background flex flex-col items-center justify-center gap-5">
      <header>
        <h2 className="text-foreground text-center text-4xl font-extralight">
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
