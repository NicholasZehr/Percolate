import React, { Component } from "react";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";

class ListedReview extends Component {
  render() {
    const { username, rating } = this.props.review;
    const reviewId = this.props.reviewId;
    const content = this.props.content;
    return (
      <div className="review-list-item">
        <div className="review-user-rating">
          <h4 id="review-username">Username {username} </h4>
          <h4 id="review-rating">Rating {rating}</h4>
          <LikeButton
            id={this.props.id}
            index={this.props.idx}
            reviewId={reviewId}
            key={this.props.review.reviewId}
            likeCount={this.props.review.likeCount}
            type={this.props.type}
          />
        </div>
        <hr className="solid" />
        <Link to={`/review/${reviewId}`}>
          <p id="content">{content}</p>
        </Link>
      </div>
    );
  }
}

export default ListedReview;
