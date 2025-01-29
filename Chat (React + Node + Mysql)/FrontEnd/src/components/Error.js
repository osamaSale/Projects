import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

export const Error = () => {
    const { loading, user } = useSelector(store => store.data)
    const location = useLocation();
    if (loading) {
        return <div className="container-fluid">
            <div className="row align-items-center justify-content-center min-vh-100 gx-0">
                <div className="spinner-border spinner-border me-5" role="status" >
                </div> Please wait...
            </div>
        </div>
    }
    return (
        <section>
            {location.pathname === "/signup" || location.pathname === "/passwordReset" || location.pathname === "/verifyPassword" || location.pathname === "/" || user ?
                <div className="container">
                    <div className="row align-items-center justify-content-center min-vh-100 gx-0">
                        <div className="col-12 col-md-5 col-lg-4">

                            <div className="mb-6 mb-lg-0">
                                <h1>Something’s wrong here...</h1>
                                <p className="mb-8">
                                    We can’t find the page you’re looking for.
                                    <br />
                                    Check out our help center or head back to home.
                                </p>

                                <Link to="/chat" className="btn btn-primary ms-2">Back to Chat</Link>


                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-4">
                            <div>

                                <img src="https://freshcart.codescandy.com/assets/images/svg-graphics/error.svg" alt="" className="img-fluid" />
                            </div>
                        </div>


                    </div>
                </div> :
                <div className="container">
                    <div className="row align-items-center justify-content-center min-vh-100 gx-0">
                        <div className="col-12 col-md-5 col-lg-4">

                            <div className="mb-6 mb-lg-0">
                                <h1>Something’s wrong here...</h1>
                                <p className="mb-8">
                                    We can’t find the page you’re looking for.
                                    <br />
                                    Check out our help center or head back to home.
                                </p>

                                <Link to="/" className="btn btn-primary ms-2">Back to Signin</Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-4">
                            <div>

                                <img src="https://freshcart.codescandy.com/assets/images/svg-graphics/error.svg" alt="" className="img-fluid" />
                            </div>
                        </div>


                    </div>
                </div>
            }
        </section>
    );
}

