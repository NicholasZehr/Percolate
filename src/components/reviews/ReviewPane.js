import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchReviews } from "../../store/reviewActions";
import ListedReview from "./ListedReview";

class ReviewPane extends Component {
  componentDidMount() {
    console.log("I mounted!!!");
    this.props.fetchReviews("type", "id");
  }
  render() {
    const reviewArr = this.props.reviews.reviews;
    if (!reviewArr) return null;
    return (
      <div>
        <h2>Reviews</h2>
        {reviewArr.map((review) => {
          return <ListedReview review={review} />;
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    reviews: state.review.reviews,
  };
};
const mapDispatch = (dispatch) => ({
  fetchReviews: (type, id) => dispatch(fetchReviews("coffee", "1")),
});

export default connect(mapState, mapDispatch)(ReviewPane);
