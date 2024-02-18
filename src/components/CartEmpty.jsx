import React from 'react'
import cartEmptyImg from '../assets/img/empty-cart.png'
import { Link } from 'react-router-dom'

const CartEmpty = () => {
  return (
    <div class="cart cart--empty">
      <h2>
        Товари відсутні <span>😕</span>
      </h2>
      <p>
        Ймовірно, ви ще не замовили піцу.
        <br />
        Для замовлення піци, перейдіть на головну сторінку.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link class="button button--black" to="/">
        <span>Повернутися назад</span>
      </Link>
    </div>
  )
}

export default CartEmpty
