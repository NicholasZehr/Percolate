import {
  FETCH_ALL_COFFEE,
} from "../Reducers/coffeeReducer";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import db from "../../firebase";


export const _fetchAllCoffee = (allCoffee) => ({
  type: FETCH_ALL_COFFEE,
  allCoffee,
});

export const fetchAllCoffee = () => {
  return async (dispatch) => {
    try {
      const response = await getDocs(collection(db, "coffees"));
      let coffees = {};
      response.forEach((coffee) => coffees[coffee.id]=coffee.data());
      dispatch(_fetchAllCoffee(coffees));
    } catch (error) {
      console.log("Failed to fetch all businesses");
      return;
    }
  };
};

