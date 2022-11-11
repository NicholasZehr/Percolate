import React, { Component } from "react";
import { connect } from "react-redux";
import { addBusiness} from "../../../redux/businessSlice";

class AddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      zipcode: "",
      street: "",
      followers: [],
      coffees: [],
      _geoloc: {},
      ownerId: this.props.userId,
      photoURL: "",
      coverURL: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });

    var xhr = new XMLHttpRequest();

    // get a callback when the server responds
    xhr.addEventListener("load", () => {
      // update the state of the component with the result here
      this.setState({
        _geoloc: JSON.parse(xhr.responseText).results[0].geometry.location,
      });
      console.log(this.state);
    });
    // open the request with the verb and the url
    xhr.open(
      "GET",
      `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.street}+${this.state.city},+${this.state.state}+${this.state.zipcode}&key=AIzaSyD9zxNq0hPgKWsXAIdCsBCGyCoszWaRCEk`
    );
    // send the request
    xhr.send();
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.addBusiness({
      _geoloc: this.state._geoloc,
      location: {
        street: this.state.street,
        city: this.state.city,
        zipcode: this.state.zipcode,
        state: this.state.state,
      },
      email: this.state.email,
      followers: this.state.followers,
      phone: this.state.phone,
      name: this.state.name,
      coffees:[],
      ownerId: this.props.userId,
      photoURL: this.state.photoURL || "/default-business.png",
      coverURL: this.state.coverURL || "/default-business.png",
    });

    this.setState({
      name: "",
      email: "",
      phone: "",
      state: "",
      city: "",
      zipcode: "",
      street: "",
      followers: [],
      _geoloc: {},
      ownerId: this.props.userId,
      photoURL: "",
      coverURL: "",
    });
  }

  render() {
    const {
      name,
      email,
      phone,
      state,
      city,
      zipcode,
      street,
      photoURL,
      coverURL,
    } = this.state;

    console.log("add bus prop", this.props);
    return (
      <form className="new-business-form" onSubmit={this.handleSubmit}>
        <div id="new-business">
          <div className="textBox-business">
            <input
              type="text"
              name="name"
              placeholder="name..."
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className="textBox-business">
            <input
              type="text"
              name="phone"
              placeholder="Phone..."
              value={phone}
              onChange={this.handleChange}
            />
          </div>
          <div className="textBox-business">
            <input
              type="text"
              name="email"
              placeholder="Email..."
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="textBox-business">
            <input
              type="text"
              name="state"
              placeholder="State..."
              value={state}
              onChange={this.handleChange}
            />
          </div>
          <div className="textBox-business">
            <input
              type="text"
              name="city"
              placeholder="City..."
              value={city}
              onChange={this.handleChange}
            />
          </div>
          <div className="textBox-business">
            <input
              type="text"
              name="zipcode"
              placeholder="Zipcode..."
              value={zipcode}
              onChange={this.handleChange}
            />
          </div>
          <div className="textBox-business">
            <input
              type="text"
              name="street"
              placeholder="Street..."
              value={street}
              onChange={this.handleChange}
            />
          </div>
          <div className="textBox-business">
            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              value={photoURL}
              onChange={this.handleChange}
            />
          </div>
          <div className="textBox-business">
            <input
              type="text"
              name="coverURL"
              placeholder="Cover URL"
              value={coverURL}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBusiness: (business) => dispatch(addBusiness(business)),
  };
};

export default connect(null, mapDispatchToProps)(AddBusiness);
