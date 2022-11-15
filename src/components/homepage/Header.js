import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Search } from "../search/Search";

const Header = () => {
  const history = useHistory();
  const login = getAuth();
  const dispatch = useDispatch();
  const [user, setUser] = useState(getAuth().currentUser);
  onAuthStateChanged(login, (u) => {
    setUser(u);
  });

  function gotoPage() {
    if (user) {
      history.push(`/users/${user.uid}`);
    } else {
      history.push("/login");
    }
  }
  function signOut() {
    history.push("/login");
    dispatch(logout());
  }
  function clickLogo() {
      history.push("/home");
  }

  return (
    <div className="header">
      <div className="header-navbar">
        <div className="header-left">
          <div className="oursite" onClick={clickLogo}>
            <span className="brand">Percolate</span>
            <img
              className="logo"
              onClick={() => history.push("/home")}
              alt="Percolate Logo"
              src={"/logo.png"}
            />
          </div>

          <div className="blank">
            <div className="about" onClick={(_) => history.push("/about")}>
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
                  user ? user.photoURL || "/guest.jpeg" : "/guest.jpeg"
                }
              />
            </div>
            <div className="username">
              {user ? (
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
  );
};

export default Header;
