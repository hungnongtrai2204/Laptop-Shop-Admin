import React, { useState } from "react";
import { updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import OrderList from "./OrderList";

import "./style.css";

/**
 * @author
 * @function Orders
 **/

const Orders = (props) => {
  return (
    <Layout sidebar>
      <OrderList />
    </Layout>
  );
};

export default Orders;
