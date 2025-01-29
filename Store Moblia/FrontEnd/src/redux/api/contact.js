import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// All Contact
export const getAllContact = createAsyncThunk("getAllContact", async (arg, { rejectWithValue, }) => {
    const res = await axios.get("contact")
    return res.data
})

// Create Contact
export const createContact = createAsyncThunk("createContact", async (con, { rejectWithValue }) => {
    const res = await axios.post("contact", con)
    return res.data
})

// Edit Contact
export const editContact = createAsyncThunk("editContact", async (con, { rejectWithValue }) => {
    const res = await axios.put(`contact`, con)
    return res.data
})

// Delete Contact
export const deleteContact = createAsyncThunk("deleteContact", async (id, { rejectWithValue }) => {
    const res = await axios.delete(`contact/${id}`)
    return res.data
})
// search Contact
export const searchContact = createAsyncThunk("searchContact", async (name, { rejectWithValue }) => {
    const res = await axios.get(`contact/search/${name}`)
    return res.data
})