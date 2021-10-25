import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../../store/Actions/reviewActions";
import { getAuth } from "firebase/auth";
const auth = getAuth();
class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = { user: auth.currentUser, loading: false };
    this.handleLike = this.handleLike.bind(this);
  }

  async handleLike() {
    const likeClick = this.props.likeClick;
    const id = this.props.id;
    const type = this.props.type;
    const { uid, displayName, photoURL } = this.state.user;
    this.setState({ ...this.state, loading: true });
    await likeClick(id, this.props.reviewId, uid, displayName, photoURL, type);
    this.setState({ ...this.state, loading: false });
  }
  render() {
    const likeCount = this.props.likeCount;
    const { handleLike } = this;
    return `${likeCount}` && !this.state.loading ? (
      <div className="like_button" onClick={handleLike}>
        <img className="heart" src="/Brown-heart.png" alt="Like Heart Icon" />
        Like
      </div>
    ) : (
      <div className="like_button like-in-progress" onClick={handleLike}>
        <img className="heart" src="/Brown-heart.png" alt="Like Heart Icon" />
        ...
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    loggedInPerson: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  likeClick: (id, reviewId, userId, displayName, photoURL, type) =>
    dispatch(likeClick(id, reviewId, userId, displayName, photoURL, type)),
});

export default connect(mapState, mapDispatch)(LikeButton);
