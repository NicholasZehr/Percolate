import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleReview } from "../../store/reviewActions";
import ReviewComment from "./ReviewComment";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchLoginUser } from "../../store/auth";
import FeedCard from "../feedCard";
class SingleReview extends Component {
  constructor() {
    super();
    this.state = {
      user: getAuth().currentUser,
    };
  }
  async componentDidMount() {
    const reviewId = this.props.match.params.reviewId;
    await this.props.fetchLoginUser();
    await this.props.fetchReview(reviewId);
    this.setState({user: getAuth().currentUser})
  }

  render() {
    const reviewId = this.props.match.params.reviewId;

    return (
      <div className="singleReview">
        <div className="blank"></div>
        <div className="reviewcard">
          <FeedCard
            reviewId={reviewId}
            review={this.props.review}
            user={this.state.user}
            loggedInUser={this.props.loggedInUser}
          />
        </div>
        <div className="blank"></div>
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    review: state.review.review,
    loggedInUser: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchReview: (reviewId) => dispatch(fetchSingleReview(reviewId)),
    fetchLoginUser: (_) => dispatch(fetchLoginUser()),
  };
};

export default connect(mapState, mapDispatch)(SingleReview);
