import { ChangeEvent, SetStateAction } from 'react'
import styles from './SearchForm.module.scss'

interface SearchFormProps {
  searchRequest: string
  setRequest: (searchRequest: SetStateAction<string>) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ searchRequest, setRequest }) => {
  const onChangeRequest = (e: ChangeEvent<HTMLInputElement>) => {
    setRequest(e.target.value)
  }
  return (
    <form className={styles.searchForm}>
      <input
        className={styles.textInput}
        type='textInput'
        placeholder='Search'
        value={searchRequest}
        onChange={onChangeRequest}
      />
    </form>
  )
}

export default SearchForm
