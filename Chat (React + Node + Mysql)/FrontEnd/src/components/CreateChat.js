import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, searchUser } from '../redux/api/users';
import { useNavigate } from 'react-router-dom';
import { createChatGroup, getChatGroup, getChatGroupUsers } from '../redux/api/chatGroup';
import { Error } from './Error';
import { createChat } from '../redux/api/chat';

export const CreateChat = ({ update , onlineUsers}) => {
    const { people, user, loading, chat } = useSelector(store => store.data)
    const [search, setSearch] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [description, setDescription] = useState("")
    const [loading1, setLoading] = useState(false);
    const navigate = useNavigate()
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
                        <div className="tab-content h-100 show active" role="tablist">
                            <div className="tab-pane fade h-100 show active" id="tab-content-create-chat" role="tabpanel">
                                <div className="d-flex flex-column h-100">
                                    <div className="hide-scrollbar">

                                        <div className="container py-8">

                                            <div className="mb-8">
                                                <h2 className="fw-bold m-0">Create Chat</h2>
                                            </div>

                                            <div className="mb-6">
                                                <div className="mb-5">

                                                    <div className="input-group">
                                                        <div className="input-group-text">
                                                            <div className="icon icon-lg">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                            </div>
                                                        </div>

                                                        <input type="text" className="form-control form-control-lg ps-0" placeholder="Search messages or users"
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

                                                <ul className="nav nav-pills nav-justified" role="tablist">


                                                    <li className="nav-item">
                                                        <a className="nav-link active" data-bs-toggle="pill" href="#create-chat-members" role="tab" aria-controls="create-chat-members" aria-selected="true">
                                                            <i className="bi bi-person-add me-2"></i>  Find Friend
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link " data-bs-toggle="pill" href="#create-chat-info" role="tab" aria-controls="create-chat-info" aria-selected="true">
                                                            <i className="bi bi-people me-2"></i>  Group Chat
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>


                                            <div className="tab-content" role="tablist">
                                                <div className="tab-pane fade show active " id="create-chat-members" role="tabpanel">
                                                    <nav>
                                                        {people.map((row) => {
                                                            return <div className="card border-0 mt-5" key={row.id}>
                                                                <div className="card-body">

                                                                    <div className="row align-items-center gx-5">
                                                                        <div className="col-auto">
                                                                            <div className={onlineUsers ? onlineUsers.find((u) => u.userId === row.senderId) ? "avatar avatar-online" : "avatar avatar-offline" : []}>
                                                                                <img className="avatar-img" src={row && row.image} alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col">
                                                                            <h5>{row && row.name}</h5>
                                                                            <p>{`${row && row.email}`.slice(0, 14)}..</p>
                                                                        </div>
                                                                        <div className="col-auto">
                                                                            <button className='btn btn-dark btn-sm'
                                                                                type='submit'
                                                                                disabled={chat.find((c) => c.receiverId === row.id || c.senderId === row.id)}
                                                                                onClick={() => {
                                                                                    let data = { senderId: user.id, receiverId: row.id }
                                                                                    dispatch(createChat(data)).then((res) => {
                                                                                        const { status } = res?.payload
                                                                                        if (status === 200) {
                                                                                            dispatch(getAllUsers())
                                                                                            update()
                                                                                            navigate('/chat')
                                                                                        }
                                                                                    })
                                                                                }}
                                                                            >
                                                                                {chat.find((c) => c.receiverId === row.id || c.senderId === row.id) ?
                                                                                    <span>In Chat</span> : <span>New Message</span>

                                                                                }

                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        })}
                                                    </nav>
                                                </div>
                                                <div className="tab-pane fade" id="create-chat-info" role="tabpanel">

                                                    <div className="card border-0">
                                                        <div className="profile">
                                                            <div className="profile-img text-primary rounded-top">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 400 140.74"><defs></defs><g><g><path d="M400,125A1278.49,1278.49,0,0,1,0,125V0H400Z" /><path className="cls-2" d="M361.13,128c.07.83.15,1.65.27,2.46h0Q380.73,128,400,125V87l-1,0a38,38,0,0,0-38,38c0,.86,0,1.71.09,2.55C361.11,127.72,361.12,127.88,361.13,128Z" /><path className="cls-2" d="M12.14,119.53c.07.79.15,1.57.26,2.34v0c.13.84.28,1.66.46,2.48l.07.3c.18.8.39,1.59.62,2.37h0q33.09,4.88,66.36,8,.58-1,1.09-2l.09-.18a36.35,36.35,0,0,0,1.81-4.24l.08-.24q.33-.94.6-1.9l.12-.41a36.26,36.26,0,0,0,.91-4.42c0-.19,0-.37.07-.56q.11-.86.18-1.73c0-.21,0-.42,0-.63,0-.75.08-1.51.08-2.28a36.5,36.5,0,0,0-73,0c0,.83,0,1.64.09,2.45C12.1,119.15,12.12,119.34,12.14,119.53Z" /><circle className="cls-2" cx="94.5" cy="57.5" r="22.5" /><path className="cls-2" d="M276,0a43,43,0,0,0,43,43A43,43,0,0,0,362,0Z" /></g></g></svg>
                                                            </div>

                                                            <div className="profile-body p-0">
                                                                <div className="avatar avatar-lg">
                                                                    <span className="avatar-text bg-primary">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                                    </span>

                                                                    <div className="badge badge-lg badge-circle bg-primary border-outline position-absolute bottom-0 end-0">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                                                    </div>

                                                                    <input id="upload-chat-img" className="d-none" type="file" onChange={(e) => setImage(e.target.files[0])} />
                                                                    <label className="stretched-label mb-0" htmlFor="upload-chat-img"></label>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="card-body">

                                                            <div className="row gy-6">
                                                                <div className="col-12">
                                                                    <div className="form-floating">
                                                                        <input type="text" className="form-control" id="floatingInput" placeholder="Enter a chat name"
                                                                            onChange={(e) => setName(e.target.value)}
                                                                        />
                                                                        <label htmlFor="floatingInput">Enter group name</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div className="form-floating">
                                                                        <textarea className="form-control" name='description' placeholder="Description" style={{ minHeight: "100px" }}
                                                                            onChange={(e) => setDescription(e.target.value)}
                                                                        ></textarea>
                                                                        <label htmlFor="floatingTextarea">What's your purpose?</label>
                                                                    </div>
                                                                </div>
                                                                <div className="col-12">
                                                                    <button className="btn btn-lg btn-primary w-100 d-flex align-items-center" type="button"
                                                                        
                                                                        onClick={() => {
                                                                            setLoading(true)
                                                                            setTimeout(() => {
                                                                                const fromData = new FormData();
                                                                                fromData.append("userId", user.id);
                                                                                fromData.append("name", name);
                                                                                fromData.append("description", description);


                                                                                if (image !== null) {
                                                                                    fromData.append("image", image, image?.name);
                                                                                } else {
                                                                                    fromData.append("image", image);
                                                                                }
                                                                                dispatch(createChatGroup(fromData)).then((res) => {
                                                                                    const { status } = res?.payload
                                                                                    if (status === 200) {
                                                                                        dispatch(getChatGroupUsers())
                                                                                        dispatch(getChatGroup())
                                                                                        navigate('/chatGroup')
                                                                                    }
                                                                                })

                                                                                setLoading(false)
                                                                            }, 2000);
                                                                        }}

                                                                    >
                                                                        {loading1 &&
                                                                            <>
                                                                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                                                                </div> Please wait...
                                                                            </>
                                                                        }
                                                                        {!loading1 &&
                                                                            <span className="indicator-label"> Start Chat </span>
                                                                        }

                                                                        <span className="icon ms-auto">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>


                                                </div>



                                            </div>
                                        </div>

                                    </div>




                                </div>
                            </div>

                        </div>
                    </aside >

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
                    </main>
                </>}
            {!user && <Error />}
        </>

    );
}

