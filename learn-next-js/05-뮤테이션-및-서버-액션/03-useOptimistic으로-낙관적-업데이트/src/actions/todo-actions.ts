'use server'

import { isErrorObject, wait } from '@/utils'
import { revalidatePath } from 'next/cache'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * src/database/todos.json 파일을 읽고, 쓰는 함수 작성
 * '할 일 생성/토글' 서버 액션 함수 작성
 */

const filePath = path.join(process.cwd(), 'src/database/todos.json')

// 파일 읽기 함수
export async function getTodos(): Promise<Todo[]> {
  try {
    const jsonString = await readFile(filePath, 'utf-8')
    const todos = jsonString ? JSON.parse(jsonString) : []
    return todos
  } catch (error) {
    console.error('에러 발생:', error)
    return []
  }
}

// 파일 쓰기 함수
export async function setTodos(newTodos: Todo[]) {
  try {
    const jsonString = JSON.stringify(newTodos, null, 2)
    await writeFile(filePath, jsonString, 'utf-8')
  } catch (error) {
    console.error('에러 발생:', error)
    if (isErrorObject(error)) throw error
  }
}

export interface Todo {
  id: number
  title: string
  done: boolean
}

interface TodoResponseResult {
  success: boolean
  payload: Todo | string | null
}

const PROBABILITY_OF_FAILURE = 0.25 // 요청 실패 확률

export async function createTodoAction(formData: FormData): Promise<TodoResponseResult> {
  try {

    // 네트워크 지연 시뮬레이션
    await wait(800)

    // 서버 에러 시뮬레이션
    if (Math.random() > 1 - PROBABILITY_OF_FAILURE) {
      return { success: false, payload: '일시적인 서버 오류로 요청이 중단되었습니다.' }
    }
    
    const title = formData.get('title')?.toString().trim()

    if (!title) {
      throw new Error('제목을 입력해주세요.')
    }

    const todos = await getTodos()

    const newTodo: Todo = {
      id: Date.now(),
      title,
      done: false,
    }

    todos.unshift(newTodo)
    await setTodos(todos)

    // 이 경로('/optimistic-update')에 해당하는 서버 컴포넌트(Page)를 
    // 다시 실행하도록 Next.js에 지시합니다. Page 컴포넌트가 다시 실행되면서 
    // getTodos()로 방금 저장된 최신 데이터를 가져오고, 클라이언트 컴포넌트들에게 
    // 새로운 `initialTodos` props를 전달하게 됩니다.
    revalidatePath('/optimistic-update')
    return { success: true, payload: newTodo }
  } catch (error) {
    console.error('할 일 추가 실패:', error)
    throw isErrorObject(error) ? error : new Error(String(error))
  }
}

export async function toggleTodoAction(todoId: Todo['id']): Promise<TodoResponseResult> {
  try {

    // 네트워크 지연 시뮬레이션
    await wait(800) 

    // 서버 에러 시뮬레이션
    if (Math.random() > 1 - PROBABILITY_OF_FAILURE) {
      return { success: false, payload: '일시적인 서버 오류로 요청이 중단되었습니다.' }
    }

    const todos = await getTodos()
    const todo = todos.find((todo) => todo.id === todoId)

    if (!todo) return { success: false, payload: null }

    todo.done = !todo.done
    await setTodos(todos)

    // 클라이언트의 `initialTodos` props를 최신화하도록 지시합니다.
    revalidatePath('/optimistic-update')
    return { success: true, payload: todo }
  } catch (error) {
    console.error('할 일 토글 실패:', error)
    throw isErrorObject(error) ? error : new Error(String(error))
  }
}
