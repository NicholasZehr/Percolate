import React, { Component } from "react";
import { connect } from "react-redux";
import { addBusiness } from "../../../store/Actions/businessActions";

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
      _geoloc: {},
      ownerId: this.props.location.userId,
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
      console.log("setting state");
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
    console.log("sending business: ", this.state);
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
      phont: this.state.phone,
      name: this.state.name,
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
      ownerId: this.props.location.userId,
    });
  }

  render() {
    const { name, email, phone, state, city, zipcode, street } = this.state;

    console.log("add bus prop", this.props);
    return (
      <form onSubmit={this.handleSubmit}>
        <div id="new-product">
          <input
            type="text"
            name="name"
            placeholder="name..."
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone..."
            value={phone}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email..."
            value={email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State..."
            value={state}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City..."
            value={city}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="zipcode"
            placeholder="Zipcode..."
            value={zipcode}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street..."
            value={street}
            onChange={this.handleChange}
          />
          <span>
            <button type="submit">Submit</button>
          </span>
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
