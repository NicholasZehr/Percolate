import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { fetchSingleCoffeeReviews } from "./reviewActions";
// action types

const GET_SINGLE_COFFEE = "GET_SINGLE_COFFEE";
const ADD_LIKE_COFFEE = "ADD_LIKE_COFFEE";
const REMOVE_LIKE_COFFEE = "REMOVE_LIKE_COFFEE";
const UPDATE_AVERAGE = "UPDATE_AVERAGE";

const dispatchSingleCoffee = (coffee, coffeeId) => {
  return (dispatch) => {
    dispatch(fetchSingleCoffeeReviews(coffeeId));
    dispatch(getSingleCoffee(coffee));
  };
};

const getSingleCoffee = (coffee) => {
  return {
    type: GET_SINGLE_COFFEE,
    coffee,
  };
};

export const _addLikeCoffee = (reviewId) => {
  return {
    type: ADD_LIKE_COFFEE,
    reviewId,
  };
};
export const _removeLikeCoffee = (reviewId) => {
  return {
    type: REMOVE_LIKE_COFFEE,
    reviewId,
  };
};

export const _updateAverage = (coffee) => {
  return {
    type: UPDATE_AVERAGE,
    coffee,
  };
};
// thunk

const fetchSingleCoffee = (coffeeId) => {
  return async (dispatch) => {
    try {
      const docRef = doc(db, "coffees", coffeeId);
      const docSnap = await getDoc(docRef);
      const singleCoffee = docSnap.data();
      console.log("Hello from fetchSingleCoffee");
      dispatch(dispatchSingleCoffee(singleCoffee, coffeeId));
    } catch (error) {
      return `Error ${error.message} fetch single coffee thunk`;
    }
  };
};

const updateAverage = (coffeeId, newRating) => {
  return async (dispatch) => {
    const coffeeRef = doc(db, "coffees", coffeeId);
    const coffeeSnap = await getDoc(coffeeRef);
    const reviews = coffeeSnap.data().reviews;
    const currentRating = coffeeSnap.data().rating;

    if (!reviews || !currentRating) {
      await updateDoc(coffeeRef, { rating: newRating });
    } else {
      const length = reviews.length;

      const sumReviews = currentRating * length;

      const newSum = sumReviews + newRating;
      const updatedAvg = newSum / (length + 1);
      await updateDoc(coffeeRef, { rating: updatedAvg });
    }
  };
};

const singleCoffeeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_COFFEE:
      return action.coffee;
    default:
      return state;
  }
};

export default singleCoffeeReducer;
export { fetchSingleCoffee };
