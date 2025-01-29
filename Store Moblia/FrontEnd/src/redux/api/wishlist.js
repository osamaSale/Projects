import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// All wishlist
export const getAllWishlist = createAsyncThunk("getAllWishlist", async (arg, { rejectWithValue, }) => {
    const res = await axios.get("wishlist")
    return res.data
})

// Create wishlist
export const createWishlist = createAsyncThunk("createWishlist", async (wishlist, { rejectWithValue }) => {
    const res = await axios.post("wishlist", wishlist)
    return res.data
})

// Edit wishlist
export const editWishlist = createAsyncThunk("editWishlist", async (wishlist, { rejectWithValue }) => {
    const res = await axios.put(`wishlist`, wishlist)
    return res.data
})

// Delete wishlist
export const deleteWishlist = createAsyncThunk("deleteWishlist", async (id, { rejectWithValue }) => {
    const res = await axios.delete(`wishlist/${id}`)
    return res.data
})
// Delete wishlist
export const searchWishlist = createAsyncThunk("searchWishlist", async (name, { rejectWithValue }) => {
    const res = await axios.get(`wishlist/search/${name}`)
    return res.data
})