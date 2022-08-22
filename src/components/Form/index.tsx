import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { AppContext } from '../../App'
import styles from './Form.module.scss'

const Form: React.FC = () => {
  const { addTodo, todos } = useContext(AppContext)

  const [isActive, setActive] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const toggleForm = () => {
    setActive(!isActive)
  }

  // контролируемые инпуты

  const editTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const editBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  // создаем объект нового задания и добавляем его, после этого зачищаем форму

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault()
    const newTodo = {
      id: todos.length + 1,
      title: title,
      body: body,
      state: 'waiting',
    }

    addTodo(newTodo)

    setTitle('')
    setBody('')
    setActive(!isActive)
  }

  const button = (
    <button onClick={toggleForm} className={styles.activateButton}>
      Add Todo
    </button>
  )

  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      {!isActive ? (
        button
      ) : (
        <>
          <input
            type='text'
            className={styles.input}
            value={title}
            onChange={editTitle}
            placeholder='Title'
          />
          <textarea
            className={styles.textarea}
            value={body}
            onChange={editBody}
            placeholder='Text'
          />
          <button disabled={!title} type='submit' className={styles.innerButtons}>
            Add Todo
          </button>
          <button onClick={toggleForm} className={styles.innerButtons}>
            Cancel
          </button>
        </>
      )}
    </form>
  )
}

export default Form
