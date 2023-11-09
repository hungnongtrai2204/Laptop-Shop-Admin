import axios from "../helpers/axios";
import { categoryContants } from "./constants";

const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryContants.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get(`category/getcategory`);
    console.log(res);
    if (res.status === 200) {
      const { categoryList } = res.data;

      dispatch({
        type: categoryContants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryContants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryContants.ADD_NEW_CATEGORY_REQUEST });
    try {
      const res = await axios.post(`/category/create`, form);
      if (res.status === 201) {
        dispatch({
          type: categoryContants.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryContants.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.category,
        });
      }
      console.log(res);
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryContants.UPDATE_CATEGORIES_REQUEST });
    const res = await axios.post(`/category/update`, form);
    if (res.status === 201) {
      dispatch({
        type: categoryContants.UPDATE_CATEGORIES_SUCCESS
      });
      dispatch(getAllCategory());
    } else {
      const { error } = res.data;
      dispatch({
        type: categoryContants.UPDATE_CATEGORIES_FAILURE,
        payload: { error }
      });
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({ type: categoryContants.DELETE_CATEGORIES_REQUEST })
    const res = await axios.post(`/category/delete`, {
        payload: {
            ids,
        },
    });
    if (res.status === 201) {
        dispatch(getAllCategory())
        dispatch({ type: categoryContants.DELETE_CATEGORIES_SUCCESS })
    } else {
        const {error} = res.data
        dispatch({
            type: categoryContants.DELETE_CATEGORIES_FAILURE,
            payload: { error }
        })
    }
  };
};
export {
  getAllCategory
}