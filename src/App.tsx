import React, { MouseEvent, useEffect, useState } from 'react'
import './App.scss'
import List from './components/List'
import Editor from './components/Editor'
import { TodoItem } from './types/types'
import { data } from './initialState'

interface AppContextInterface {
  todos: TodoItem[]
  setTodos: (todos: TodoItem[]) => void
  addTodo: (todo: TodoItem) => void
  todoId: number | null
  setTodoId: (todos: number) => void
}

// создаем контекст, чтобы избежать пропс дриллинга

export const AppContext = React.createContext<AppContextInterface>(null!)

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [todoId, setTodoId] = useState<number | null>(null)
  const initialState = data

  // инициализация приложения и добавление начального состояния в локальное хранилище, если оно пустое

  useEffect(() => {
    const raw = localStorage.getItem('todos') as string
    const parsedTodos = JSON.parse(raw)
    setTodos(parsedTodos || initialState)

    if (!raw) {
      localStorage.setItem('todos', JSON.stringify(initialState))
    }
  }, [])

  // спред оператором раскрываем массив туду и добавляем новое в конец, также перезаписываем информацию в локальном хранилище

  const addTodo = (todo: TodoItem) => {
    const newTodos = [...todos, todo]
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  // находим индекс туду, у которого id совпадает с переданным и с помощью метода сплайс удаляем его из массива

  const deleteTodoById = (id: number, todos: TodoItem[]) => {
    const index = todos.findIndex((todo) => todo.id === id)
    return todos.splice(index, 1)
  }

  // обновляем массив в локальном стейте и локальном хранилище

  const handleDeleteTodo = () => {
    if (!todoId) return

    deleteTodoById(todoId, todos)

    setTodoId(null)

    const restTodos = [...todos]
    setTodos(restTodos)
    localStorage.setItem('todos', JSON.stringify(restTodos))
  }

  // находим задание с помощью метода массива find

  const getTodoById = (id: number, todos: TodoItem[]) => {
    return todos.find((todo) => todo.id === id)
  }

  // функция для изменения ширины списка туду

  const resize = (e: MouseEvent) => {
    // clientX показывает на какой горизонтальной координате произошло событие
    let drag = e.clientX
    // находим ноду списка заданий
    const resizeBlock = document.querySelector('.List_list__G7XT1') as HTMLElement
    document.onmousemove = function onMouseMove(e) {
      // offsetWidth возвращает ширину листа туду. с ее помощью меняем ширину элемента и переводим в строку
      resizeBlock.style.width = resizeBlock.offsetWidth + e.clientX - drag + 'px'
      drag = e.clientX
      // сохраняем полученное значение в локальном хранилище
      localStorage.setItem('width', resizeBlock.style.width.toString())
    }

    // очистка при отпускании кнопки мыши
    document.onmouseup = () => (document.onmousemove = document.onmouseup = null)
  }

  // используем сохраненное значение, чтобы обновление не сбивало ширину элемента

  useEffect(() => {
    const width = localStorage.getItem('width')
    if (width) {
      const resizeBlock = document.querySelector('.List_list__G7XT1') as HTMLElement
      resizeBlock.style.width = width
    }
  }, [])

  const value = {
    todos,
    setTodos,
    addTodo,
    todoId,
    setTodoId,
  }

  return (
    <div className='AppWrapper'>
      <AppContext.Provider value={value}>
        <List todos={todos} resize={resize} />
        <Editor getTodoById={getTodoById} handleDeleteTodo={handleDeleteTodo} />
      </AppContext.Provider>
    </div>
  )
}

export default App
