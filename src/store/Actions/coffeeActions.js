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


export const _fetchAllCoffee = (coffee) => ({
  type: FETCH_BUSINESSES,
  businesses,
});