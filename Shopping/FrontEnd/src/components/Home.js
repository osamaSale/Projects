import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom"
import { NewArrivals, BestSellingProducts } from './Shop/ShopCard';
import { useSelector } from 'react-redux';
import { Loading } from './Loading';

export const Home = ({ update }) => {
    const { products, loading } = useSelector((store) => store.data)
    const [selectedBrand, setSelectedBrand] = useState("")
    const brand = (products || []).filter((b) => b.brand === selectedBrand)
    return (

        <>
            {loading ? <Loading /> :
                <div>
                    <section className="mt-lg-12 mb-lg-14 mb-8 mt-8">
                        <div className="container-fluid">
                            <Carousel showThumbs={false}
                                infiniteLoop
                                showStatus
                                autoPlay >
                                <div style={{ background: 'url(assets/images/slider/slider-1.jpg)no-repeat', backgroundSize: "cover", borderRadius: ".5rem", backgroundPosition: "center", textAlign: "left", height: "550px" }}>
                                    <div className="ps-lg-12 py-lg-16 col-xxl-5 col-lg-7 col-md-8 py-14 px-8 text-xs-cente r">
                                        <span className="badge text-bg-warning mb-3" >Opening Sale Discount 50%</span>
                                        <h1 className="text-dark display-5 fw-bold mt-4"> Galaxy Watch6 | <br></br>
                                            Watch6 Classic </h1>
                                        <p className="lead text-secondary">Buy the new Galaxy Watch6 now and get 3x rewards
                                            & you’re guaranteed happiness before you doze!
                                        </p>
                                        <Link to="#!" className="btn btn-dark mt-3">Shop Now <i
                                            className="feather-icon icon-arrow-right ms-1"></i></Link>
                                    </div>
                                </div>

                                <div style={{ background: 'url(assets/images/slider/slider-2.jpg)no-repeat', backgroundSize: "cover", borderRadius: ".5rem", backgroundPosition: "center", textAlign: "left", height: "550px" }}>
                                    <div className="ps-lg-12 py-lg-16 col-xxl-5 col-lg-7  col-md-8 py-14 px-8 text-xs-center">
                                        <span className="badge text-bg-warning mb-3" >Opening Sale Discount 50%</span>
                                        <h1 className=" display-5 fw-bold mt-4 text-dark">Galaxy Z Fold5<br />
                                            Discount up to <span className="text-primary display-6">50%</span></h1>
                                        <p className="lead ">
                                            Buy now and get a 50-inch Crystal UHD 4K Smart TV CU7000
                                        </p>

                                    </div>
                                </div>

                                <div style={{ background: 'url(assets/images/slider/slider-3.jpg)no-repeat', backgroundSize: "cover", borderRadius: ".5rem", backgroundPosition: "center", textAlign: "left", height: "550px" }}>
                                    <div className="ps-lg-12 py-lg-16 col-xxl-5 col-lg-7  col-md-8 py-14 px-8 text-xs-center">
                                        <span className="badge text-bg-warning mb-3" >Opening Sale Discount 50%</span>
                                        <h1 className=" display-5 fw-bold mt-4 text-dark">Galaxy Tab<br></br> S9 Series</h1>
                                        <p className="lead ">Buy now and get an instant voucher worth up to 175 JOD and 3x rewards
                                        </p>
                                        <Link to="#!" className="btn btn-dark mt-3">Shop Now <i
                                            className="feather-icon icon-arrow-right ms-1"></i></Link>
                                    </div>

                                </div>
                            </Carousel>
                        </div>
                    </section>
                    <section className="mt-lg-12 mb-lg-14 mb-8 mt-8">
                        <div className="container-fluid">
                            <div className="row ">
                                <aside className="col-xl-3 col-lg-4 col-md-4 mb-6 mb-md-0">
                                    <div id="sidebar">
                                        <div className="sidebar__inner">
                                            <div className="offcanvas offcanvas-start offcanvas-collapse" tabIndex="-1"
                                                id="offcanvasCategory" aria-labelledby="offcanvasCategoryLabel">

                                                <div className="offcanvas-body p-lg-0 ">
                                                    <div className="mb-4">
                                                        <h3 className="mb-4 h5">Brands</h3>
                                                        <div className="card">
                                                            <ul className="nav nav-category" id="categoryCollapseMenu">
                                                                <li className="nav-item border-bottom w-100 collapsed px-4 py-1">
                                                                    <Link className="nav-link" data-bs-toggle="collapse"
                                                                        data-bs-target="#categoryFlushOne" aria-expanded="false"
                                                                        aria-controls="categoryFlushOne" onClick={() => setSelectedBrand("Apple")}>
                                                                        <span className="d-flex align-items-center">
                                                                            <img src='assets/images/brands/apple.svg' alt='' />
                                                                            <span className="ms-2">Apple</span>
                                                                        </span><i className="fa fa-arrow-right"></i>
                                                                    </Link>

                                                                    <div id="categoryFlushOne" className="accordion-collapse collapse" data-bs-parent="#categoryCollapseMenu">
                                                                        <div>
                                                                            <ul className="nav flex-column ms-8">

                                                                                {brand && brand.map((row) => {
                                                                                    return <li key={row.id} className="nav-item"><Link className="nav-link" to={`/shop-single/${row.id}`}>{row.name}</Link>
                                                                                    </li>
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </div>

                                                                </li>

                                                                <li className="nav-item border-bottom w-100 collapsed px-4 py-1">
                                                                    <Link
                                                                        className="nav-link" data-bs-toggle="collapse"
                                                                        data-bs-target="#flush-collapseTwo" aria-expanded="false"
                                                                        aria-controls="flush-collapseTwo" onClick={() => setSelectedBrand("Samsung")}>
                                                                        <span className="d-flex align-items-center">
                                                                            <img src='assets/images/brands/samsung.svg' alt='' />
                                                                            <span className="ms-2">Samsung</span>
                                                                        </span>
                                                                        <i className="fa fa-arrow-right"></i>
                                                                    </Link>

                                                                    <div id="flush-collapseTwo" className="accordion-collapse collapse"
                                                                        data-bs-parent="#categoryCollapseMenu">
                                                                        <div>
                                                                            <ul className="nav flex-column ms-8">

                                                                                {brand && brand.map((row) => {
                                                                                    return <li key={row.id} className="nav-item"><Link className="nav-link" to={`/shop-single/${row.id}`}>{row.name}</Link>
                                                                                    </li>
                                                                                })}
                                                                            </ul>


                                                                        </div>
                                                                    </div>

                                                                </li>
                                                                <li className="nav-item border-bottom w-100 collapsed px-4 py-1">
                                                                    <Link className="nav-link" data-bs-toggle="collapse"
                                                                        data-bs-target="#flush-collapseThree" aria-expanded="false"
                                                                        aria-controls="flush-collapseThree" onClick={() => setSelectedBrand("Huawei")}>
                                                                        <span className="d-flex align-items-center">
                                                                            <img src='assets/images/brands/huawei.svg' alt='' />
                                                                            <span className="ms-2"> Huawei  </span>
                                                                        </span>
                                                                        <i className="fa fa-arrow-right"></i></Link>


                                                                    <div id="flush-collapseThree"
                                                                        className="accordion-collapse collapse"
                                                                        data-bs-parent="#categoryCollapseMenu">
                                                                        <div>

                                                                            <ul className="nav flex-column ms-8">
                                                                                {brand && brand.map((row) => {
                                                                                    return <li key={row.id} className="nav-item"><Link className="nav-link" to={`/shop-single/${row.id}`}>{row.name}</Link>
                                                                                    </li>
                                                                                })}

                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="nav-item border-bottom w-100 collapsed px-4 py-1">
                                                                    <Link className="nav-link" data-bs-toggle="collapse"
                                                                        data-bs-target="#flush-collapseFour" aria-expanded="false"
                                                                        aria-controls="flush-collapseFour">
                                                                        <span className="d-flex align-items-center" onClick={() => setSelectedBrand("Infinix")}>
                                                                            <img src='assets/images/brands/Infinix.svg' alt='' />
                                                                            <span className="ms-2">Infinix </span>
                                                                        </span>
                                                                        <i className="fa fa-arrow-right"></i></Link>


                                                                    <div id="flush-collapseFour" className="accordion-collapse collapse"
                                                                        data-bs-parent="#categoryCollapseMenu">
                                                                        <div>
                                                                            <ul className="nav flex-column ms-8">
                                                                                {brand && brand.map((row) => {
                                                                                    return <li key={row.id} className="nav-item"><Link className="nav-link" to={`/shop-single/${row.id}`}>{row.name}</Link>
                                                                                    </li>
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>



                                                                <li className="nav-item border-bottom w-100 collapsed px-4 py-1">
                                                                    <Link className="nav-link" data-bs-toggle="collapse"
                                                                        data-bs-target="#flush-collapseFive" aria-expanded="false"
                                                                        aria-controls="flush-collapseFive" onClick={() => setSelectedBrand("Vivo")}>
                                                                        <span className="d-flex align-items-center">
                                                                            <img src='assets/images/brands/vivo.svg' alt='' />
                                                                            <span className="ms-2">Vivo</span>
                                                                        </span>
                                                                        <i className="fa fa-arrow-right"></i></Link>


                                                                    <div id="flush-collapseFive" className="accordion-collapse collapse"
                                                                        data-bs-parent="#categoryCollapseMenu">
                                                                        <div>

                                                                            <ul className="nav flex-column ms-8">

                                                                                {brand && brand.map((row) => {
                                                                                    return <li key={row.id} className="nav-item"><Link className="nav-link" to={`/shop-single/${row.id}`}>{row.name}</Link>
                                                                                    </li>
                                                                                })}
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="nav-item border-bottom w-100 collapsed px-4 py-1">
                                                                    <Link className="nav-link" data-bs-toggle="collapse"
                                                                        data-bs-target="#flush-collapseSix" aria-expanded="false"
                                                                        aria-controls="flush-collapseSix" onClick={() => setSelectedBrand("Honor")}>
                                                                        <span className="d-flex align-items-center" >

                                                                            <img src='assets/images/brands/honor.svg' alt='' />
                                                                            <span className="ms-2">Honor</span>
                                                                        </span>
                                                                        <i className="fa fa-arrow-right"></i></Link>


                                                                    <div id="flush-collapseSix" className="accordion-collapse collapse"
                                                                        data-bs-parent="#categoryCollapseMenu">
                                                                        <div>

                                                                            <ul className="nav flex-column ms-8">
                                                                                {brand && brand.map((row) => {
                                                                                    return <li key={row.id} className="nav-item"><Link className="nav-link" to={`/shop-single/${row.id}`}>{row.name}</Link>
                                                                                    </li>
                                                                                })}
                                                                            </ul>

                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                <li className="nav-item w-100 collapsed px-4 py-1">
                                                                    <Link className="nav-link" data-bs-toggle="collapse"
                                                                        data-bs-target="#flush-collapseSeven" aria-expanded="false"
                                                                        aria-controls="flush-collapseSeven" onClick={() => setSelectedBrand("Nokia")}>
                                                                        <span className="d-flex align-items-center">
                                                                            <img src='assets/images/brands/nokia.svg' alt='' />
                                                                            <span className="ms-2"> Nokia</span>
                                                                        </span>
                                                                        <i className="fa fa-arrow-right"></i></Link>


                                                                    <div id="flush-collapseSeven"
                                                                        className="accordion-collapse collapse"
                                                                        data-bs-parent="#categoryCollapseMenu">
                                                                        <div>

                                                                            <ul className="nav flex-column ms-8">

                                                                                {brand && brand.map((row) => {
                                                                                    return <li key={row.id} className="nav-item"><Link className="nav-link" to={`/shop-single/${row.id}`}>{row.name}</Link>
                                                                                    </li>
                                                                                })}

                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </li>

                                                            </ul>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                                <div className="col-xl-9 col-lg-8 col-md-12 mb-6 mb-md-0">
                                    <NewArrivals update={update} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mt-lg-12 mb-lg-14 mb-8 mt-8">
                        <div className="container-fluid">
                            <div className="table-responsive-xxl pb-6 pb-lg-0">
                                <div className="row flex-nowrap">
                                    <div className="col-md">
                                        <div className="card border-0 card-hover">
                                            <Link to="#" className="img-zoom">
                                                <img src="./assets/images/banner/banner_1.avif" alt=""
                                                    className="rounded w-100" /></Link>
                                            <div className="position-absolute bg-dark-info w-100 bottom-0 py-3 px-4 rounded-bottom">
                                                <Link to="#" className="text-white  d-flex align-items-center btn-transition">App Store
                                                    <i className="feather-icon icon-chevron-right fs-5"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="card border-0">
                                            <Link to="#" className="img-zoom">
                                                <img src="./assets/images/banner/banner_2.avif" alt="" className=" rounded w-100" /></Link>
                                            <div className="position-absolute bg-dark-warning w-100 bottom-0 py-3 px-4 rounded-bottom">
                                                <Link to="#" className="text-white  d-flex align-items-center btn-transition">Google Play
                                                    <i className="feather-icon icon-chevron-right fs-5"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="card border-0">
                                            <Link to="#" className="img-zoom"><img src="./assets/images/banner/banner_3.avif" alt=""
                                                className="rounded w-100" /></Link>
                                            <div className="position-absolute bg-dark-danger w-100 bottom-0 py-3 px-4 rounded-bottom">
                                                <Link to="#" className="text-white   btn-transition">App Gallery
                                                    <i className="feather-icon icon-chevron-right fs-5"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mt-lg-12 mb-lg-14 mb-8 mt-8">
                        <div className="container-fluid ">
                            <div className="row align-items-center mb-6">
                                <div className="col-lg-10 col-9">
                                    <div className="d-xl-flex justify-content-between align-items-center">

                                        <div className="d-flex">
                                            <div className="mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round" className="feather feather-shopping-bag text-primary">
                                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                                </svg>
                                            </div>
                                            <div className="ms-3">
                                                <h3 className=" mb-0">Best Selling Products</h3>
                                                <p className="mb-0">Find the bestseller products in your area with discount.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-3">
                                    <div className="slider-arrow  " id="slider-third-arrows"></div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <BestSellingProducts update={update} />
                                </div>
                            </div>
                        </div>

                    </section>

                    <section className="mt-lg-12 mb-lg-14 mb-8 mt-8">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-lg-3">
                                    <div className="mb-8 mb-xl-0">
                                        <div className="mb-6"><img src="assets/images/icons/clock.svg" alt="" /></div>
                                        <h3 className="h5 mb-3">
                                            10 minute grocery now
                                        </h3>
                                        <p>Get your order delivered to your doorstep at the earliest from FreshCart pickup stores
                                            near you.</p>
                                    </div>
                                </div>
                                <div className="col-md-6  col-lg-3">
                                    <div className="mb-8 mb-xl-0">
                                        <div className="mb-6"><img src="assets/images/icons/gift.svg" alt="" /></div>
                                        <h3 className="h5 mb-3">Best Prices & Offers</h3>
                                        <p>Cheaper prices than your local supermarket, great cashback offers to top it off. Get best
                                            pricess &
                                            offers.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="mb-8 mb-xl-0">
                                        <div className="mb-6"><img src="assets/images/icons/package.svg" alt="" /></div>
                                        <h3 className="h5 mb-3">Wide Assortment</h3>
                                        <p>Choose from 5000+ products across food, personal care, household, bakery, veg and non-veg
                                            & other
                                            categories.</p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-3">
                                    <div className="mb-8 mb-xl-0">
                                        <div className="mb-6"><img src="assets/images/icons/refresh-cw.svg" alt="" /></div>
                                        <h3 className="h5 mb-3">Easy Returns</h3>
                                        <p>Not satisfied with a product? Return it at the doorstep & get a refund within hours. No
                                            questions asked
                                            <Link href="#!">policy</Link>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            }
        </>
    );
}


