import { useContext } from 'react'
import { AppContext } from '../../App'
import { TodoItem } from '../../types/types'
import styles from './Item.module.scss'

interface ItemProps {
  todo: TodoItem
}

const Item: React.FC<ItemProps> = ({ todo }) => {
  const { setTodoId, todoId } = useContext(AppContext)

  // с помощью тернарных операторов выбираем стили для состояния туду

  const stateStyles =
    todo.state === 'waiting'
      ? styles.waiting
      : todo.state === 'inProgress'
      ? styles.inProgress
      : styles.done

  // объединяем стандартные стили, стили при выделении и стили состояния туду

  const itemStyles = [styles.todoItem, todo.id === todoId ? styles.picked : '', stateStyles].join(
    ' ',
  )

  const selectTodo = () => {
    setTodoId(todo.id)
  }

  return (
    <button className={itemStyles} onClick={selectTodo}>
      <span>{todo.title}</span>
    </button>
  )
}

export default Item
