import React from "react";
import ListedReview from "./ListedReview";
import { query, where, collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchLoginUser } from "../../store/auth";

const ReviewPane = (props) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth);
  const [likedObj, setLikedObj] = useState({});
  const auth = getAuth();
  const [user, setUser] = useState(getAuth().currentUser);
  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      //* Fetch the user using it's id
      await dispatch(fetchLoginUser());
    }
    if (mounted) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [user]);
  const getLikedObj = async () => {
    const q = query(
      collection(db, "likeRelation"),
      where("userId", "==", `${user.uid}`)
    );
    const likedReviews = await getDocs(q);
    const likedObj = {};
    likedReviews.forEach((doc) => {
      likedObj[doc.data().reviewId] = true;
    });
    setLikedObj(likedObj);
    console.log("getLikedObjRan", likedObj);
  };
  useEffect(() => {
    if (user) {
      getLikedObj();
    }
  }, [loggedInUser]);

  const checkReview = (content) => {
    let revWords = content ? content.split(" ") : "";
    const length = revWords.length;
    let newReview = "";
    if (length >= 10) {
      newReview = revWords.slice(0, 5).join(" ").concat(" More...");
      return newReview;
    }
    return content;
  };
  const userId = loggedInUser.uid;
  const arrReviews =
    props.reviews !== {} ? Object.entries(props.reviews) : false;
  // const reviewArr = this.props.reviews.reviews;
  return (
    <>
      {arrReviews.length > 0 ? (
        <div>
          <h2>Reviews</h2>
          {arrReviews
            ? arrReviews.map((review, idx) => {
                //checkReview(review.content);
                return (
                  <ListedReview
                    liked={likedObj[review[0]] ? true : false}
                    currentUserId={userId}
                    id={props.id}
                    type={props.type}
                    displayName={loggedInUser.displayName}
                    photoURL={loggedInUser.photoURL}
                    key={review[0]}
                    content={checkReview(review[1].content)}
                    review={review[1]}
                    reviewId={review[0]}
                  />
                );
              })
            : null}
        </div>
      ) : (null
      )}
    </>
  );
};

export default ReviewPane;
