import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import {db} from "../firebase";
export const businessSlice = createSlice({
  name: "businessSlice",
  initialState: {
    businessList: [],
    business:{},
    loading: false,
  },
  reducers: {
    addBusiness: (state, action) => {
      state.businessList = [...state.businessList, action.payload];
    },
    editBusiness: (state, action) => {
      state.businessList = state.businessList.map((business) => {
        if (business.id == action.payload.id) return action.payload;
        return business;
      });
    },
    updateList: (state, action) => {
      state.businessList = action.payload;
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
    .addCase(removeBusinessAsync.fulfilled, (state, action) => {
      state.businessList = state.businessList.filter((business) => {
        return business.id !== action.payload;
      });
    })
      .addCase(fetchOneBusiness.pending, (state) => {
      state.loading = true
      })
      .addCase(fetchOneBusiness.fulfilled, (state, action) => {
        state.business = action.payload
        state.loading = false
    })
  }
});
// ------------------ Thunks -----------------------

export const fetchAllBusinessList = createAsyncThunk("business/fetchAllBusinessList", async (_, thunkAPI) => {
  const response = await getDocs(collection(db, "businesses"));
  const docs = []
  response.forEach(doc => {
    const docCopy = doc.data()
    docCopy.id = doc.id
    if (docCopy.coffees) {
      const coffeeQ = docCopy.coffees
      const convertedCoffees = coffeeQ.map((coffee) => {
        return ({
          ...coffee, time: coffee.time.valueOf()
        })
      })
      docCopy.coffees = convertedCoffees
    }
    docs.push(docCopy)
  })
  return docs
});
export const fetchUserBusinessList = createAsyncThunk("business/fetchUserList", 
  async (ownerId, thunkAPI) => {
    try {
      const businessesRef = collection(db, "businesses");
      const q = query(businessesRef, where("ownerId", "==", ownerId));
      const docSnap = await getDocs(q);
      const ownerList = [];
      docSnap.forEach((business) => {
        ownerList.push(business.data())
      });
      return ownerList
    } catch (error) {
      return `Error in fetching user businesses ${error.message}`;
    }
  }
)
export const fetchOneBusiness = createAsyncThunk("business/fetchOne",
 async (businessId, thunkAPI) => {
    try {
      console.log(businessId, "business id in fetch")
      const business = await getDoc(doc(db, "businesses", businessId))
      return business.data()
    } catch (error) {
      console.log("Could not fetch business from firebase", error)
      return
    }
  }
)
export const addBusiness = createAsyncThunk("business/addBusinessAsync",
  async(business, thunkAPI) => {
  return async (dispatch) => {
    try {
      const response = await addDoc(collection(db, "businesses"), business);
      console.log("add business response:", response);
    } catch (error) {
      console.log("Failed to add business");
    }
  };
}
)

export const removeBusinessAsync = createAsyncThunk("business/removeBusinessAsync", async (businessId, thunkAPI) => {
  try {
      const response = await deleteDoc(doc(db, "businesses", 
      businessId));
      return businessId
    } catch (error) {
      console.log("Failed to remove business", error);
      return;
    }
  }
)

// ------------------ Custom Middleware -----------------------

export const {   editBusiness, updateList } = businessSlice.actions;

export default businessSlice.reducer;
