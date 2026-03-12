import type { Todo } from "./type"

export const randomSetTodoIsCompleted = (todos: Todo[] = []) => {
  return todos.map((todo) =>
    Math.random() >= 0.5 ? { ...todo, completed: true } : todo,
  )
}
