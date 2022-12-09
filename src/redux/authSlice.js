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
    setUser: (state, action) => {
      state.loggedIn = true
      state.user = action.payload
      state.loading = false
      state.error = false
    },
    updateUser: (state, action) => {

    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(authenticateUser.pending, (state, action) => {
      state.loading = true
    })
  }
});
// ------------------ Thunks -----------------------

export const authenticateUser = createAsyncThunk("user/authenticate", async({username, password}, thunkAPI) => {
  try {
    const response = await signInWithEmailAndPassword(auth, username, password);
    if (response.user) {
      const user = response.user.toJSON()
      return user
    }
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

export const logout = createAsyncThunk("user/logoutUser", (_, thunkAPI) => {
  try {
    signOut(auth);
    return 
  } catch (error) {
    console.error(error)
  } 
}
)

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
