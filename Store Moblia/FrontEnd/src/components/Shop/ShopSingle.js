import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom"
import { Carousel } from 'react-responsive-carousel';
import { getAllUsers } from '../../redux/api/users';
import { createCart } from '../../redux/api/carts';
import { createWishlist } from '../../redux/api/wishlist';
import { BestSellingProducts } from './ShopCard';
import { createComments } from '../../redux/api/comments';
export const ShopSingle = ({update }) => {
    let { id } = useParams()
    const { products, carts, user, wishlist, comments } = useSelector((store) => store.data)
    const product = products.find((e) => parseInt(e.id) === parseInt(id))
    const findcommentProduct = (comments || []).filter((e) => parseInt(e.productid) === parseInt(id))
    const image = products.filter((e) => e.id !== parseInt(id) && e.brand === product.brand && e.device === product.device)
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(product ? product.color : "");
    const [comment, setComment] = useState("");
 
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    if (!product) return null; // or fallback UI
    return (
        <section className="mt-8 mb-14">
            <div className="container-fluid">
                <div className="row mt-8">
                    <div className="col-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/shop-wide">Shop Wide</Link></li>

                                <li className="breadcrumb-item active" aria-current="page">View Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="row mt-8">
                    <div className="col-md-6">
                        <Carousel showArrows={false} dynamicHeight={false} showIndicators={false} className='product'>
                            <div >
                                <img src={product && product.image} alt='' />
                            </div>
                            {image && image.map((row) => {
                                return <div className="thumbnails-img" key={row.id}>
                                    <img src={row.image} alt='' />
                                </div >
                            })}

                        </Carousel>
                    </div>
                    <div className="col-md-6">
                        <div className="ps-lg-10 mt-6 mt-md-0">
                            <h1 className="mb-4">{product && product.name}</h1>
                            <Link to="#!" className="mb-4 d-block">{product && product.brand} && {product && product.device}</Link>
                            <div className="mb-4">
                                <small className="text-warning me-2">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-half"></i>
                                </small>
                                <span className="text-muted small">4.5(149)</span>
                                <Link to="#" className="ms-2">(30 reviews)</Link>
                            </div>

                            <div className="fs-4 mb-4">
                                <span className="fw-bold me-2">${product && product.priceDiscount}</span>
                                <span className="text-decoration-line-through text-muted me-2">${product && product.price}</span>
                                <span><small className="fs-6 ms-2 text-danger">26% Off</small></span>
                            </div>

                            <p className="mb-1">{product && product.description}</p>

                            <hr className="my-6 border" />
                            <div>
                                <div className="row">
                                    <dt className="col-3">Availability:</dt>
                                    <dd className="col-9">{product && product.stock}</dd>

                                    <dt className="col-3">Color</dt>
                                    <dd className="col-9 text-capitalize">{product && product.color}</dd>

                                    <dt className="col-3">Brand</dt>
                                    <dd className="col-9">{product && product.brand}</dd>
                                </div>

                            </div>
                            <hr className="my-6 border" />
                            <div className="row">
                                <div className="col-md-4 col-6">
                                    <label className="mb-1">Color</label>
                                    <select name='color' className="form-select border "
                                        onChange={(e) => setColor(e.target.value)}
                                        value={color}
                                    >
                                        <option >Select Color</option>
                                        <option value={"black"}>Black</option>
                                        <option value={"yellow"}>Yellow</option>
                                        <option value={"red"}>Red</option>
                                        <option value={"silver"}>Silver</option>
                                        <option value={"blue"}>Blue</option>
                                        <option value={"green"}>Green</option>
                                    </select>
                                </div>
                                <div className="col-md-4 col-6 mb-3">
                                    <label className="mb-1 d-block">Quantity</label>
                                    <div className="input-group mb-2" >
                                        <button className="btn  border" type="button"
                                            disabled={quantity > 1 ? false : true}
                                            onClick={() => setQuantity(quantity - 1)}>
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <input type="text" className="form-control form-control-sm text-center border " placeholder={quantity} value={quantity} />
                                        <button className="btn  border" type="button"
                                            onClick={() => setQuantity(quantity + 1)}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 row justify-content-start g-2 align-items-center">
                                <div className="col-xxl-4 col-lg-4 col-md-5 col-5 d-grid">
                                    <button type="button" className="btn btn-primary"
                                        disabled={carts && carts.find(c => c.productid === product.id) && user && user.carts.find((c) => c.productid === product.id)}
                                        onClick={() => {
                                            if (!user) {
                                                if (window.confirm("You Must login")) {
                                                    navigate('/login')
                                                }
                                            } else {
                                                let data = {
                                                    userId: user.id,
                                                    productid: product.id,
                                                    quantity: 1
                                                }
                                                dispatch(createCart(data)).then((res) => {
                                                    dispatch(getAllUsers())
                                                    update()
                                                })

                                            }
                                        }}
                                    >
                                        {carts && carts.find(c => c.productid === product.id) && user && user.carts.find((c) => c.productid === product.id) ?
                                            <><i className="bi bi-cart-check"></i> In Cart</>
                                            : <><i className="bi bi-plus-lg"></i> Add To Cart</>}

                                    </button>
                                </div>
                                <div className="col-md-4 col-4">
                                    <button className="btn active border"
                                        disabled={wishlist && wishlist.find(c => c.productid === product.id) && user && user.wishlist.find((c) => c.productid === product.id)}
                                        onClick={() => {
                                            if (!user) {
                                                if (window.confirm("You Must login")) {
                                                    navigate('/login')
                                                }
                                            } else {
                                                let data = {
                                                    userId: user.id,
                                                    productid: product.id
                                                }
                                                dispatch(createWishlist(data)).then((res) => {
                                                    dispatch(getAllUsers())
                                                    update()
                                                })
                                            }
                                        }}>
                                        {wishlist && wishlist.find(c => c.productid === product.id) && user && user.wishlist.find((c) => c.productid === product.id) ?
                                            <><i className="bi bi-suit-heart-fill text-danger me-1"></i> Wishlist </>
                                            : <> <i className="bi bi-suit-heart me-1"></i> Wishlist</>
                                        }


                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="mt-lg-14 mt-8">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="nav nav-pills nav-lb-tab border-bottom" id="myTab" role="tablist">

                                <li className="nav-item" role="presentation">

                                    <button className="nav-link active" id="product-tab" data-bs-toggle="tab" data-bs-target="#product-tab-pane" type="button" role="tab" aria-controls="product-tab-pane" aria-selected="true">
                                        Reviews
                                    </button>
                                </li>
                            </ul>

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade active show" id="product-tab-pane" role="tabpanel" aria-labelledby="product-tab" tabIndex="0">
                                    <div className="my-8">

                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="me-lg-12 mb-6 mb-md-0">
                                                    <div className="mb-5">
                                                        <h4 className="mb-3">Customer reviews</h4>
                                                        <span>
                                                            <small className="text-warning">
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-fill"></i>
                                                                <i className="bi bi-star-half"></i>
                                                            </small>
                                                            <span className="ms-3">4.1 out of 5</span>
                                                            <small className="ms-3">11,130 global ratings</small>
                                                        </span>
                                                    </div>
                                                    <div>

                                                        <div className="py-4 mb-4">
                                                            <h5 className='pb-2'>Add a written review</h5>
                                                            <textarea className="form-control border" name='comment' onChange={(e) => setComment(e.target.value)} rows="3" placeholder="What did you like or dislike? What did you use this product for?"></textarea>
                                                        </div>

                                                        <div className="d-flex justify-content-end">
                                                            <button className="btn btn-primary"
                                                                onClick={() => {
                                                                    if (!user) {
                                                                        if (window.confirm("You Must login")) {
                                                                            navigate('/login')
                                                                        }
                                                                    } else {
                                                                        let data = { userId: user.id, productid: product.id, comment: comment }
                                                                        dispatch(createComments(data)).then((res) => {
                                                                           
                                                                            const { status } = res.payload
                                                                            if (status === 200) {
                                                                                update()
                                                                            }

                                                                        })
                                                                        setComment("")
                                                                    }
                                                                }}
                                                            >Submit Review</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-8">
                                                <div className="mb-10">
                                                    <div className="d-flex justify-content-between align-items-center mb-8">
                                                        <div>
                                                            <h4>Reviews</h4>
                                                        </div>
                                                        <div>
                                                            <select className="form-select border">
                                                                <option >Top Reviews</option>
                                                                <option >Most Recent</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    {findcommentProduct && findcommentProduct.length <= 0 && <div className="alert alert-danger text-center p-2" role="alert">
                                                        comments is Empty  <Link className="alert-link text-info" to={'/shop'}>checkout now !</Link>
                                                    </div>}
                                                    {findcommentProduct && findcommentProduct.map((row) => {
                                                        return <div className="d-flex border-bottom pb-6 mb-6" key={row.id}>
                                                            <img src={row && row.user && row.user.image} alt="" className="rounded-circle avatar-lg" />
                                                            <div className="ms-5">
                                                                <h6 className="mb-1">{row && row.user && row.user.name}</h6>
                                                                <p className="small">
                                                                    <span className="text-muted">{row.date}</span>
                                                                    <span className="text-primary ms-3 fw-bold ">
                                                                        <i className="bi bi-star-fill text-warning"></i>
                                                                        <i className="bi bi-star-fill text-warning"></i>
                                                                        <i className="bi bi-star-fill text-warning"></i>
                                                                        <i className="bi bi-star-fill text-warning"></i>
                                                                        <i className="bi bi-star-fill text-warning"></i>
                                                                        <span
                                                                            className="text-muted small ms-2"> 4.5(149)
                                                                        </span>
                                                                    </span>
                                                                </p>
                                                                <p>
                                                                    {row.comment}
                                                                </p>


                                                            </div>
                                                        </div>
                                                    })}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="my-lg-14 my-14">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">

                            <h3>Related Items</h3>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-12">
                            <BestSellingProducts update={update} />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}

