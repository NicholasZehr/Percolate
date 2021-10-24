import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleCoffee } from "../../store/singleCoffee";
import AddReview from "../reviews/AddReview";
import ReviewPane from "../reviews/ReviewPane";

class SingleCoffee extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    console.log("id from componentDidMount", this.props.match.params);
    await this.props.fetchCoffee(id);
  }

  render() {
    const reviews = this.props.reviews;
    const id = this.props.match.params.id;
    const type = "coffee";
    const {
      name,
      brandName,
      photoURL: coffeePhoto,
      roast,
      roasterCity,
      avgRating,
    } = this.props.singleCoffee;
    return (
      <>
        <div className="single-coffee">
          <div className="single-coffee-container">
            <div className="coffee-title">
              <h2>{name}</h2>
              <h3>{brandName}</h3>
              <hr className="solid" />
            </div>
            <div className="image-details-row">
              <div className="single-coffee-image">
                <img
                  id="single-coffee-img"
                  src={coffeePhoto}
                  alt={`${name} by ${brandName}`}
                />
              </div>
              <div className="image-details-row">
                <div className="single-coffee-info">
                  <p>Roast: {roast}</p>
                  <p>Roasted in {roasterCity}</p>
                  <p>User Rating: {avgRating}</p>
                </div>
              </div>
            </div>
          </div>
          <AddReview
            id={id}
            type={type}
            name={name}
            brandName={brandName}
            feedURL={coffeePhoto}
            roast={roast}
            roasterCity={roasterCity}
          />
          <ReviewPane type={type} id={id} arrReviews={reviews} />
          {/* ) : ( */}
          {/* <div className="home loading">
            <div className="self loading">
              <p>Loading ...</p>
            </div>
          </div>
          <AddReview
            id={id}
            type={type}
            name={name}
            brandName={brandName}
            roast={roast}
            roasterCity={roasterCity}
          />
          <ReviewPane type={type} id={id} arrReviews={reviews} /> */}
        </div>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    singleCoffee: state.singleCoffee,
    reviews: state.review.reviews,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCoffee: (id) => dispatch(fetchSingleCoffee(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleCoffee);
