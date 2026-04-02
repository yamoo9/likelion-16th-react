import { wait } from '@/utils'

const sneakers = [
  {
    id: 10,
    name: '아디다스 NMD',
    imageUrl: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
    price: 220000,
  },
  {
    id: 11,
    name: '아디다스 이지',
    imageUrl: 'https://i.ibb.co/dJbG1cT/yeezy.png',
    price: 280000,
  },
  {
    id: 12,
    name: '블랙 컨버스',
    imageUrl: 'https://i.ibb.co/bPmVXyP/black-converse.png',
    price: 110000,
  },
  {
    id: 13,
    name: '나이키 화이트 에어포스',
    imageUrl: 'https://i.ibb.co/1RcFPk0/white-nike-high-tops.png',
    price: 160000,
  },
  {
    id: 14,
    name: '나이키 레드 하이 탑',
    imageUrl: 'https://i.ibb.co/QcvzydB/nikes-red.png',
    price: 160000,
  },
  {
    id: 15,
    name: '나이키 브라운 하이 탑',
    imageUrl: 'https://i.ibb.co/fMTV342/nike-brown.png',
    price: 160000,
  },
  {
    id: 16,
    name: '에어 조던 리미티드',
    imageUrl: 'https://i.ibb.co/w4k6Ws9/nike-funky.png',
    price: 190000,
  },
  {
    id: 17,
    name: '팀버랜드',
    imageUrl: 'https://i.ibb.co/Mhh6wBg/timberlands.png',
    price: 200000,
  },
]

export type CartItem = (typeof sneakers)[number]

export default async function Cart() {
  // 지연 시뮬레이션 (클라이언트 컴포넌트 동기 처리 <- 서버 컴포넌트 비동기 (사전에 렌더링된 결과))
  await wait(300)

  return (
    <ul className="flex flex-col gap-2 bg-white p-6 text-slate-800 rounded-xl">
      {sneakers.map((item) => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price.toLocaleString()}원</p>
          <img src={item.imageUrl} alt="" className='h-30' />
        </li>
      ))}
    </ul>
  )
}
