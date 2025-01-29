import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Picker from 'emoji-picker-react';
import { createChatGroupMessage, createChatGroupUsers, deleteChatGroupMessage, deleteChatGroupUser, getChatGroup, getChatGroupMessage, getChatGroupUsers, leaveChatGroupUser } from "../redux/api/chatGroup"
import { getAllUsers, searchUser } from '../redux/api/users';
import { findChatGroupUser, findMedia } from "../redux/slice/slice"
import { Error } from './Error';


export const ChatBoxGroup = ({ currentChat, isvisible, setIsVisible }) => {
    const { user, chatGroupMessage, chatGroupUsers, people, media } = useSelector(store => store.data)
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [showEmoji, setShowEmoji] = useState(false);
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatGroupMessage])

    const scroll = useRef();
    return (
        <>
            {user &&
                <>
                    {currentChat && currentChat ?
                        <main className={`main ${isvisible}`} >
                            <div className="container h-100">
                                <div className="d-flex flex-column h-100 position-relative">
                                    <div className="chat-header border-bottom py-4 py-lg-7">
                                        <div className="row align-items-center">

                                            <div className="col-2 d-xl-none">
                                                <Link className="icon icon-lg text-muted" onClick={() => { setIsVisible("") }}  >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                </Link>
                                            </div>

                                            <div className="col-6 col-xl-12">
                                                <div className="row align-items-center text-center text-xl-start">

                                                    <div className="col-12 col-xl-6">
                                                        <div className="row align-items-center gx-5">
                                                            <div className="col-auto ">
                                                                <div className="avatar">
                                                                    <img className="avatar-img"
                                                                        src={currentChat.image} alt="" />
                                                                </div>
                                                            </div>

                                                            <div className="col overflow-hidden">
                                                                <h5 className="text-truncate">{currentChat.name}</h5>
                                                                <p className="text-truncate">{chatGroupUsers && chatGroupUsers.length > 0 ? chatGroupUsers.length : 0} members</p>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 d-none d-xl-block">
                                                        <div className="row align-items-center justify-content-end gx-6">
                                                            <div className="col-auto">
                                                                <Link className="icon icon-lg text-muted" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-more" aria-controls="offcanvas-more">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                                                </Link>

                                                            </div>

                                                            <div className="col-auto">
                                                                <div className="avatar-group ">
                                                                    {chatGroupUsers && chatGroupUsers.map((row) => {
                                                                        return <Link key={row.id} to="#" className="avatar avatar-sm " data-bs-toggle="modal" data-bs-target="#modal-user-profile"
                                                                            onClick={() => {
                                                                                let ChatGroupUserId = row.userId
                                                                                dispatch(findChatGroupUser({ ChatGroupUserId }))
                                                                                dispatch(getChatGroupUsers())
                                                                            }
                                                                            }
                                                                        >
                                                                            <img className="avatar-img" src={row && row.image} alt="#" />
                                                                        </Link>
                                                                    })}


                                                                    <Link to="#" className="avatar avatar-sm" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-add-members" aria-controls="offcanvas-add-members">
                                                                        <span className="avatar-text" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="<strong>Add People</strong><p>Invite friends to group</p>">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-2 d-xl-none text-end">
                                                <Link to="#" className="avatar avatar-sm" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-add-members" aria-controls="offcanvas-add-members">
                                                    <span className="avatar-text" data-bs-toggle="tooltip" data-bs-placement="bottom" title="" data-bs-original-title="<strong>Add People</strong><p>Invite friends to group</p>">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                    </span>
                                                </Link>

                                            </div>
                                            <div className="col-2 d-xl-none text-end">
                                                <Link to="#" className="icon icon-lg text-muted" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-more" aria-controls="offcanvas-more">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                                </Link>

                                            </div>




                                        </div>
                                    </div>
                                    <div className="chat-body hide-scrollbar flex-1 h-100" >
                                        {chatGroupMessage && chatGroupMessage?.map((row) => {
                                            return <div key={row.id}
                                                className="chat-body-inner" style={{ paddingBottom: "70px" }}>
                                                <div className="py-6 py-lg-12" ref={scroll}>


                                                    <div className={row.userId === user.id ? "message message-out" : "message "} >
                                                        <Link to="#" data-bs-toggle="modal" data-bs-target="#modal-user-profile" className="avatar avatar-responsive">
                                                            <img className="avatar-img" src={row.userImage} alt="" />
                                                        </Link>

                                                        <div className="message-inner">
                                                            <div className="message-body">
                                                                {row.image === "null" &&
                                                                    <div className="message-content">
                                                                        <div className="message-text">
                                                                            <p>{row && row.text}</p>
                                                                        </div>



                                                                        {row.userId === user.id && <div className="message-action">
                                                                            <div className="dropdown">
                                                                                <Link className="icon text-muted" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                                                                </Link>

                                                                                <ul className="dropdown-menu">

                                                                                    <li>
                                                                                        <Link className="dropdown-item d-flex align-items-center text-danger" to="#"
                                                                                            onClick={() => {
                                                                                                dispatch(deleteChatGroupMessage(row.id)).then(() => {
                                                                                                    dispatch(getChatGroup())
                                                                                                    dispatch(getChatGroupMessage())
                                                                                                })
                                                                                            }}

                                                                                        >
                                                                                            <span className="me-auto">Delete</span>
                                                                                            <div className="icon">
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                                            </div>
                                                                                        </Link>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>}
                                                                    </div>}
                                                                {row.text === "undefined" &&
                                                                    <div className="message-content">
                                                                        <div className="message-gallery">
                                                                            <img alt='' src={row && row.image} className='img-fluid rounded' />
                                                                        </div>



                                                                        <div className="message-action">
                                                                            {row.senderId === parseInt(user.id) &&
                                                                                <div className="dropdown">
                                                                                    <Link className="icon text-muted" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                                                                    </Link>

                                                                                    <ul className="dropdown-menu">

                                                                                        <li>
                                                                                            <Link className="dropdown-item d-flex align-items-center text-danger"
                                                                                                disabled={row.userId === user.id}
                                                                                                onClick={() => {
                                                                                                    dispatch(deleteChatGroupMessage(row.id)).then(() => {
                                                                                                        dispatch(getChatGroup())
                                                                                                        dispatch(getChatGroupMessage())
                                                                                                    })
                                                                                                }}
                                                                                            >
                                                                                                <span className="me-auto">Delete</span>
                                                                                                <div className="icon">
                                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                                                </div>
                                                                                            </Link>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>}

                                                            </div>

                                                            <div className="message-footer">
                                                                <span className="extra-small text-muted">{row.time}</span>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <div className="chat-footer pb-3 pb-lg-7 position-absolute bottom-0 start-0">


                                        {showEmoji &&
                                            <div className="container">
                                                <div className="row justify-content-end">
                                                    <div className="col-md-4 .offset-md-4">
                                                        <Picker
                                                            theme="dark"
                                                            width={300}
                                                            onEmojiClick={(e) => setText((prev) => prev + e.emoji)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>}
                                        <div className="chat-form rounded-pill bg-dark" >
                                            <div className="row align-items-center gx-0">
                                                <div className='col-auto'>
                                                    <div className="btn btn-icon btn-link text-body rounded-circle dz-clickable" >
                                                        <div className="custom-file">
                                                            <input type="file" className="custom-file-input" id="validatedCustomFile" name='image' onChange={(e) => setImage(e.target.files[0])} />
                                                            <label className="custom-file-label" htmlFor="validatedCustomFile"></label>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="col">
                                                    <div className="input-group">
                                                        <input type='text' onChange={(e) => setText(e.target.value)} className="form-control px-0" placeholder="Type your message..." value={text} />
                                                        <Link to="#" className="input-group-text text-body pe-0"
                                                            onClick={() => setShowEmoji((prev) => !prev)}
                                                        >
                                                            <span className="icon icon-lg">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                                                            </span>

                                                        </Link>
                                                    </div>

                                                </div>

                                                <div className="col-auto">
                                                    <button className="btn btn-icon btn-primary rounded-circle ms-5"

                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            const fromData = new FormData();
                                                            fromData.append("groupId", currentChat.id);
                                                            fromData.append("userId", user.id);
                                                            fromData.append("userName", user.name);
                                                            fromData.append("userImage", user.image);
                                                            if (image !== null) {
                                                                fromData.append("image", image, image?.name);
                                                            } else {
                                                                fromData.append("text", text);
                                                            }
                                                            dispatch(createChatGroupMessage(fromData)).then((res) => {
                                                                dispatch(getChatGroupMessage())
                                                                dispatch(getChatGroup())
                                                                setText("");

                                                            })

                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </main>
                        :

                        <main className="main">
                            <div className="container h-100">

                                <div className="d-flex flex-column h-100 justify-content-center text-center">
                                    <div className="mb-6">
                                        <span className="icon icon-xl text-muted">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                                        </span>
                                    </div>

                                    <p className="text-muted">Pick a person from left menu, <br /> and start your conversation.</p>
                                </div>

                            </div>
                        </main>}

                    {/* Chat Group Info */}
                    <div className="offcanvas offcanvas-end offcanvas-aside" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvas-more" aria-modal="true" role="dialog" style={{ visibility: "visible" }} >

                        <div className="offcanvas-header py-4 py-lg-7 border-bottom">
                            <Link className="icon icon-lg text-muted" to="#" data-bs-dismiss="offcanvas">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </Link>

                            <div className="visibility-xl-invisible overflow-hidden text-center">
                                <h5 >{currentChat && currentChat.name}</h5>
                                <p className="text-truncate">{chatGroupUsers && chatGroupUsers.length > 0 ? chatGroupUsers.length : 0} members</p>
                            </div>


                            <div className="dropdown">
                                <Link className="icon icon-lg text-muted" to="#" role="button" aria-expanded="true" data-bs-toggle="dropdown">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                </Link>
                                <ul className="dropdown-menu" style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate3d(-17.6px, 24px, 0px)" }} data-popper-placement="bottom-end" data-popper-reference-hidden="">


                                    <li>
                                        <button className="dropdown-item d-flex align-items-center text-danger"
                                            onClick={() => {
                                                let data = { groupId: currentChat.id, userId: user.id }
                                                console.log(data)
                                                dispatch(leaveChatGroupUser(data)).then((res) => {
                                                    dispatch(getChatGroupUsers())
                                                    dispatch(getChatGroup())
                                                    dispatch(getChatGroupMessage())
                                                    navigate("/chatGroup")
                                                })
                                            }}
                                        >
                                            Leave
                                            <div className="icon ms-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                            </div>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>



                        <div className="offcanvas-body hide-scrollbar">

                            <div className="text-center py-10">
                                <div className="row gy-6">
                                    <div className="col-12">
                                        <div className="avatar avatar-xl mx-auto">
                                            <img src={currentChat && currentChat.image} alt="#" className="avatar-img" />
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <h4>{currentChat && currentChat.name}</h4>
                                        <p>{currentChat && currentChat.description}</p>
                                    </div>
                                </div>
                            </div>



                            <ul className="nav nav-pills nav-justified" role="tablist">
                                <li className="nav-item">
                                    <Link className="nav-link active" data-bs-toggle="pill" to="#offcanvas-group-tab-members" role="tab" aria-controls="offcanvas-group-tab-members" aria-selected="true">
                                        People
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" data-bs-toggle="pill" to="#offcanvas-group-tab-media" role="tab" aria-controls="offcanvas-group-tab-media" aria-selected="true">
                                        Media
                                    </Link>
                                </li>

                            </ul>



                            <div className="tab-content py-2" role="tablist">

                                <div className="tab-pane fade show active" id="offcanvas-group-tab-members" role="tabpanel">
                                    <ul className="list-group list-group-flush">
                                        {chatGroupUsers.map((row) => {
                                            return <li className="list-group-item" key={row.id}>
                                                <div className="row align-items-center gx-5">

                                                    <div className="col-auto">
                                                        <Link to="#" className="avatar">
                                                            <img className="avatar-img" src={row && row.image} alt="" />
                                                        </Link>
                                                    </div>



                                                    <div className="col">
                                                        <h5><Link to="#">{row && row.name}</Link></h5>
                                                        <p>{`${row && row.email}`.slice(0, 17)}</p>
                                                    </div>



                                                    <div className="col-auto">
                                                        <span className="extra-small text-primary">
                                                            {row && row.isAdmin}
                                                        </span>
                                                    </div>




                                                    {chatGroupUsers.find((f) => f.isAdmin !== null) &&
                                                        <div className="col-auto">
                                                            <button className="btn btn-dark  text-danger btn-sm"
                                                                disabled={row.isAdmin === "Admin"}
                                                                onClick={() => {

                                                                    dispatch(deleteChatGroupUser(row.id)).then((res) => {
                                                                        dispatch(getChatGroupUsers())
                                                                        dispatch(getChatGroup())
                                                                    })
                                                                }}>
                                                                Delete

                                                            </button>

                                                        </div>}


                                                </div>
                                            </li>
                                        })}
                                    </ul>
                                </div>



                                <div className="tab-pane fade" id="offcanvas-group-tab-media" role="tabpanel">
                                    <div className="row row-cols-3 g-3 py-6">
                                        {media && media.map((row) => {
                                            return <div className="col" key={row.id} onClick={() => {
                                                let mediaId = row.id
                                                dispatch(findMedia({ mediaId }))
                                            }}>
                                                <Link to="#" data-bs-toggle="modal" data-bs-target="#modal-media-preview" data-theme-img-url="assets/img/chat/media-1.jpg">
                                                    <img className="img-fluid rounded" src={row && row.image} alt="" />
                                                </Link>
                                            </div>
                                        })}




                                    </div>
                                </div>




                            </div>

                        </div>

                    </div>


                    {/* Chat Add Member */}
                    <div className="offcanvas offcanvas-end offcanvas-aside" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvas-add-members" style={{ visibility: "visible" }} aria-hidden="true">

                        <div className="offcanvas-header py-4 py-lg-7 border-bottom ">
                            <Link className="icon icon-lg text-muted" to="#" data-bs-dismiss="offcanvas">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </Link>

                            <div className="visibility-xl-invisible overflow-hidden text-center">
                                <h5 className="text-truncate">Members</h5>
                                <p className="text-truncate">Add New Members</p>
                            </div>

                            <Link className="icon icon-lg text-muted" data-bs-toggle="collapse" to="#search-members" role="button" aria-expanded="false" aria-controls="search-members" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                            </Link>
                        </div>

                        <div className="offcanvas-body hide-scrollbar py-0">

                            <div className="collapse" id="search-members">
                                <div className="border-bottom py-6">
                                    <div className="input-group">
                                        <div className="input-group-text" id="search-user">
                                            <div className="icon icon-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            </div>
                                        </div>

                                        <input type="text" className="form-control form-control-lg ps-0" placeholder="User name or phone" aria-label="User name or phone" aria-describedby="search-user"
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyUp={() => {
                                                if (search === "") {
                                                    dispatch(getAllUsers())
                                                } else {
                                                    dispatch(searchUser(search))
                                                }
                                            }}
                                        />
                                    </div>

                                </div>
                            </div>

                            <ul className="list-group list-group-flush">


                                {people.map((row) => {
                                    return <li className="list-group-item" key={row.id}>
                                        <div className="row align-items-center gx-5">
                                            <div className="col-auto">
                                                <div className="avatar ">

                                                    <img className="avatar-img" src={row && row.image} alt="" />
                                                </div>
                                            </div>
                                            <div className="col">
                                                <h5>{row && row.name}</h5>
                                                <p>{`${row && row.email}`.slice(0, 14)}..</p>
                                            </div>
                                            <div className="col-auto">

                                                <button

                                                    className='btn btn-dark btn-sm'
                                                    disabled={chatGroupUsers.find((c) => c.userId === row.id)}
                                                    onClick={(e) => {
                                                        e.preventDefault()

                                                        let data = { groupId: currentChat.id, userId: row.id }
                                                        dispatch(createChatGroupUsers(data)).then((res) => {
                                                            dispatch(getChatGroupUsers())
                                                            dispatch(getChatGroup())
                                                        })
                                                    }}
                                                >
                                                    {chatGroupUsers.find((c) => c.userId === row.id) ?
                                                        <span>In members</span> : <span> Add members</span>
                                                    }
                                                </button>
                                            </div>
                                        </div>

                                    </li>
                                })}


                            </ul>

                        </div>



                    </div >
                </>}
            {!user && <Error />}
        </>
    );
}

