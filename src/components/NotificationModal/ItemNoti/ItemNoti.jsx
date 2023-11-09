import React from 'react'
import './ItemNoti.css'
import {FiShoppingBag} from 'react-icons/fi'

const ItemNoti = ({name, orderId}) => {
  const onClickNotification = () => {
    window.location.href = `/orders/${orderId}`
  }
  return (
      <div onClick={onClickNotification} className='itemNoti'>
        <div className='icon-container-item'><FiShoppingBag/></div>
        {name} has created a new order.
      </div>
  )
}

export default ItemNoti