import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import db from "../firebase";
//import usersReducer from "./Reducers/usersReducer";

// action creators
const GET_FEED_REVIEWS = "GET_FEED_REVIEWS";

// action

const getFeedReviews = (reviews) => {
  return {
    type: GET_FEED_REVIEWS,
    reviews,
  };
};

// thunk

const fetchFeedReviews = (me) => {
  return async (dispatch) => {
    // get your following list

    const userRef = doc(db, "Users", me);
    const docSnap = await getDoc(userRef);
    const followingArr = docSnap.data().following;

    // reviews
    const feedRef = collection(db, "reviews");
    let reviewsArr = {};

    // this will only work if sheldon(in this case) has following with reviews posted. Otherwise no reviews.
    for await (const following of followingArr) {
      let revQuery = query(feedRef, where("userId", "==", following.uid)); // where user is in my following list
      const reviews = await getDocs(revQuery);
      reviews.forEach((review) => {
        reviewsArr[review.id] = review.data();
        // reviewsArr.push(review.data());
      });
    }

    dispatch(getFeedReviews(reviewsArr));
  };
};

// reducer
const feedReducer = (state = [], action) => {
  switch (action.type) {
    case GET_FEED_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
};

export { fetchFeedReviews };
export default feedReducer;
