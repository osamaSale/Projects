import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// All Brands
export const getAllBrands = createAsyncThunk("getAllBrands", async (arg, { rejectWithValue, }) => {
    const res = await axios.get("brands")
    return res.data
})

// Create Brand
export const createBrand = createAsyncThunk("createBrand", async (brand, { rejectWithValue }) => {
    const res = await axios.post("brands", brand)
    return res.data
})

// Edit Brand
export const editBrand = createAsyncThunk("editBrand", async (brand, { rejectWithValue }) => {
    const res = await axios.put(`brands`, brand)
    return res.data
})

// Delete Brand
export const deleteBrand = createAsyncThunk("deleteBrand", async (id, { rejectWithValue }) => {
    const res = await axios.delete(`brands/${id}`)
    return res.data
})

// search Brand
export const searchBrand = createAsyncThunk("searchBrand", async (name, { rejectWithValue }) => {
    const res = await axios.get(`brands/search/${name}`)
    return res.data
})