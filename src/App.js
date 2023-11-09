import React, { Fragment, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./containers/Home";
import Products from "./containers/products/index";
import Orders from "./containers/orders/index";
import Signin from "./containers/Signin";
import Category from "./containers/Category";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, isUserLoggedIn, getInitialData } from "./actions";
import NewPage from "./containers/NewPage";
import { Statistics } from "./containers/Statistics";
import OrderDetail from "./containers/orders/OderDetail";
import { Calendar } from "./containers/Calendar";
import Kanban from "./containers/Kanban";
import Discounts from "./containers/discount";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Users from "./containers/user";
import Reviews from "./containers/review";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Hàm này bị lỗi nếu đăng nhập mà không logout sau khi dùng -> nếu token expire thì sẽ bị lỗi
  // Kiểm tra đã đăng nhập chưa
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App">
        <Fragment>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route path="/page" element={<NewPage />} />
              <Route path="/" element={<Statistics />} />
              <Route path="/category" element={<Category />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/discounts" element={<Discounts />} />
              <Route path="/users" element={<Users />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/orders/:orderId" element={<OrderDetail />} />
              <Route path="/kanban" element={<Kanban />} />
            </Route>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Fragment>
      </div>
    </LocalizationProvider>
  );
}

export default App;
