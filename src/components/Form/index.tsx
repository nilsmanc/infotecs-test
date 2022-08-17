import { useState } from 'react'
import { TodoItem } from '../../types/types'
import styles from './Form.module.scss'

interface FormProps {
  addItem: (newItem: TodoItem) => void
}

const Form: React.FC<FormProps> = ({ addItem }) => {
  const [isActive, setActive] = useState(false)
  const toggleForm = () => {
    setActive(!isActive)
  }

  const button = (
    <button onClick={toggleForm} className={styles.button}>
      Add Todo
    </button>
  )

  return (
    <form className={styles.form}>
      {!isActive ? (
        button
      ) : (
        <>
          <input className={styles.input} />
          <textarea className={styles.textarea} />
          <button className={styles.button}>Add Todo</button>
        </>
      )}
    </form>
  )
}

export default Form
