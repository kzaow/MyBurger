import * as actionTypes from "./actions";

const initialState = {
  fillings: {
    lettuce: 0,
    cheese: 0,
    bacon: 0,
    meat: 0
  },
  totalPrice: 2.0
};

const FILLING_PRICES = {
  lettuce: 0.5,
  cheese: 1.0,
  meat: 5.0,
  bacon: 1.0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state.state,
        fillings: {
          ...state.fillings,
          [action.ingredientName]: state.fillings[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + FILLING_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state.state,
        fillings: {
          ...state.fillings,
          [action.ingredientName]: state.fillings[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - FILLING_PRICES[action.ingredientName]
      };
    default:
      return state;
  }
};

export default reducer;
