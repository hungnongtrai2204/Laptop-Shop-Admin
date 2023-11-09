import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import BarChart from "../../Graph/BarChart";
import "./style.css";
import ReactApexChart from "react-apexcharts";

export const Statistics = () => {
  const order = useSelector((state) => state.order);
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.user);
  const category = useSelector((state) => state.category);

  const months = [
    {
      month: "January",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "February",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "March",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "April",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "May",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "June",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "July",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "August",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "September",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "October",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "November",
      amount: 0,
      orderAmount: 0,
    },
    {
      month: "December",
      amount: 0,
      orderAmount: 0,
    },
  ];

  let amountOrderPerMonth = [];
  let total = 0;
  const totalTakingsPerMonth = () => {
    order.orders.map((orderItem) => {
      const d = new Date(orderItem.createdAt);
      const month = d.getMonth() + 1;
      for (let i = 0; i < 12; i++) {
        if (month === i + 1) {
          months[i].amount = months[i].amount + orderItem.totalAmount;
          total = total + orderItem.totalAmount;
          months[i].orderAmount = months[i].orderAmount + 1;
        }
      }
    });

    const amountPerMonth = months.map((month) => month.amount);
    amountOrderPerMonth = months.map((month) => month.orderAmount);
    return amountPerMonth;
  };

  const amountOfProduct = product.products.reduce(
    (acc, cur) =>
      Object.assign(acc, {
        [cur.category.name]: (acc[cur.category.name] || 0) + 1,
      }),
    {}
  );

  const totalTakings = {
    labels: months.map((monthItem) => monthItem.month),
    datasets: [
      {
        label: "Total Takings Each Month",
        yAxisID: "A",
        data: totalTakingsPerMonth(),
        backgroundColor: "#2E93fA",
        order: 2,
      },
      {
        label: "Amount Of Orders Each Month",
        data: amountOrderPerMonth,
        backgroundColor: "rgba(0, 26, 104, 0.2)",
        yAxisID: "B",
        borderColor: "rgba(0, 26, 104, 1)",
        tension: 0.4,
        type: "line",
        order: 1,
      },
    ],
  };

  const options = {
    scales: {
      A: {
        beginAtZero: true,
        type: "linear",
        position: "left",
      },
      B: {
        beginAtZero: true,
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const dataLine = {
    labels: months.map((monthItem) => monthItem.month),
    datasets: [
      {
        label: "Amount Of Orders Each Month",
        data: amountOrderPerMonth,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 2,
        pointBorderWidth: 2,
      },
    ],
  };

  var result = Object.keys(amountOfProduct).map((key) => [
    key,
    amountOfProduct[key],
  ]);

  var soldOutCategory = [];
  var soldOutCategoryAmount = [];
  function getSoldOut() {
    result.map((a) => {
      if (a[1] <= 5) {
        soldOutCategory.push(a[0]);
        soldOutCategoryAmount.push(a[1]);
      }
    });
  }
  getSoldOut();
  let userQuantity = 0;
  user.users.map((userItem) => {
    if (userItem.role === "user") userQuantity++;
  });

  const state = {
    series: Object.values(amountOfProduct),
    options: {
      chart: {
        width: 380,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2,
        },
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      labels: Object.keys(amountOfProduct),
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8,
        },
      },
      states: {
        hover: {
          filter: "none",
        },
      },
      title: {
        text: "Amount Of Each Product",
      },
    },
  };

  const totalCategories = () => {
    let parents = category.categories.length;
    // let children = 0
    let children = category.categories.reduce(
      (acc, cur) => acc + cur.children.length,
      0
    );

    return children + parents;
  };

  return (
    <Layout sidebar>
      <div className="first-component">
        <div className="square-information">
          <div className="user-quantity square-item">
            <h6 style={{ marginBottom: "-15px" }}>Customers</h6>
            <br />
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                color: "rgba(54, 162, 235, 0.9)",
              }}
            >
              {userQuantity}
            </p>
          </div>

          <div className="user-quantity square-item">
            <h6 style={{ marginBottom: "-15px" }}>Orders</h6>
            <br />
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                color: "rgba(54, 162, 235, 0.9)",
              }}
            >
              {order.orders.length}
            </p>
          </div>

          <div className="user-quantity square-item">
            <h6 style={{ marginBottom: "-15px" }}>Revenue</h6>
            <br />
            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "rgba(54, 162, 235, 0.9)",
              }}
            >{`${total
              .toString()
              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")} VND`}</p>
          </div>

          <div className="user-quantity square-item">
            <h6 style={{ marginBottom: "-15px" }}>Categories</h6>
            <br />
            <p
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                color: "rgba(54, 162, 235, 0.9)",
              }}
            >
              {totalCategories()}
            </p>
          </div>
        </div>
        <div className="totalTakings">
          <BarChart chartData={totalTakings} chartOptions={options} />
        </div>

        {/* <Chart
          options={state.options}
          series={state.series}
          type="bar"
          width="500"
          className="totalTakings"
        /> */}
      </div>

      <div className="second-component">
        <div className="amount-of-product">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
          />
        </div>

        <div className="sold-out-product">
          <div>Almost out of stock</div>
          <table>
            <tr>
              <td>Category Name</td>
              <td>{`Amount (pcs)`}</td>
            </tr>
            {soldOutCategory.map((s, index) => (
              <tr>
                <td>{s}</td>
                <td>{soldOutCategoryAmount[index]}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </Layout>
  );
};
