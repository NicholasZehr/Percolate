import React, { Component } from "react";
import { connect } from "react-redux";
import LikeButton from "../utils/LikeButton";
import { Link } from "react-router-dom";
import { serverTimestamp } from "firebase/firestore";

class ListedReview extends Component {
  constructor() {
    super();
    this.state = { mounted: false };
  }
  componentDidMount() {
    this.setState({ mounted: new Date() });
  }
  render() {
    const {
      displayName,
      rating,
      likeCount,
      photoURL,
      userId: authorId,
    } = this.props.review;
    const {
      id,
      liked,
      currentUserId,
      type,
      displayName: currentUserDisplayName,
      photoURL: currentUserPhotoURL,
      content,
      reviewId,
    } = this.props;
    return (
      <div className="review-list-item">
        {/* <div className="review-details"> */}
        <div className="headNPost card">
          <Link to={`/users/${authorId}`}>
            <img
              alt="review-Author"
              src={photoURL ? photoURL : "/guest.jpeg"}
              className="profPic review-author-photo"
            />
          </Link>
          <div className="review-info">
            <div className="review-single-detail">
              {/* <label htmlFor="review-username">Author: </label> */}
              <h4 id="review-username"> {displayName}</h4>
            </div>
          </div>

          <div className="review-like-area">
            <LikeButton
              liked={liked}
              id={id}
              userId={currentUserId}
              displayName={currentUserDisplayName}
              photoURL={currentUserPhotoURL}
              reviewId={reviewId}
              key={this.props.review.reviewId}
              likeCount={likeCount}
              type={type}
              mounted={this.state.mounted}
            />
            <label className="">Liked by: {this.props.review.likeCount}</label>
          </div>
        </div>
        <hr className="solid" />
        <Link to={`/review/${reviewId}`}>
          <div className="review-info">
            <div className="review-single-detail">
              <label htmlFor="review-username">Rating: </label>
              <h4 id="review-rating">{rating}</h4>
            </div>
          </div>
          <p className="review-content">{content}</p>
        </Link>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    reviews: state.review.reviews,
  };
};
export default connect(mapState, null)(ListedReview);
