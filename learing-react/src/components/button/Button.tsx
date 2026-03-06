import styles from './Button.module.css'

export default function Button() {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => alert('모든 사용자가 행복해요!!! 🌈')}
    >
      Universal Design
    </button>
  )
}
