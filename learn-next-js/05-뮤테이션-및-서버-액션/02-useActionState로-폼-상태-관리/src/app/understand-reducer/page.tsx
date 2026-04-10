'use client'

import { UseReducerVersion } from "./use-reducer-version"

const INITIAL_TODOS = [
  { id: 1775788128446, doit: '리듀서 함수 공부하기' },
  { id: 1775788134581, doit: 'useStateAction 훅 공부하기' },
]

export type Todo = (typeof INITIAL_TODOS)[number]



export default function UnderstandReducerPage() {
  
  return (
    <section className="flex flex-col gap-10 p-10">
      <h1 className="text-5xl font-bold text-blue-600">리듀서 이해하기</h1>
      <UseReducerVersion initialTodos={INITIAL_TODOS} />
    </section>
  )
}
