import React, { Component } from "react";
import { Route, Switch } from "react-router";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";

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

class Routes extends Component {
  render() {
    return (
      <Switch>
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
      </Switch>
    );
  }
}

export default Routes;
