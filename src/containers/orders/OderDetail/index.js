import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder, getInitialData } from "../../../actions";
import Layout from "../../../components/Layout";
import Card from "../../../components/UI/Card";
import { useParams } from "react-router-dom";
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
import { ordersGridDetail, ordersData } from "../../../data/dummy";
import { generatePublicUrl } from "../../../urlConfig";

import "./style.css";
import { useEffect } from "react";

/**
 * @author
 * @function OrderDetail
 **/

const OrderDetail = (props) => {
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const order = useSelector((state) => state.order);
  console.log(params);
  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
    window.location.reload(true);
  };

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      // return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };

  const renderData = (orderItem) => {
    const orders = orderItem.items;
    const ordersData = [];
    console.log("Testttt", orders);
    let statusBg;

    const status = orderItem.orderStatus.findLast(
      (ele) => ele.isCompleted === true
    ).type;
    if (status === "ordered") {
      statusBg = "#FF5C8E";
    }
    if (status === "packed") {
      statusBg = "#03C9D7";
    }
    if (status === "shipped") {
      statusBg = "#FB9678";
    }
    if (status === "delivered") {
      statusBg = "#8BE78B";
    }
    if (status === "canceled") {
      statusBg = "#FF5C8E";
    }
    for (let i = 0; i < orders.length; i++) {
      const item = orders[i];
      ordersData.push({
        CustomerName: orderItem.user.firstName + " " + orderItem.user.lastName,
        TotalAmount: +item.productId.price,
        Status: status,
        StatusBg: statusBg,
        OrderID: item.purchasedQty,
        ProductImage: generatePublicUrl(item.productId.productPictures[0].img),
        OrderItems: item.productId.name,
        Location: formatDate(orderItem.createdAt),
        SumAmount: +item.productId.price * item.purchasedQty,
      });
    }
    return ordersData;
  };

  return (
    <Layout sidebar>
      {order.orders.map(
        (orderItem, index) =>
          orderItem._id === params.orderId && (
            <Card
              style={{
                margin: "10px 0",
              }}
              key={index}
              headerLeft={orderItem._id}
            >
              {console.log("ORDERITEM", orderItem)}
              <GridComponent
                id="gridcomp"
                dataSource={renderData(orderItem)}
                allowPaging
                allowSorting
              >
                <ColumnsDirective>
                  {ordersGridDetail.map((item, index) => (
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "50px 50px",
                  alignItems: "center",
                }}
              >
                <div>
                  {/* <div className="title">Items</div>
                  {orderItem.items.map((item, index) => (
                    <div className="value" key={index}>
                      {item.productId.name}
                    </div>
                  ))} */}
                </div>
                <div>
                  <span className="title">Total Price</span>
                  <br />
                  <span className="value">{orderItem.totalAmount}</span>
                </div>
                <div>
                  <span className="title">Payment Type</span> <br />
                  <span className="value">{orderItem.paymentType}</span>
                </div>
                <div>
                  <span className="title">Payment Status</span> <br />
                  <span className="value">{orderItem.paymentStatus}</span>
                </div>
              </div>
              <div
                style={{
                  boxSizing: "border-box",
                  padding: "100px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="orderTrack">
                  {orderItem.orderStatus.map((status) => (
                    <div
                      className={`orderStatus ${
                        status.isCompleted ? "active" : ""
                      }`}
                    >
                      <div
                        className={`point ${
                          status.isCompleted ? "active" : ""
                        }`}
                      ></div>
                      <div className="orderInfo">
                        <div className="status">{status.type}</div>
                        <div className="date">{formatDate(status.date)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* select input to apply order action */}
                <div
                  style={{
                    padding: "0 50px",
                    boxSizing: "border-box",
                  }}
                >
                  <select onChange={(e) => setType(e.target.value)}>
                    <option value={""}>Select status</option>
                    {orderItem.orderStatus.map((status) => {
                      return (
                        <>
                          {!status.isCompleted ? (
                            <option key={status.type} value={status.type}>
                              {status.type}
                            </option>
                          ) : null}
                        </>
                      );
                    })}
                  </select>
                </div>
                {/* button to confirm action */}

                <div
                  style={{
                    padding: "0 50px",
                    boxSizing: "border-box",
                  }}
                >
                  <button onClick={() => onOrderUpdate(orderItem._id)}>
                    Confirm
                  </button>
                </div>
              </div>
            </Card>
          )
      )}
    </Layout>
  );
};

export default OrderDetail;
