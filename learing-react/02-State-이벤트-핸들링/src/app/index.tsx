// import Header from '@/components/Header'
// import Footer from '@/components/Footer'
// import Image from '@/components/Image'
// import Section from '@/components/Section'
// import Button from '@/components/Button'

import { Header, Footer, Image, Section, Button } from '@/components'

import S from './style.module.css'

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
          <Button onNoti={() => alert('리액션!')}>Reaction</Button>
          <Button onNoti={() => alert('리액티브!')} isDisabled>
            Reactive
          </Button>
          <Button onNoti={() => alert('리액티비티!')}>Reactivity</Button>
        </div>
      </Section>

      <div data-placeholder />

      <Footer slogan={'모든 이들에게 행복을!'} />
    </div>
  )
}
