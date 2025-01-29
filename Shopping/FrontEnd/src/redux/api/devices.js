import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// All All Devices
export const getAllDevices= createAsyncThunk("getAllDevices", async (arg, { rejectWithValue, }) => {
    const res = await axios.get("devices")
    return res.data
})

// Create Devices
export const createDevices = createAsyncThunk("createDevices", async (device, { rejectWithValue }) => {
    const res = await axios.post("devices", device)
    return res.data
})

// Edit Devices
export const editDevices = createAsyncThunk("editDevices", async (device, { rejectWithValue }) => {
    const res = await axios.put(`devices`, device)
    return res.data
})

// Delete Devices
export const deleteDevices = createAsyncThunk("deleteDevices", async (id, { rejectWithValue }) => {
    const res = await axios.delete(`devices/${id}`)
    return res.data
})

// search Devices
export const searchDevices = createAsyncThunk("searchDevices", async (name, { rejectWithValue }) => {
    const res = await axios.get(`devices/search/${name}`)
    return res.data
})