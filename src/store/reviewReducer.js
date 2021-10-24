export const ADD_REVIEW = "ADD_REVIEW";
export const FETCH_REVIEWS = "FETCH_REVIEWS";
export const GET_SINGLE_REVIEW = "GET_SINGLE_REVIEW";
export const ADD_LIKE = "ADD_LIKE";
export const REMOVE_LIKE = "REMOVE_LIKE";

// ------------------ Initial State -----------------------
const initialState = {
  review: {},
  reviews: {},
};

//==================== REDUCER FUNCTION ====================
export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return {
        ...state,
        reviews: { ...state.reviews, [action.id]: action.review },
      };
    case FETCH_REVIEWS:
      return { ...state, reviews: action.reviews };
    case GET_SINGLE_REVIEW:
      return { ...state, review: action.review };
    case ADD_LIKE:
      let addLike = state.reviews[action.reviewId];
      console.log(addLike);
      addLike.likeCount += 1;
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.reviewId]: addLike,
        },
      };
    case REMOVE_LIKE:
      let removeLike = state.reviews[action.reviewId];
      console.log(removeLike);
      removeLike.likeCount -= 1;
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.reviewId]: removeLike,
        },
      };
    default:
      return state;
  }
}
