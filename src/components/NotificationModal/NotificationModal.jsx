import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import ItemNoti from './ItemNoti/ItemNoti';
import "./NotificationModal.css"
import { io } from 'socket.io-client';
import axios from 'axios';


const socket = io("http://localhost:2000/");
const NotificationModal = ({openModal, onCloseModal}) => {
    let [orderArray, setOrderArray] = useState([])
    let arr = []
    useEffect(() => {
        socket.on('order', (data) => {
            arr.push(data)
            setOrderArray(arr)

        })
    }, [socket])

    if (!openModal) return null
  return (
    <>
    <div className='noti-table'>
        {
            orderArray.length > 0 ? 
            orderArray.map(order => (
                <ItemNoti name={order.customer} orderId={order.id}/>
            )) : <div className='emty-noti'>There's no new notifications.</div>
        }
    </div>
    <div className='overlay' onClick={onCloseModal}></div>
    </>
  )
}

export default NotificationModal