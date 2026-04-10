'use server'

import { isErrorObject } from '@/utils'
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
  } catch(error) {
    console.error('에러 발생:', error)
    return []
  }
}

// 파일 쓰기 함수
export async function setTodos(newTodos: Todo[]) {
  try {
    const jsonString = JSON.stringify(newTodos, null, 2)
    await writeFile(filePath, jsonString, 'utf-8')
  } catch(error) {
    console.error('에러 발생:', error)
    if (isErrorObject(error)) throw error
  }
}

export interface Todo {
  id: number
  title: string
  done: boolean
}
