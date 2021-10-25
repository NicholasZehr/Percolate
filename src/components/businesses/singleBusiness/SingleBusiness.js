import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import { fetchBusiness } from "../../../store/businessActions";
import { doc, setDoc } from "firebase/firestore";
import db from "../../../firebase";

class Business extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
    };
    this.editPage = this.editPage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("singlebusiness did mount");
    this.props.fetchBusiness(this.props.match.params.id);
    console.log("fetch business called");
  }

  editPage() {
    this.setState({ edit: !this.state.edit });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const businessInfo = {
      email: evt.target.email.value,
      name: evt.target.name.value,
      photoURL: evt.target.profilePicture.value,
      coverURL: evt.target.coverImageURL.value,
      location: {
        state: evt.target.state.value,
        city: evt.target.city.value,
        zip: evt.target.zip.value,
        street: evt.target.zip.value,
      },
      phone: evt.target.phone.value,
    };
    await setDoc(
      doc(db, "businesses", this.props.match.params.id),
      businessInfo,
      { merge: true }
    );
    this.props.fetchBusiness(this.props.match.params.id);
    console.log("fetch business called");
    this.editPage();
  }

  render() {
    console.log("singlebusiness did render");
    const business = this.props.business;
    if (!business.name) {
      return <h2>loading...</h2>;
    }
    const edit = this.state.edit;
    const {
      email,
      displayName,
      coverURL,
      photoURL,
      name,
      password,
      phone,
      location,
    } = this.props.business;

    //const business = businessProps.data();
    return (
      <div className="singleUserPageBox">
        <Modal className="modal" isOpen={edit} onRequestClose={this.editPage}>
          <div className="close" onClick={this.editPage}></div>
          <h2>Edit Business</h2>
          <form
            className="signupform"
            open={false}
            onSubmit={this.handleSubmit}
            name="signup"
          >
            <div className="emailBox mod">
              <span className="formName">Email:</span>
              <input
                className="email"
                name="email"
                type="text"
                placeholder="Email"
                defaultValue={email ? email : ""}
              />
              <div className="blank3"></div>
            </div>
            <div className="emailBox mod">
              <span className="formName">Name:</span>
              <input
                className="email"
                name="name"
                type="text"
                placeholder="Business Name"
                defaultValue={name ? name : ""}
              />
              <div className="blank3"></div>
            </div>
            <div className="emailBox mod">
              <span className="formName">Cover Image URL:</span>
              <input
                className="email"
                name="coverImageURL"
                placeholder="Cover Image URL"
                type="text"
                defaultValue={coverURL ? coverURL : ""}
              />
              <div className="blank3"></div>
            </div>
            <div className="emailBox mod">
              <span className="formName">Profile Picture:</span>
              <input
                className="email"
                name="profilePicture"
                placeholder="Profile Picture URL"
                type="password"
              />
              <div className="blank3"></div>
            </div>
            <div className="emailBox mod">
              <span className="formName">Phone:</span>
              <input
                className="email"
                name="phone"
                type="text"
                placeholder="Phone Number"
                defaultValue={phone ? phone : ""}
              />
              <div className="blank3"></div>
            </div>
            <div className="emailBox mod">
              <span className="formName">State:</span>
              <input
                className="email"
                name="state"
                placeholder="State"
                type="text"
                defaultValue={location.state ? location.state : ""}
              />
              <div className="blank3"></div>
            </div>
            <div className="emailBox mod">
              <span className="formName">City:</span>
              <input
                className="email"
                name="city"
                type="text"
                placeholder="City"
                defaultValue={location.city ? location.city : ""}
              />
              <div className="blank3"></div>
            </div>
            <div className="emailBox mod">
              <span className="formName">Zip:</span>
              <input
                className="email"
                name="zip"
                placeholder="Zipcode"
                type="text"
                defaultValue={location.zip ? location.zip : ""}
              />
              <div className="blank3"></div>
              <div className="emailBox mod">
                <span className="formName">Street:</span>
                <input
                  className="email"
                  name="street"
                  placeholder="Street"
                  type="text"
                  defaultValue={location.street ? location.street : ""}
                />
                <div className="blank3"></div>
              </div>
            </div>
            <button className="signupPage" name="button1">
              Save
            </button>
          </form>
        </Modal>
        <div className="profileBox">
          <div className="profileCover">
            <div className="shadow">
              <img
                className="cover"
                src={business.name ? business.coverImageUrl : "/whiteBack2.png"}
                alt="cover"
              />
            </div>
          </div>
          <div className="profilePicNavBox">
            <div className="blank2"></div>
            <div className="pictureBox">
              <img
                className="profPic ownpage"
                src={business.name ? business.imageUrl : "/guest.jpeg"}
                alt="pic"
              />
            </div>
            <div className="profileNavBar">
              <div onClick={this.editPage} className="editProfileButton">
                Edit Profile
              </div>
              <h2>{business.name ? business.name : ""}</h2>
              <hr className="divider" />
              <div className="menu">
                <div>Coffees</div>
                <div>About</div>
                <div>
                  Followers (
                  {business.followers[0] ? business.followers.length : 0})
                </div>
              </div>
            </div>
            <div className="blank2"></div>
          </div>
        </div>
        <div className="body">
          <div className="blank2"></div>
          <div className="leftBody">
            <div className="intro">
              <h2>Intro: </h2>
              <span className="favoriteTitle">Newest coffee:</span>
              <img
                className="favCoffee"
                src={
                  business.menu ? business.menu[0].photoURL : "whiteBack2.png"
                }
                alt="coffee"
              />
            </div>
            <div className="friendList"></div>
          </div>
          <div className="rightBody"></div>
          <div className="blank2"></div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    business: state.businesses.business,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchBusiness: (businessId) => dispatch(fetchBusiness(businessId)),
  };
};

export default connect(mapState, mapDispatch)(Business);
