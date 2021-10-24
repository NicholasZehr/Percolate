import React, { Component } from "react";
import { connect } from "react-redux";
import { addBusiness } from "../../../store/businessActions";

class AddBusiness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      location: {
        state: "",
        city: "",
        zip: "",
        street: "",
      },
      followers: [],
      ownerId: this.props.location.userId,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addBusiness({ ...this.state });
    this.setState({
      name: "",
      email: "",
      phone: "",
      location: {
        state: "",
        city: "",
        zip: "",
        street: "",
      },
      followers: [],
      ownerId: this.props.location.userId,
    });
  }

  render() {
    const { name, email, phone, location } = this.state;

    console.log("add bus prop", this.props);
    return (
      <div className="add-business-form">
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
              <button type="submit">Submit</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBusiness: (business) => dispatch(addBusiness(business)),
  };
};

export default connect(null, mapDispatchToProps)(AddBusiness);
