import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleCoffee } from "../../store/Actions/singleCoffee";
import AddReview from "../reviews/AddReview";
import ReviewPane from "../reviews/ReviewPane";
import { fetchUserBusinesses } from "../../store/Actions/businessActions";
import { arrayUnion } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
class SingleCoffee extends Component {
  constructor() {
    super();
    this.state = {
      user: getAuth().currentUser,
    };

  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchCoffee(id);
    
    this.setState({ user: getAuth().currentUser });
    this.props.fetchUserBusinesses(this.state.user.uid);
  }
  addToBusiness() {
    console.log();
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
    console.log(this.state.user)
    console.log(this.props.businesses)
    return (
      <>
        <div className="whole-page">
          <div className="single-coffee">
            <div className="coffee-title">
              <h2>{name}</h2>
              <h3>{brandName}</h3>
              <hr className="solid" />
            </div>
            <div className="single-coffee-container">
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
                    <form onSubmit={(_) => this.addToBusiness()}>
                      <label for="cars">Claim this product to:</label>
                      <select name="cars" id="cars">
                        {Object.keys(this.props.businesses).map((id) => (
                          <option key={id} value={id}>{this.props.businesses[id].name}</option>
                        ))}
                      </select>
                      <button type="submit">Claim</button>
                    </form>
                  </div>
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
          <ReviewPane type={type} id={id} reviews={reviews} />
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
    businesses: state.businesses.businesses,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCoffee: (id) => dispatch(fetchSingleCoffee(id)),
    fetchUserBusinesses: (id) => dispatch(fetchUserBusinesses(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleCoffee);
