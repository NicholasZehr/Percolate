import React, { Component } from "react";
import { connect } from "react-redux";
import { _fetchSingleCoffee } from "../../redux/Actions/singleCoffee";
import AddReview from "../reviews/AddReview";
import ReviewPane from "../reviews/ReviewPane";
import { _fetchUserBusinesses } from "../../redux/Actions/businessActions";
import {
  arrayUnion,
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {db} from "../../firebase";
import { getAuth } from "firebase/auth";
class SingleCoffee extends Component {
  constructor() {
    super();
    this.state = {
      user: getAuth().currentUser,
    };
    this.addToBusiness = this.addToBusiness.bind(this);
  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.fetchCoffee(id);

    this.setState({ user: getAuth().currentUser });
    this.props.fetchUserBusinesses(this.state.user.uid);
  }
  async addToBusiness(evt) {
    evt.preventDefault();
    const businessRef = doc(db, "businesses", evt.target.business.value);
    await updateDoc(businessRef, {
      coffees: arrayUnion({...this.props.singleCoffee, id:this.props.match.params.id }),
    });

    const businessData = {
      id: evt.target.business.value,
      name: this.props.businesses[evt.target.business.value].name,
      photoURL: this.props.businesses[evt.target.business.value].photoURL,
    };
    const coffeeRef = doc(db, "coffees", this.props.match.params.id);
    await updateDoc(coffeeRef, {
      businessId: arrayUnion(businessData),
    });
  }

  render() {
    const reviews = this.props.reviews;
    const id = this.props.match.params.id;
    const type = "coffee";
    const {
      name,
      brandName,
      photoURL,
      roast,
      roasterCity,
      avgRating,
    } = this.props.singleCoffee;
    console.log(this.state.user);
    console.log(this.props.businesses);
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
                    src={photoURL}
                    alt={''}
                  />
                </div>
                <div className="image-details-row">
                  <div className="single-coffee-info">
                    <p>Roast: {roast}</p>
                    <p>Roasted in {roasterCity}</p>
                    <p>User Rating: {avgRating}</p>
                    {Object.keys(this.props.businesses).length > 0 ? (
                      <form
                        className="claim_coffee"
                        onSubmit={this.addToBusiness}
                      >
                        <label for="cars">
                          Claim this product to your business:
                        </label>
                        <select name="business">
                          {Object.keys(this.props.businesses).map((id) => (
                            <option key={id} value={id}>
                              {this.props.businesses[id].name}
                            </option>
                          ))}
                        </select>
                        <button className="signup claim-button" type="submit">
                          Claim
                        </button>
                      </form>
                    ) : (
                      ""
                    )}
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
            feedURL={photoURL}
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
