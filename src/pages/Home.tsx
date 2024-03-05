import React from 'react'
import qs from 'qs'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../Pagination'
import { useSelector } from 'react-redux'
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice'
import { Link, useNavigate } from 'react-router-dom'
import {
  SearchPizzaParams,
  fetchPizzas,
  selectPizzaData,
} from '../redux/slices/pizzaSlice'
import { useAppDispatch } from '../redux/store'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isMounted = React.useRef(false)
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)
  const [title, setTitle] = React.useState('Всі піци')

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx))
  }

  const onChangePage = (value: number) => {
    dispatch(setCurrentPage(value))
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
        currentPage: String(currentPage),
      }),
    )
    window.scrollTo(0, 0)
  }

  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     }
  //     const queryString = qs.stringify(params, { skipNulls: true })
  //     navigate(`/?${queryString}`)
  //   }

  //   if (window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams))
  //   }
  // }, [categoryId, sort.sortProperty, searchValue, currentPage])

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1),
  //     ) as unknown as SearchPizzaParams
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     )
  //   }
  //   isMounted.current = true
  // }, [])

  React.useEffect(() => {
    window.scrollTo(0, 0)
    getPizzas()
  }, [categoryId, sort.sortProperty, currentPage])

  // React.useEffect(() => {
  //   if (status === 'error') {
  //     setTitle('Виникла помилка')
  //   } else {
  //     setTitle('Всі піци')
  //   }
  // }, [status])

  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true
      }
      return false
    })
    .map((obj: any) => (
      
        <PizzaBlock {...obj} />
    
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
