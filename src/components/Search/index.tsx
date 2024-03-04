import React from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.scss'
import { FiSearch } from 'react-icons/fi'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 500),
    [],
  )
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }
  const onClickClear = (event: React.MouseEvent<SVGElement>) => {
    dispatch(setSearchValue(''))
    setValue('')

    if (inputRef.current) {
      inputRef.current.focus()
    }
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
