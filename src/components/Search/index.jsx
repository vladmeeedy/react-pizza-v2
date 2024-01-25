import React from 'react'
import styles from './Search.module.scss'
import { FiSearch } from 'react-icons/fi'
import { RxCross1 } from 'react-icons/rx'

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <FiSearch className={styles.icon} />
      <input
        value={searchValue}
        onChange={(ev) => setSearchValue(ev.target.value)}
        className={styles.input}
        placeholder="Пошук піци..."
      />
      {searchValue && <RxCross1 onClick={()=>setSearchValue('')} className={styles.clearIcon} />}
    </div>
  )
}

export default Search
