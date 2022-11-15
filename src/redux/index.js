import { applyMiddleware, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import { getFirestore, reduxFirestore } from "redux-firestore";
import db from "../firebase";
import businessReducer from "./businessSlice"
import usersReducers from "./Reducers/usersReducer";
import singleCoffeeReducer from "./Actions/singleCoffee";
import reviewReducer from "./Reducers/reviewReducer";
import feedReducer from "./feed";
import coffeeReducer from "./Reducers/coffeeReducer"
import authReducer from "./auth";
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
const middleware = composeWithDevTools( 
  applyMiddleware(loadingMiddleware,
    thunkMiddleware.withExtraArgument({ getFirestore }),
    createLogger({ collapsed: true })
  ),
  reduxFirestore(db)
);

//* Create the store
const store = configureStore({ reducer }, middleware);


export default store;
export * from "./auth";
