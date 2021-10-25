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
import db from "../../firebase";
