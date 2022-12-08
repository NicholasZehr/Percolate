import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

const FeedCard = (props) => {
  const navigate= useNavigate();
  //CSS textarea expanding
  const [show, setShow] = useState(false);
  const textarea = document.getElementById("txt");
  const [cssShow, setCssShow] = useState("noShow");
  const [round, setRound] = useState("cardUptwo");
  const [allComments, setAllComents] = useState([]);

  useEffect(() => {
    if (show === true) {
      const subCollection = collection(
        db,
        "reviews",
        props.reviewId,
        "comments"
      );
      async function fetchComments() {
        const q = query(subCollection, orderBy("timestamp", "desc"));
        const response = await getDocs(q);
        const temp = [];
        response.forEach((doc) => {
          temp.push(doc.data());
        });
        setAllComents(temp);
      }
      fetchComments();
    }
  }, [show]);
  useEffect(() => {
    if (props.type === "reviews") {
      const subCollection = collection(
        db,
        "reviews",
        props.reviewId,
        "comments"
      );
      async function fetchComments() {
        const q = query(subCollection, orderBy("timestamp", "desc"));
        const response = await getDocs(q);
        const temp = [];
        response.forEach((doc) => {
          temp.push(doc.data());
        });
        setAllComents(temp);
      }
      fetchComments();
    }
  }, []);

  // auto extpand textarea fix it later
  if (textarea) {
    textarea.addEventListener("input", function (e) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const temp = [...allComments];
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
        timestamp: serverTimestamp(),
      };
      const subCollection = collection(
        db,
        "reviews",
        props.reviewId,
        "comments"
      );
      temp.unshift(data);
      evt.target.content.value = "";
      setAllComents(temp);
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
    const plural = "s ago";
    const notPlural = " ago";

    if (elapsed < msPerMinute) {
      const secs = Math.round(elapsed / 1000);
      return secs + " second" + (pluralTime(secs) ? plural : notPlural);
    } else if (elapsed < msPerHour) {
      const mins = Math.round(elapsed / msPerMinute);
      return mins + " minute" + (pluralTime(mins) ? plural : notPlural);
    } else if (elapsed < msPerDay) {
      const hours = Math.round(elapsed / msPerHour);
      return hours + " hour" + (pluralTime(hours) ? plural : notPlural);
    } else if (elapsed < msPerMonth) {
      const days = Math.round(elapsed / msPerDay);
      return "~ " + days + " day" + (pluralTime(days) ? plural : notPlural);
    } else if (elapsed < msPerYear) {
      const months = Math.round(elapsed / msPerMonth);
      const returnMonths =
        "~ " + months + " Month" + (pluralTime(months) ? plural : notPlural);
      return returnMonths;
    } else {
      const years = Math.round(elapsed / msPerYear);
      return "~ " + years + " Year" + (pluralTime(years) ? plural : notPlural);
    }
  }

  function pluralTime(input) {
    if (input > 1) {
      return true;
    } else return false;
  }
  function showComments() {
    setShow(!show);
    if (cssShow === "noShow") {
      setCssShow("show");
      setRound("cardUp");
    } else {
      setCssShow("noShow");
      setRound("cardUptwo");
    }
  }
  function handleHeadClick() {
    if (props.type === "reviews") {
      navigate(`/users/${props.review.userId}`);
    } else if (props.type === "business") {
      navigate(`/coffees/${props.coffeeId}`);
    }
  }
  return (
    <div className="feedcard">
      <div className="feeding cardDown">
        <div className="headNPost top">
          <div className="imageBox post">
            <img
              className="profPic postHead"
              alt="User Profile AVI"
              src={
                props.review
                  ? props.review.feedURL || "/guest.jpeg"
                  : "/guest.jpeg"
              }
              onClick={handleHeadClick}
            />
          </div>
          <div className="nameAndTime">
            <span className="writepost">
              {props.review.displayName
                ? props.review.displayName
                : props.review.name}
              :{" "}
            </span>
            {props.review.time ? (
              <span className="ago">{`${timeDifference(
                props.review.time.seconds
              )}`}</span>
            ) : (
              <span className="ago"></span>
            )}
          </div>
          <div className="username writepost">
            <p>{props.review.content}</p>
          </div>
        </div>
      </div>
      <div className="feeding cardUpAdjustment">
        <div className="headNPost card">
          <img
            className="favCoffee"
            alt=""
            onClick={(_) => navigate(`/coffees/${props.review.id}`)}
            src={
              props.review
                ? props.review.photoURL || props.review.feedURL || ""
                : "/whiteBack.png"
            }
          />
          <div className="coffeeInfo">
            <p>Roast: {props.review.roast} </p>
            <p>Brand: {props.review.brandName} </p>
            <p>
              <b> User </b>Rating:{" "}
              {props.type === "reviews"
                ? props.review.rating
                : props.review.avgRating}
              /5
            </p>
          </div>
        </div>
      </div>
      {props.type === "reviews" ? (
        <div>
          <div className="middlePieceOfcard feeding cardUp ">
            <div className="blank"></div>

            <div className="likes">
              <img
                className="heart"
                src="/Grey-heart.png"
                alt="Like Heart Icon"
              />
              <p>Like</p>
            </div>
            <i onClick={showComments} className="material-icons flip">
              chat
            </i>
            <div onClick={showComments} className="comments">
              <p>{`Comments (${allComments.length})`}</p>
            </div>
          </div>
          <div>
            <form className="feedcardCss" onSubmit={handleSubmit}>
              <div className={`headNPost ${round}`}>
                <div className="imageBox commentImage">
                  <img
                    className="profPic"
                    alt="User Profile AVI"
                    src={
                      props.user
                        ? props.user.photoURL || "/guest.jpeg"
                        : "/guest.jpeg"
                    }
                    onClick={handleHeadClick}
                  />
                </div>

                <textarea
                  className="textarea"
                  id="txt"
                  name="content"
                  maxLength="200"
                  placeholder="Write a comment..."
                ></textarea>
                <button className="postNow">
                  <i className="fa fa-paper-plane-o"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={`cardUptwo ${cssShow}`}>
        {allComments.length > 0
          ? allComments.map((each, index) => (
              <div key={index} className="self feeding insideComment">
                <div className="headNPost ">
                  <div className="singleComment">
                    <div className="commentName">{each.displayName}</div>
                    <div className="commentContentImage">
                      <div id="commentImage" className="imageBox commentImage">
                        <img
                          className="profPic"
                          alt=""
                          src={each.photoURL || ""}
                          onClick={(_) => navigate(`/users/${each.userId}`)}
                        />
                      </div>{" "}
                      <div className="post-input commentContent">
                        <span className="textarea commentPadding">
                          {each.content}
                        </span>
                      </div>
                    </div>
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
