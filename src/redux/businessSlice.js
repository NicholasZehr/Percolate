import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { useDispatch } from "react-redux";
import db from "../firebase";
export const businessSlice = createSlice({
  name: "businessSlice",
  initialState: {
    businessList: [],
    loading: false,
  },
  reducers: {
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
    addBusiness: (state, action) => {
      state.businessList = [state.businessList, action.payload];
    },
    removeBusiness: (state, action) => {
      state.businessList = state.businessList.filter((business) => {
        return business.id == action.payload;
      });
    },
    editBusiness: (state, action) => {
      state.businessList = state.businessList.map((business) => {
        if (business.id == aciton.payload.id) return action.payload;
        return business;
      });
    },
    updateList: (state, action) => {
      state.businessList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinesses.fulfilled, (state, action) => {
        state.businessList = action.payload;
        state.loading = false;
      })
      .addCase(fetchBusinesses.pending, (state) => {
        state.loading = true;
      });
  },
});
// ------------------ Thunks -----------------------

export const fetchBusinesses = createAsyncThunk("business/fetchBusinessList", async (_, thunkAPI) => {
  const response = await getDocs(collection(db, "businesses"));
  const docs = []
  response.forEach(doc => docs.push(doc.data()))
  return docs
});
export const fetchUserBusinesses = (ownerId) => {
  return async (dispatch) => {
    try {
      const businessesRef = collection(db, "businesses");
      const q = query(businessesRef, where("ownerId", "==", ownerId));
      const docSnap = await getDocs(q);
      const businesses = {};
      docSnap.forEach((business) => {
        businesses[business.id] = business.data();
      });
      dispatch(_fetchUserBusinesses(businesses));
    } catch (error) {
      return `Error in fetching user businesses ${error.message}`;
    }
  };
};

// export const addBusiness = (business) => {
//   return async (dispatch) => {
//     try {
//       const response = await addDoc(collection(db, "businesses"), business);
//       dispatch(_addBusiness(response));
//       console.log("add review response:", response);
//     } catch (error) {
//       console.log("Failed to add review");
//       return;
//     }
//   };
// };

export const { addBusiness, removeBusiness, editBusiness, updateList, toggleLoading } = businessSlice.actions;

export default businessSlice.reducer;
