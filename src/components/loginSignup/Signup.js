import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { authenticateSignup, authenticate } from "../../redux";


const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.auth.accessToken);
  const [userEmails] = useState({});
  const [userInput, setUserInput] = useState({
    user: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    },
    errors: {},
  });
  // useEffect(() => {
  //   let mounted = true;
  //   async function fetchUsers() {
  //     const uname = {};
  //     const email = {};
  //     // TODO this does not have a way to authorize!!
  //     const response = await axios('/api/users');
  //     response.data.forEach((user) => {
  //       uname[user.username] = user.username;
  //       email[user.email] = user.email;
  //     });
  //     if (mounted) {
  //       setUsernames(uname);
  //       setUserEmails(email);
  //     }
  //   }
  //   fetchUsers();
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);
  const handleSubmit = async(evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const user = {
      email: evt.target.email.value,
      firstName: evt.target.firstName.value,
      lastName: evt.target.lastName.value,
      password: evt.target.password.value,
      photoURL: '/guest.jpeg',
      coverURL: '/background.jpeg'
    };

    await dispatch(authenticateSignup(user, formName));
    await dispatch(authenticate(user.email, user.password))
  };
  const handleChange = (evt) => {
    let errors = {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    };
    if (!userInput.user.firstName) {
      errors.firstName = `Please provide your first name.`;
    }
    if (!userInput.user.lastName) {
      errors.lastName = "Please provide your last name.";
    }

    if (!userInput.user.password) {
      errors.password = "Password is required. Must be 6 characters long.";
    }
    if (!userInput.user.email) {
      errors.email = "E-mail is required.";
    } else if (userInput.user.email in userEmails) {
      errors.email = "E-mail already in use.";
    }
    setUserInput({
      user: { ...userInput.user, [evt.target.name]: evt.target.value },
      errors,
    });
  };

  return (
    <div className="login">
      {isLoggedIn ? (
        <Redirect to="/home" />
      ) : (
        <div className="loginbodyBox">
          <div className="loginbody">
            <div className="sign-up-left">
            <div className="signupTitle">
              <h2>Signup your account</h2>
            </div>
            <form id="signupform" onSubmit={handleSubmit} name="signup">
              <div className="emailBox">
                <input
                  className="email"
                  name="email"
                  type="text"
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="emailBox">
                <input
                  className="email"
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </div>
              <div className="emailBox">
                <input
                  className="email"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Last Name"
                  type="text"
                />
              </div>
              <div className="emailBox">
                <input
                  className="email"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                />
              </div>
              <div className="signupBox">
                <button className="signupPage" name="button1">
                  Sign Up
                </button>
              </div>
            </form>
            </div>
            <div class="sign-up-right">
            {userInput.errors !== "" && (
                  <span className="error">{userInput.errors.email}</span>
                )}
                {userInput.errors !== "" && (
                  <span className="error">{userInput.errors.firstName}</span>
                )}
                {userInput.errors !== "" && (
                  <span className="error">{userInput.errors.lastName}</span>
                )}
                {userInput.errors !== "" && (
                  <span className="error">{userInput.errors.password}</span>
                )}
                {userInput.errors !== "" && <span className="error"></span>}
                {userInput.errors !== "" && <span className="error"></span>}
              </div>
          </div>
          <h1 className="welcome">Welcome to Percolate</h1>
        </div>
      )}
      <div className="bottomBarSup">
        <div id="bottomText">The home to all your coffee life.</div>
      </div>
    </div>
  );
};
export default Signup;
