import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    productData: [],
    userInfo: null
}

export const bazarSlice = createSlice({
    name: "bazar",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.productData.find(({ _id }) => _id === action.payload._id)
            if (item) {
                item.quantity += action.payload.quantity
            } else {
                state.productData.push(action.payload)
            }
        },
        deleteItem: (state, action) => {
            state.productData = state.productData.filter(({ _id }) => _id !== action.payload)
        },
        resetCart: (state) => {
            state.productData = []
        },
        incrementQuantity: (state, action) => {
            const item = state.productData.find(({ _id }) => _id === action.payload)
            if (item) {
                item.quantity++
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.productData.find(({ _id }) => _id === action.payload)
            if (item) {
                item.quantity--
            }
        },
        addUser: (state, action) => {
            state.userInfo = action.payload
        },
        removeUser: (state) => {
            state.userInfo = null
        }
    }
})

export const getProductDataLength = (state) => state.bazar.productData.length
export const getProductData = (state) => state.bazar.productData
export const getUser = (state) => state.bazar.userInfo

export const {
    addToCart,
    deleteItem,
    resetCart,
    incrementQuantity,
    decrementQuantity,
    addUser,
    removeUser
} = bazarSlice.actions;
export default bazarSlice.reducer;