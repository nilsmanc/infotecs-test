import { State } from '../../types/types'
import styles from './StateButtons.module.scss'

interface StateButtonsProps {
  setState: (state: State) => void
}

const StateButtons: React.FC<StateButtonsProps> = ({ setState }) => {
  return (
    <div className={styles.align}>
      <button className={styles.waitingButton} onClick={() => setState('waiting')}>
        Waiting
      </button>
      <button className={styles.inProgressButton} onClick={() => setState('inProgress')}>
        In progress
      </button>
      <button className={styles.doneButton} onClick={() => setState('done')}>
        Done
      </button>
    </div>
  )
}

export default StateButtons
