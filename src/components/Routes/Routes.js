import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginPage from "../loginSignup/Login";
import Signup from "../loginSignup/Signup";
import {Redirect} from "react-router-dom";
import Business from "../businesses/singleBusiness/SingleBusiness";
import SingleUserPage from "../user/SinglePageUser";
import SingleCoffee from "../coffee/SingleCoffee";
import ReviewPane from "../reviews/ReviewPane";
import SingleReview from "../reviews/SingleReview";
import About from "../utils/About";
import Home from "../homepage/Home";

const Routes = ()=> {
  const [user, setUser] = useState(getAuth().currentUser)
  const login = getAuth()
  onAuthStateChanged(login, (u) => {
    setUser(u);
  });
    return (
      <Switch>
        {user ? (
          <>
            <Route exact path="/reviewPane" component={ReviewPane} />
            <Route path="/review/:id" component={SingleReview} />
            <Route path="/login" component={LoginPage} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/businesses/:id" component={Business} />
            <Route path="/users/:id" component={SingleUserPage} />
            <Route exact path="/coffees/:id" component={SingleCoffee} />
            <Route path="/Home" component={Home} />
            <Route exact path="/" component={Home} />
          </>
        ) : (
          <>
            <Route
              path="/"
              render={() => {
                return user ? <Redirect to="/home" /> : <Redirect to="/login" />;
              }}
            />
            <Route exact path="/about" component={About} />
            <Route path="/login" component={LoginPage} />
            <Route exact path="/signup" component={Signup} />
          </>
        )}
      </Switch>
    );
}

export default Routes;
