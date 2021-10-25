/* eslint-disable jsx-quotes */
/*eslint jsx-quotes: ["error", "prefer-single"]*/
import React from "react";
import { connect } from "react-redux";
import { addReview } from "../../store/Actions/reviewActions";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
const auth = getAuth();
class AddReview extends React.Component {
  constructor() {
    super();
    this.errors = [];
    this.state = {
      brandName: "",
      photoURL: "",
      roast: "",
      roasterCity: "",
      name: "",
      businessId: "",
      coffeeId: "",
      rating: 0.0,
      content: "",
      userId: "",
      displayName: "",
      time: "",
      userPhoto: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {}

  handleSubmit(event) {
    const { ...review } = this.state;
    event.preventDefault();
    let newReview = {
      brandName: this.props.brandName,
      photoURL: auth.currentUser.photoURL,
      roast: this.props.roast,
      roasterCity: this.props.roasterCity,
      name: this.props.name,
      type: this.props.type ? this.props.type : null,
      id: this.props.id ? this.props.id : null,
      likeCount: 0,
      rating: review.rating,
      content: review.content,
      userId: auth.currentUser.uid ? auth.currentUser.uid : null,
      displayName: auth.currentUser.displayName
        ? auth.currentUser.displayName
        : null,
      feedURL: this.props.feedURL ? this.props.feedURL : null,
      time: serverTimestamp(),
    };
    console.log("testing new review", newReview);
    this.props.addR(newReview);
    this.setState({
      rating: 0.0,
      content: "",
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="new-review-container">
        <form
          id="form_review_new"
          className="form-review-new"
          onSubmit={this.handleSubmit}
        >
          <div className="form-input-submit-group">
            {/* {this.state.error ? (
              <ul className="error-label">
                {this.error.map((error) => (
                  <li>{error}</li>
                ))}
              </ul>
            ) : null} */}
            <label htmlFor="rating">Rating</label>
            <input
              className="form-text-box"
              type="number"
              name="rating"
              placeholder={0.0}
              min="0"
              max="5"
              value={this.state.rating}
              onChange={this.handleChange}
            />
            <label htmlFor="content">Review Comments</label>
            <textarea
              className="form-text-box"
              type="text"
              name="content"
              placeholder="Your comment here..."
              value={this.state.content}
              onChange={this.handleChange}
            />
            <button className="review-submit-button" type="submit">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapState = () => ({});
const mapDispatch = (dispatch) => ({
  addR: (review) => dispatch(addReview(review)),
});

export default connect(mapState, mapDispatch)(AddReview);
