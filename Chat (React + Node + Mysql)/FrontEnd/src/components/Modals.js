import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from "../redux/slice/slice"

export const Modals = ({ update }) => {
    const { user, mediaId, media, findChatGroupUser, ChatGroupUserId } = useSelector(store => store.data)
    const findMedia = media ? media.find((m) => m.id === mediaId) : []
    const findUserChat = findChatGroupUser ? findChatGroupUser.find((m) => m.userId === ChatGroupUserId) : []

    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <>


            {/*  <!-- Modal: Profile --> */}
            <div className="modal fade" id="modal-profile" tabIndex="-1" aria-labelledby="modal-profile" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-fullscreen-xl-down">
                    <div className="modal-content">

                        <div className="modal-body py-0">

                            <div className="profile modal-gx-n">
                                <div className="profile-img text-primary rounded-top-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 400 140.74"><defs></defs><g><g><path d="M400,125A1278.49,1278.49,0,0,1,0,125V0H400Z" /><path className="cls-2" d="M361.13,128c.07.83.15,1.65.27,2.46h0Q380.73,128,400,125V87l-1,0a38,38,0,0,0-38,38c0,.86,0,1.71.09,2.55C361.11,127.72,361.12,127.88,361.13,128Z" /><path className="cls-2" d="M12.14,119.53c.07.79.15,1.57.26,2.34v0c.13.84.28,1.66.46,2.48l.07.3c.18.8.39,1.59.62,2.37h0q33.09,4.88,66.36,8,.58-1,1.09-2l.09-.18a36.35,36.35,0,0,0,1.81-4.24l.08-.24q.33-.94.6-1.9l.12-.41a36.26,36.26,0,0,0,.91-4.42c0-.19,0-.37.07-.56q.11-.86.18-1.73c0-.21,0-.42,0-.63,0-.75.08-1.51.08-2.28a36.5,36.5,0,0,0-73,0c0,.83,0,1.64.09,2.45C12.1,119.15,12.12,119.34,12.14,119.53Z" /><circle className="cls-2" cx="94.5" cy="57.5" r="22.5" /><path className="cls-2" d="M276,0a43,43,0,0,0,43,43A43,43,0,0,0,362,0Z" /></g></g></svg>

                                    <div className="position-absolute top-0 start-0 py-6 px-5">
                                        <button type="button" className="btn-close btn-close-white btn-close-arrow opacity-100" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                </div>

                                <div className="profile-body">
                                    <div className="avatar avatar-xl">
                                        <img className="avatar-img" src={user && user.image} alt="#" />
                                    </div>

                                    <h4 className="mb-1">{user && user.name}</h4>
                                    <p>{user && user.email}</p>
                                </div>
                            </div>


                            <hr className="hr-bold modal-gx-n my-0" />

                            <ul className="list-group list-group-flush">


                                <li className="list-group-item">
                                    <div className="row align-items-center gx-6">
                                        <div className="col">
                                            <h5>Name</h5>
                                            <p>{user && user.name}</p>
                                        </div>

                                        <div className="col-auto">
                                            <div className="btn btn-sm btn-icon btn-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row align-items-center gx-6">
                                        <div className="col">
                                            <h5>E-mail</h5>
                                            <p>{user && user.email}</p>
                                        </div>

                                        <div className="col-auto">
                                            <div className="btn btn-sm btn-icon btn-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item">
                                    <div className="row align-items-center gx-6">
                                        <div className="col">
                                            <h5>Phone</h5>
                                            <p>{user && user.phone}</p>
                                        </div>

                                        <div className="col-auto">
                                            <div className="btn btn-sm btn-icon btn-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone-call"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>


                            <hr className="hr-bold modal-gx-n my-0" />
                            <button className="btn btn-dark w-100  mt-4 mb-4" data-bs-dismiss="modal" aria-label="Close" onClick={() => {
                                if (window.confirm("Do you want to Exit")) {
                                    dispatch(logout())
                                    navigate('/')

                                }
                            }}>Logout</button>



                        </div>


                    </div>
                </div>
            </div>
            {/* <!-- Modal: User profile --> */}
            <div className="modal fade" id="modal-user-profile" tabIndex="-1" aria-labelledby="modal-user-profile" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-fullscreen-xl-down">
                    <div className="modal-content">

                        <div className="modal-body py-0">

                            <div className="profile modal-gx-n">
                                <div className="profile-img text-primary rounded-top-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 400 140.74"><defs></defs><g><g><path d="M400,125A1278.49,1278.49,0,0,1,0,125V0H400Z" /><path className="cls-2" d="M361.13,128c.07.83.15,1.65.27,2.46h0Q380.73,128,400,125V87l-1,0a38,38,0,0,0-38,38c0,.86,0,1.71.09,2.55C361.11,127.72,361.12,127.88,361.13,128Z" /><path className="cls-2" d="M12.14,119.53c.07.79.15,1.57.26,2.34v0c.13.84.28,1.66.46,2.48l.07.3c.18.8.39,1.59.62,2.37h0q33.09,4.88,66.36,8,.58-1,1.09-2l.09-.18a36.35,36.35,0,0,0,1.81-4.24l.08-.24q.33-.94.6-1.9l.12-.41a36.26,36.26,0,0,0,.91-4.42c0-.19,0-.37.07-.56q.11-.86.18-1.73c0-.21,0-.42,0-.63,0-.75.08-1.51.08-2.28a36.5,36.5,0,0,0-73,0c0,.83,0,1.64.09,2.45C12.1,119.15,12.12,119.34,12.14,119.53Z" /><circle className="cls-2" cx="94.5" cy="57.5" r="22.5" /><path className="cls-2" d="M276,0a43,43,0,0,0,43,43A43,43,0,0,0,362,0Z" /></g></g></svg>

                                    <div className="position-absolute top-0 start-0 p-5">
                                        <button type="button" className="btn-close btn-close-white btn-close-arrow opacity-100" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                </div>

                                <div className="profile-body">
                                    <div className="avatar avatar-xl">
                                        <img className="avatar-img" src={findUserChat && findUserChat.image} alt="#" />

                                        <Link to="#" className="badge badge-lg badge-circle bg-primary text-white border-outline position-absolute bottom-0 end-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                        </Link>
                                    </div>

                                    <h4 className="mb-1">{findUserChat && findUserChat.name}</h4>
                                    <p>{findUserChat && findUserChat.email}</p>
                                </div>
                            </div>

                            <hr className="hr-bold modal-gx-n my-0" />

                            <ul className="list-group list-group-flush">


                                <li className="list-group-item">
                                    <div className="row align-items-center gx-6">
                                        <div className="col">
                                            <h5>Name</h5>
                                            <p>{findUserChat && findUserChat.name}</p>
                                        </div>

                                        <div className="col-auto">
                                            <div className="btn btn-sm btn-icon btn-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row align-items-center gx-6">
                                        <div className="col">
                                            <h5>E-mail</h5>
                                            <p>{findUserChat && findUserChat.email}</p>
                                        </div>

                                        <div className="col-auto">
                                            <div className="btn btn-sm btn-icon btn-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li className="list-group-item">
                                    <div className="row align-items-center gx-6">
                                        <div className="col">
                                            <h5>Phone</h5>
                                            <p>{findUserChat && findUserChat.phone}</p>
                                        </div>

                                        <div className="col-auto">
                                            <div className="btn btn-sm btn-icon btn-dark">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone-call"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>


                        </div>
                    </div>
                </div>
            </div>

            {/*   <!-- Modal: Media Preview Image--> */}
            <div className="modal fade" id="modal-media-preview" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-fullscreen-xl-down">
                    <div className="modal-content">


                        <div className="modal-header">
                            <button type="button" className="btn-close btn-close-arrow" data-bs-dismiss="modal" aria-label="Close"></button>

                            <div>

                                <div className="dropdown">
                                    <Link className="icon text-muted" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                                    </Link>

                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center" to="#">
                                                Download
                                                <div className="icon ms-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download-cloud"><polyline points="8 17 12 21 16 17"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path></svg>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center" to="#">
                                                Share
                                                <div className="icon ms-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                                                </div>
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link className="dropdown-item d-flex align-items-center text-danger" to="#">
                                                <span className="me-auto">Delete</span>
                                                <div className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>



                        <div className="modal-body p-0">
                            <div className="d-flex align-items-center justify-content-center h-100">
                                <img className="img-fluid modal-preview-url" src={findMedia?.image} alt="#" />
                            </div>
                        </div>



                        <div className="modal-footer">
                            <div className="w-100 text-center">
                                <h6><Link to="#">{findMedia?.senderName}</Link></h6>
                                <p className="small">{findMedia?.date} at {findMedia?.time}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    );
}


