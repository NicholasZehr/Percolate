import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { doc, collection, addDoc, getDocs } from "firebase/firestore";
import db from "../firebase";

const FeedCard = (props) => {
  const history = useHistory();
  //CSS textarea expanding
  const [show, setShow] = useState(false);
  const textarea = document.getElementById("txt");
  const [cssShow, setCssShow] = useState("noShow");
  const [round, setRound] = useState("cardUptwo")
  const [allComments, setAllComents] = useState([]);

  useEffect(() => {
    if (show == true) {
      const subCollection = collection(
        db,
        "reviews",
        props.reviewId,
        "comments"
      );
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
  }, [show]);

  // auto extpand textarea fix it later
  if (textarea) {
    textarea.addEventListener("input", function (e) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (props.loggedInUser) {
      const content = evt.target.content.value;
      const data = {
        likeCount: 0,
        reviewId: props.reviewId,
        userId: props.loggedInUser.uid,
        displayName: props.loggedInUser.displayName
          ? props.loggedInUser.displayName
          : null,
        content: content,
        photoURL: props.loggedInUser.photoURL,
      };
      const subCollection = collection(
        db,
        "reviews",
        props.reviewId,
        "comments"
      );
      evt.target.content.value = "";
      console.log(props.loggedInUser,props.reviewId)
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
  function showComments() {
    setShow(!show);
    if (cssShow == "noShow") {
      setCssShow("show");
      setRound("cardUp")
    } else {
      setCssShow("noShow");
      setRound("cardUptwo")
    }
  }
  return (
    <div className="feedcard">
      <div className="self feeding cardDown">
        <div className="headNPost">
          <div className="imageBox post">
            <img
              className="profPic postHead"
              alt="User Profile AVI"
              src={
                props.review
                  ? props.review.photoURL || "/guest.jpeg"
                  : "/guest.jpeg"
              }
              onClick={(_) => history.push(`/users/${props.review.userId}`)}
            />
          </div>
          <div className="nameAndTime">
            <span className="writepost">{props.review.displayName}: </span>
            {props.review.time ? (
              <span className="ago">{`${timeDifference(
                props.review.time.seconds
              )}`}</span>
            ) : (
              <span className="ago">no time</span>
            )}
          </div>
          <div className="username writepost">
            <p>{props.review.content}</p>
          </div>
        </div>
      </div>
      <div className="self feeding cardUpAdjustment">
        <div className="headNPost card">
          <img
            className="favCoffee"
            alt="favorite coffee"
            onClick={(_) => history.push(`/coffees/${props.review.id}`)}
            src={props.review ? props.review.feedURL : "/whiteBack.png"}
          />
          <div className="coffeeInfo">
            <p>Roast: {props.review.roast} </p>
            <p>Brand: {props.review.brandName} </p>
            <p>
              <b>{props.review.displayName}'s </b>Rating: {props.review.rating}
              /5
            </p>
            <p>" {props.review.content} "</p>
          </div>
        </div>
      </div>
      <div className="self feeding cardUp ">
        <div className="blank"></div>

        <div className="likes">
          <img className="heart" src="/Grey-heart.png" alt="Like Heart Icon" />
          <p>Like</p>
        </div>
        <i onClick={showComments} className="material-icons flip">
          chat
        </i>
        <div onClick={showComments} className="comments">
          <p>Comments</p>
        </div>
      </div>
      <div className={`self feeding ${round}`}>
        <form className="form" onSubmit={handleSubmit}>
          <div className="headNPost">
            <div className="imageBox commentImage">
              <img
                className="profPic"
                alt="User Profile AVI"
                src={
                  props.user
                    ? props.user.photoURL || "/guest.jpeg"
                    : "/guest.jpeg"
                }
                onClick={(_) => history.push(`/users/${props.user.uid}`)}
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
      <div className={`self feeding cardUptwo ${cssShow}`}>
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

export default FeedCard;
