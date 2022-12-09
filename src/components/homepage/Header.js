import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setUser } from "../../redux/authSlice";
import { Search } from "../search/Search";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from"../../firebase"
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loggedIn } = useSelector(state => state.auth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.toJSON()))
      }
      else {
        dispatch(logout)
      }
    })
    return unsubscribe
  },[])
  function gotoPage() {
    if (loggedIn) {
      navigate(`/users/${user.uid}`);
    } else {
      navigate("/user/login");
    }
  }
  function signOut() {
    dispatch(logout()).then(() => {
      navigate("/user/login");
    });
  }
  function clickLogo() {
      navigate("/");
  }

  return (
    <>
    <div className="header">
      <div className="header-navbar">
        <div className="header-left">
          <div className="oursite" onClick={clickLogo}>
            <span className="brand">Percolate</span>
            <img
              className="logo"
              onClick={() => navigate("/home")}
              alt="Percolate Logo"
              src={"/logo.png"}
            />
          </div>

          <div className="blank">
            <div className="about" onClick={(_) => navigate("/about")}>
              About
            </div>
            <div className="space"></div>
          </div>
        </div>
        <div className="header-middle ">
          <Search />
        </div>
        <div className="header-right">
          <div className="loginBox">
            <div className="imageBox" onClick={gotoPage}>
              <img
                onClick={gotoPage}
                className="profPic"
                alt="User Profile AVI"
                src={
                  loggedIn ? user.photoURL || "/guest.jpeg" : "/guest.jpeg"
                }
              />
            </div>
            <div className="username">
              {loggedIn ? (
                <div>
                  <span onClick={gotoPage}>{user.displayName}</span>
                  <div className="signoutButton" onClick={(_) => signOut()}>
                    Sign out
                  </div>
                </div>
              ) : (
                <span onClick={gotoPage}>Sign in</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Outlet/>
    </>
  );
};

export default Header;
