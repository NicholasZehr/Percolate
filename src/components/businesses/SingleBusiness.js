import React, { Component, useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import Modal from "react-modal";
import { fet } from "../../redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import FeedCard from "../utils/FeedCard";
import { fetchReviews } from "../../redux/Actions/reviewActions";
import { useParams } from "react-router";
const auth = getAuth()

const Business = () => {
  const {id} = useParams()
  const { businessList } = useSelector(state => state.business)
  const {user} = useSelector(state=>state.auth)
  useEffect(() => {
    !businessList.includes(id) && dispatch(fetchOneBusiness(id))
  }, []);
  function editPage(params) {
  }
  function handleSubmit(params) {
    
  }
    return (
      <div className="singleUserPageBox">
        <Modal
          className="modal single-business"
          isOpen={edit}
          onRequestClose={editPage}
        >
          <div className="close" onClick={editPage}></div>
          <h2>Edit Business</h2>
          <form
            className="signupform"
            open={false}
            onSubmit={handleSubmit}
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
                defaultValue={state ? state : ""}
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
                defaultValue={city ? city : ""}
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
                defaultValue={zip ? zip : ""}
              />
              <div className="blank3"></div>
            </div>
            <div className="emailBox mod">
              <span className="formName">Street Number:</span>
              <input
                className="email"
                name="streetNum"
                placeholder="StreetNum"
                type="text"
                defaultValue={streetNum ? streetNum : ""}
              />
              <div className="blank3"></div>
            </div>
            <div className="emailBox mod">
              <span className="formName">Street:</span>
              <input
                className="email"
                name="street"
                placeholder="Street"
                type="text"
                defaultValue={street ? street : ""}
              />
              <div className="blank3"></div>
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
                src={coverURL ? coverURL : "/whiteBack2.png"}
                alt="cover"
              />
            </div>
          </div>
          <div className="profilePicNavBox">
            <div className="blank2"></div>
            <div className="pictureBox">
              <img
                className="profPic ownpage"
                src={photoURL ? photoURL : "/guest.jpeg"}
                alt="pic"
              />
            </div>
            <div className="profileNavBar">
              {business.ownerId === user.id ? (
                <div onClick={this.editPage} className="editProfileButton">
                  Edit Profile
                </div>
              ) : null}
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
              <h2>About: </h2>
              <p>{about}</p>
              <span className="favoriteTitle">
                Newest Coffee: {newestCoffee}{" "}
              </span>
              <img
                className="favCoffee"
                src={newestCoffeeURL ? newestCoffeeURL : "whiteBack2.png"}
                alt="coffee"
              />
            </div>
            <div className="friendList intro">
              <b>{followers.length} followers: </b>
              <div className="followerListBox">
                {followers.length > 0
                  ? followers.map((each, index) => {
                      return (
                        <Link to={`/users/${each.uid}`}>
                          <div key={index} className="followerIcon">
                            <img
                              className="profPic pictureSize"
                              alt="follower icon"
                              src={each.photoURL}
                            />
                            <span>{each.firstName}</span>
                          </div>
                        </Link>
                      );
                    })
                  : "No one is following you."}
              </div>
            </div>
          </div>
          <div className="rightBody">
            {this.props.business
              ? this.props.business.coffees.map((coffee) => (
                  <FeedCard
                    review={coffee}
                    coffeeId={coffee.id}
                    user={auth.currentUser}
                    type="business"
                  />
                ))
              : ""}
          </div>
          <div className="blank2"></div>
        </div>
      </div>
    );
  }

export default Business;
