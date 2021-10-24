import React, { Component } from "react";
import { connect } from "react-redux";
import { addBusiness } from "../../../store/businessActions";
import { axios } from "axios"

class AddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      location:{
        state: '',
        city: '',
        zip: '',
        street: ''
      },
      followers: [],
      _geoloc:{}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    if (event.target.name === 'location'){
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log('setting state')
      this.setState({_geoloc: (JSON.parse(xhr.responseText).results[0].geometry.location)})
      console.log(this.state)
    })
    // open the request with the verb and the url
    xhr.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyD9zxNq0hPgKWsXAIdCsBCGyCoszWaRCEk')
    // send the request
    xhr.send()
    console.log('sending business: ',this.state)
  }}

  async handleSubmit(event) {
    event.preventDefault();
    this.props.addBusiness({ ...this.state});
  }

  render() {
    const {name, email, phone, location} = this.state;

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
            name="location"
            placeholder="State..."
            value={location.state}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="City..."
            value={location.city}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Zipcode..."
            value={location.zip}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Street..."
            value={location.street}
            onChange={this.handleChange}
          />
          <span>
            <button type="submit">
              Submit
            </button>
          </span>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBusiness: (business) => dispatch(addBusiness(business))
  };
};

export default connect(null, mapDispatchToProps)(AddBusiness);
