export interface Todo {
  id: number
  content: string
  completed: boolean
  userId: number
}

export interface ResponseTodos {
  message: string
  todos: Todo[]
}