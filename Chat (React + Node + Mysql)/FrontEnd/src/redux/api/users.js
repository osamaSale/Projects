import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


// All Users
export const getAllUsers = createAsyncThunk("getAllUsers", async (arg, { rejectWithValue, }) => {
    const res = await axios.get("users")
    return res.data
})




// Create User
export const createUser = createAsyncThunk("createUser", async (user, { rejectWithValue }) => {
    const res = await axios.post("users", user)
    return res.data
})
// update Password
export const updatePassword = createAsyncThunk("updatePassword", async (user, { rejectWithValue }) => {
    const res = await axios.put("users/updatePassword", user)
    return res.data
})

// Login
export const login = createAsyncThunk("login", async (user, { rejectWithValue }) => {
    const res = await axios.post(`users/login`, user)
    return res.data
})


// Delete User
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    const res = await axios.delete(`users/${id}`)
    return res.data
})

// Edit User
export const editUser = createAsyncThunk("editUser", async (user, { rejectWithValue }) => {
    const res = await axios.put(`users`, user)
    return res.data
})
// search User
export const searchUser = createAsyncThunk("searchUser", async (name, { rejectWithValue }) => {
    const res = await axios.get(`users/search/${name}`)
    return res.data
})

// Find Email User
export const findUserEmail = createAsyncThunk("findUserEmail", async (email, { rejectWithValue }) => {
    const res = await axios.post(`users/findEmail`, email)
    return res.data
})