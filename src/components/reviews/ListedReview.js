import React, { Component } from "react";
import LikeButton from "../LikeButton";
import { Link } from "react-router-dom";

class ListedReview extends Component {
  render() {
    const { displayName, rating, likeCount, photoURL, userId } =
      this.props.review;
    const reviewId = this.props.reviewId;
    const content = this.props.content;
    return (
      <div className="review-list-item">
        {/* <div className="review-details"> */}
        <div className="headNPost card">
          <Link to={`/users/${userId}`}>
            <img
              alt="review-Author"
              src={photoURL ? photoURL : "/guest.jpeg"}
              className="profPic review-author-photo"
            />
          </Link>
          <Link to={`/review/${reviewId}`}>
            <div className="review-info">
              <div className="review-single-detail">
                <label htmlFor="review-username">Author: </label>
                <h4 id="review-username"> {displayName}</h4>
              </div>
              <div className="review-single-detail">
                <label htmlFor="review-username">Rating: </label>
                <h4 id="review-rating">{rating}</h4>
              </div>
            </div>
          </Link>
          <div className="review-like-area">
            <LikeButton
              id={this.props.id}
              index={this.props.idx}
              reviewId={reviewId}
              key={this.props.review.reviewId}
              likeCount={likeCount}
              type={this.props.type}
            />
            <label className="">Liked by: {this.props.review.likeCount}</label>
          </div>
        </div>
        <hr className="solid" />
        <p className="review-content">{content}</p>
      </div>
    );
  }
}

export default ListedReview;
