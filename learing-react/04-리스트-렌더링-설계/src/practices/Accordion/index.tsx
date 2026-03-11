import S from './style.module.css'

const FAQ_DATA = [
  {
    id: 'q1',
    question: '환불 규정은 어떻게 되나요?',
    answer: '구매 후 7일 이내 가능합니다.',
  },
  {
    id: 'q2',
    question: '배송 기간은 얼마나 걸리나요?',
    answer: '평균 2~3일 소요됩니다.',
  },
  {
    id: 'q3',
    question: '아이디를 잊어버렸어요.',
    answer: '고객센터로 문의 바랍니다.',
  },
]

export default function Accordion() {
  return (
    <section className={S.container}>
      <h2 className="sr-only">자주 묻는 질문</h2>
    </section>
  )
}
