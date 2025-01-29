import React from 'react';
import { Link } from 'react-router-dom';
export const NavbarVertical = ({ toggleState, settoggleState }) => {
    return (
        <div>
            <nav className="navbar-vertical-nav d-none d-xl-block">
                <div className="navbar-vertical border-end">
                    <div className="px-4 py-5">
                        <Link className="navbar-brand">
                            <img src="assets/images/logo/storemobilelogo.svg" alt="" />
                        </Link>
                    </div>
                    <div className="navbar-vertical-content flex-grow-1 navbarvertical" >
                        <ul className="navbar-nav flex-column" id="sideNavbar">
                            <li className="nav-item ">
                                <Link className={toggleState === 1 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(1)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-house"></i></span>
                                        <span className="nav-link-text">Dashboard</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item mt-6 mb-3">
                                <span className="nav-label">Store Managements</span>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 2 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(2)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"><i className="bi bi-people-fill"></i></span>
                                        <span className="nav-link-text">Users</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 3 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(3)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"><i className="fa-brands fa-product-hunt"></i></span>
                                        <span className="nav-link-text">Brands</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 4 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(4)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"><i className="fa-solid fa-laptop"></i></span>
                                        <span className="nav-link-text">Devices</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 5 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(5)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-cart"></i></span>
                                        <span className="nav-link-text">Products</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 6 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(6)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-person-lines-fill"></i></span>
                                        <span className="nav-link-text">Contact Us</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 7 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(7)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-newspaper"></i></span>
                                        <span className="nav-link-text">News</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 8 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(8)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-bookmark-heart"></i></span>
                                        <span className="nav-link-text">wishlist</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 9 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(9)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-cart2"></i></span>
                                        <span className="nav-link-text">Carts</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 10 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(10)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-archive"></i></span>
                                        <span className="nav-link-text">Orders</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 11 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(11)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-chat-left-text-fill"></i></span>
                                        <span className="nav-link-text">Comments</span>
                                    </div>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
             {/* Mobile */}
            <nav className="navbar-vertical-nav offcanvas offcanvas-start navbar-offcanvac" tabIndex="-1" id="offcanvasExample">
                <div className="navbar-vertical">
                    <div className="px-4 py-5 d-flex justify-content-between align-items-center">
                        <Link to="../index.html" className="navbar-brand">
                            <img src="assets/images/logo/freshcart-logo.svg" alt="" />
                        </Link>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="navbar-vertical-content flex-grow-1" data-simplebar="">
                        <ul className="navbar-nav flex-column">
                            <li className="nav-item ">
                                <Link className={toggleState === 1 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(1)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-house"></i></span>
                                        <span className="nav-link-text">Dashboard</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item mt-6 mb-3">
                                <span className="nav-label">Store Managements</span>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 2 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(2)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"><i className="bi bi-people-fill"></i></span>
                                        <span className="nav-link-text">Users</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 3 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(3)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"><i className="fa-brands fa-product-hunt"></i></span>
                                        <span className="nav-link-text">Brands</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 4 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(4)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"><i className="fa-solid fa-laptop"></i></span>
                                        <span className="nav-link-text">Devices</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 5 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(5)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-cart"></i></span>
                                        <span className="nav-link-text">Products</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 6 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(6)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-person-lines-fill"></i></span>
                                        <span className="nav-link-text">Contact Us</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 7 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(7)}>
                                    <div className="d-flex align-items-center">

                                        <span className="nav-link-icon"> <i className="bi bi-newspaper"></i></span>
                                        <span className="nav-link-text">News</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 8 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(8)}>
                                    <div className="d-flex align-items-center">

                                        <span className="nav-link-icon"> <i className="bi bi-bookmark-heart"></i></span>
                                        <span className="nav-link-text">wishlist</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 9 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(9)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-cart2"></i></span>
                                        <span className="nav-link-text">Carts</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 10 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(10)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-archive"></i></span>
                                        <span className="nav-link-text">Orders</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item ">
                                <Link className={toggleState === 11 ? "nav-link active" : "nav-link"} onClick={() => settoggleState(11)}>
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-icon"> <i className="bi bi-chat-left-text-fill"></i></span>
                                        <span className="nav-link-text">Comments</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </nav>
        </div>
    );
}

