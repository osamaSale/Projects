import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// All Orders
export const getAllOrders = createAsyncThunk("getAllOrders", async (arg, { rejectWithValue, }) => {
    const res = await axios.get("orders")
    return res.data
})

// Create Orders
export const createOrder = createAsyncThunk("createOrders", async (order, { rejectWithValue }) => {
    const res = await axios.post("orders", order)
    return res.data
})

// Edit Orders
export const editOrder = createAsyncThunk("editOrders", async (order, { rejectWithValue }) => {
    const res = await axios.put("orders", order)
    return res.data
})
// Delete Orders
export const deleteOrder = createAsyncThunk("deleteOrders", async (orderid, { rejectWithValue }) => {
    const res = await axios.delete(`orders/${orderid}`)
    return res.data
})