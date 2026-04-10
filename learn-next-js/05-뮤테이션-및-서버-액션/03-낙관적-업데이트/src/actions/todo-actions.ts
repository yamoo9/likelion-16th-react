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

export async function createTodoAction(formData: FormData) {
  try {
    const title = formData.get('title')?.toString().trim()

    if (!title) {
      throw new Error('제목을 입력해주세요.')
    }

    await wait(800)

    const todos = await getTodos()

    const newTodo: Todo = {
      id: Date.now(),
      title,
      done: false,
    }

    todos.unshift(newTodo)
    await setTodos(todos)

    revalidatePath('/optimistic-update')
    return newTodo
  } catch (error) {
    console.error('할 일 추가 실패:', error)
    throw isErrorObject(error) ? error : new Error(String(error))
  }
}


export async function toggleTodoAction(todoId: Todo['id']) {
  try {
    await wait(800)

    const todos = await getTodos()
    const todo = todos.find(todo => todo.id === todoId)

    if (!todo) throw new Error(`"${todoId}"와 일치하는 할 일이 없습니다.`)
    
    todo.done = !todo.done
    await setTodos(todos)
    revalidatePath('/optimistic-update')
    return todo
  } catch(error) {
    console.error('할 일 토글 실패:', error)
    throw isErrorObject(error) ? error : new Error(String(error))
  }
}