import { userContants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
  users: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case userContants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };

      break;

    case userContants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userContants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        message: action.payload.error,
      };
      break;
    case userContants.GET_ALL_USERS_SUCCESS:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
  }
  return state;
};
