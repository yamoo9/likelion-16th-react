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
  await wait(300)

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 px-2 text-slate-900">장바구니 ({sneakers.length})</h2>
      <ul className="flex flex-col gap-3 bg-slate-50 p-4 text-slate-800 rounded-2xl shadow-inner">
        {sneakers.map((item) => (
          <li 
            key={item.id} 
            className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover mix-blend-multiply" 
              />
            </div>

            <div className="grow">
              <h3 className="font-semibold text-slate-900 leading-tight mb-1">
                {item.name}
              </h3>
              <p className="text-blue-600 font-bold">
                {item.price.toLocaleString()}원
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}