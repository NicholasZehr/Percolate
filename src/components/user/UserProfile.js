import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove, doc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import React, { useEffect, /* useReducer, */ useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { fetchReviews } from "../../redux/Actions/reviewActions";
import { fetchUser } from "../../redux/Actions/usersActions";
import AddBusiness from "../businesses/AddBusiness";
import FeedCard from "../utils/FeedCard";
import EditProfileButton from "./EditProfileButton";

import { _fetchUserBusinesses } from "../../redux/Actions/businessActions";

Modal.setAppElement("#root");

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //componentDidMount here
  const auth = getAuth();
  const [user, setUser] = useState(getAuth().currentUser);
  const [editProfile, setEditProfile] = useState(false);
  const [editBusiness, setEditBusiness] = useState(false);
  const loginUser = useSelector((state) => state.auth);
  const currentPageUser = useSelector((state) => state.users.user);
  const businesses = useSelector((state) => state.businesses.businesses);
  const businessArr = Object.entries(businesses);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const reviews = useSelector((state) => state.review.reviews);

  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      //* Fetch the user using it's id
      await dispatch(fetchUser(id));
      await dispatch(fetchLoginUser());
      await dispatch(fetchReviews("user", id));
      await dispatch(fetchUserBusinesses(id));
    }
    if (mounted) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [id, editBusiness]);

  useEffect(() => {
    const list = [];
    const fol = [];
    let found = false;
    let mounted = true;

    //======push followers in list,and following in fol
    if (Object.keys(currentPageUser).length > 0) {
      currentPageUser.followers.forEach((element) => {
        //========== find wether the current profile page is followed
        if (user && element.uid === user.uid) {
          found = true;
        }
        list.push(element);
      });
      currentPageUser.following.forEach((each) => {
        // this is push to followiing
        fol.push(each);
      });
    }

    // set them in local state
    if (mounted) {
      setFollowers(list);
      setFollowing(fol);
      setAlreadyFollowed(found);
    }

    return () => {
      mounted = false;
    };
  }, [currentPageUser]);

  function editPage() {
    setEditProfile(!editProfile);
  }
  function openAddBusiness() {
    setEditBusiness(!editBusiness);
  }
  async function followingUser() {
    if (Object.keys(loginUser).length > 0 && id !== loginUser.uid) {
      const currentFollowers = [...currentPageUser.followers];
      currentFollowers.push({
        firstName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      });
      const currentMyFollowing = [...loginUser.following];
      currentMyFollowing.push({
        firstName: currentPageUser.displayName
          ? currentPageUser.displayName
          : currentPageUser.firstName,
        photoURL: currentPageUser.photoURL,
        uid: id,
      });
      //============== update detail info in firestore data
      const userRef = doc(db, "Users", id);
      await setDoc(userRef, { followers: currentFollowers }, { merge: true });
      const myRef = doc(db, "Users", user.uid);
      await setDoc(myRef, { following: currentMyFollowing }, { merge: true });

      //==============update redux store user info from firebase
      await dispatch(fetchUser(currentPageUser ? currentPageUser.uid : {})); //Needed for following info.

      setFollowers(currentFollowers);
    }

    setAlreadyFollowed(!alreadyFollowed);
  }

  async function unfollowUser() {
    if (Object.keys(loginUser).length > 0 && id !== loginUser.uid) {
      const removeFollowers = {
        firstName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };

      const removeFollowing = {
        firstName: currentPageUser.displayName
          ? currentPageUser.displayName
          : currentPageUser.firstName,
        photoURL: currentPageUser.photoURL,
        uid: id,
      };
      const userRef = doc(db, "Users", id);
      await updateDoc(userRef, { followers: arrayRemove(removeFollowers) });
      const myRef = doc(db, "Users", loginUser.uid);
      await updateDoc(myRef, { following: arrayRemove(removeFollowing) });

      await dispatch(fetchUser(currentPageUser ? currentPageUser.uid : {})); //Needed for following info.

      setFollowers(removeFollowers);
    }
    setAlreadyFollowed(!alreadyFollowed);
  }

  return (
    <>
      {currentPageUser && user && loginUser ? (
        <div className="singleUserPageBox">
          <Modal
            className="modal"
            isOpen={editProfile}
            onRequestClose={editPage}
          >
            <EditProfileButton
              edit={editProfile}
              setEdit={setEditProfile}
              user={user}
            />
          </Modal>
          <Modal
            className="modal"
            isOpen={editBusiness}
            onRequestClose={openAddBusiness}
          >
            <div className="addBusinessDiv">
              <h2>Tell us about the business</h2>
              <AddBusiness
                edit={editBusiness}
                setEdit={setEditBusiness}
                userId={id}
              />
            </div>
          </Modal>
          <div className="profileBox">
            <div className="profileCover">
              <div className="shadow">
                <img
                  className="cover"
                  alt=""
                  src={
                    currentPageUser
                      ? currentPageUser.coverURL
                        ? currentPageUser.coverURL
                        : "/background.jpeg"
                      : "/background.jpeg"
                  }
                />
              </div>
            </div>
            <div className="profilePicNavBox">
              <div className="blank2"></div>
              <div className="pictureBox">
                <img
                  className="profPic ownpage"
                  alt="your profile pic"
                  src={
                    currentPageUser ? currentPageUser.photoURL : "/guest.jpeg"
                  }
                />
              </div>
              <div className="profileNavBar">
                {user ? (
                  id === user.uid ? (
                    <div onClick={editPage} className="editProfileButton">
                      Edit Profile
                    </div>
                  ) : alreadyFollowed ? (
                    <div onClick={unfollowUser} className="editProfileButton">
                      Unfollow
                    </div>
                  ) : (
                    <div onClick={followingUser} className="editProfileButton">
                      Follow
                    </div>
                  )
                ) : (
                  <div
                    onClick={(_) => navigate("/login")}
                    className="editProfileButton"
                  >
                    Login to follow
                  </div>
                )}

                <h2>
                  {currentPageUser
                    ? (currentPageUser.firstName ||
                        currentPageUser.displayName) +
                      " " +
                      currentPageUser.lastName
                    : ""}
                </h2>
                <hr className="divider" />
                <div className="menu">
                  <a href="#starting">Reviews</a>
                  <a href="#starting">About</a>
                  <a href="#followers">Followers</a>
                  <a href="#following">Following</a>
                </div>
              </div>
              <div className="blank2"></div>
            </div>
          </div>
          <div className="body">
            <div className="blank2"></div>
            <div className="leftBody ">
              <div className="intro" id="starting">
                <h2>Intro: </h2>
                <span className="favoriteTitle">My favorite coffee:</span>
                <img
                  className="favCoffee"
                  alt=""
                  src={currentPageUser ? currentPageUser.coffeeURL : ""}
                />
              </div>
              <div className="followers" id="followers">
                <b>{followers.length} followers: </b>
                <div className="followerListBox">
                  {followers.length > 0
                    ? followers.map((each, index) => {
                        return (
                          <div
                            key={index}
                            className="followerIcon"
                            onClick={() => navigate(`/users/${each.uid}`)}
                          >
                            <img
                              className="profPic pictureSize"
                              alt="follower icon"
                              src={each.photoURL}
                            />
                            <span>{each.firstName}</span>
                          </div>
                        );
                      })
                    : "No one is following you."}
                </div>
              </div>
              <div className="followers" id="following">
                <b>{following.length} following: </b>
                <div className="followerListBox">
                  {following.length > 0
                    ? following.map((each, index) => {
                        return (
                          <div
                            key={index}
                            className="followerIcon"
                            onClick={() => navigate(`/users/${each.uid}`)}
                          >
                            <img
                              alt="follower-icon"
                              className="profPic pictureSize"
                              src={each.photoURL}
                            />
                            <span>{each.firstName}</span>
                          </div>
                        );
                      })
                    : "You are not following anyone."}
                </div>
              </div>

              <div className="followers">
                <b>Businesses:</b>
                {user ? (
                  id === user.uid ? (
                    <div
                      className="add-business-button"
                      onClick={openAddBusiness}
                    >
                      Add
                    </div>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}

                <div className="followerListBox">
                  {businessArr.length > 0
                    ? businessArr.map((each, index) => {
                        return (
                          <div
                            key={index}
                            className="followerIcon"
                            onClick={() =>
                              navigate(`/businesses/${each[0]}`)
                            }
                          >
                            <img
                              alt="Business"
                              className="profPic pictureSize"
                              src={each[1].photoURL}
                            />
                            <span>{each[1].name}</span>
                          </div>
                        );
                      })
                    : "You have no businesses."}
                </div>
              </div>
            </div>
            <div className="rightBody">
              {Object.keys(reviews).map((id) => (
                <FeedCard
                  key={id}
                  reviewId={id}
                  review={reviews[id]}
                  user={user}
                  loggedInUser={loginUser}
                  type="reviews"
                />
              ))}
            </div>
            <div className="blank2"></div>
          </div>
        </div>
      ) : (
        <div className="home loading">
          <div className="self loading">
            <p>Loading ...</p>
          </div>
        </div>
      )}
    </>
  );
};
export default UserProfile;
