import cartEmptyImg from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'

export const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Товари відсутні <span>😕</span>
      </h2>
      <p>
        Ймовірно, ви ще не замовили піцу.
        <br />
        Для замовлення піци, перейдіть на головну сторінку.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link className="button button--black" to="/">
        <span>Повернутися назад</span>
      </Link>
    </div>
  )
}
