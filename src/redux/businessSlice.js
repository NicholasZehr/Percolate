import { createSlice } from "@reduxjs/toolkit";

export const businessSlice = createSlice({
    name: "businessSlice",
    initialState: {
        businessList: []
    }, 
    reducers: {
        addBusiness: (state,action) => {
            state.businessList = [state.businessList, action.payload]
        },
        removeBusiness: (state, action) => {
            state.businessList = state.businessList.filter((business) => {
                return business.id == action.payload
            })
        },
        editBusiness: (state, action) => {
            state.businessList = state.businessList.map((business) => {
                if (business.id == aciton.payload.id) return action.payload
                return business
            })
        },
        updateList: (state, action) => {
            state.businessList = action.payload
        }
    }
})
export const { addBusiness, removeBusiness, editBusiness, updateList } = businessSlice.actions

export default businessSlice.reducer