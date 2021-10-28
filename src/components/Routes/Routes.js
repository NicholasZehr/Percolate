import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";
import { getAuth } from "firebase/auth";
import AddBusiness from "../businesses/addBusiness/AddBusiness";
import LoginPage from "../loginSignup/Login";
import Signup from "../loginSignup/Signup";
import Business from "../businesses/singleBusiness/SingleBusiness";
import SingleUserPage from "../user/SinglePageUser";
import SingleCoffee from "../coffee/SingleCoffee";
import ReviewPane from "../reviews/ReviewPane";
import SingleReview from "../reviews/SingleReview";
import About from "../utils/About";
import Home from "../homepage/Home";
import MapSearch from "../search/MapSearch";
import Contact from "../utils/Contact";

const Routes = ()=> {
  const [user, setUser] = useState({});
  useEffect(()=>{
    setUser(getAuth())
    console.log('firing')
  },[user])
    return (
      user.currentUser?(<Switch>
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
      </Switch>):(<Switch>
        <Route path="/login" component={LoginPage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/" component={LoginPage} />
      </Switch>)
    );
}

export default Routes;
