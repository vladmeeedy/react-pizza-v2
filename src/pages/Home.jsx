import React from 'react'
import qs from 'qs'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton.jsx'
import Pagination from '../Pagination/index.jsx'
import { useSelector, useDispatch } from 'react-redux'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice.js'
import { Link, useNavigate } from 'react-router-dom'
import { fetchPizzas } from '../redux/slices/pizzaSlice.js'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isMounted = React.useRef(false)
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter,
  )
  const { items, status } = useSelector((state) => state.pizza)
  const [title, setTitle] = React.useState('Всі піци')

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const sortBy = sort.sortProperty.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    )
  }

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty,
      )
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      )
    }
  }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  React.useEffect(() => {
    if (status === 'error') {
      setTitle('Виникла помилка')
    } else {
      setTitle('Всі піци')
    }
  }, [status])

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true
      }
      return false
    })
    .map((obj) => (
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    ))

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  console.log(items)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{title}</h2>
      <div className="content__items">
        {status === 'loading' ? skeletons : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
