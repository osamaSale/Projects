import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProducts } from '../../redux/api/products';
import Slider from "react-slick";
import {  ShopCard4, ShopCard5, ShopCard6 } from './ShopCard';
import { ascending, descending, highestPrice, lowestPrice } from '../../redux/slice/slice';

export const ShopWide = ({ update }) => {
    const { products,  brands, devices } = useSelector((store) => store.data)
    const [toggleState, settoggleState] = useState(4)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const dispatch = useDispatch()
    const bestSellingProducts = {
        infinite: !0,
        slidesToShow: 10,
        slidesToScroll: 1,
        dots: !1,
        arrows: false,
        speed: 1e3,
        loop: !0,
        adaptiveHeight: !0,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 990,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }],

    }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);



    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (

        <section className="mt-8 mb-lg-14 mb-8">
            <div className="container-fluid">
                <div className="row mt-8">
                    <div className="col-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Shop Wide</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row mt-8">
                    <div className="col-lg-12">
                        <div className="d-lg-flex justify-content-between align-items-center">
                            <div>
                                <p className="mb-3 mb-md-0">
                                    <span className="me-2">{products && products.length > 0 ? products.length : 0}</span>
                                    Products found
                                </p>
                            </div>

                            <div className="d-md-flex justify-content-between align-items-center">
                                <div>
                                    <Link onClick={() => settoggleState(4)} className={toggleState === 4 ? "me-3 active" : "text-muted me-3"}><i className="bi bi-list-ul"></i></Link>
                                    <Link onClick={() => settoggleState(5)} className={toggleState === 5 ? "me-3 active" : "text-muted me-3"}><i className="bi bi-grid"></i></Link>
                                    <Link onClick={() => settoggleState(6)} className={toggleState === 6 ? "me-3 active" : "text-muted me-3"}><i className="bi bi-grid-3x3-gap"></i></Link>
                                </div>
                                <div className="d-flex mt-2 mt-lg-0">
                                    <div className="me-2 flex-grow-1">

                                        <select className="form-select border" onClick={(e) => { dispatch(searchProducts(e.target.value)) }}>
                                            <option >Devices: 4</option>
                                            {devices && devices.map((row) => {
                                                return <option value={row.name} key={row.id}>{row.name}</option>
                                            })}

                                        </select>
                                    </div>
                                    <div className="me-2 flex-grow-1">
                                    <select className="form-select border"
                                            onClick={(e) => {
                                                if (e.target.value === "1") {
                                                    dispatch(highestPrice())
                                                } else if (e.target.value === "2") {
                                                    dispatch(lowestPrice())
                                                } else if (e.target.value === "3") {
                                                    dispatch(ascending())
                                                } else if (e.target.value === "4") {
                                                    dispatch(descending())
                                                }else{
                                                    update()
                                                }

                                            }}>
                                            <option value="0">Sort By</option>
                                            <option value="1">Highest Price</option>
                                            <option value="2">Lowest Price</option>
                                            <option value="3">Ascending (A - Z)</option>
                                            <option value="4">Descending (Z - A)</option>
                                        </select>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>


                        <div className="row mt-8">
                            <div className="col-12">
                                <div className="product-slider-second " id="slider-third">
                                    <Slider  {...bestSellingProducts}>
                                        <button className="btn btn-primary btn-sm" onClick={() => { update() }}>All Products</button>
                                        {brands && brands.map((row) => {
                                            return <button key={row.id} className="btn btn-primary btn-sm"
                                                onClick={() => { dispatch(searchProducts(row.name)) }}
                                            >{row.name}</button>

                                        })}

                                    </Slider>
                                </div>
                            </div>
                        </div>

                       
                            {toggleState === 4 ? <ShopCard4 currentPosts={currentPosts} update={update} /> :
                                toggleState === 5 ? <ShopCard5 currentPosts={currentPosts} update={update} /> :
                                    toggleState === 6 ? <ShopCard6 currentPosts={currentPosts} update={update} /> :
                                        null}
                        

                        <div className="row mt-8">
                            <div className="col">

                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item disabled">
                                            <Link className="page-link border  mx-1" to="#" aria-label="Previous"
                                            onClick={() => {
                                                if (currentPage !== 1) {
                                                    setCurrentPage(currentPage - 1)
                                                }
    
                                            }}
                                            >
                                                <i className="bi bi-arrow-left"></i>
                                            </Link>
                                        </li>
                                        {pageNumbers.map(number => (
                                            <li key={number} onClick={() => paginate(number)} className={number === currentPage ? "page-item active" : "page-item"}>
                                                <Link className="page-link" to={'/shop'}>  {number}</Link>
                                            </li>

                                        ))}
                    
                                        <li className="page-item">
                                            <Link className="page-link mx-1" to="#" aria-label="Next"
                                            onClick={() => {

                                                if (indexOfLastPost === 9) {
                                                    setCurrentPage(currentPage + 1)
                                                }

                                            }}
                                            >
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </section>

    );
}

