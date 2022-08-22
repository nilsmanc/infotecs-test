import { MouseEvent, useMemo, useState } from 'react'
import { TodoItem } from '../../types/types'
import Form from '../Form'
import Item from '../Item'
import SearchForm from '../SearchForm'
import styles from './List.module.scss'

interface ListProps {
  todos: TodoItem[]
  resize: (e: MouseEvent) => void
}

const List: React.FC<ListProps> = ({ todos, resize }) => {
  const [request, setRequest] = useState('')

  // фильтруем массив всех заданий, оставляя те, которые включают в себя реквест. Приводим запрос и названия к нижнему регистру,
  // чтобы избежать ошибок

  const searchTodos = (request: string, todos: TodoItem[]) => {
    if (!request) return todos
    return todos.filter((todo) => todo.title.toLowerCase().includes(request.toLowerCase()))
  }

  // useMemo, чтобы функция срабатывала при изменении запроса или массива туду

  const foundTodos = useMemo(() => {
    return searchTodos(request, todos)
  }, [request, todos])

  return (
    <div className={styles.list}>
      <SearchForm searchRequest={request} setRequest={setRequest} />
      <div className={styles.items}>
        <div>
          {foundTodos.map((todo) => {
            return <Item todo={todo} key={todo.id} />
          })}
        </div>
      </div>
      <div className={styles.resizer} onMouseDown={resize}>
        |||
      </div>
      <Form />
    </div>
  )
}

export default List
