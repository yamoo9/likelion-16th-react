import styles from './EffectBasic.module.css'

export default function EffectBasic() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Effect 기초 학습</h2>

      <button type="button" className={styles.counterButton}>
        카운트 증가: 0
      </button>

      <p className={styles.statusText}>
        콘솔 로그를 통해 실행 순서를 확인해보세요.
      </p>
    </section>
  )
}
