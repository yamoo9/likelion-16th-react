// API 엔드포인트(Endpoint)
const { VITE_API_URL: API_URL } = import.meta.env

// 응답 데이터 타입 지정
interface ResponseTodosData {
  message: string
  todos: Todo[]
}

export interface Todo {
  id: number
  content: string
  completed: boolean
  userId: number
}

export const getTodos = async (userId: string, options?: RequestInit): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_URL}/api/todos?userId=${userId}`, options)
    const data: ResponseTodosData = await response.json()
    return data.todos
  } catch(error) {
    throw error instanceof Error ? error : new Error(String(error))
  }
}

export const getRandomCompletedTodos = (todos: Todo[]): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    completed: Math.random() >= 0.5,
  }))
