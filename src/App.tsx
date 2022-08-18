import { MouseEvent, useEffect, useState } from 'react'
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

  const resize = (e: MouseEvent) => {
    let drag = e.clientX
    const resizeBlock = document.querySelector('.List_list__G7XT1') as HTMLElement
    document.onmousemove = function onMouseMove(e) {
      resizeBlock.style.width = resizeBlock.offsetWidth + e.clientX - drag + 'px'
      drag = e.clientX
    }
    document.onmouseup = () => (document.onmousemove = document.onmouseup = null)
  }

  return (
    <div className='AppWrapper'>
      <List todos={todos} setTodos={setTodos} resize={resize} />
      <Editor />
    </div>
  )
}

export default App
