import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import { createUser, deleteUser, editUser, findUserEmail, getAllUsers, login, searchUser, updatePassword } from "../api/users"
import { createChat, getAllChat } from "../api/chat";
import { createMessage, deleteChatMessage, getMessages } from "../api/message";
import { createChatGroup, createChatGroupMessage, createChatGroupUsers, getChatGroup, getChatGroupMessage, getChatGroupUsers, deleteChatGroupUser, deleteChatGroupMessage, leaveChatGroupUser } from "../api/chatGroup";


const initialState = {
    loading: false,
    users: [],
    chat: [],
    people: [],
    getGroupUsers: [],
    getMassages: [],
    getMassagesGroup: [],
    massage: [],
    media: null,
    mediaId: null,
    chatId: null,
    chatGroupId: null,
    findChatGroupUser: null,
    ChatGroupUserId: null,
    user: null,
    chatGroup: [],
    chatGroupUsers: [],
    chatGroupMessage: []
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("user")
            state.user = null
        },
        getIdChat: (state, action) => {
            const { chatId } = action.payload
            state.chatId = chatId
        },
        getIdGroupChat: (state, action) => {
            const { chatGroupId } = action.payload
            state.chatGroupId = chatGroupId
        },
        findMedia: (state, action) => {
            const { mediaId } = action.payload
            state.mediaId = mediaId
        },
        findChatGroupUser: (state, action) => {
            const { ChatGroupUserId } = action.payload
            state.ChatGroupUserId = ChatGroupUserId
        },

    },

    extraReducers: builder => {

        /* ===================== Users ======================== */

        // Get All Users

        builder.addCase(getAllUsers.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            let user = JSON.parse(localStorage.getItem('user'));
            state.users = action.payload.result
            
                if (user) {
                    state.user = state.users?.find((u) => u.id === user.id)
                    state.people = state.users ? state.users.filter((f) => f.id !== user.id) : []
                  
                } else {
                    state.user = null
                }
                state.loading = false
            
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false
        })

        // Create User

        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false
        })

        // Edit User 

        builder.addCase(editUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editUser.rejected, (state, action) => {
            state.loading = false
        })
        // update Password

        builder.addCase(updatePassword.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.loading = false
        })

        // Delete User

        builder.addCase(deleteUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
        })

        // Search User

        builder.addCase(searchUser.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(searchUser.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.people = action.payload.result

            } else {
                state.people =  state.users ? state.users.filter((f) => f.id !== state.user?.id) : []
            }
            state.loading = false
        })
        builder.addCase(searchUser.rejected, (state, action) => {
            state.loading = false
        })

        // Login 

        builder.addCase(login.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
        })

        // Find User Email

        builder.addCase(findUserEmail.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(findUserEmail.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {

                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(findUserEmail.rejected, (state, action) => {
            state.loading = false
        })

  

        // =======================    chats   ============================ //

        // get Chat
        builder.addCase(getAllChat.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllChat.fulfilled, (state, action) => {

            state.chat = action.payload.result
            state.chat = state.chat ? state.chat.filter((c) => c.senderId === state.user?.id || c.receiverId === state.user?.id) : []

            state.chat.forEach((ch) => {
                ch.mass = state.getMassages ? state.getMassages.findLast((m) => m.chatId === parseInt(ch.id)) : []
            })
            state.chat.sort((a, b) => a.mass?.id > b.mass?.id ? -1 : 1);

          
            state.loading = false
        })
        builder.addCase(getAllChat.rejected, (state, action) => {
            state.loading = false
        })

        // Create Chat
        builder.addCase(createChat.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createChat.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createChat.rejected, (state, action) => {
            state.loading = false
        })

        // =======================    Message   ============================ //

        // Create Message
        builder.addCase(createMessage.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(createMessage.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createMessage.rejected, (state, action) => {
            state.loading = false
        })
        // get Message
        builder.addCase(getMessages.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.getMassages = action.payload.result
            state.massage =  state.getMassages ?  state.getMassages.filter((m) => m.chatId === parseInt(state.chatId)) : []
            state.media =  state.getMassages ?  state.getMassages.filter((m) => m.text === "undefined") : []
            state.loading = false

        })
        builder.addCase(getMessages.rejected, (state, action) => {
            state.loading = false
        })
        // Delete Chat  Message
        builder.addCase(deleteChatMessage.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteChatMessage.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false


        })
        builder.addCase(deleteChatMessage.rejected, (state, action) => {
            state.loading = false
        })



        // =======================   Chat Group   ============================ //
        // get Chat Group
        builder.addCase(getChatGroup.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(getChatGroup.fulfilled, (state, action) => {
            state.chatGroup = action.payload.result
            state.chatGroup?.forEach((ch) => {
                ch.chatUsers = state.getGroupUsers ? state.getGroupUsers.filter((m) => m.groupId === parseInt(ch.id)) : []
                ch.chatMessage = state.getMassagesGroup ? state.getMassagesGroup.findLast((m) => m.groupId === parseInt(ch.id)) : []
            })

            state.chatGroup?.sort((a, b) => a.chatMessage?.id > b.chatMessage?.id ? -1 : 1);
            state.loading = false
        })
       
        builder.addCase(getChatGroup.rejected, (state, action) => {
            state.loading = false
        })
        // Create Chat Group
        builder.addCase(createChatGroup.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createChatGroup.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false

        })
        builder.addCase(createChatGroup.rejected, (state, action) => {
            state.loading = false
        })
        // Delete Chat Group User
        builder.addCase(deleteChatGroupUser.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteChatGroupUser.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false


        })
        builder.addCase(deleteChatGroupUser.rejected, (state, action) => {
            state.loading = false
        })

        // =======================   Chat Group Users  ============================ //
        // get Chat Group Users

        builder.addCase(getChatGroupUsers.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(getChatGroupUsers.fulfilled, (state, action) => {
            state.getGroupUsers = action.payload.result
            state.chatGroupUsers = state.getGroupUsers ? state.getGroupUsers.filter((g) => g.groupId === state.chatGroupId) : []
            state.findChatGroupUser = state.getGroupUsers ? state.getGroupUsers.filter((m) => m.userId === state.ChatGroupUserId) : []
            state.loading = false
        })
        builder.addCase(getChatGroupUsers.rejected, (state, action) => {
            state.loading = false
        })

        // Create Chat Group Users

        builder.addCase(createChatGroupUsers.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(createChatGroupUsers.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false

        })
        builder.addCase(createChatGroupUsers.rejected, (state, action) => {
            state.loading = false
        })
        // leave Chat Group User

        builder.addCase(leaveChatGroupUser.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(leaveChatGroupUser.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false

        })
        builder.addCase(leaveChatGroupUser.rejected, (state, action) => {
            state.loading = false
        })

        // =======================   Chat Group Message  ============================ //
        // get Chat Group Message

        builder.addCase(getChatGroupMessage.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(getChatGroupMessage.fulfilled, (state, action) => {
            state.getMassagesGroup = action.payload.result
            state.chatGroupMessage = state.getMassagesGroup ? state.getMassagesGroup.filter((g) => g.groupId === parseInt(state.chatGroupId)) : []
            state.media =    state.getMassagesGroup ?    state.getMassagesGroup.filter((m) => m.text === "undefined") : []
            state.loading = false
        })
        builder.addCase(getChatGroupMessage.rejected, (state, action) => {
            state.loading = false
        })

        // Create Chat Group Message

        builder.addCase(createChatGroupMessage.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(createChatGroupMessage.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false

        })
        builder.addCase(createChatGroupMessage.rejected, (state, action) => {
            state.loading = false
        })

        // Delete Chat Group Message
        builder.addCase(deleteChatGroupMessage.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteChatGroupMessage.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false


        })
        builder.addCase(deleteChatGroupMessage.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const { logout, getIdChat, findMedia, getIdGroupChat, findChatGroupUser } = dataSlice.actions;
export default dataSlice.reducer
