import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/api/users';
import { deleteCart, editCart } from '../../redux/api/carts';
import { Link } from 'react-router-dom';
import { createOrder, getAllOrders } from '../../redux/api/orders';
import { toast } from 'react-toastify';

export const ShopCarts = ({ update }) => {
    const { user } = useSelector((store => store.data))
    const [loading, setLoading] = useState(false);
    const getTotalPrice = () => {
        let totalPrice = 0;
        (user?.carts || []).forEach((e) => {
            return totalPrice += e.total
        })
        return totalPrice
    };
    const dispatch = useDispatch()
    return (
        <section className="mb-lg-14 mb-8 mt-8">
            <div className="container-fluid">
                <div className="row mt-8">
                    <div className="col-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/shop-wide">Shop Wide</Link></li>

                                <li className="breadcrumb-item active" aria-current="page">Shop Cart</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-8">
                    <div className="card py-1 border-0 mb-8">
                        <div>
                            <h2 className="fw-bold">Shop Cart</h2>
                            <p className="mb-0">Products in {user && user.carts && user.carts.length > 0 ? user && user.carts && user.carts.length : 0}</p>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-8 col-md-7">
                        <div className="py-3">
                            {!user && <div className="alert alert-danger text-center p-2" role="alert">
                                You must register now. Start <Link className="alert-link text-info" to={'/login'}>checkout now !</Link>
                            </div>}
                            {user && user.carts && user.carts.length <= 0 && <div className="alert alert-primary text-center p-2" role="alert">
                                Carts is Empty  : <Link className="alert-link text-info" to={'/shop'}>Continue Shopping</Link>
                            </div>}
                            <ul className="list-group list-group-flush">
                                {user && user.carts.map((row) => {
                                    return <li className="list-group-item py-3 ps-0 border-top border-bottom" key={row.id}>

                                        <div className="row align-items-center">

                                            <div className="col-6 col-md-6 col-lg-7">
                                                <div className="d-flex">
                                                    <img src={row.image} alt="Ecommerce" className="icon-shape icon-xxl" />
                                                    <div className="ms-3">

                                                        <Link to="../pages/shop-single.html" className="text-inherit">
                                                            <h6 className="mb-0">{row.name}</h6>
                                                        </Link>
                                                        <span>
                                                            <small className="text-muted me-1"> {row.device}</small> &&
                                                            <small className="text-muted"> {row.brand}</small>
                                                        </span>

                                                        <div className="mt-2 small lh-1">
                                                            <Link className="text-decoration-none text-inherit" onClick={() => {
                                                                dispatch(deleteCart(row.id)).then(() => {
                                                                    dispatch(getAllUsers())
                                                                    update()
                                                                })
                                                            }}>
                                                                <span className="me-1 align-text-bottom">
                                                                    <i className="bi bi-trash3"></i>Remove
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-4 col-md-3 col-lg-3">

                                                <div className="input-group input-spinner  ">
                                                    <button
                                                        disabled={row && row.quantity > 1 ? false : true}
                                                        className="button-minus btn  btn-sm"
                                                        onClick={() => {
                                                            if (row.quantity > 1) {
                                                                let quantity = row.quantity - 1
                                                                let data = {
                                                                    id: row.id,
                                                                    userId: user.id,
                                                                    productid: row.productid,
                                                                    quantity: quantity
                                                                }
                                                                dispatch(editCart(data)).then(() => {
                                                                    dispatch(getAllUsers())
                                                                    update()

                                                                })
                                                            }
                                                        }}>
                                                        -
                                                    </button>
                                                    <span className='quantity-field form-control-sm form-input'>{row && row.quantity}</span>
                                                    <button className="button-plus btn btn-sm"
                                                        onClick={() => {
                                                            if (row.quantity < 10) {
                                                                let quantity = row.quantity + 1

                                                                let data = {
                                                                    id: row.id,
                                                                    userId: user.id,
                                                                    productid: row.productid,
                                                                    quantity: quantity
                                                                }
                                                                dispatch(editCart(data)).then(() => {
                                                                    dispatch(getAllUsers())
                                                                    update()
                                                                })
                                                            }
                                                        }}
                                                    >
                                                        +
                                                    </button>

                                                </div>

                                            </div>

                                            <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                                                <span className="fw-bold text-danger">${row.total}</span>
                                                <div className="text-decoration-line-through text-muted small">$ {row.price}</div>
                                            </div>
                                        </div>

                                    </li>
                                })}


                            </ul>


                        </div>
                    </div>
                    <div className="col-12 col-lg-4 col-md-5">

                        <div className="mb-5 card ">
                            <div className="card-body p-6">

                                <h2 className="h5 mb-4">Summary</h2>
                                <div className="card mb-2">

                                    <ul className="list-group list-group-flush">

                                        <li className="list-group-item d-flex justify-content-between align-items-start">
                                            <div className="me-auto">
                                                <div>Item Subtotal</div>
                                            </div>
                                            <span>${getTotalPrice()}</span>
                                        </li>


                                        <li className="list-group-item d-flex justify-content-between align-items-start">
                                            <div className="me-auto">
                                                <div>Service Fee</div>
                                            </div>
                                            <span>$3.00</span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-start">
                                            <div className="me-auto">
                                                <div className="fw-bold">Subtotal</div>
                                            </div>
                                            <span className="fw-bold">${getTotalPrice() - 3.00}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="d-grid mb-1 mt-4">

                                    <button className="btn btn-primary btn-lg d-flex justify-content-between align-items-center" type="submit"
                                        onClick={() => {
                                            setLoading(true)
                                            const findCartsUser = (user.carts || []).filter((u) => parseInt(u.userId) === parseInt(user.id))
                                            if (!user) {
                                                if (window.confirm("You Must login")) { }
                                            } else if (findCartsUser.length > 0) {
                                                let data = {
                                                    userId: user.id, checkout: "Success", total: getTotalPrice()
                                                }
                                                dispatch(createOrder(data)).then(() => {
                                                    dispatch(getAllUsers())
                                                    dispatch(getAllOrders())
                                                    update()
                                                })
                                            } else {
                                                toast.error("Cart Is Empty")
                                            }
                                            setLoading(false)
                                        }}
                                    >
                                        {!loading && <span className="indicator-label"> Go to Checkout</span>}
                                        {loading && <span className="indicator-progress">Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}
                                        <span className="fw-bold">${getTotalPrice() - 3.00}</span>
                                    </button>
                                </div>

                                <p>
                                    <small>
                                        By placing your order, you agree to be bound by Store Mobile
                                        <Link to="#!" className='ms-1 me-1'>Terms of Service</Link>
                                        and
                                        <Link to="#!" className='ms-1'>Privacy Policy.</Link>
                                    </small>
                                </p>


                                <div className="mt-8 p-0">
                                    <h2 className="h5 mb-3">
                                        <i className="bi bi-cash me-2"></i>We Accept
                                    </h2>
                                    <div className=" d-flex justify-content-between">
                                        <img
                                            src="assets/images/payment/amazonpay.svg"
                                            alt="Visa" />
                                        <img
                                            src="assets/images/payment/american-express.svg"
                                            alt="American Express" />
                                        <img
                                            src="assets/images/payment/mastercard.svg"
                                            alt="Mastercard" />
                                        <img
                                            src="assets/images/payment/paypal.svg"
                                            alt="PayPal acceptance mark" />
                                        <img
                                            src="assets/images/payment/visa.svg"
                                            alt="PayPal acceptance mark" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



