import {
  FETCH_BUSINESS,
  FETCH_BUSINESSES,
  FETCH_USER_BUSINESS,
  ADD_BUSINESS,
  ADD_LIKE_BUSINESS,
  REMOVE_LIKE_BUSINESS,
} from "../Reducers/businessesReducer";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

// ------------------ Actions creators --------------------

export const _fetchBusinesses = (businesses) => ({
  type: FETCH_BUSINESSES,
  businesses,
});

export const _fetchBusiness = (business) => ({
  type: FETCH_BUSINESS,
  business,
});

export const _fetchUserBusinesses = (businesses) => {
  return {
    type: FETCH_USER_BUSINESS,
    businesses,
  };
};

const dispatchSingleBusiness = (coffee, coffeeId) => {
  return (dispatch) => {
    //dispatch(fetchSingleCoffeeReviews(coffeeId));
    //dispatch(getSingleCoffee(coffee));
  };
};

export const _addBusiness = (business) => ({
  type: ADD_BUSINESS,
  business,
});

export const _addLikeBusiness = (businessId) => {
  return {
    type: ADD_LIKE_BUSINESS,
    businessId,
  };
};
export const _removeLikeBusiness = (businessId) => {
  return {
    type: REMOVE_LIKE_BUSINESS,
    businessId,
  };
};


