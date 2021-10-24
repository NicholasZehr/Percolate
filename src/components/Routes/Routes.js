import React, { Component } from "react";
import { Route, Switch } from "react-router";
import AllBusinesses from "../businesses/allBusinesses/AllBusinesses";

import AddBusiness from "../businesses/addBusiness/AddBusiness";
import LoginPage from "../loginSignup/Login";
import Signup from "../loginSignup/Signup";
import Business from "../businesses/singleBusiness/singleBusiness";
import SingleUserPage from "../user/SinglePageUser";
import SingleCoffee from "../coffee/SingleCoffee";
import ReviewPane from "../reviews/ReviewPane";
import SingleReview from "../reviews/SingleReview";
import About from "../About";
import Home from "../Home";
import Feed from "../feed/Feed";
import MapSearch from "../MapSearch";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/reviewPane" component={ReviewPane} />
        <Route path="/review/:id" component={SingleReview} />
        <Route path="/login" component={LoginPage} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/businesses" component={AllBusinesses} />
        <Route exact path="/businesses/:id" component={Business} />
        <Route path="/addBusiness" component={AddBusiness} />
        <Route path="/users/:id" component={SingleUserPage} />
        <Route exact path="/coffees/:id" component={SingleCoffee} />
        <Route path="/Home" component={Home} />
        <Route exact path="/" component={Home} />
        <Route path="/feed" component={Feed} />
        <Route exact path="/map" component={MapSearch} />
      </Switch>
    );
  }
}

export default Routes;
