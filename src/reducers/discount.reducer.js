import { discountConstants } from "../actions/constants";

const initialState = {
  discounts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case discountConstants.GET_ALL_DISCOUNTS_SUCCESS:
      state = {
        ...state,
        discounts: action.payload.discounts,
      };
      break;
  }

  return state;
};
