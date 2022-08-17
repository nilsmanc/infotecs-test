import { ChangeEvent, useState } from 'react'
import { State } from '../../types/types'
import StateButtons from '../StateButtons'
import styles from './Editor.module.scss'

const Editor = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [state, setState] = useState<State | null>(null)

  const editTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const editBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value)
  }

  return (
    <div className={styles.editForm}>
      <div className={styles.interface}>
        <h2>Edit</h2>
        <StateButtons state={state} setState={setState} />
      </div>
      <input className={styles.title} type='text' value={title} onChange={editTitle} />
      <textarea className={styles.body} value={body} onChange={editBody}></textarea>
      <div className={styles.interface}>
        <button className={styles.deleteButton}>Delete</button>
        <button className={styles.okButton}>OK</button>
      </div>
    </div>
  )
}

export default Editor
