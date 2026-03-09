import S from './style.module.css'

export default function VirtualDOM() {
  return (
    <section className={S.wrapper}>
      <h2 className={S.heading}>
        가상(Virtual){' '}
        <dfn>
          <abbr title="Document Object Model">DOM</abbr>
        </dfn>{' '}
        & 배칭(Batching)
      </h2>
    </section>
  )
}
