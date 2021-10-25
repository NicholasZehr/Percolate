import React, { Component } from "react";
import { connect } from "react-redux";
import { likeClick } from "../../store/Actions/reviewActions";
import ListedReview from "./ListedReview";
import { query, where, collection, getDocs } from "firebase/firestore";
import db from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
class ReviewPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likedObj: {},
      loading: true,
      user: auth.currentUser,
    };
    this.checkReview = this.checkReview.bind(this);
    this.unsubscribeFromAuth = null;
  }
  async componentDidMount() {
    this.unsubscribeFromAuth = onAuthStateChanged((user) => {
      this.setState({ ...this.state, user: user });
    });
    const q = query(
      collection(db, "likeRelation"),
      where("userId", "==", `${this.state.user.uid}`)
    );
    const likedReviews = await getDocs(q);
    const likedObj = {};
    likedReviews.forEach((doc) => {
      likedObj[doc.data().reviewId] = true;
    });
    this.setState({
      ...this.state,
      likedObj: likedObj,
    });
    console.log("these are the liked reviews", likedObj);
  }
  async componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  checkReview(content) {
    let revWords = content ? content.split(" ") : "";
    const length = revWords.length;
    let newReview = "";
    if (length >= 10) {
      newReview = revWords.slice(0, 5).join(" ").concat(" More...");
      return newReview;
    }
    return content;
  }

  render() {
    const { checkReview } = this;
    const id = this.props.id;
    const type = this.props.type;
    const arrReviews =
      this.props.reviews !== {} ? Object.entries(this.props.reviews) : false;
    // const reviewArr = this.props.reviews.reviews;
    console.log(this.state.likedObj);
    return (
      <>
        {arrReviews.length > 0 ? (
          <div>
            <h2>Reviews</h2>
            {arrReviews
              ? arrReviews.map((review, idx) => {
                  //checkReview(review.content);
                  return (
                    <ListedReview
                      liked={this.state.likedObj[review[0]] ? true : false}
                      id={id}
                      type={type}
                      key={review[0]}
                      content={checkReview(review[1].content)}
                      review={review[1]}
                      reviewId={review[0]}
                    />
                  );
                })
              : null}
          </div>
        ) : (
          <div className="home loading">
            <div className="self loading">
              <p>Loading ...</p>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapState = (state) => {
  return {
    reviews: state.review.reviews,
    auth: state.auth,
  };
};
const mapDispatch = (dispatch) => ({
  fetchReviews: (type, id) => dispatch(likeClick(type, id)),
});

export default connect(mapState, mapDispatch)(ReviewPane);
