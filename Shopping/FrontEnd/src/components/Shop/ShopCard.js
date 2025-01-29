import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import { getAllUsers } from '../../redux/api/users';
import { createCart } from '../../redux/api/carts';
import { createWishlist } from '../../redux/api/wishlist';
import { ViewProduct } from '../Modals';
function SampleNextArrow1(props) {
    const { onClick } = props;
    return <span onClick={onClick} className="slick-prev border"><i className="fa fa-arrow-left"></i></span>
}
function SamplePrevArrow1(props) {
    const { onClick } = props;
    return <span className="slick-next border" onClick={onClick}><i className="fa fa-arrow-right"></i></span>
}
const bestSellingProducts = {
    infinite: !0,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: !0,
    dots: !1,
    arrows: !0,
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
    nextArrow: <SampleNextArrow1 />,
    prevArrow: <SamplePrevArrow1 />,
}

const newArrivals = {
    slidesToShow: 5,
    slidesToScroll: !0,
    autoplay: !0,
    dots: !1,
    arrows: !0,
    responsive: [{
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 820,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
    }],

    nextArrow: <SampleNextArrow1 />,
    prevArrow: <SamplePrevArrow1 />,
};
export const BestSellingProducts = ({ update }) => {
    const { products, carts, user, wishlist } = useSelector((store => store.data))
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return (
        <>
            <Slider  {...bestSellingProducts}>
                {products && products.map((row) => {
                    return <div className="col item" key={row.id}>
                        <div className="card card-product h-100 mb-4">
                            <div className="card-body position-relative">

                                <div className="text-center position-relative ">
                                    <div className=" position-absolute top-0 start-0">
                                        <span className="badge bg-danger">{row && row.stock}</span>
                                    </div>

                                    <Link to={`/shop-single/${row.id}`}>
                                        <img src={row && row.image}
                                            alt="Grocery Ecommerce Template" className="mb-3 card-img-top" height={200} />
                                    </Link>

                                    <div className="card-product-action">
                                        <Link to="#!" className="btn-action me-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#quickViewModal" onClick={() => setSelectedProduct(row)}>
                                            <i className="bi bi-eye" data-bs-toggle="tooltip"
                                                data-bs-html="true" title="Quick View"></i>
                                        </Link>
                                        <button className="btn-action me-1"
                                            disabled={wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id)}
                                            onClick={() => {

                                                if (!user) {
                                                    if (window.confirm("You Must login")) {
                                                        navigate('/login')
                                                    }
                                                } else {
                                                    let data = {
                                                        userId: user.id,
                                                        productid: row.id
                                                    }
                                                    dispatch(createWishlist(data)).then((res) => {
                                                        dispatch(getAllUsers())
                                                        update()

                                                    })
                                                }
                                            }}  >
                                            {wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id) ?
                                                <i className="bi bi-suit-heart-fill text-danger"></i>
                                                : <i className="bi bi-suit-heart "></i>
                                            }

                                        </button>
                                        <Link className="btn-action"><i
                                            className="bi bi-arrow-left-right"></i></Link>
                                    </div>
                                </div>

                                <h2 className="fs-6"><Link to="#!"
                                    className="text-inherit text-decoration-none">{row && row.brand} && {row && row.device}</Link>
                                </h2>
                                <div className='mb-2'>

                                    <small className="text-warning">
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-half"></i></small> <span
                                            className="text-muted small">4.5(149)</span>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    <div><span className="text-danger">$ {row && row.priceDiscount}</span> <span
                                        className="text-decoration-line-through text-muted">$ {row && row.price}</span>
                                    </div>
                                    <div>
                                        <span className="text-uppercase small text-primary">
                                            {row && row.color}
                                        </span>
                                    </div>
                                </div>
                                <div className="d-grid mt-4">
                                    <button type='submit'
                                        disabled={carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id)}
                                        className="btn btn-primary rounded-pill"
                                        onClick={() => {

                                            if (!user) {
                                                if (window.confirm("You Must login")) {
                                                    navigate('/login')
                                                }
                                            } else {
                                                let data = {
                                                    userId: user.id,
                                                    productid: row.id,
                                                    quantity: 1
                                                }
                                                dispatch(createCart(data)).then((res) => {
                                                    dispatch(getAllUsers())
                                                    update()
                                                })

                                            }
                                        }}
                                    >
                                        {carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id) ?
                                            <><i className="bi bi-cart-check"></i> In Cart</>
                                            : <><i className="bi bi-plus-lg"></i> Add To Cart</>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </Slider>
            <ViewProduct selectedProduct={selectedProduct} />
        </>
    );
}

