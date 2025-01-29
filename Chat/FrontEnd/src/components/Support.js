import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Error } from './Error';
export const Support = () => {
    const { user, loading } = useSelector((store) => store.data)
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
                        <div className="tab-pane fade h-100 show active" >
                            <div className="d-flex flex-column h-100">
                                <div className="hide-scrollbar">
                                    <div className="container py-8">
                                        <div className="mb-8">
                                            <h2 className="fw-bold m-0">Support</h2>
                                        </div>
                                        <div className="card-list mt-8">
                                            <div className="d-flex align-items-center mb-4 px-6">
                                                <small className="text-muted me-auto">Pages</small>
                                            </div>

                                            <div className="card border-0">
                                                <div className="card-body">
                                                    <div className="row align-items-center gx-0">
                                                        <div className="col">
                                                            <h4 className="mb-1">Sign In</h4>
                                                            <p>Sign in Page</p>
                                                        </div>
                                                        <div className="col-auto">
                                                            <Link to="/" className="btn btn-sm btn-icon btn-primary rounded-circle">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card border-0">
                                                <div className="card-body">
                                                    <div className="row align-items-center gx-0">
                                                        <div className="col">
                                                            <h4 className="mb-1">Sign Up</h4>
                                                            <p>Sign Up Page</p>
                                                        </div>
                                                        <div className="col-auto">
                                                            <Link to="/signup" className="btn btn-sm btn-icon btn-primary rounded-circle">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="card border-0">
                                                <div className="card-body">
                                                    <div className="row align-items-center gx-0">
                                                        <div className="col">
                                                            <h4 className="mb-1">Password Reset</h4>
                                                            <p>Password Reset Page</p>
                                                        </div>
                                                        <div className="col-auto">
                                                            <Link to="/passwordReset" className="btn btn-sm btn-icon btn-primary rounded-circle">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                            </Link>
                                                        </div>
                                                    </div>
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

