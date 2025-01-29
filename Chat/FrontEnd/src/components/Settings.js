import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteUser, editUser, getAllUsers } from '../redux/api/users';
import { Error } from './Error';
import { logout } from '../redux/slice/slice';

export const Settings = ({ update }) => {
    const { user, loading } = useSelector(store => store.data)
    const [name, setName] = useState(user ? user.name : "")
    const [email, setEmail] = useState(user ? user.email : "")
    const [phone, setPhone] = useState(user ? user.phone : "")
    const [bio, setBio] = useState(user ? user.bio : "")
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours %= 12;
        hours = hours || 12;
        minutes = minutes < 10 ? `0${minutes}` : minutes;

        const strTime = `${hours}:${minutes} ${ampm}`;

        return strTime;
    };
    function getBrowser() {
        if (navigator.userAgent.indexOf("Chrome") !== -1) {
            return "Chrome";
        } else if (navigator.userAgent.indexOf("Opera") !== -1) {
            return "Opera";
        } else if (navigator.userAgent.indexOf("MSIE") !== -1) {
            return "IE";
        } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
            return "Firefox";
        } else {
            return "unknown";
        }
    }
    const dispatch = useDispatch()
    const handleSubmit = () => {
        const fromData = new FormData();
        fromData.append("id", user.id);
        fromData.append("name", name);
        fromData.append("email", email);
        fromData.append("phone", phone);
        fromData.append("bio", bio);
        if (image) {
            fromData.append("image", image, image.name);
        }
        dispatch(editUser(fromData))
            .then((res) => {
                const { status } = res.payload
                if (status === 200) {
                    dispatch(getAllUsers())
                    update()
                }

            })
    }
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
                        <div className="tab-pane fade h-100 show active" id="tab-content-settings" role="tabpanel">
                            <div className="d-flex flex-column h-100">
                                <div className="hide-scrollbar">
                                    <div className="container py-8">

                                        <div className="mb-8">
                                            <h2 className="fw-bold m-0">Settings</h2>
                                        </div>
                                        <div className="card border-0">
                                            <div className="card-body">
                                                <div className="row align-items-center gx-5">
                                                    <div className="col-auto">
                                                        <div className="avatar">
                                                            <img src={user && user.image} alt="#" className="avatar-img" />

                                                            <div className="badge badge-circle bg-secondary border-outline position-absolute bottom-0 end-0">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                            </div>
                                                            <input id="upload-profile-photo" className="d-none" type="file" onChange={(e) => setImage(e.target.files[0])} />
                                                            <label className="stretched-label mb-0" htmlFor="upload-profile-photo"></label>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <h5>{user && user.name}</h5>
                                                        <p>{`${user && user.email}`.slice(0, 14)}..</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <Link className="text-muted" onClick={handleSubmit}>
                                                            <div className="icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="d-flex align-items-center mb-4 px-6">
                                                <small className="text-muted me-auto">Account</small>
                                            </div>

                                            <div className="card border-0">
                                                <div className="card-body py-2">

                                                    <div className="accordion accordion-flush" id="accordion-profile">
                                                        <div className="accordion-item">
                                                            <div className="accordion-header" id="accordion-profile-1">
                                                                <Link to="#" className="accordion-button text-reset collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-profile-body-1" aria-expanded="false" aria-controls="accordion-profile-body-1">
                                                                    <div>
                                                                        <h5>Profile settings</h5>
                                                                        <p>Change your profile settings</p>
                                                                    </div>
                                                                </Link>
                                                            </div>

                                                            <div id="accordion-profile-body-1" className="accordion-collapse collapse" aria-labelledby="accordion-profile-1" data-parent="#accordion-profile">
                                                                <div className="accordion-body">
                                                                    <div className="form-floating mb-6">
                                                                        <input type="text" className="form-control" name='name' placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} />
                                                                        <label htmlFor="profile-name">Name</label>
                                                                    </div>

                                                                    <div className="form-floating mb-6">
                                                                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email && email} />
                                                                        <label htmlFor="profile-email">Email</label>
                                                                    </div>

                                                                    <div className="form-floating mb-6">
                                                                        <input type="text" className="form-control" name="phone" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={phone} />
                                                                        <label htmlFor="profile-phone">Phone</label>
                                                                    </div>

                                                                    <div className="form-floating mb-6">
                                                                        <textarea className="form-control" placeholder="Bio" name="profile-bio" data-autosize="true" style={{ minHeight: "120px" }}
                                                                            onChange={(e) => setBio(e.target.value)} value={user ? bio : ""}></textarea>
                                                                        <label htmlFor="profile-bio">Bio</label>
                                                                    </div>

                                                                    <button type="button" className="btn btn-block btn-lg btn-primary w-100"
                                                                        onClick={handleSubmit}
                                                                    >Save</button>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="d-flex align-items-center my-4 px-6">
                                                <small className="text-muted me-auto">Security</small>
                                            </div>

                                            <div className="card border-0">
                                                <div className="card-body py-2">

                                                    <div className="accordion accordion-flush" id="accordion-security">
                                                        <div className="accordion-item">
                                                            <div className="accordion-header" id="accordion-security-1">
                                                                <Link to="#" className="accordion-button text-reset collapsed" data-bs-toggle="collapse" data-bs-target="#accordion-security-body-1" aria-expanded="false" aria-controls="accordion-security-body-1">
                                                                    <div>
                                                                        <h5>Password</h5>
                                                                        <p>Change your password</p>
                                                                    </div>
                                                                </Link>
                                                            </div>

                                                            <div id="accordion-security-body-1" className="accordion-collapse collapse" aria-labelledby="accordion-security-1" data-parent="#accordion-security">
                                                                <div className="accordion-body">
                                                                    <form action="#" autoComplete="on">
                                                                        <div className="form-floating mb-6">
                                                                            <input type="password" className="form-control" placeholder="Current Password" autoComplete="" />
                                                                            <label htmlFor="profile-current-password">Current Password</label>
                                                                        </div>

                                                                        <div className="form-floating mb-6">
                                                                            <input type="password" className="form-control" placeholder="New password" autoComplete="" />
                                                                            <label htmlFor="profile-new-password">New password</label>
                                                                        </div>

                                                                        <div className="form-floating mb-6">
                                                                            <input type="password" className="form-control" placeholder="Verify Password" autoComplete="" />
                                                                            <label htmlFor="profile-verify-password">Verify Password</label>
                                                                        </div>
                                                                    </form>
                                                                    <button type="button" className="btn btn-block btn-lg btn-primary w-100">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="mt-8">
                                            <div className="d-flex align-items-center my-4 px-6">
                                                <small className="text-muted me-auto">Devices</small>

                                                <div className="flex align-items-center text-muted">
                                                    <Link to="#" className="text-muted small">End all sessions</Link>

                                                    <div className="icon icon-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card border-0">
                                                <div className="card-body py-3">

                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item">
                                                            <div className="row align-items-center">
                                                                <div className="col">
                                                                    <h5>Windows</h5>
                                                                    <p>Today at {formatAMPM(new Date())} ⋅ Browser: {getBrowser()}</p>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <span className="text-primary extra-small">active</span>
                                                                </div>
                                                            </div>
                                                        </li>

                                                    </ul>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="mt-8">
                                            <div className="d-flex align-items-center my-4 px-6">
                                                <small className="text-muted me-auto">Delete Account</small>

                                                <div className="flex align-items-center text-muted">
                                                    <Link to="#" className="text-muted small">End all sessions</Link>

                                                    <div className="icon icon-xs">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card border-0">
                                                <div className="card-body py-1">

                                                    <ul className="list-group list-group-flush">
                                                        <li className="list-group-item">
                                                            <div className="row align-items-center p-2">
                                                                <button className='btn btn-danger btn-sm'
                                                                    onClick={() => {
                                                                        if (window.confirm("Are you sure you want to delete Account ?")) {
                                                                            dispatch(deleteUser(user.id)).then(() => {
                                                                                dispatch(getAllUsers())
                                                                                dispatch(logout())
                                                                                navigate('/')
                                                                            })
                                                                        }
                                                                    }}
                                                                >
                                                                    Delete Account
                                                                </button>
                                                            </div>
                                                        </li>

                                                    </ul>

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
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