export const NewArrivals = ({ update }) => {
    const { products, carts, user, wishlist } = useSelector((store => store.data))
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return <div className="mb-12 product-content">
        <div className="mb-4">
            <h3 className="mb-4 h5">New Arrivals</h3>
        </div>
        <Slider  {...newArrivals}>
            {products && products.map((row) => {
                return <div className="item" key={row.id}>
                    <div className="card card-product">
                        <div className="card-body">
                            <div className="text-center position-relative">
                                <Link to={`/shop-single/${row.id}`} >
                                    <img src={row && row.image} alt="Grocery Ecommerce Template" className="mb-3 card-img-top" height={160} /></Link>

                                <div className="card-product-action">
                                    <Link to="#!" className="btn-action me-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickViewModal" onClick={() => setSelectedProduct(row)}>
                                        <i className="bi bi-eye" data-bs-toggle="tooltip"
                                            data-bs-html="true" title="Quick View"></i>
                                    </Link>
                                    <button className="btn-action me-1"
                                        disabled={wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id)}
                                        onClick={() => {

                                            if (!user) {
                                                if (window.confirm("You Must login")) {
                                                    navigate('/login')
                                                }
                                            } else {
                                                let data = {
                                                    userId: user.id,
                                                    productid: row.id
                                                }
                                                dispatch(createWishlist(data)).then((res) => {
                                                    dispatch(getAllUsers())
                                                    update()

                                                })
                                            }
                                        }}  >
                                        {wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id) ?
                                            <i className="bi bi-suit-heart-fill text-danger"></i>
                                            : <i className="bi bi-suit-heart "></i>
                                        }

                                    </button>
                                    <Link className="btn-action"><i
                                        className="bi bi-arrow-left-right"></i></Link>
                                </div>
                            </div>

                            <div className="text-small mb-1">
                                <Link to="#!" className="text-decoration-none text-muted"><small>{row && row.brand} && {row && row.color}</small></Link>
                            </div>
                            <h2 className="fs-6">
                                <Link to="#!" className="text-inherit text-decoration-none">{`${row && row.name}`.slice(0, 14)}..</Link>
                            </h2>
                            <div className="text-small">
                                <Link to="#!" className="text-decoration-none text-muted"><small>{row.stock}</small></Link>
                            </div>

                            <div className="text-warning">
                                <small className='me-2'>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-half"></i>
                                </small>
                                <span className="text-muted small">4.5 (67)</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-1">
                                <div>
                                    <span className="me-2 ">$ {row && row.priceDiscount}</span>
                                    <span className="text-decoration-line-through text-muted d-none d-md-inline">$ {row && row.price}</span>
                                </div>

                                <div>
                                    <Link  className="btn btn-primary btn-sm"
                                    disabled={carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id)}
                                        onClick={() => {

                                            if (!user) {
                                                if (window.confirm("You Must login")) {
                                                    navigate('/login')
                                                }
                                            } else {
                                                let data = {
                                                    userId: user.id,
                                                    productid: row.id,
                                                    quantity: 1
                                                }
                                                dispatch(createCart(data)).then((res) => {
                                                    dispatch(getAllUsers())
                                                    update()
                                                })

                                            }
                                        }}
                                    >
                                        {carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id) ?
                                            <><i className="bi bi-cart-check"></i> In Cart</>
                                            : <><i className="bi bi-plus-lg"></i> Add</>}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            })}

        </Slider>
        <ViewProduct selectedProduct={selectedProduct} />
    </div>
}

