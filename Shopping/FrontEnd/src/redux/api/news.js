import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// All News
export const getAllNews = createAsyncThunk("getAllNews", async (arg, { rejectWithValue, }) => {
    const res = await axios.get("news")
    return res.data
})

// Create news
export const createNews = createAsyncThunk("createNews", async (news, { rejectWithValue }) => {
    const res = await axios.post("news", news)
    return res.data
})

// Edit news
export const editNews = createAsyncThunk("editNews", async (news, { rejectWithValue }) => {
    const res = await axios.put(`news`, news)
    return res.data
})

// Delete News
export const deleteNews = createAsyncThunk("deleteNews", async (id, { rejectWithValue }) => {
    const res = await axios.delete(`news/${id}`)
    return res.data
})

// search News
export const searchNews = createAsyncThunk("searchNews", async (email, { rejectWithValue }) => {
    const res = await axios.get(`news/search/${email}`)
    return res.data
})