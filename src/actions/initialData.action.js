import axios from "../helpers/axios";
import {
  categoryContants,
  discountConstants,
  initialDataConstants,
  orderConstants,
  productConstants,
  userContants,
} from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post(`/initialData`);
    if (res.status === 200) {
      const { categories, products, orders, discounts, users } = res.data;
      dispatch({
        type: categoryContants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
      dispatch({
        type: discountConstants.GET_ALL_DISCOUNTS_SUCCESS,
        payload: { discounts },
      });
      dispatch({
        type: userContants.GET_ALL_USERS_SUCCESS,
        payload: { users },
      });
    }
    console.log(res);
  };
};
