import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedOut, setUser } from "../../redux/authSlice";
import { Search } from "../search/Search";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from"../../firebase"
import { Loader } from "../utils";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, loggedIn } = useSelector(state => state.auth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.toJSON()))
      }
      else {
        dispatch(loggedOut())
        navigate("/user/login")
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
            <div className="about" onClick={() => navigate("/about")}>
              About
            </div>
            <div className="about" onClick={() => navigate("/business")}>
              Shops
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
              {loading ? <Loader/>:loggedIn ? (<>
                <span onClick={gotoPage}>{user.displayName}</span>
                  <div className="signoutButton button" onClick={()=>{signOut(auth)}}>
                    Sign out
                  </div>
                  </>
              ) : (
                <span className="signoutButton button" onClick={gotoPage}>Sign in</span>
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
