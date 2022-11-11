import React, { useState, useEffect } from "react";
import { likeClick } from "../../redux/Actions/reviewActions";
import { getAuth } from "firebase/auth";
const auth = getAuth();
//Prior to conversion to hooks and functional component

const LikeButton = (props) => {
  const likeCount = props.likeCount;
  const [user, setUser] = useState(getAuth.currentUser);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    return () => {
      setLiked(props.liked);
    };
  }, []);

  const handleLike = async (evt) => {
    const { id, userId, reviewId, displayName, photoURL, type } = props;
    setLoading(true);
    await likeClick(id, reviewId, displayName, photoURL, type, userId);
    setLiked((liked) => !liked);
    setLoading(false);
  };
  return (
    <>
      {`${likeCount}` && !loading ? (
        <div className="like_button" onClick={handleLike}>
          <img
            className="heart"
            src={liked ? "/Brown-heart.png" : "/Grey-heart.png"}
            alt="Like Heart Icon"
          />
          Like
        </div>
      ) : (
        <div className="like_button like-in-progress">
          <img
            className="heart"
            src={liked ? "/Brown-heart.png" : "/Grey-heart.png"}
            alt="Like Heart Icon"
          />
          ...
        </div>
      )}
    </>
  );
};

export default LikeButton;

// const mapState = (state) => {
//   return {
//     reviews: state.review.reviews,
//   };
// };
// const mapDispatch = (dispatch) => ({
//   likeClick: (id, reviewId, displayName, photoURL, type, userId) =>
//     dispatch(likeClick(id, reviewId, displayName, photoURL, type, userId)),
// });
