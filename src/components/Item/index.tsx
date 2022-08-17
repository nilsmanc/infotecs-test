import { TodoItem } from '../../types/types'
import styles from './Item.module.scss'

interface ItemProps {
  todoItem: TodoItem
}

const Item: React.FC<ItemProps> = ({ todoItem }) => {
  return (
    <button className={styles.todoItem}>
      <span>{todoItem.title}</span>
    </button>
  )
}

export default Item
