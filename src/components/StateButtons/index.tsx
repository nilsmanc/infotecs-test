import { State } from '../../types/types'
import styles from './StateButtons.module.scss'

interface StateButtonsProps {
  state: State
  setState: (state: any) => void
}

const StateButtons: React.FC<StateButtonsProps> = ({ state, setState }) => {
  return (
    <div>
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
