import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Get Chat Group
export const getChatGroup = createAsyncThunk("getChatGroup", async (chat, { rejectWithValue, }) => {
    const res = await axios.get("chatGroup")
    return res.data
})
// Create Chat Group
export const createChatGroup = createAsyncThunk("crateChatGroup", async (chat, { rejectWithValue, }) => {
    const res = await axios.post("chatGroup", chat)
    return res.data
})


// Get Chat Group Users
export const getChatGroupUsers = createAsyncThunk("getChatGroupUsers", async (chat, { rejectWithValue, }) => {
    const res = await axios.get("chatGroupUsers")
    return res.data
})

// Create Chat Group Users
export const createChatGroupUsers = createAsyncThunk("chatGroupUsers", async (chat, { rejectWithValue, }) => {
    const res = await axios.post("chatGroupUsers", chat)
    return res.data
})


// Get Chat Group Message
export const getChatGroupMessage= createAsyncThunk("getChatGroupMessage", async (chat, { rejectWithValue, }) => {
    const res = await axios.get("chatGroupMessage")
    return res.data
})

// Create Chat Group Message
export const createChatGroupMessage = createAsyncThunk("createChatGroupMessage", async (chat, { rejectWithValue, }) => {
    const res = await axios.post("chatGroupMessage", chat)
    return res.data
})
// Delete Chat Group User
export const deleteChatGroupUser = createAsyncThunk("deleteChatGroupUser", async (id, { rejectWithValue, }) => {
    const res = await axios.delete(`chatGroupUsers/${id}`)
    return res.data
})
// Delete Chat Group Message
export const deleteChatGroupMessage = createAsyncThunk("deleteChatGroupMessage", async (id, { rejectWithValue, }) => {
    const res = await axios.delete(`chatGroupMessage/${id}`)
    return res.data
})
// leave Chat Group User
export const leaveChatGroupUser = createAsyncThunk("leaveChatGroupUser", async (chat, { rejectWithValue, }) => {
    console.log("data" , chat)
    const res = await axios.post(`chatGroupUserleave` ,chat)
    return res.data
})