export const ShopCard1 = ({ currentPosts, update }) => {
    const { carts, user, wishlist } = useSelector((store => store.data))
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return <div className="row g-4 row-cols-xl-2 row-cols-lg-3 row-cols-1 row-cols-md-2 mt-2" >
        {currentPosts && currentPosts.map((row) => {
            return <div className="col" key={row.id}>
                <div className="card card-product" >
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-5 col-12">
                                <div className="text-center position-relative">
                                    <div className="position-absolute top-0">
                                        <span className="badge bg-danger">{row && row.stock}</span>
                                    </div>
                                    <Link to={`/shop-single/${row.id}`}>
                                        <img src={row && row.image}
                                            alt="Grocery Ecommerce Template"
                                            className="mb-1 card-img-top" height={200} />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-7 col-12 flex-grow-1">

                                <div className="text-small mb-1">
                                    <Link
                                        className="text-decoration-none text-muted">
                                        <small>{row && row.brand} && {row && row.device}</small>
                                    </Link>
                                </div>
                                <h2 className="fs-6"><Link to={`/shop-single/${row.id}`}
                                    className="text-inherit text-decoration-none">
                                    {row && row.name}
                                </Link></h2>
                                <div>

                                    <small className="text-warning">
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-half"></i>
                                    </small>
                                    <span className="text-muted small ms-1">4.5(149)</span>
                                </div>
                                <div className="mt-3">

                                    <div>
                                        <span className="text-danger me-2">$ {row && row.priceDiscount}</span>
                                        <span
                                            className="text-decoration-line-through text-muted">$ {row && row.price}</span>
                                    </div>

                                    <div className="mt-3">
                                        <Link to="#!"
                                            className="btn btn-icon btn-sm btn-outline-gray-400 text-muted border me-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#quickViewModal" onClick={() => setSelectedProduct(row)}>
                                            <i className="bi bi-eye"
                                                data-bs-toggle="tooltip"
                                                data-bs-html="true"
                                                title="Quick View"></i>
                                        </Link>
                                        <button className="btn btn-icon btn-sm btn-outline-gray-400 border text-muted me-1"
                                            disabled={wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id)}
                                            onClick={() => {

                                                if (!user) {
                                                    if (window.confirm("You Must login")) {
                                                        navigate('/login')
                                                    }
                                                } else {
                                                    let data = {
                                                        userId: user.id,
                                                        productid: row.id
                                                    }
                                                    dispatch(createWishlist(data)).then((res) => {
                                                        dispatch(getAllUsers())
                                                        update()

                                                    })
                                                }
                                            }}  >
                                            {wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id) ?
                                                <i className="bi bi-suit-heart-fill text-danger"></i>
                                                : <i className="bi bi-suit-heart "></i>
                                            }

                                        </button>
                                        <Link to="#!"
                                            className="btn btn-icon btn-sm btn-outline-gray-400 text-muted border"
                                            data-bs-toggle="tooltip"
                                            data-bs-html="true" title="Compare">
                                            <i className="bi bi-arrow-left-right"></i>
                                        </Link>
                                    </div>
                                    <div className="mt-2">
                                        <button className="btn btn-primary btn-sm"
                                            disabled={carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id)}
                                            onClick={() => {

                                                if (!user) {
                                                    if (window.confirm("You Must login")) {
                                                        navigate('/login')
                                                    }
                                                } else {
                                                    let data = {
                                                        userId: user.id,
                                                        productid: row.id,
                                                        quantity: 1
                                                    }
                                                    dispatch(createCart(data)).then((res) => {
                                                        dispatch(getAllUsers())
                                                        update()
                                                    })

                                                }
                                            }}
                                        >
                                            {carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id) ?
                                                <><i className="bi bi-cart-check"></i> In Cart</>
                                                : <><i className="bi bi-plus-lg"></i> Add To Cart</>}

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        })
        }
        <ViewProduct selectedProduct={selectedProduct} />
    </div >
}
export const ShopCard3 = ({ currentPosts, update }) => {
    const { user, wishlist, carts } = useSelector((store => store.data))
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return <div className="row g-4 row-cols-xl-3 row-cols-lg-3 row-cols-1 row-cols-md-2 mt-2">
        {currentPosts && currentPosts.map((row) => {
            return <div className="col" key={row.id}>
                <div className="card card-product h-100 mb-4">
                    <div className="card-body position-relative">

                        <div className="text-center position-relative ">
                            <div className=" position-absolute top-0 start-0">
                                <span className="badge bg-danger">{row && row.stock}</span>
                            </div>

                            <Link to={`/shop-single/${row.id}`}>
                                <img src={row && row.image}
                                    alt="Grocery Ecommerce Template" className="mb-3 card-img-top" height={200} />
                            </Link>

                            <div className="card-product-action">
                                <Link to="#!" className="btn-action me-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal" onClick={() => setSelectedProduct(row)}>
                                    <i className="bi bi-eye" data-bs-toggle="tooltip"
                                        data-bs-html="true" title="Quick View"></i>
                                </Link>
                                <button className="btn-action me-1"
                                    disabled={wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id)}
                                    onClick={() => {

                                        if (!user) {
                                            if (window.confirm("You Must login")) {
                                                navigate('/login')
                                            }
                                        } else {
                                            let data = {
                                                userId: user.id,
                                                productid: row.id
                                            }
                                            dispatch(createWishlist(data)).then((res) => {
                                                dispatch(getAllUsers())
                                                update()

                                            })
                                        }
                                    }}  >
                                    {wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id) ?
                                        <i className="bi bi-suit-heart-fill text-danger"></i>
                                        : <i className="bi bi-suit-heart "></i>
                                    }

                                </button>
                                <Link className="btn-action"><i
                                    className="bi bi-arrow-left-right"></i></Link>
                            </div>
                        </div>

                        <h2 className="fs-6"><Link to="#!"
                            className="text-inherit text-decoration-none">{row && row.brand} && {row && row.device}</Link>
                        </h2>
                        <div className='mb-2'>

                            <small className="text-warning">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-half"></i></small> <span
                                    className="text-muted small">4.5(149)</span>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <div><span className="text-danger">$ {row && row.priceDiscount}</span> <span
                                className="text-decoration-line-through text-muted">$ {row && row.price}</span>
                            </div>
                            <div>
                                <span className="text-uppercase small text-primary">
                                    {row && row.color}
                                </span>
                            </div>
                        </div>
                        <div className="d-grid mt-4">
                            <button type='submit'
                                disabled={carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id)}
                                className="btn btn-primary rounded-pill"
                                onClick={() => {

                                    if (!user) {
                                        if (window.confirm("You Must login")) {
                                            navigate('/login')
                                        }
                                    } else {
                                        let data = {
                                            userId: user.id,
                                            productid: row.id,
                                            quantity: 1
                                        }
                                        dispatch(createCart(data)).then((res) => {
                                            dispatch(getAllUsers())
                                            update()
                                        })

                                    }
                                }}
                            >
                                {carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id) ?
                                    <><i className="bi bi-cart-check"></i> In Cart</>
                                    : <><i className="bi bi-plus-lg"></i> Add To Cart</>}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        })}
        <ViewProduct selectedProduct={selectedProduct} />
    </div>
}


