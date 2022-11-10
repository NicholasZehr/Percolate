import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import db from "../firebase";
//https://firebase.google.com/docs/auth/web/manage-users
//const TOKEN = "token";

const SET_AUTH = "SET_AUTH";

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const authenticate = (username, password) => async (dispatch) => {
  const auth = getAuth();
  try {
    logout();
    await signInWithEmailAndPassword(auth, username, password);
    const user = auth.currentUser;
    if (user !== null) {
      const response = await getDoc(doc(db, "Users", user.uid));
      const fullDetail = { ...user, ...response.data() };
      dispatch(setAuth(fullDetail));
    }
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};
export const fetchLoginUser = () => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    const response = await getDoc(doc(db, "Users", user.uid));
    const fullDetail = { ...user, ...response.data() };
    dispatch(setAuth(fullDetail));
  }
};
export const authenticateSignup = (user) => async (dispatch) => {
  try {
    const auth = getAuth();
    logout();
    const response = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    updateProfile(auth.currentUser, {
      displayName: user.firstName,
      photoURL: user.photoURL,
    });
    const users = collection(db, "Users");
    await setDoc(doc(users, response.user.uid), {
      displayName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      photoURL: user.photoURL,
      followers: [],
      following: [],
    });
    dispatch(setAuth(user));

  } catch (error) {
    console.log(error);
    return dispatch(setAuth({ error }));
  }
};

export const logout = () => (dispatch) => {
  const auth = getAuth();
  signOut(auth);
  return dispatch(setAuth({}));
};

/**
 * REDUCER
 */
export default function authReducer(state = {}, action) {
  switch (action.type) {
    case SET_AUTH: {
      return { ...action.auth };
    }
    default:
      return state;
  }
}
