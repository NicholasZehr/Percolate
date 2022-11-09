import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Modal from "react-modal";
import { Link, useHistory} from "react-router-dom";
import { fetchLoginUser } from "../../store/auth";
import FeedCard from "../utils/FeedCard";
import { fetchReviews } from "../../store/Actions/reviewActions";
import { fetchFeedReviews } from "../../store/feed";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import db from "../../firebase";
import { addReview } from "../../store/Actions/reviewActions";
import MapSearch from "../search/MapSearch";
import { fetchBusinesses } from "../../store/Actions/businessActions";
import Login from "../loginSignup/Login";
import { fetchAllCoffee } from "../../store/Actions/coffeeActions";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";

Modal.setAppElement("#root");

const Home = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth);
  const auth = getAuth();
  const [user, setUser] = useState(getAuth().currentUser);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  // const reviews = useSelector((state) => state.review.reviews);
  const reviews = useSelector((state) => state.feed);
  const [write, setWrite] = useState(false);
  const [rating, setRating] = useState(0);
  const allBusiness = useSelector((state) => state.businesses.businesses);
  const allCoffee = useSelector((state) => state.coffee.allCoffee);
  const [localCoffee, setLocalCoffee] = useState([]);
  const [localBusiness, setLocalBusiness] = useState([]);

  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      //* Fetch the user using it's id
      await dispatch(fetchLoginUser());
      await dispatch(fetchBusinesses());
      await dispatch(fetchAllCoffee());
    }
    if (mounted) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  useEffect(() => {
    const list = [];
    const fol = [];
    let mounted = true;
    //======push followers in list,and following in fol
    if (Object.keys(loggedInUser).length > 0) {
      if (loggedInUser.following && loggedInUser.followers) {
        loggedInUser.followers.forEach((element) => {
          //========== find wether the current profile page is followed
          list.push(element);
        });
        loggedInUser.following.forEach((each) => {
          // this is push to followiing
          fol.push(each);
        });
      }
    }
    //fetching posts from firestore
    if (user) {
      // dispatch(fetchReviews("user", user.uid));
      dispatch(fetchFeedReviews(user.uid));
    }

    if (mounted) {
      const temp1 = [];
      Object.keys(allCoffee).forEach((id) =>
        temp1.push({ ...allCoffee[id], id })
      );
      temp1.sort((a, b) => b.avgRating - a.avgRating);
      setLocalCoffee(temp1);

      const temp = [];
      Object.keys(allBusiness).forEach((id) =>
        temp.push({ ...allBusiness[id], id })
      );
      temp.sort((a, b) => b.followers.length - a.followers.length);
      setLocalBusiness(temp);
      setFollowers(list);
      setFollowing(fol);
    }
    return () => {
      setLocalBusiness([]);
      mounted = false;
    };
  }, [loggedInUser, allBusiness, allCoffee]);

  function writePage() {
    setWrite(!write);
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (loggedInUser) {
      const content = evt.target.content.value;
      const data = {
        name: evt.target.name.value,
        brandName: evt.target.brandName.value,
        roasterCity: evt.target.roasterCity.value,
        roast: evt.target.roast.value,
        userId: loggedInUser.uid,
        displayName: loggedInUser.displayName ? loggedInUser.displayName : null,
        rating: rating,
        businessId: [],
        time: serverTimestamp(),
        likeCount: 0,
        feedURL: loggedInUser.photoURL,
        content: content,
        photoURL: evt.target.photoURL.value,
      };
      const coffeeRef = collection(db, "coffees");

      evt.target.content.value = "";
      const newCoffee = await addDoc(coffeeRef, data);
      data["id"] = newCoffee.id;
      data["type"] = "coffee";
      dispatch(addReview(data));
    }
    setWrite(!write);
  };
  const handleChange = (evt) => {
    setRating(evt.target.value);
  };

  return (
    <>
      {loggedInUser && user ? (
        <div className="home">
          <Modal className="modal" isOpen={write} onRequestClose={writePage}>
            <div className="imageBox post">
              <img
                className="profPic"
                alt="User Profile AVI"
                src={user ? user.photoURL || "/guest.jpeg" : "/guest.jpeg"}
              />
              <div className="username writepost">
                {user ? (
                  <p>{user.displayName + " " + loggedInUser.lastName}</p>
                ) : (
                  "Sign in"
                )}
              </div>
            </div>
            <div>
              <h2>Add A New Product</h2>
              <form
                className="signupform"
                onSubmit={handleSubmit}
                name="signup"
              >
                <div className="emailBox mod">
                  <span className="formName">Product Name:</span>
                  <input
                    className="email"
                    name="name"
                    type="text"
                    placeholder="Product Name"
                  />
                  <div className="blank3"></div>
                </div>
                <div className="emailBox mod">
                  <span className="formName">Brand Name:</span>
                  <input
                    className="email"
                    name="brandName"
                    type="text"
                    placeholder="Brand Name"
                  />
                  <div className="blank3"></div>
                </div>

                <div className="emailBox mod">
                  <span className="formName">Roast:</span>
                  <input
                    className="email"
                    name="roast"
                    placeholder="Roast"
                    type="text"
                  />
                  <div className="blank3"></div>
                </div>
                <div className="emailBox mod">
                  <span className="formName">Roaster City:</span>
                  <input
                    className="email"
                    name="roasterCity"
                    placeholder="Roaster City"
                    type="text"
                  />
                  <div className="blank3"></div>
                </div>
                <div className="emailBox mod">
                  <span className="formName">Product Photo:</span>
                  <input
                    className="email"
                    name="photoURL"
                    type="text"
                    placeholder="Product Photo URL"
                  />
                  <div className="blank3"></div>
                </div>

                <div className="ratingBox">
                  <div className="blank"></div>
                  <label htmlFor="rating">Rating: </label>
                  <section id="rate" className="rating">
                    <input
                      onChange={handleChange}
                      type="radio"
                      id="heart_5"
                      name="like"
                      value="5"
                    />
                    <label
                      className="rating_heart"
                      htmlFor="heart_5"
                      title="Five"
                    ></label>
                    <input
                      onChange={handleChange}
                      type="radio"
                      id="heart_4"
                      name="like"
                      value="4"
                    />
                    <label
                      className="rating_heart"
                      htmlFor="heart_4"
                      title="Four"
                    ></label>

                    <input
                      onChange={handleChange}
                      type="radio"
                      id="heart_3"
                      name="like"
                      value="3"
                    />
                    <label
                      className="rating_heart"
                      htmlFor="heart_3"
                      title="Three"
                    ></label>

                    <input
                      onChange={handleChange}
                      type="radio"
                      id="heart_2"
                      name="like"
                      value="2"
                    />
                    <label
                      className="rating_heart"
                      htmlFor="heart_2"
                      title="Two"
                    ></label>

                    <input
                      onChange={handleChange}
                      type="radio"
                      id="heart_1"
                      name="like"
                      value="1"
                    />
                    <label
                      className="rating_heart"
                      htmlFor="heart_1"
                      title="One"
                    ></label>
                  </section>
                  <div className="blank"></div>
                </div>
                <label htmlFor="content">Review Comments:</label>
                <textarea
                  id="add-review-text"
                  rows="5"
                  className="textarea"
                  maxLength="500"
                  name="content"
                  placeholder={`What's on your mind about this product? ${
                    user ? user.displayName : ""
                  }`}
                ></textarea>
                <div className="signupBox">
                  <button className="signupPage">Submit Review</button>
                </div>
              </form>
            </div>
          </Modal>
          <div className="leftSide">
            <div className="self">
              <h3>{`Welcome, ${
                loggedInUser ? loggedInUser.displayName : "Guest"
              }!`}</h3>
            </div>
            <div className="self">
              <span className="favoriteTitle">My favorite coffee:</span>
              <img
                className="favCoffee"
                src={loggedInUser ? loggedInUser.coffeeURL || "" : ""}
                alt=""
              />
            </div>
            <div className="self">
              <p className="favoriteTitle">You have:</p>
              <span>{followers.length} followers </span>
              <span>{following.length} following </span>
            </div>
          </div>

          <div className="centerBody">
            <MapSearch />
            <div className="cardRound">
              <p>Try Something New and Good Recently? </p>
              <button className="postNow newCoffee" onClick={writePage}>
                Add New Product
              </button>
            </div>
            {Object.keys(reviews).length > 0
              ? Object.keys(reviews).map((id, index) => (
                  <FeedCard
                    key={index}
                    reviewId={id}
                    review={reviews[id]}
                    user={user}
                    loggedInUser={loggedInUser}
                    type="reviews"
                  />
                ))
              : ""}
          </div>
          <div className="rightSide">
            <div className="rightsideBar">
              <p className="favoriteTitle">Trending coffees:</p>
              {localCoffee.length > 0
                ? localCoffee.slice(0, 3).map((each) => (
                    <Link key={each.id} to={`/coffees/${each.id}`}>
                      <div className="businessSideBar" key={each.id}>
                        <span>{each.name} </span>
                        <span>Average Rating: {each.avgRating}</span>
                        <img
                          className="favCoffee"
                          src={each.photoURL ? each.photoURL || "" : ""}
                          alt=""
                        />
                      </div>
                    </Link>
                  ))
                : ""}
            </div>
            <div className="rightsideBar">
              <p className="favoriteTitle">Most Follwed Businesses:</p>
              {localBusiness.length > 0
                ? localBusiness.slice(0, 5).map((each) => (
                    <Link key={each.id} to={`/businesses/${each.id}`}>
                      <div className="businessSideBar">
                        <span>{each.name} </span>
                        <span>{each.followers.length} followers</span>
                      </div>
                    </Link>
                  ))
                : ""}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