export const ShopCard2 = ({ currentPosts, update }) => {
    const { carts, user, wishlist } = useSelector((store => store.data))
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return <div className="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 row-cols-md-1 mt-2" >
        {currentPosts && currentPosts.map((row) => {
            return <div className="col item" key={row.id}>
                <div className="card card-product" >
                    <div className="card-body">
                        <div className="text-center position-relative">
                            <div className="position-absolute top-0 start-0">
                                <span className="badge bg-danger">{row && row.stock}</span>
                            </div>
                            <Link to={`/shop-single/${row.id}`}>
                                <img src={row && row.image}
                                    alt="Grocery Ecommerce Template"
                                    className="mb-1 card-img-top" height={160} />
                            </Link>
                            <div className="card-product-action">
                                <Link to="#!" className="btn-action me-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal" onClick={() => setSelectedProduct(row)}>
                                    <i className="bi bi-eye" data-bs-toggle="tooltip"
                                        data-bs-html="true" title="Quick View"></i>
                                </Link>
                                <button className="btn-action me-1"
                                    disabled={wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id)}
                                    onClick={() => {

                                        if (!user) {
                                            if (window.confirm("You Must login")) {
                                                navigate('/login')
                                            }
                                        } else {
                                            let data = {
                                                userId: user.id,
                                                productid: row.id
                                            }
                                            dispatch(createWishlist(data)).then((res) => {
                                                dispatch(getAllUsers())
                                                update()

                                            })
                                        }
                                    }}  >
                                    {wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id) ?
                                        <i className="bi bi-suit-heart-fill text-danger"></i>
                                        : <i className="bi bi-suit-heart "></i>
                                    }

                                </button>
                                <Link className="btn-action"><i
                                    className="bi bi-arrow-left-right"></i></Link>
                            </div>
                        </div>
                        <div className="text-small mb-1">
                            <Link to="#!"
                                className="text-decoration-none text-muted">
                                <small>{row && row.brand} && {row && row.device}</small>
                            </Link>
                        </div>
                        <h2 className="fs-6">
                            <Link
                                className="text-inherit text-decoration-none"> {`${row && row.name}`.slice(0, 14)}..
                            </Link>
                        </h2>
                        <div>
                            <small className="text-warning">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-half"></i>
                            </small>
                            <span className="text-muted small ms-1">4.5(149)</span>
                        </div>
                        <div
                            className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                                <span className="text-danger me-1">$ {row && row.priceDiscount}</span>
                                <span
                                    className="text-decoration-line-through text-muted d-none d-md-inline">$ {row && row.price}</span>
                            </div>
                            <div>
                                <button type='submit' className="btn btn-primary btn-sm"
                                    disabled={carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id)}

                                    onClick={() => {

                                        if (!user) {
                                            if (window.confirm("You Must login")) {
                                                navigate('/login')
                                            }
                                        } else {
                                            let data = {
                                                userId: user.id,
                                                productid: row.id,
                                                quantity: 1
                                            }
                                            dispatch(createCart(data)).then((res) => {
                                                dispatch(getAllUsers())
                                                update()
                                            })

                                        }
                                    }}
                                >
                                    {carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id) ?
                                        <><i className="bi bi-cart-check"></i> In Cart</>
                                        : <><i className="bi bi-plus-lg"></i> Add </>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        })
        }
        <ViewProduct selectedProduct={selectedProduct} />
    </div >
}


