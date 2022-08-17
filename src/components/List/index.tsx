import { useState } from 'react'
import { TodoItem } from '../../types/types'
import Form from '../Form'
import Item from '../Item'
import SearchForm from '../SearchForm'
import styles from './List.module.scss'

interface ListProps {
  todos: TodoItem[]
  setTodos: (todos: TodoItem[]) => void
}

const List: React.FC<ListProps> = ({ todos, setTodos }) => {
  const [request, setRequest] = useState('')
  const addItem = (todo: TodoItem) => {
    setTodos([...todos, todo])
  }
  return (
    <div className={styles.list}>
      <SearchForm searchRequest={request} setRequest={setRequest} />
      <div className={styles.items}>
        <div>
          {todos.map((todo) => {
            return <Item todoItem={todo} />
          })}
        </div>
      </div>
      <Form addItem={addItem} />
    </div>
  )
}

export default List
