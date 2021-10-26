export const FETCH_BUSINESS = "FETCH_BUSINESS";
export const FETCH_BUSINESSES = "FETCH_BUSINESSES";
export const FETCH_USER_BUSINESS = "FETCH_USER_BUSINESS";
export const ADD_BUSINESS = "ADD_BUSINESS";
export const ADD_LIKE_BUSINESS = "ADD_LIKE_BUSINESS";
export const REMOVE_LIKE_BUSINESS = "REMOVE_LIKE_BUSINESS";
// ------------------ Initial State -----------------------

const initialState = {
  businesses: {},
  business: {},
};

// ==================== REDUCER FUNCTION ====================

export default function businesssesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BUSINESSES:
      return { ...state, businesses: action.businesses };
    case FETCH_BUSINESS:
      return { ...state, business: action.business };
    case FETCH_USER_BUSINESS:
      return { ...state, businesses: action.businesses };
    case ADD_BUSINESS:
      return { ...state, businesses: [...state.businesses, action.businesses] };
    default:
      return state;
  }
}
