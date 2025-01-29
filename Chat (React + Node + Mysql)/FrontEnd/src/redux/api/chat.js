import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


// Create Chat
export const createChat = createAsyncThunk("createChat", async (chat, { rejectWithValue, }) => {
    const res = await axios.post("chat", chat)
    return res.data
})
// get All Chat
export const getAllChat = createAsyncThunk("getAllChat", async (chat, { rejectWithValue, }) => {
    const res = await axios.get("chat")
    return res.data
})
