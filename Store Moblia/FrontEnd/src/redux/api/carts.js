import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// All Carts
export const getAllCarts = createAsyncThunk("getAllCarts", async (arg, { rejectWithValue, }) => {
    const res = await axios.get("carts")
    return res.data
})


// Create Carts
export const createCart = createAsyncThunk("createCart", async (cart, { rejectWithValue }) => {
    const res = await axios.post("carts", cart)
    return res.data
})

// Edit Cart
export const editCart = createAsyncThunk("editCart", async (cart, { rejectWithValue }) => {
    const res = await axios.put(`carts`, cart)
    return res.data
})

// Delete Carts
export const deleteCart = createAsyncThunk("deleteCarts", async (id, { rejectWithValue }) => {
    const res = await axios.delete(`carts/${id}`)
    return res.data
})

// search Carts
export const searchCarts = createAsyncThunk("searchCarts", async (name, { rejectWithValue }) => {
    const res = await axios.get(`carts/search/${name}`)
    return res.data
})