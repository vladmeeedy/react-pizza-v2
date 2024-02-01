import React from 'react'
import debounce from "lodash.debounce";
import styles from './Search.module.scss'
import { FiSearch } from 'react-icons/fi'
import { RxCross1 } from 'react-icons/rx'
import { SearchContext } from '../../App'



const Search = () => {
  const [value, setValue] = React.useState('')
  const { setSearchValue } = React.useContext(SearchContext)
  const inputRef = React.useRef()

  

  const updateSearchValue =React.useCallback(
    debounce((str)=>{
      setSearchValue(str);
    }, 500
    ), []
  )
const onChangeInput = event => {
  setValue(event.target.value)
  updateSearchValue(event.target.value)
}
  const onClickClear = () => {
    setSearchValue('')
    setValue('')
    inputRef.current.focus()
  }

  return (
    <div className={styles.root}>
      <FiSearch className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Пошук піци..."
      />
      {value && (
        <RxCross1 onClick={onClickClear} className={styles.clearIcon} />
      )}
    </div>
  )
}

export default Search
