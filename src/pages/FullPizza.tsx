import axios from 'axios'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const FullPizza: React.FC = () => {
  const { id } = useParams()
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  const navigate = useNavigate()
  React.useEffect(() => {
    async function fetshPizza() {
      try {
        const { data } = await axios.get(
          'https://65a92c59219bfa371868aad2.mockapi.io/items/' + id,
        )
        setPizza(data)
      } catch (error) {
        alert('Помилка при отриманні піци')
        navigate('/')
      }
    }
    fetshPizza()
  }, [])

  if (!pizza) {
    return <div>Loading...</div>
  }
  return (
    <div className="container">
      <img src={process.env.PUBLIC_URL + pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza
