import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChatBox } from './ChatBox';
import { getIdChat } from "../redux/slice/slice"
import { getMessages } from '../redux/api/message';
import { Error } from './Error';
export const Chats = ({ update, onlineUsers }) => {
    const { user, chat } = useSelector((store) => store.data)
    const [currentChat, setCurrentChat] = useState(null);
    const [isvisible, setIsVisible] = useState("is-visible");
    const dispatch = useDispatch()
    return (
        <>
            {user &&
                <>
                    <aside className="sidebar bg-light">
                        <div className="tab-pane fade h-100 show active">
                            <div className="d-flex flex-column h-100 position-relative">
                                <div className="hide-scrollbar">

                                    <div className="container py-8">

                                        <div className="mb-8">
                                            <h2 className="fw-bold m-0">Chats</h2>
                                        </div>



                                        <div className="card-list">
                                            {chat.length <= 0 &&
                                                <div className=" text-center" role="alert">
                                                    Chat is Empty
                                                </div>}
                                            {chat.map((row) => {
                                                return <Link className="card border-0 text-reset" key={row.id}
                                                    onClick={() => {
                                                        let chatId = row.id
                                                        setCurrentChat(row)
                                                        dispatch(getIdChat({ chatId }))
                                                        dispatch(getMessages())
                                                        setIsVisible("is-visible")

                                                    }}>
                                                    <div className="card-body">
                                                        <div className="row gx-5">
                                                            <div className="col-auto">
                                                                {row.receiverId === user?.id ?
                                                                    <div className={onlineUsers ? onlineUsers.find((u) => u.userId === row.senderId) ? "avatar avatar-online" : "avatar avatar-offline" : []} >
                                                                        <img src={row && row.senderImage} alt="#" className="avatar-img" />
                                                                    </div> :
                                                                    <div className={onlineUsers ? onlineUsers.find((u) => u.userId === row.receiverId) ? "avatar avatar-online" : "avatar avatar-offline" : []}  >
                                                                        <img src={row && row.receiverImage} alt="#" className="avatar-img" />
                                                                    </div>
                                                                }

                                                            </div>

                                                            <div className="col">
                                                                {row.receiverId === user?.id ?
                                                                    <div className="d-flex align-items-center mb-3">
                                                                        <h5 className="me-auto mb-0">{row && row.senderName}</h5>
                                                                        <span className="text-muted extra-small ms-2">{row && row.mass && row.mass.time}</span>
                                                                    </div> :
                                                                    <div className="d-flex align-items-center mb-3">
                                                                        <h5 className="me-auto mb-0">{row && row.receiverName}</h5>
                                                                        <span className="text-muted extra-small ms-2">{row && row.mass && row.mass.time}</span>
                                                                    </div>
                                                                }

                                                                <div className="d-flex align-items-center">


                                                                    {row?.mass ?
                                                                        <div className="line-clamp me-auto">
                                                                            <p>{row.mass.text === "undefined" ? <span>is Image</span> : row.mass.text}</p>
                                                                        </div> :
                                                                        <div className="line-clamp me-auto">
                                                                            <p className="text-truncate">is Empty<span className="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>
                                                                            
                                                                        </div>
                                                                    }

                                                                    <div className="badge badge-circle bg-primary ms-5">

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </Link>
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <ChatBox
                        currentChat={currentChat}
                        isvisible={isvisible}
                        setIsVisible={setIsVisible}
                        onlineUsers={onlineUsers}
                    />
                </>
            }
            {!user && <Error />}
        </>
    );
}

