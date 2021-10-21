import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchUser } from "../store/Actions/usersActions";
import db from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchLoginUser } from "../store/auth";
import { fetchSingleCoffee } from "../store/singleCoffee";

const FeedCard = (props) => {
  const dispatch = useDispatch();
  const singleCoffee = useSelector((state) => state.singleCoffee);

  useEffect(() => {
    if (props.review) {
      dispatch(fetchSingleCoffee(props.review.coffeeId));
    }
    console.log(singleCoffee);
  }, []);

  return (
    <>
      <div className="self feeding cardDown">
        <div className="headNPost">
          <div className="imageBox post">
            <img
              className="profPic"
              alt="User Profile AVI"
              src={
                props.user
                  ? props.user.photoURL || "/guest.jpeg"
                  : "/guest.jpeg"
              }
            />
            <div className="username writepost">
              {props.user ? (
                <p>
                  {props.user.displayName + " " + props.loggedInUser.lastName}
                </p>
              ) : (
                "Sign in"
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="self feeding cardAdjustment"
        onClick={(_) => console.log("fdsafdsafdf", singleCoffee)}
      >
        <div className="headNPost card">
          <img
            className="favCoffee"
            src={singleCoffee ? singleCoffee.photoUrl : singleCoffee}
          />
          <div className="coffeeInfo">
            <p>Roast: {singleCoffee.roast}</p>
            <p>Brand: {singleCoffee.brandName}</p>
            <p>Average Rate: {singleCoffee.avgRating}</p>
            <p>Location: {singleCoffee.roasterCity}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedCard;
