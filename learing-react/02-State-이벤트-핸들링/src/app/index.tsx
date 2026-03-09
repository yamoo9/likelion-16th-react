import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from '@/components/Image'
import S from './style.module.css'
import Section from '@/components/Section'
import Button from '@/components/Button'

export default function App() {
  return (
    <div className={S.container}>
      <Header>
        <h2 className={S.imageWrapper}>
          <Image src="/react.svg" alt="" width={32} height={32} />
          컴포넌트 디자인
        </h2>
      </Header>

      <Section title="리액트는 리액션(반응)!" isShowTitle>
        <p>리액트는 사용자의 행동에 따라 리액션을 제공한다.</p>
        <div
          lang="en"
          style={{ display: 'flex', gap: 6, marginBlockStart: 12 }}
        >
          <Button>Reaction</Button>
          <Button isDisabled>Reactive</Button>
          <Button>Reactivity</Button>
        </div>
      </Section>

      <div data-placeholder />

      <Footer slogan={'모든 이들에게 행복을!'} />
    </div>
  )
}
