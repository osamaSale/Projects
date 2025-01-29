import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// All Comments
export const getAllComments = createAsyncThunk("getAllComments", async (arg, { rejectWithValue, }) => {
    const res = await axios.get("comments")
    return res.data
})

// Create comments
export const createComments = createAsyncThunk("createComments", async (con, { rejectWithValue }) => {
    const res = await axios.post("comments", con)
    return res.data
})

// Edit comments
export const editComments = createAsyncThunk("editComments", async (con, { rejectWithValue }) => {
    const res = await axios.put(`comments`, con)
    return res.data
})

// Delete comments
export const deleteComments = createAsyncThunk("deleteComments", async (id, { rejectWithValue }) => {
    const res = await axios.delete(`comments/${id}`)
    return res.data
})
// search comments
export const searchComments= createAsyncThunk("searchComments", async (name, { rejectWithValue }) => {
    const res = await axios.get(`comments/search/${name}`)
    return res.data
})