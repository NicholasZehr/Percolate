import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword, getAuth,
  signInWithEmailAndPassword, signOut,
  updateProfile
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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
    authenticateUser: (state, action) => {
      
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

export const authenticate = createAsyncThunk("user/authenticate", async({username, password}, thunkAPI) => {
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

export const { toggleLoading, updateUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
