import { useEffect, useState } from 'react'
import './App.scss'
import List from './components/List'
import Editor from './components/Editor'
import data from './data'
import { TodoItem } from './types/types'

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])

  useEffect(() => {
    setTodos(data)
  }, [])

  return (
    <div className='AppWrapper'>
      <List todos={todos} setTodos={setTodos} />
      <Editor />
    </div>
  )
}

export default App
