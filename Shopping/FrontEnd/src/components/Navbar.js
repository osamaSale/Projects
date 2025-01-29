import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom"
import { logout } from "../redux/slice/slice"
import { Modals } from './Modals';
import { searchProducts } from '../redux/api/products';
export const Navbar = ({ update }) => {
    const { user, products , loading} = useSelector((store) => store.data)
    const [selectedBrand, setSelectedBrand] = useState("")
    const brand = (products || []).filter((b) => b.brand === selectedBrand)
    const [search, setSearch] = useState("")
    const [loginShow, setLoginShow] = useState(false)
    const [mode, setMode] = useState('light')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();

    const checkMode = () => {
        let element = document.body
        element.dataset.bsTheme = element.dataset.bsTheme === "light" ? "dark" : "light"
        setMode(element.dataset.bsTheme)
    }
    if (location.pathname === "/admin") { return }
    return (
        <>
            {loading ? null :
                <header className="border-bottom">
                    <div className="container-fluid">
                        <div className="row align-items-center pt-6 pb-4 mt-4 mt-lg-0">
                            <div className="col-xl-2 col-md-3 mb-4 mb-md-0 col-12 text-center text-md-start">
                                <img src="./assets/images/logo/storemobilelogo.svg" alt="eCommerce HTML Template" />
                            </div>
                            <div className="col-xxl-6 col-xl-5 col-lg-6 col-md-9">
                                <div className="input-group">
                                    <input className="form-control border" type="search" placeholder="Search for products"
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyUp={() => {
                                            if (search === "") {
                                                update();
                                            } else {
                                                dispatch(searchProducts(search))
                                            }
                                        }} />
                                    <button className="btn btn-primary" type="button">Search</button>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-5 col-lg-3 d-none d-lg-block">
                                <div className="d-flex align-items-center justify-content-between ms-4">
                                    <div className="text-center ">
                                        <Link className="text-reset" onClick={checkMode} >
                                            <div className="lh-1">
                                                <div className="mb-2">
                                                    {mode === 'dark' ?
                                                        <div>
                                                            <i className="bi bi-brightness-high fs-4"></i>
                                                        </div> :
                                                        <div>
                                                            <i className="bi bi-moon fs-4"></i>
                                                        </div>
                                                    }
                                                </div>
                                                <p className="mb-0 d-none d-xl-block small">{mode === "light" ? "Dark" : "Light"}</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="text-center ms-5">
                                        <Link className="text-reset" to={'/orders'}>

                                            <div className="lh-1">
                                                <div className="mb-2">
                                                    <i className="bi bi-archive fs-4"></i>
                                                </div>

                                                <p className="mb-0 d-none d-xl-block small">My Orders</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="text-center ms-5">

                                        <Link data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" to="#offcanvasExample"
                                            role="button" aria-controls="offcanvasRight" className=" position-relative text-reset">

                                            <div className="lh-1">
                                                <div className="mb-2">
                                                    <i className="bi bi-cart2 fs-4"></i>
                                                </div>
                                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {user && user.carts && user.carts.length > 0 ? user.carts.length : 0}

                                                </span>
                                                <p className="mb-0 d-none d-xl-block small">Shopping Cart</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="text-center ms-5">
                                        <Link role="button" className="text-reset" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" to="#offcanvasExample1"
                                            aria-controls="offcanvasRight" >
                                            <div className="lh-1">
                                                <div className="mb-2">
                                                    <i className="bi bi-bookmark-heart fs-4"></i>
                                                </div>
                                                <p className="mb-0 d-none d-xl-block small">Wishlist</p>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="text-center ">
                                        {user &&
                                            <>
                                                <button className="btn text-reset " data-bs-toggle="dropdown" aria-expanded="false">
                                                    <div className="lh-1">
                                                        <div className="mb-2">
                                                            <img src={user && user.image} alt='' className="rounded-circle" width={30} height={25} />
                                                        </div>
                                                        <p className="mb-0 d-none d-xl-block small">{user.name}</p>
                                                        <div className="dropdown-menu dropdown-menu-end p-0">
                                                            <div className="lh-1 px-5 py-4 border-bottom">
                                                                <h5 className="mb-1 h6">Store Mobile</h5>
                                                                <small>{user && user.email}</small>
                                                            </div>
                                                            <ul className="list-unstyled px-2 py-3" >
                                                                <li>
                                                                    <Link className="dropdown-item" onClick={() => navigate('/orders')}>
                                                                        <i className="bi bi-bag-dash me-2"></i>  Orders
                                                                    </Link>
                                                                </li>

                                                                <li>
                                                                    <Link className="dropdown-item" onClick={() => navigate('/setting')}>
                                                                        <i className="bi bi-gear me-2"></i> Settings
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="dropdown-item" onClick={() => navigate('/payment')}>
                                                                        <i className="bi bi-credit-card me-2"></i>  Payment
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                            <div className="border-top px-5 py-3">

                                                                <Link onClick={() => {
                                                                    if (window.confirm("Do you want to Exit")) {
                                                                        dispatch(logout())
                                                                        navigate('/')
                                                                    }
                                                                }}>
                                                                    <i className="bi bi-box-arrow-right me-2"></i>Log Out</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </>
                                        }
                                        {!user &&
                                            <>
                                                <button className="btn text-reset" onClick={() => setLoginShow(true)} >
                                                    <div className="lh-1">
                                                        <div className="mb-2">
                                                            <i className="bi bi-person-circle fs-4"></i>
                                                        </div>
                                                        <p className="mb-0 d-none d-xl-block small">Sign up</p>
                                                    </div>
                                                </button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="navbar navbar-expand-lg navbar-light navbar-default p-0 p-sm-0 navbar-offcanvas-color" aria-label="Offcanvas navbar large">
                        <div className="container-fluid">
                            <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbar-default" aria-labelledby="navbar-defaultLabel">
                                <div className="offcanvas-header pb-1">
                                    <Link to="/">
                                        <img src="./assets/images/logo/storemobilelogo.svg" alt="eCommerce HTML Template" />
                                    </Link>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav align-items-center ">
                                        <li className="dropdown me-6 d-none d-lg-block">
                                            <Link to="#" className="text-inherit" data-bs-toggle="dropdown" aria-expanded="false">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                    className="bi bi-text-left me-2" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd"
                                                        d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z">
                                                    </path>
                                                </svg>
                                                Brands
                                            </Link>
                                            <ul className="dropdown-menu dropdown-menu-lg">
                                                <li className="dropdown-menu-list">

                                                    <Link className="dropdown-item d-flex justify-content-between mb-1 py-1"
                                                        onMouseEnter={() => setSelectedBrand("Apple")}
                                                        onMouseLeave={() => setSelectedBrand("Apple")}>
                                                        <span className="d-flex align-items-center">
                                                            <img src='assets/images/brands/apple.svg' alt='' />
                                                            <span className="ms-2">Apple</span>
                                                        </span><i className="fa fa-arrow-right"></i>
                                                    </Link>


                                                    <div className="dropdown-menu-list-submenu">
                                                        <div>
                                                            <ul className="list-unstyled">
                                                                {brand && brand.map((row) => {
                                                                    return <li key={row.id}>
                                                                        <Link to={`/shop-single/${row.id}`} className="dropdown-item" key={row.id}>{row.name} &amp; {row.device}</Link>
                                                                    </li>
                                                                })}

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="dropdown-menu-list">

                                                    <Link className="dropdown-item d-flex justify-content-between mb-1 py-1"
                                                        onMouseEnter={() => setSelectedBrand("Samsung")}
                                                        onMouseLeave={() => setSelectedBrand("Samsung")}>
                                                        <span className="d-flex align-items-center">
                                                            <img src='assets/images/brands/samsung.svg' alt='' />
                                                            <span className="ms-2">Samsung</span>
                                                        </span><i className="fa fa-arrow-right"></i>
                                                    </Link>


                                                    <div className="dropdown-menu-list-submenu">
                                                        <div>
                                                            <ul className="list-unstyled">
                                                                {brand && brand.map((row) => {
                                                                    return <li key={row.id}>
                                                                        <Link to={`/shop-single/${row.id}`} className="dropdown-item" key={row.id}>{row.name} &amp; {row.device}</Link>
                                                                    </li>
                                                                })}

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="dropdown-menu-list">

                                                    <Link className="dropdown-item d-flex justify-content-between mb-1 py-1"
                                                        onMouseEnter={() => setSelectedBrand("Huawei")}
                                                        onMouseLeave={() => setSelectedBrand("Huawei")}>
                                                        <span className="d-flex align-items-center">
                                                            <img src='assets/images/brands/huawei.svg' alt='' />
                                                            <span className="ms-2">Huawei</span>
                                                        </span><i className="fa fa-arrow-right"></i>
                                                    </Link>


                                                    <div className="dropdown-menu-list-submenu">
                                                        <div>
                                                            <ul className="list-unstyled">
                                                                {brand && brand.map((row) => {
                                                                    return <li key={row.id}>
                                                                        <Link to={`/shop-single/${row.id}`} className="dropdown-item" key={row.id}>{row.name} &amp; {row.device}</Link>
                                                                    </li>
                                                                })}

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="dropdown-menu-list">

                                                    <Link className="dropdown-item d-flex justify-content-between mb-1 py-1"
                                                        onMouseEnter={() => setSelectedBrand("Infinix")}
                                                        onMouseLeave={() => setSelectedBrand("Infinix")}>
                                                        <span className="d-flex align-items-center">
                                                            <img src='assets/images/brands/infinix.svg' alt='' />
                                                            <span className="ms-2">Infinix</span>
                                                        </span><i className="fa fa-arrow-right"></i>
                                                    </Link>


                                                    <div className="dropdown-menu-list-submenu">
                                                        <div>
                                                            <ul className="list-unstyled">
                                                                {brand && brand.map((row) => {
                                                                    return <li key={row.id}>
                                                                        <Link to={`/shop-single/${row.id}`} className="dropdown-item" key={row.id}>{row.name} &amp; {row.device}</Link>
                                                                    </li>
                                                                })}

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="dropdown-menu-list">

                                                    <Link className="dropdown-item d-flex justify-content-between mb-1 py-1"
                                                        onMouseEnter={() => setSelectedBrand("Vivo")}
                                                        onMouseLeave={() => setSelectedBrand("Vivo")}>
                                                        <span className="d-flex align-items-center">
                                                            <img src='assets/images/brands/vivo.svg' alt='' />
                                                            <span className="ms-2">Vivo</span>
                                                        </span><i className="fa fa-arrow-right"></i>
                                                    </Link>


                                                    <div className="dropdown-menu-list-submenu">
                                                        <div>
                                                            <ul className="list-unstyled">
                                                                {brand && brand.map((row) => {
                                                                    return <li key={row.id}>
                                                                        <Link to={`/shop-single/${row.id}`} className="dropdown-item" key={row.id}>{row.name} &amp; {row.device}</Link>
                                                                    </li>
                                                                })}

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="dropdown-menu-list">

                                                    <Link className="dropdown-item d-flex justify-content-between mb-1 py-1"
                                                        onMouseEnter={() => setSelectedBrand("Honor")}
                                                        onMouseLeave={() => setSelectedBrand("Honor")}>
                                                        <span className="d-flex align-items-center">
                                                            <img src='assets/images/brands/honor.svg' alt='' />
                                                            <span className="ms-2">Honor</span>
                                                        </span><i className="fa fa-arrow-right"></i>
                                                    </Link>


                                                    <div className="dropdown-menu-list-submenu">
                                                        <div>
                                                            <ul className="list-unstyled">
                                                                {brand && brand.map((row) => {
                                                                    return <li key={row.id}>
                                                                        <Link to={`/shop-single/${row.id}`} className="dropdown-item" key={row.id}>{row.name} &amp; {row.device}</Link>
                                                                    </li>
                                                                })}

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="dropdown-menu-list">

                                                    <Link className="dropdown-item d-flex justify-content-between mb-1 py-1"
                                                        onMouseEnter={() => setSelectedBrand("Nokia")}
                                                        onMouseLeave={() => setSelectedBrand("Nokia")}>
                                                        <span className="d-flex align-items-center">
                                                            <img src='assets/images/brands/nokia.svg' alt='' />
                                                            <span className="ms-2">Nokia</span>
                                                        </span><i className="fa fa-arrow-right"></i>
                                                    </Link>


                                                    <div className="dropdown-menu-list-submenu">
                                                        <div>
                                                            <ul className="list-unstyled">
                                                                {brand && brand.map((row) => {
                                                                    return <li key={row.id}>
                                                                        <Link to={`/shop-single/${row.id}`} className="dropdown-item" key={row.id}>{row.name} &amp; {row.device}</Link>
                                                                    </li>
                                                                })}

                                                            </ul>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                        </li>
                                        <li className="nav-item">

                                            <Link className="nav-link " to="/" >
                                                <button className="nav-link  border-bottom-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                    Home
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/about" data-bs-dismiss="offcanvas" aria-label="Close">
                                                <button className="nav-link  border-bottom-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                    About Us
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link " to="/contact">
                                                <button className="nav-link  border-bottom-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                    Contact Us
                                                </button>
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <Link className="nav-link dropdown-toggle border-bottom-0 pb-3" to="#" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Shop

                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item" to="/shop">
                                                        <button className="nav-link border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                            Shop
                                                        </button>
                                                    </Link>
                                                </li>
                                                <li><Link className="dropdown-item" to="/shop-wide">
                                                    <button className="nav-link border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                        Shop Wide
                                                    </button>
                                                </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/shop-single/2">
                                                        <button className="nav-link border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                            Shop Single
                                                        </button>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/wishlist">
                                                        <button className="nav-link border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                            Shop Wishlist
                                                        </button>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/carts">
                                                        <button className="nav-link border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                            Shop Cart
                                                        </button>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item">
                                                        <button className="nav-link border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                            Shop Checkout
                                                        </button>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>


                                        <li className="nav-item dropdown w-100 w-lg-auto">
                                            <Link className="nav-link dropdown-toggle  border-bottom-0 pb-3" to="#" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Account
                                            </Link>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item" to="/login">
                                                        <button className="nav-link border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                            Login
                                                        </button>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="./register">
                                                        <button className="nav-link border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                            Register
                                                        </button>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link  border-bottom-0" to="/admin">
                                                <button className="nav-link border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                                                    Dashboard
                                                </button>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <Modals mode={mode} checkMode={checkMode} loginShow={loginShow} setLoginShow={setLoginShow} update={update} />
                </header >
            }
        </>
    );
}

