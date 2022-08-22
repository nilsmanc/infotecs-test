import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import { AppContext } from '../../App'
import { State, TodoItem } from '../../types/types'
import StateButtons from '../StateButtons'
import styles from './Editor.module.scss'

interface EditorProps {
  getTodoById: (id: number, todos: TodoItem[]) => TodoItem | undefined
  handleDeleteTodo: () => void
}

const Editor: React.FC<EditorProps> = ({ getTodoById, handleDeleteTodo }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [state, setState] = useState<State | null>(null)
  const [editMode, setEditMode] = useState(false)

  const { todoId, todos, setTodos } = useContext(AppContext)

  // контролируемые инпуты

  const editTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const editBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  // useMemo для обновления id при его смене

  const todo = useMemo(() => {
    if (todoId) return getTodoById(todoId, todos)
  }, [todoId])

  // если выбран id, устанавливаем значения, связанной с ним задачи

  const setForm = () => {
    if (todo) {
      setTitle(todo.title)
      setBody(todo.body)
      setState(todo.state as State)
    } else {
      setTitle('')
      setBody('')
      setState(null)
    }
  }

  // смена выбранного туду и отключение режима редактирования при переходе к другой задаче

  useEffect(() => {
    setForm()
    setEditMode(false)
  }, [todo])

  // обновление задачи в локальном состоянии и локальном хранилище

  const handleEditing = () => {
    if (!todo) return

    todo.title = title
    todo.body = body
    todo.state = state as State

    setEditMode(false)

    const updatedTodos = [...todos]
    setTodos(updatedTodos)
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  // активирует режим редактирования

  const handleEditMode = () => {
    setEditMode(true)
  }

  return (
    <div className={styles.editForm}>
      <div className={styles.interface}>
        {editMode ? <h2>Edit</h2> : <h2>Todo</h2>}
        {editMode && <StateButtons setState={setState} />}
      </div>
      <input
        disabled={!editMode}
        className={styles.title}
        type='text'
        value={title}
        onChange={editTitle}
      />
      <textarea
        disabled={!editMode}
        className={styles.body}
        value={body}
        onChange={editBody}></textarea>
      <div className={styles.interface}>
        <button disabled={!todo} onClick={handleDeleteTodo} className={styles.deleteButton}>
          Delete
        </button>
        {editMode ? (
          <button className={styles.editButton} onClick={handleEditing}>
            OK
          </button>
        ) : (
          <button disabled={!todo} onClick={handleEditMode} className={styles.editButton}>
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default Editor