export const ShopCard4 = ({ currentPosts, update }) => {
    const { carts, user, wishlist } = useSelector((store => store.data))
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return <div className="row g-4 row-cols-xl-3 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2" >
        {currentPosts && currentPosts.map((row) => {
            return <div className="col" key={row.id}>
                <div className="card card-product" >
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-md-5 col-12">
                                <div className="text-center position-relative">
                                    <div className="position-absolute top-0">
                                        <span className="badge bg-danger">{row && row.stock}</span>
                                    </div>
                                    <Link to={`/shop-single/${row.id}`}>
                                        <img src={row && row.image}
                                            alt="Grocery Ecommerce Template"
                                            className="mb-1 card-img-top" height={200} />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-7 col-12 flex-grow-1">

                                <div className="text-small mb-1">
                                    <Link to={`/shop-single/${row.id}`}
                                        className="text-decoration-none text-muted">
                                        <small>{row && row.brand} && {row && row.device}</small>
                                    </Link>
                                </div>
                                <h2 className="fs-6"><Link to={`/shop-single/${row.id}`}
                                    className="text-inherit text-decoration-none">
                                    {row && row.name}
                                </Link></h2>
                                <div>

                                    <small className="text-warning">
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-half"></i>
                                    </small>
                                    <span className="text-muted small ms-1">4.5(149)</span>
                                </div>
                                <div className="mt-3">

                                    <div>
                                        <span className="text-danger me-2">$ {row && row.priceDiscount}</span>
                                        <span
                                            className="text-decoration-line-through text-muted d-none d-md-inline">$ {row && row.price}</span>
                                    </div>

                                    <div className="mt-3">
                                        <Link to="#!"
                                            className="btn btn-icon btn-sm btn-outline-gray-400 text-muted border me-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#quickViewModal" onClick={() => setSelectedProduct(row)}>
                                            <i className="bi bi-eye"
                                                data-bs-toggle="tooltip"
                                                data-bs-html="true"
                                                title="Quick View"></i>
                                        </Link>
                                        <button className="btn btn-icon btn-sm btn-outline-gray-400 border text-muted me-1"
                                            disabled={wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id)}
                                            onClick={() => {

                                                if (!user) {
                                                    if (window.confirm("You Must login")) {
                                                        navigate('/login')
                                                    }
                                                } else {
                                                    let data = {
                                                        userId: user.id,
                                                        productid: row.id
                                                    }
                                                    dispatch(createWishlist(data)).then((res) => {
                                                        dispatch(getAllUsers())
                                                        update()

                                                    })
                                                }
                                            }}  >
                                            {wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id) ?
                                                <i className="bi bi-suit-heart-fill text-danger"></i>
                                                : <i className="bi bi-suit-heart "></i>
                                            }

                                        </button>
                                        <Link to="#!"
                                            className="btn btn-icon btn-sm btn-outline-gray-400 text-muted border"
                                            data-bs-toggle="tooltip"
                                            data-bs-html="true" title="Compare">
                                            <i className="bi bi-arrow-left-right"></i>
                                        </Link>
                                    </div>
                                    <div className="mt-2">
                                        <button className="btn btn-primary btn-sm"
                                            disabled={carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id)}
                                            onClick={() => {

                                                if (!user) {
                                                    if (window.confirm("You Must login")) {
                                                        navigate('/login')
                                                    }
                                                } else {
                                                    let data = {
                                                        userId: user.id,
                                                        productid: row.id,
                                                        quantity: 1
                                                    }
                                                    dispatch(createCart(data)).then((res) => {
                                                        dispatch(getAllUsers())
                                                        update()
                                                    })

                                                }
                                            }}
                                        >
                                            {carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id) ?
                                                <><i className="bi bi-cart-check"></i> In Cart</>
                                                : <><i className="bi bi-plus-lg"></i> Add To Cart</>}

                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        })
        }
        <ViewProduct selectedProduct={selectedProduct} />
    </div >
}
export const ShopCard5 = ({ currentPosts, update }) => {
    const { user, wishlist, carts } = useSelector((store => store.data))
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return <div className="row g-4 row-cols-xl-4 row-cols-lg-3 row-cols-1 row-cols-md-2 mt-2">
        {currentPosts && currentPosts.map((row) => {
            return <div className="col" key={row.id}>
                <div className="card card-product" >
                    <div className="card-body">
                        <div className="text-center position-relative">
                            <div className="position-absolute top-0 start-0">
                                <span className="badge bg-danger">{row && row.stock}</span>
                            </div>
                            <Link to={`/shop-single/${row.id}`} >
                                <img src={row && row.image}
                                    alt="Grocery Ecommerce Template"
                                    className="mb-3 card-img-top" height={160} />
                            </Link>
                            <div className="card-product-action">
                                <Link to="#!" className="btn-action me-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal" onClick={() => { setSelectedProduct(row) }}>
                                    <i className="bi bi-eye"
                                        data-bs-toggle="tooltip"
                                        data-bs-html="true"
                                        title="Quick View"></i>
                                </Link>
                                <Link className="btn-action me-1"
                                    disabled={wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id)}
                                    onClick={() => {

                                        if (!user) {
                                            if (window.confirm("You Must login")) {
                                                navigate('/login')
                                            }
                                        } else {
                                            let data = {
                                                userId: user.id,
                                                productid: row.id
                                            }
                                            dispatch(createWishlist(data)).then((res) => {
                                                dispatch(getAllUsers())
                                                update()

                                            })
                                        }
                                    }}  >
                                    {wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id) ?
                                        <i className="bi bi-suit-heart-fill text-danger"></i>
                                        : <i className="bi bi-suit-heart "></i>
                                    }

                                </Link>
                                <Link to="#!" className="btn-action">
                                    <i className="bi bi-arrow-left-right"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="text-small mb-1">
                            <Link to="#!" className="text-decoration-none text-muted">
                                <small>
                                    {row && row.brand} && {row && row.device}
                                </small>
                            </Link>
                        </div>
                        <h2 className="fs-6">
                            <Link to={`/shop-single/${row.id}`} className="text-inherit text-decoration-none">
                                {row && row.name}
                            </Link>
                        </h2>
                        <div
                            className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                                <span className="text-danger me-2">$ {row && row.priceDiscount}</span>
                                <span
                                    className="text-decoration-line-through text-muted">$ {row && row.price}</span>
                            </div>
                            <div>
                                <small className="text-warning me-2">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-half"></i>
                                </small>
                                <span>
                                    <small>4.5</small>
                                </span>
                            </div>
                        </div>
                        <div className="d-grid mt-2">
                            <button className="btn btn-primary"
                                disabled={carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id)}
                                onClick={() => {

                                    if (!user) {
                                        if (window.confirm("You Must login")) {
                                            navigate('/login')
                                        }
                                    } else {
                                        let data = {
                                            userId: user.id,
                                            productid: row.id,
                                            quantity: 1
                                        }
                                        dispatch(createCart(data)).then((res) => {
                                            dispatch(getAllUsers())
                                            update()
                                        })

                                    }
                                }}>

                                {carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id) ?
                                    <><i className="bi bi-cart-check"></i> In Cart</>
                                    : <><i className="bi bi-plus-lg"></i> Add To Cart</>}

                            </button>
                        </div>

                    </div>
                </div>

            </div>
        })}
        <ViewProduct selectedProduct={selectedProduct} />
    </div>
}


