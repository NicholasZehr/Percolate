import { createAsyncThunk, createSlice,rej} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword, getAuth,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    loading: true,
    loggedIn: false,
    error: false,
  },
  reducers: {
    loggedOut: (state) => {
      if (state.loggedIn) {
        state.user = null
        state.loggedIn = false
      }
      state.loading = false
    },
    setUser: (state, action) => {
      if (action.payload.uid) {
      state.loggedIn = true 
      }
      else {
        state.loggedIn = false
      }
      state.user = action.payload
      state.loading = false
      state.error = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state, action) => {
      state.loading = true
      })
    .addCase(authenticateUser.rejected, (state, action) => {
      console.log(action, "You have been rejected!")
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
    return thunkAPI.rejectWithValue(authError.error)
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

export const { setUser, loggedOut } = authSlice.actions;

export default authSlice.reducer;
