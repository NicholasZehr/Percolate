import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/Actions/usersActions";
import db from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile, updatePassword } from "firebase/auth";
import { useEffect } from "react";

const EditProfileButton = (props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(props.user);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const userInfo = {
      email: evt.target.email.value,
      displayName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      password: evt.target.password.value,
      photoURL: evt.target.photoURL.value,
      coverURL: evt.target.coverURL.value,
      favorite: evt.target.favorite.value,
      coffeeURL: evt.target.coffeeURL.value,
    };
    const nonEmptyValue = {};
    for (const key in userInfo) {
      if (userInfo[key].length > 0 && key !== "password") {
        nonEmptyValue[key] = userInfo[key];
      }
    }

    //================== update basic info in auth

    updateProfile(props.user, nonEmptyValue, props.user);

    //================== update password in auth
    if (userInfo.password.length >= 6) {
      await updatePassword(props.user, userInfo.password);
    }
    //============== update detail info in firestore data
    const userRef = doc(db, "Users", props.user.uid);
    await setDoc(userRef, nonEmptyValue, { merge: true });
    //==============update redux store user info
    await dispatch(fetchUser(props.user ? props.user.uid : {}));
    props.setEdit(!props.edit);
  };
  function editPage() {
    props.setEdit(!props.edit);
  }
  return (
    <>
      <div className="close" onClick={editPage}></div>
      <h2>Edit Profile</h2>
      <form
        className="signupform"
        open={false}
        onSubmit={handleSubmit}
        name="signup"
      >
        <div className="emailBox mod">
          <span className="formName">Email:</span>
          <input
            className="email"
            name="email"
            type="text"
            placeholder="E-Mail"
          />
          <div className="blank3"></div>
        </div>
        <div className="emailBox mod">
          <span className="formName">Display Name:</span>
          <input
            className="email"
            name="firstName"
            type="text"
            placeholder="First Name"
          />
          <div className="blank3"></div>
        </div>
        <div className="emailBox mod">
          <span className="formName">Last Name:</span>
          <input
            className="email"
            name="lastName"
            placeholder="Last Name"
            type="text"
          />
          <div className="blank3"></div>
        </div>
        <div className="emailBox mod">
          <span className="formName">Password:</span>
          <input
            className="email"
            name="password"
            placeholder="Password"
            type="password"
          />
          <div className="blank3"></div>
        </div>
        <div className="emailBox mod">
          <span className="formName">Profile Picture:</span>
          <input
            className="email"
            name="photoURL"
            type="text"
            placeholder="Photo URL"
          />
          <div className="blank3"></div>
        </div>
        <div className="emailBox mod">
          <span className="formName">Cover Picture:</span>
          <input
            className="email"
            name="coverURL"
            placeholder="Cover Photo URL"
            type="text"
          />
          <div className="blank3"></div>
        </div>
        <div className="emailBox mod">
          <span className="formName">Favorite Coffee:</span>
          <input
            className="email"
            name="favorite"
            type="text"
            placeholder="Coffee"
          />
          <div className="blank3"></div>
        </div>
        <div className="emailBox mod">
          <span className="formName">Coffee Picture:</span>
          <input
            className="email"
            name="coffeeURL"
            placeholder="Favorite Coffee URL"
            type="text"
          />
          <div className="blank3"></div>
        </div>
        <button className="signupPage" name="button1">
          Save
        </button>
      </form>
    </>
  );
};
export default EditProfileButton;
