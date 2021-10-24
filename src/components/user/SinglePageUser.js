import React, { useEffect, /* useReducer, */ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { fetchUser } from "../../store/Actions/usersActions";
import db from "../../firebase";
import {
  doc,
  setDoc,
  updateDoc,
  arrayRemove,
  /* arrayUnion, */
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EditProfileButton from "./EditProfileButton";
import Modal from "react-modal";
import { fetchLoginUser } from "../../store/auth";
Modal.setAppElement("#root");

const SingleUserPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  //componentDidMount here
  const auth = getAuth();
  const [user, setUser] = useState(getAuth().currentUser);
  const [edit, setEdit] = useState(false);
  const loginUser = useSelector((state) => state.auth);
  const currentPageUser = useSelector((state) => state.users.user);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  onAuthStateChanged(auth, (u) => {
    setUser(u);
  });
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      //* Fetch the user using it's id
      await dispatch(fetchUser(id));
      await dispatch(fetchLoginUser());
    }
    if (mounted) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [id]);

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
    setEdit(!edit);
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
          <Modal className="modal" isOpen={edit} onRequestClose={editPage}>
            <EditProfileButton edit={edit} setEdit={setEdit} user={user} />
          </Modal>
          <div className="profileBox">
            <div className="profileCover">
              <div className="shadow">
                <img
                  className="cover"
                  alt="cover"
                  src={
                    currentPageUser
                      ? currentPageUser.coverURL
                      : "/whiteBack2.png"
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
                    onClick={(_) => history.push("/login")}
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
                  <div>Reviews</div>
                  <div>About</div>
                  <div>Followers</div>
                  <div>Following</div>
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
                <span className="favoriteTitle">My favorite coffee:</span>
                <img
                  className="favCoffee"
                  alt="favorite coffee"
                  src={
                    currentPageUser
                      ? currentPageUser.coffeeURL
                      : "whiteBack2.png"
                  }
                />
              </div>
              <div className="followers">
                <h3>{followers.length} followers: </h3>
                <div className="followerListBox">
                  {followers.length > 0
                    ? followers.map((each, index) => {
                        return (
                          <div
                            key={index}
                            className="followerIcon"
                            onClick={() => history.push(`/users/${each.uid}`)}
                          >
                            <img
                              className="profPic followerIcon"
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
              <div className="followers">
                <h3>{following.length} following: </h3>
                <div className="followerListBox">
                  {following.length > 0
                    ? following.map((each, index) => {
                        return (
                          <div
                            key={index}
                            className="followerIcon"
                            onClick={() => history.push(`/users/${each.uid}`)}
                          >
                            <img
                              alt="follower-icon"
                              className="profPic followerIcon"
                              src={each.photoURL}
                            />
                            <span>{each.firstName}</span>
                          </div>
                        );
                      })
                    : "You are not following anyone."}
                </div>
              </div>
            </div>
            <div className="rightBody"></div>
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
export default SingleUserPage;
