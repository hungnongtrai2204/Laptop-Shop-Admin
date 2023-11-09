import axios from "../helpers/axios";
import { authConstants, userContants } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userContants.USER_REGISTER_REQUEST });
    const res = await axios.post("/admin/signup", {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: userContants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userContants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

const getUsers = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userContants.GET_ALL_USERS_REQUEST });
      const res = await axios.get(`user/getusers`);
      if (res.status === 200) {
        const { users } = res.data;
        dispatch({
          type: userContants.GET_ALL_USERS_SUCCESS,
          payload: { users },
        });
      } else {
        dispatch({ type: userContants.GET_ALL_USERS_SUCCESS });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUserById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`user/deleteUserById`, {
        data: { payload },
      });
      dispatch({ type: userContants.DELETE_USER_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: userContants.DELETE_USER_BY_ID_SUCCESS });
        dispatch(getUsers());
      } else {
        const { error } = res.data;
        dispatch({
          type: userContants.DELETE_USER_BY_ID_FAILURE,
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
