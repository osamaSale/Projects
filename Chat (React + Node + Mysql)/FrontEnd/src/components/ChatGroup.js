import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChatBoxGroup } from './ChatBoxGroup';
import { getIdGroupChat } from "../redux/slice/slice"
import { getChatGroupMessage, getChatGroupUsers } from '../redux/api/chatGroup';
import { Error } from './Error';
export const ChatGroup = () => {
    const { user, chatGroup, loading } = useSelector((store) => store.data)
    const [currentChat, setCurrentChat] = useState(null);
    const [isvisible, setIsVisible] = useState("is-visible");
    const dispatch = useDispatch()
    if (loading) {
        return <div className="container-fluid">
            <div className="row align-items-center justify-content-center min-vh-100 gx-0">
                <div className="spinner-border spinner-border me-5" role="status" >
                </div> Please wait...
            </div>
        </div>
    }
    return (
        <>
            {user &&
                <>
                    <aside className="sidebar bg-light">
                        <div className="tab-pane fade h-100 show active" id="tab-content-chats" role="tabpanel">
                            <div className="d-flex flex-column h-100 position-relative">
                                <div className="hide-scrollbar">
                                    <div className="container py-8">
                                        <div className="mb-8">
                                            <h2 className="fw-bold m-0">Group Chat</h2>
                                        </div>


                                        <div className="card-list">
                                            {chatGroup.length <= 0 &&
                                                <div className=" text-center" role="alert">
                                                    Chat Group is Empty
                                                </div>}
                                            {chatGroup && chatGroup.map((row) => {
                                                return <div key={row.id} className='mb-4'>
                                                    {row.chatUsers.find((c) => c.userId === user?.id) &&
                                                        <Link className="card border-0 text-reset"
                                                            onClick={() => {
                                                                let chatGroupId = row.id
                                                                setCurrentChat(row)
                                                                dispatch(getIdGroupChat({ chatGroupId }))
                                                                dispatch(getChatGroupUsers())
                                                                dispatch(getChatGroupMessage())
                                                                setIsVisible("is-visible")

                                                            }}>


                                                            <div className="card-body">
                                                                <div className="row gx-5">
                                                                    <div className="col-auto">
                                                                        {row?.chatMessage ?
                                                                            <div className="avatar">
                                                                                <img src={row && row.chatMessage && row.chatMessage.userImage} alt="#" className="avatar-img" />
                                                                            </div> :
                                                                            <div className="avatar">
                                                                                <img src={row && row.imageAdmin} alt="#" className="avatar-img" />
                                                                            </div>
                                                                        }
                                                                    </div>

                                                                    <div className="col">
                                                                        <div className="d-flex align-items-center mb-3">
                                                                            <h5 className="me-auto mb-0">{row && row.chatMessage && row.chatMessage.userName}</h5>
                                                                            <span className="text-muted extra-small ms-2">{row && row.chatMessage && row.chatMessage.time}</span>
                                                                        </div>

                                                                        <div className="d-flex align-items-center">
                                                                            {row?.chatMessage ?
                                                                                <div className="line-clamp me-auto">
                                                                                    {row.chatMessage.text === "undefined" ? <span>is Image</span> : row.chatMessage.text}
                                                                                </div> :
                                                                                <div className="line-clamp me-auto">
                                                                                    IS Empty
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="card-footer">
                                                                <div className="row align-items-center gx-4">
                                                                    <div className="col-auto">
                                                                        <div className="avatar avatar-xs">
                                                                            <img className="avatar-img" src={row && row.image} alt="Bootstrap Community" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col">
                                                                        <h6 className="mb-0">{row && row.name}</h6>
                                                                    </div>

                                                                    <div className="col-auto">
                                                                        <div className="avatar-group">
                                                                            {row && row.chatUsers.map((row) => {
                                                                                return <div className="avatar avatar-xs" key={row.id}>
                                                                                    <img src={row && row.image} alt="#" className="avatar-img" />
                                                                                </div>
                                                                            })}

                                                                            <div className="avatar avatar-xs">
                                                                                <span className="avatar-text">+{row.chatUsers && row.chatUsers.length > 0 ? row.chatUsers.length : 0}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </Link>
                                                    }
                                                </div>
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <ChatBoxGroup
                        currentChat={currentChat}
                        isvisible={isvisible}
                        setIsVisible={setIsVisible}
                    />
                </>}

            {!user && <Error />}
        </>
    );
}