export const ShopCard6 = ({ currentPosts, update }) => {
    const { carts, user, wishlist } = useSelector((store => store.data))
    const [selectedProduct, setSelectedProduct] = useState(null)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return <div className="row g-4 row-cols-xl-5 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2" >
        {currentPosts && currentPosts.map((row) => {
            return <div className="col" key={row.id}>
                <div className="card card-product" >
                    <div className="card-body">
                        <div className="text-center position-relative">
                            <div className="position-absolute top-0 start-0">
                                <span className="badge bg-danger">{row && row.stock}</span>
                            </div>
                            <Link to={`/shop-single/${row.id}`}>
                                <img src={row && row.image}
                                    alt="Grocery Ecommerce Template"
                                    className="mb-1 card-img-top" height={160} />
                            </Link>
                            <div className="card-product-action">
                                <Link to="#!" className="btn-action me-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#quickViewModal" onClick={() => setSelectedProduct(row)}>
                                    <i className="bi bi-eye" data-bs-toggle="tooltip"
                                        data-bs-html="true" title="Quick View"></i>
                                </Link>
                                <button className="btn-action me-1"
                                    disabled={wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id)}
                                    onClick={() => {

                                        if (!user) {
                                            if (window.confirm("You Must login")) {
                                                navigate('/login')
                                            }
                                        } else {
                                            let data = {
                                                userId: user.id,
                                                productid: row.id
                                            }
                                            dispatch(createWishlist(data)).then((res) => {
                                                dispatch(getAllUsers())
                                                update()

                                            })
                                        }
                                    }}  >
                                    {wishlist && wishlist.find(c => c.productid === row.id) && user && user.wishlist.find((c) => c.productid === row.id) ?
                                        <i className="bi bi-suit-heart-fill text-danger"></i>
                                        : <i className="bi bi-suit-heart "></i>
                                    }

                                </button>
                                <Link className="btn-action"><i
                                    className="bi bi-arrow-left-right"></i></Link>
                            </div>
                        </div>
                        <div className="text-small mb-1">
                            <Link to="#!"
                                className="text-decoration-none text-muted">
                                <small>{row && row.brand} && {row && row.device}</small>
                            </Link>
                        </div>
                        <h2 className="fs-6">
                            <Link to="../../pages/shop-single.html"
                                className="text-inherit text-decoration-none"> {row && row.name}
                            </Link>
                        </h2>
                        <div>
                            <small className="text-warning">
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-fill"></i>
                                <i className="bi bi-star-half"></i>
                            </small>
                            <span className="text-muted small ms-1">4.5(149)</span>
                        </div>
                        <div
                            className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                                <span className="text-danger me-1">$ {row && row.priceDiscount}</span>
                                <span
                                    className="text-decoration-line-through text-muted">$ {row && row.price}</span>
                            </div>
                            <div>
                                <button type='submit' className="btn btn-primary btn-sm"
                                    onClick={() => {

                                        if (!user) {
                                            if (window.confirm("You Must login")) {
                                                navigate('/login')
                                            }
                                        } else {
                                            let data = {
                                                userId: user.id,
                                                productid: row.id,
                                                quantity: 1
                                            }
                                            dispatch(createCart(data)).then((res) => {
                                                dispatch(getAllUsers())
                                                update()
                                            })

                                        }
                                    }}
                                >
                                    {carts && carts.find(c => c.productid === row.id) && user && user.carts.find((c) => c.productid === row.id) ?
                                        <><i className="bi bi-cart-check"></i> In Cart</>
                                        : <><i className="bi bi-plus-lg"></i> Add </>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        })
        }
        <ViewProduct selectedProduct={selectedProduct} />
    </div >
}
