import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
export const businessSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    updateUser: (state, action) => {

    },
    logoutUser: (state, action) => {
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBusinessList.fulfilled, (state, action) => {
        state.businessList = action.payload
        state.loading = !state.loading
      })
      .addCase(fetchAllBusinessList.pending, (state) => {
        state.loading = true;
      })
    .addCase(fetchUserBusinessList.fulfilled, (state, action) => {
      state.businessList = action.payload
      state.loading = !state.loading
    })
    .addCase(fetchUserBusinessList.pending, (state, action) => {
      state.loading = true
    })
  }
});
// ------------------ Thunks -----------------------
import {
  createUserWithEmailAndPassword, getAuth,
  signInWithEmailAndPassword, signOut,
  updateProfile
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
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

export const { toggleLoading, updateUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
