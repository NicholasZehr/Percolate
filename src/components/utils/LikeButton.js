import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../../store/Actions/reviewActions";
import { getAuth } from "firebase/auth";
const auth = getAuth();
//Prior to conversion to hooks and functional component

const LikeButton = (props) => {
  const [user, setUser] = useState(getAuth.currentUser)
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(false)
  componentDidMount() {
    this.setState({
      ...this.state,
      liked: this.props.liked,
      mounted: this.props.mounted,
    });
  }
  async handleLike() {
    const { id, userId, reviewId, displayName, photoURL, type, likeClick } =
    this.props;
    this.setState({ ...this.state, loading: true });
    await likeClick(id, reviewId, displayName, photoURL, type, userId);
    this.setState({ ...this.state, loading: false, liked: !this.state.liked });
  }
  render() {
    const thisConst = this.props.reviews;
    const likeCount = this.props.likeCount;
    const { handleLike } = this;
    return `${likeCount}` && !this.state.loading ? (
      <div className="like_button" onClick={handleLike}>
        <img
          className="heart"
          src={this.state.liked ? "/Brown-heart.png" : "/Grey-heart.png"}
          alt="Like Heart Icon"
          />
        Like
      </div>
    ) : (
      <div className="like_button like-in-progress">
        <img
          className="heart"
          src={this.state.liked ? "/Brown-heart.png" : "/Grey-heart.png"}
          alt="Like Heart Icon"
          />
        ...
      </div>
    );
  }
}
}

export default LikeButton;

// const mapState = (state) => {
//   return {
//     reviews: state.review.reviews,
//   };
// };
// const mapDispatch = (dispatch) => ({
//   likeClick: (id, reviewId, displayName, photoURL, type, userId) =>
//     dispatch(likeClick(id, reviewId, displayName, photoURL, type, userId)),
// });