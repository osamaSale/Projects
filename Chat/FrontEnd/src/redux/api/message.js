import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


// Create Massage
export const createMessage = createAsyncThunk("createMessage", async (chat, { rejectWithValue, }) => {
    const res = await axios.post("massage", chat)
    return res.data
})
// getMessages
export const getMessages = createAsyncThunk("getMessages", async (chatId, { rejectWithValue, }) => {
    const res = await axios.get(`massage`)
    return res.data
})
// Delete Chat  Message
export const deleteChatMessage = createAsyncThunk("deleteChatMessage", async (id, { rejectWithValue, }) => {
    const res = await axios.delete(`massage/${id}`)
    return res.data
})
