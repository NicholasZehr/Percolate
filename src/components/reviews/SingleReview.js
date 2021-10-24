import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleReview } from "../../store/reviewActions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchLoginUser } from "../../store/auth";
import { useHistory } from "react-router";
import { doc, collection, addDoc, getDocs } from "firebase/firestore";
import db from "../../firebase";
import { useParams } from "react-router-dom";

const SingleReview = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const textarea = document.getElementById("txt");
  const [allComments, setAllComents] = useState([]);
  const [user, setUser] = useState(getAuth().currentUser);
  const review = useSelector((state) => state.review.review);
  const auth = getAuth();
  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });
  useEffect(() => {
    if (user && id) {
      const subCollection = collection(db, "reviews", id, "comments");
      async function fetchComments() {
        const response = await getDocs(subCollection);
        const temp = [];
        response.forEach((doc) => {
          temp.push(doc.data());
        });
        setAllComents(temp);
      }
      fetchComments();
    }
    let mounted = true;
    async function fetchData() {
      //* Fetch the user using it's id
      console.log(id)
      await dispatch(fetchSingleReview(id));
    }
    if (mounted) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  // auto extpand textarea fix it later
  if (textarea) {
    textarea.addEventListener("input", function (e) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (user) {
      const content = evt.target.content.value;
      const data = {
        likeCount: 0,
        reviewId: id,
        userId: user.uid,
        displayName: user.displayName,
        content: content,
        photoURL: user.photoURL,
      };
      const subCollection = collection(db, "reviews", id, "comments");
      evt.target.content.value = "";
      await addDoc(subCollection, data);
    }
  };

  function timeDifference(input) {
    input *= 1000;
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;
    let current = Date.now();
    let elapsed = current - input;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + " secs ago";
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + " mins ago";
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + " hours ago";
    } else if (elapsed < msPerMonth) {
      return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
    } else if (elapsed < msPerYear) {
      return (
        "approximately " + Math.round(elapsed / msPerMonth) + " months ago"
      );
    } else {
      return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
    }
  }

console.log(review)

  return (
    <div className="feedcard">
      <div className="self feeding cardDown">
        <div className="headNPost">
          <div className="imageBox post">
            <img
              className="profPic postHead"
              alt="User Profile AVI"
              src={review ? review.photoURL || "/guest.jpeg" : "/guest.jpeg"}
              onClick={(_) => history.push(`/users/${user.uid}`)}
            />
          </div>
          <div className="nameAndTime">
            <span className="writepost">{review.displayName}: </span>
            {review.time ? (
              <span className="ago">{`${timeDifference(
                review.time.seconds
              )}`}</span>
            ) : (
              <span className="ago">no time</span>
            )}
          </div>
          <div className="username writepost">
            <p>{review.content}</p>
          </div>
        </div>
      </div>
      <div className="self feeding cardUpAdjustment">
        <div className="headNPost card">
          <img
            className="favCoffee"
            alt="favorite coffee"
            onClick={(_) => history.push(`/coffees/${id}`)}
            src={review ? review.feedURL : "/whiteBack.png"}
          />
          <div className="coffeeInfo">
            <p>Roast: {review.roast} </p>
            <p>Brand: {review.brandName} </p>
            <p>
              <b>{review.displayName}'s </b>Rating: {review.rating}
              /5
            </p>
            <p>" {review.content} "</p>
          </div>
        </div>
      </div>
      <div className="self feeding cardUp">
        <div className="blank"></div>
        <div className="likes">
          <img className="heart" src="/heart.png" alt="Like Heart Icon" />
          <p>Like</p>
        </div>
        <i className="material-icons flip">
          chat
        </i>
        <div  className="comments">
          <p>Comments</p>
        </div>
      </div>
      <div className="self feeding cardUptwo">
        <form className="form" onSubmit={handleSubmit}>
          <div className="headNPost">
            <div className="imageBox commentImage">
              <img
                className="profPic"
                alt="User Profile AVI"
                src={user ? user.photoURL || "/guest.jpeg" : "/guest.jpeg"}
                onClick={(_) => history.push(`/users/${user.uid}`)}
              />
            </div>

            <div className="post-input ">
              <textarea
                className="textarea"
                id="txt"
                name="content"
                maxLength="200"
                placeholder="Write a comment..."
              ></textarea>
            </div>
            <button className="postNow">
              <i className="fa fa-paper-plane-o"></i>
            </button>
          </div>
        </form>
      </div>
      <div className={`self feeding cardUp `}>
        {allComments.length > 0
          ? allComments.map((each, index) => (
              <div key={index} className="self feeding insideComment">
                <div className="headNPost">
                  <div className="imageBox commentImage">
                    <img
                      className="profPic"
                      alt="User Profile AVI"
                      src={each.photoURL}
                      onClick={(_) => history.push(`/users/${each.userId}`)}
                    />
                  </div>
                  <div className="post-input ">
                    <span className="textarea commentPadding">
                      {each.content}
                    </span>
                  </div>
                </div>
              </div>
            ))
          : "no comments"}
      </div>
    </div>
  );
};

export default SingleReview;
