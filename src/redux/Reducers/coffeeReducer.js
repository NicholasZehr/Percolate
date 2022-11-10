export const FETCH_ALL_COFFEE = "FETCH_ALL_COFFEE";

const initialState = {
  allCoffee: {},
  coffee: {},
};

export default function coffeeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_COFFEE:
      return { ...state, allCoffee: action.allCoffee };
    default:
      return state;
  }
}
