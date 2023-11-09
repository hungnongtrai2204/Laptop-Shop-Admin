import axios from "../helpers/axios";
import { discountConstants } from "./constants";

const getDiscounts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: discountConstants.GET_ALL_DISCOUNTS_REQUEST });
      const res = await axios.get(`discount/getdiscounts`);
      if (res.status === 200) {
        const { discounts } = res.data;
        dispatch({
          type: discountConstants.GET_ALL_DISCOUNTS_SUCCESS,
          payload: { discounts },
        });
      } else {
        dispatch({ type: discountConstants.GET_ALL_DISCOUNTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addDiscount = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: discountConstants.ADD_DISCOUNT_REQUEST });
      const res = await axios.post(`discount/create`, form);
      if (res.status === 201) {
        dispatch({ type: discountConstants.ADD_DISCOUNT_SUCCESS });
        dispatch(getDiscounts());
      } else {
        dispatch({ type: discountConstants.ADD_DISCOUNT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
    // const res = await axios.post(`discount/create`, form);
    // console.log(res);
  };
};

export const deleteDiscountById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`discount/deleteDiscountById`, {
        data: { payload },
      });
      dispatch({ type: discountConstants.DELETE_DISCOUNT_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: discountConstants.DELETE_DISCOUNT_BY_ID_SUCCESS });
        dispatch(getDiscounts());
      } else {
        const { error } = res.data;
        dispatch({
          type: discountConstants.DELETE_DISCOUNT_BY_ID_FAILURE,
          payload: {
            error,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateDiscount = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: discountConstants.UPDATE_DISCOUNT_REQUEST });
      const res = await axios.post(`discount/update`, payload);
      if (res.status === 201) {
        dispatch({ type: discountConstants.UPDATE_DISCOUNT_SUCCESS });
        dispatch(getDiscounts());
      } else {
        dispatch({ type: discountConstants.UPDATE_DISCOUNT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
    // const res = await axios.post(`product/create`, form);
    // console.log(res);
  };
};
