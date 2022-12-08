import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDocs, collection } from "firebase/firestore";
import { db} from "../firebase";
export const businessSlice = createSlice({
  name: "businessSlice",
  initialState: {
    businessList: [],
    loading: false,
  },
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
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
  }
});
// ------------------ Thunks -----------------------

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

// ------------------ Custom Middleware -----------------------

export const { addBusiness, removeBusiness, editBusiness, updateList, toggleLoading } = businessSlice.actions;

export default businessSlice.reducer;
