import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Search } from "../search/Search";
import { Outlet } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const login = getAuth();
  const dispatch = useDispatch();
  const [user, setUser] = useState(getAuth().currentUser);
  onAuthStateChanged(login, (u) => {
    setUser(u);
  });

  function gotoPage() {
    if (user) {
      navigate(`/users/${user.uid}`);
    } else {
      navigate("/user/login");
    }
  }
  function signOut() {
    navigate("/user/login");
    dispatch(logout());
  }
  function clickLogo() {
      navigate("/home");
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
    <Outlet/>
    </>
  );
};

export default Header;
