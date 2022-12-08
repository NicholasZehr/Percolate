import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword, getAuth,
  signInWithEmailAndPassword, signOut,
  updateProfile
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: {},
    loading: false,
    loggedIn: false
  },
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    authenticate: (state, action) => {
      state.user = action.payload
    },
    updateUser: (state, action) => {

    },
    logoutUser: (state, action) => {
      
    },
  },
  extraReducers: (builder) => {
    builder
  }
});
// ------------------ Thunks -----------------------

export const authenticateUser = createAsyncThunk("user/authenticate", async({username, password}, thunkAPI) => {
  try {
    logout();
    const { userCredential } = await signInWithEmailAndPassword(auth, username, password);
    console.log(userCredential)
    const user = auth.currentUser;
    if (user !== null) {
      const response = await getDoc(doc(db, "Users", user.uid));
      const fullDetail = { ...user, ...response.data() };
    }
    return userCredential.user
  } catch (authError) {
    console.error(authError)
  }
})
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
export const fetchAllBusinessList = createAsyncThunk("business/fetchAllBusinessList", async (_, thunkAPI) => {
  const response = await getDocs(collection(db, "businesses"));
  const docs = []
  response.forEach(doc => {
    const docCopy = doc.data()
    const coffeeQ = docCopy.coffees
    const convertedCoffees = coffeeQ.map((coffee) => {
      return ({
        ...coffee, time: coffee.time.valueOf()
      })
    })
    docCopy.coffees = convertedCoffees
    docs.push(docCopy)
  })
  return docs
});

export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
