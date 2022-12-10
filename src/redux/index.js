import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { getFirestore, reduxFirestore } from "redux-firestore";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import singleCoffeeReducer from "./Actions/singleCoffee";
import authReducer from "./authSlice.js";
import {fetchOneBusiness} from "./businessSlice";
import feedReducer from "./feed";
import coffeeReducer from "./Reducers/coffeeReducer";
import reviewReducer from "./Reducers/reviewReducer";
import usersReducers from "./Reducers/usersReducer";
import businessReducer from "./businessSlice";
const loadingMiddleware = (store) => (next) => (action) => {
  console.log(store, next, action)
  next(action)
}
const reducer = {
  auth: authReducer,
  business: businessReducer,
  users: usersReducers,
  singleCoffee: singleCoffeeReducer,
  review: reviewReducer,
  feed: feedReducer,
  coffee: coffeeReducer,
}
const middleware = 
  applyMiddleware(loadingMiddleware,
    thunkMiddleware.withExtraArgument({ getFirestore }),
    createLogger({ collapsed: true })
    )
  
    
    //* Create the store
    const store = configureStore({ reducer }, middleware);
    
    
export default store;
export { setUser, authenticateUser } from "./authSlice";
export { fetchOneBusiness }
    