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
    loggedIn: false,
    error: false,
  },
  reducers: {
    toggleLoading: (state) => {
      state.loading = true
    },
    authenticate: (state, action) => {
      console.log(action.payload)
      state.user = action.payload
      state.loggedIn = !state.loggedIn
    },
    updateUser: (state, action) => {

    },
    logoutUser: (state, action) => {
      
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(authenticateUser.pending, (state, action) => {
      console.log(toggleLoading)
    })
    .addCase(authenticateUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
    .addCase(authenticateUser.rejected, (state, action) => {
      console.log(action)
    })
  }
});
// ------------------ Thunks -----------------------

export const authenticateUser = createAsyncThunk("user/authenticate", async({username, password}, thunkAPI) => {
  try {
    logout();
    const response = await signInWithEmailAndPassword(auth, username, password);
    const jason = response.toJSON()
    const {user} = response
    console.log(jason)
    return user
  } catch (authError) {
    console.log(authError.message === "INVALID_PASSWORD", "this is the error")
    return authError
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

export const { authenticate, toggleLoading } = authSlice.actions;

export default authSlice.reducer;
