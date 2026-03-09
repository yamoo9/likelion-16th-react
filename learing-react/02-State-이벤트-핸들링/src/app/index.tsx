import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Image from '@/components/Image'
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

      <div data-placeholder />

      <Footer slogan={'모든 이들에게 행복을!'} />
    </div>
  )
}
