import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
export const Footer = () => {
    const { loading } = useSelector((store) => store.data)
    const location = useLocation();
    if (location.pathname === "/admin") { return }
    return (
        <>
            {loading ? null :
                <footer className=" mt-5 border-top">
                    <div className="p-3">
                        <div className="container-fluid text-center text-md-start pt-4 pb-4">
                            <div className="row mt-8 mb-8">
                                <div className="col-12 col-lg-3 col-sm-12 mb-4">
                                    <Link target="_blank" className="">
                                        <img src="assets/images/logo/storemobilelogo.svg" height="35" alt='' />
                                    </Link>
                                    <p className="mt-3">
                                        © 2023 Copyright: MDBootstrap.com
                                    </p>
                                    <div>
                                        <i className="fab fa-lg fa-cc-visa me-2"></i>
                                        <i className="fab fa-lg fa-cc-amex me-2"></i>
                                        <i className="fab fa-lg fa-cc-mastercard me-2"></i>
                                        <i className="fab fa-lg fa-cc-paypal me-2"></i>
                                    </div>
                                </div>
                                <div className="col">
                                    <h6 className="text-uppercase fw-bold mb-2">
                                        Store
                                    </h6>
                                    <ul className="list-unstyled mb-4">
                                        <li><Link className="nav-link " to="#">About us</Link></li>
                                        <li><Link className="nav-link " to="#">Find store</Link></li>
                                        <li><Link className="nav-link " to="#">Categories</Link></li>
                                        <li><Link className="nav-link " to="#">Blogs</Link></li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <h6 className="text-uppercase fw-bold mb-2">
                                        Information
                                    </h6>
                                    <ul className="list-unstyled mb-4">
                                        <li><Link className="nav-link " to="#">Help center</Link></li>
                                        <li><Link className="nav-link " to="#">Money refund</Link></li>
                                        <li><Link className="nav-link " to="#">Shipping info</Link></li>
                                        <li><Link className="nav-link " to="#">Refunds</Link></li>
                                    </ul>
                                </div>
                                <div className="col-12 col-sm-12 col-lg-3">
                                    <h6 className="text-uppercase fw-bold mb-2">Newsletter</h6>
                                    <p>Stay in touch with latest updates about our products and offers</p>
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control border" placeholder="Email" aria-label="Email"
                                            aria-describedby="button-addon2" />
                                        <button className="btn btn-danger  shadow-0" type="button">
                                            Join
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </footer>
            }
        </>
    );
}

