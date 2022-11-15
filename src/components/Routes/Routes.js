import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginPage from "../loginSignup/Login";
import Signup from "../loginSignup/Signup";
import { Redirect } from "react-router-dom";
import AllBusinesses from "../businesses/AllBusinesses";
import Business from "../businesses/SingleBusiness";
import SingleUserPage from "../user/SinglePageUser";
import SingleCoffee from "../coffee/SingleCoffee";
import ReviewPane from "../reviews/ReviewPane";
import SingleReview from "../reviews/SingleReview";
import About from "../utils/About";
import Home from "../homepage/Home";

const AllRoutes = ()=> {
  const [user, setUser] = useState(getAuth().currentUser)
  const login = getAuth()
  onAuthStateChanged(login, (u) => {
    setUser(u);
  });
    return (
      <Switch>
            {/* <Route exact path="/reviewPane" component={ReviewPane} /> */}
            <Route path="/businesses" component={AllBusinesses} />
            {/* <Route path="/review/:id" component={SingleReview} /> */}
            <Route path="/login" component={LoginPage} />
            <Route path="/about" component={About} />
            {/* <Route path="/signup" component={Signup} /> */}
            {/* <Route exact path="/businesses/:id" component={Business} />
            <Route path="/users/:id" component={SingleUserPage} />
            <Route exact path="/coffees/:id" component={SingleCoffee} /> */}
            <Route path="/Home" component={Home} />
            <Route exact path="/" component={Home} />
            <Route
              path="/"
              render={() => {
                return user ? <Redirect to="/home" /> : <Redirect to="/login" />;
              }}
            />
            <Route exact path="/about" component={About} />
            <Route path="/login" component={LoginPage} />
            <Route exact path="/signup" component={Signup} />
    
      </Switch>
    );
}

export default AllRoutes;
