import React from "react";
import { useNavigate } from "react-router-dom";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { ordersGrid, ordersData } from "../../../data/dummy";
import HeaderOrder from "../HeaderOrder";
import { generatePublicUrl } from "../../../urlConfig";
import { useSelector } from "react-redux";

const OrderList = (props) => {
  const order = useSelector((state) => state.order);
  const orders = order.orders;
  const navigate = useNavigate();

  const ordersData = [];

  for (let i = orders.length - 1; i >= 0 ; i--) {
    const item = orders[i];
    let statusBg;
    const status = item.orderStatus.findLast(
      (ele) => ele.isCompleted === true
    ).type;
    if (status === "ordered") {
      statusBg = "#FF6699";
    }
    if (status === "packed") {
      statusBg = "#009999";
    }
    if (status === "shipped") {
      statusBg = "#FF9966";
    }
    if (status === "delivered") {
      statusBg = "#33CC66";
    }
    if (status === "canceled") {
      statusBg = "#FF3333";
    }
    console.log(item.address);
    ordersData.push({
      CustomerName: item.user.firstName + " " + item.user.lastName,
      TotalAmount: item.totalAmount,
      Status: status,
      StatusBg: statusBg,
      OrderID: item._id,
      ProductImage: generatePublicUrl(
        item.items[0].productId.productPictures[0].img
      ),
      OrderItems: item.items[0].productId.name,
      Location: item.paymentType,
    });
  }

  const onOrderSelected = (item) => {
    navigate(`/orders/${item.data.OrderID}`);
  };

  return (
    <div>
      <HeaderOrder category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        rowSelected={onOrderSelected}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};
export default OrderList;
