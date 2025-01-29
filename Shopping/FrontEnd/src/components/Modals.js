import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { useDispatch, useSelector } from "react-redux"
import { LoginSocialGoogle } from 'reactjs-social-login'
import { getAllUsers, login } from "../redux/api/users"
import { createCart, deleteCart, editCart } from '../redux/api/carts';
import { createWishlist, deleteWishlist } from '../redux/api/wishlist';
import { singleProduct } from '../redux/api/products';
import { toast } from 'react-toastify';
import { createOrder, getAllOrders } from '../redux/api/orders';
export const Modals = ({ mode, checkMode, loginShow, setLoginShow, update }) => {
    const { user, carts } = useSelector((store => store.data))
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const loginGoogle = async ({ provider, data }) => {
        let data1 = {
            name: data.name,
            email: data.email,
            image: data.picture,
            password: "12345",
            phone: "null",
            authorization: "user"
        }
        dispatch(login({ email: data1.email, password: data1.password })).then((res) => {
            if (res.payload.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.payload.result))
                dispatch(getAllUsers())
                navigate('/')
                setLoginShow(false)
            }
            update()
        })
    }
    const getTotalPrice = () => {
        let totalPrice = 0;
        (user?.carts || []).forEach((e) => {
            return totalPrice += e.total
        })
        return totalPrice
    };
    return (
        <div>
            {/* Navbar */}
            <div className=" position-fixed bottom-0 w-100  z-1 shadow-lg d-block d-lg-none text-center">
                <div className="d-flex align-items-center ">

                    <div className="w-25 icon-hover py-4">
                        <button className="navbar-toggler collapsed d-lg-none" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#navbar-default" aria-controls="navbar-default" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                className="bi bi-text-indent-left text-primary" viewBox="0 0 16 16">
                                <path
                                    d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708zM7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </button>
                    </div>


                    <div className=" w-25 ms-2 py-4  icon-hover">
                        <Link to="#" className="text-inherit" onClick={checkMode} >
                            <div className="text-center">
                                <div className="position-relative d-inline-block">
                                    {mode === 'dark' ?
                                        <div>
                                            <i className="bi bi-brightness-high fs-4"></i>
                                        </div> :
                                        <div>
                                            <i className="bi bi-moon fs-4"></i>
                                        </div>
                                    }
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="w-25 ms-2 py-4  icon-hover">
                        <Link className="text-inherit" onClick={() => setLoginShow(true)}>
                            <div className="text-center">
                                {!user && <div className="">
                                    <i className="bi bi-person-circle fs-4"></i>
                                </div>}
                                {user &&
                                    <div className="">
                                          <img src={user && user.image} alt='' className="rounded-circle" width={30} height={25} />
                                    </div>
                                }

                            </div>
                        </Link>
                    </div>
                    <div className="w-25 ms-2 py-4  icon-hover">
                        <Link className="text-inherit" to={'/orders'}>
                            <div className="text-center">
                                <div className="">
                                    <i className="bi bi-archive fs-4"></i>
                                </div>

                            </div>
                        </Link>
                    </div>
                    <div className="w-25 ms-2 py-4  icon-hover">
                        <Link data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" to="#offcanvasExample" role="button"
                            aria-controls="offcanvasRight" className="text-inherit">
                            <div className="text-center">
                                <div className="">
                                    <i className="bi bi-cart2 fs-4"></i>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="w-25 ms-2 py-4 icon-hover">
                        <Link className="text-inherit" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1" to="#offcanvasExample1"
                            aria-controls="offcanvasRight">
                            <i className="bi bi-bookmark-heart fs-4"></i>
                        </Link>

                    </div>
                </div>
            </div>
            {/* Login */}
            <Modal open={loginShow} onClose={() => setLoginShow(false)}>
                <ModalDialog sx={{ width: '30%', p: 4 }}>
                    <ModalClose />
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent sx={{ fontSize: 14 }}> Enter your email to get started.</DialogContent>
                    <hr />
                    <Stack spacing={2}>
                        <FormControl>
                            <LoginSocialGoogle
                                client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                onResolve={loginGoogle}
                                onReject={(err) => {
                                    console.log(err)
                                }}>
                                <div className="d-grid">
                                    <Link className="btn  border">
                                        <img alt="Logo" src={'https://mobile-store1234.netlify.app/static/media/google.e12914ad8afda3f6f2e8.png'} className="h-15px me-2" width={20} height={15} />
                                        Sign in Google
                                    </Link>
                                </div>
                            </LoginSocialGoogle>
                        </FormControl>
                        <FormControl>
                            <FormLabel><i className="bi bi-envelope me-2"></i>Email</FormLabel>
                            <input type="email" className="form-control border" name='email' placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />

                        </FormControl>
                        <FormControl>
                            <FormLabel><i className="bi bi-key me-2"></i>Password</FormLabel>
                            <div className="password-field position-relative">
                                <input type={passwordShown ? "text" : "password"} placeholder="Enter Password" className="form-control border" onChange={(e) => setPassword(e.target.value)} />

                                <span onClick={() => { passwordShown === true ? setPasswordShown(false) : setPasswordShown(true) }}>
                                    {
                                        passwordShown === true ? <i id="passwordToggler" className="bi bi-eye"></i>
                                            : <i id="passwordToggler" className="bi bi-eye-slash"></i>
                                    }
                                </span>
                            </div>
                        </FormControl>

                        <FormControl>
                            <button type="button" className="btn btn-primary"
                                onClick={() => {
                                    setLoading(true)
                                    dispatch(login({ email: email, password: password })).then((res) => {

                                        if (res.payload.status === 200) {
                                            localStorage.setItem("user", JSON.stringify(res.payload.result))
                                            dispatch(getAllUsers())
                                            navigate('/')
                                            setLoginShow(false)
                                        }
                                    })
                                    update()
                                    setLoading(false)
                                }}
                            >
                                {loading === true ?
                                    <>
                                        <div className="spinner-border spinner-border-sm" role="status">
                                        </div> Please wait...
                                    </> :
                                    <span className="indicator-label"> Login</span>
                                }
                            </button>
                        </FormControl>
                        <Typography fontSize={14} textAlign={'center'}>
                            Already have an account? <Link onClick={() => setLoginShow(false)} to="/register">Sign in</Link>
                        </Typography>
                    </Stack>

                </ModalDialog>
            </Modal>

            {/* Cart */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header border-bottom">
                    <div className="text-start">
                        <h5 id="offcanvasRightLabel" className="mb-1 fs-4">Shop Cart</h5>
                        <small>Products : {user && user.carts && user.carts.length > 0 ? user && user.carts && user.carts.length : 0}</small>
                    </div>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {user &&
                        <div className="">


                            <div className="d-flex justify-content-between mb-4">
                                <button  type="submit" className="btn btn-primary btn-sm"
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
                                > Make Purchase </button>
                                <span className='pt-1'>Result : $ {getTotalPrice()}</span>
                            </div>
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



                        </div>}
                    {!user && <div className="alert alert-danger text-center p-2" role="alert">
                        You must register now. Start <Link className="alert-link text-info" to={'/login'}>checkout now !</Link>
                    </div>}
                    {user && user.carts && user.carts.length <= 0 && <div className="alert alert-primary text-center p-2" role="alert">
                        Carts is Empty  : <Link className="alert-link text-info" to={'/shop'}>Continue Shopping</Link>
                    </div>}
                </div>
            </div>
            {/* Wishlist */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight1" aria-labelledby="offcanvasRightLabel1">
                <div className="offcanvas-header border-bottom">
                    <div className="text-start">
                        <h5 id="offcanvasRightLabel1" className="mb-1 fs-4">Wishlist</h5>
                        <small>Result : $ {getTotalPrice()}</small>
                    </div>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {user &&
                        <div className="">
                            <ul className="list-group list-group-flush">
                                {user && user.wishlist.map((row) => {
                                    return <li className="list-group-item py-3 ps-0 border-top border-bottom" key={row.id}>

                                        <div className="row align-items-center">

                                            <div className="col-6 col-md-6 col-lg-7">
                                                <div className="d-flex">
                                                    <img src={row.image} alt="Ecommerce" className="icon-shape icon-xxl" />
                                                    <div className="ms-3">

                                                        <Link className="text-inherit">
                                                            <h6 className="mb-0">{row.name}</h6>
                                                        </Link>
                                                        <span>
                                                            <small className="text-muted me-1"> {row.device}</small> &&
                                                            <small className="text-muted"> {row.brand}</small>
                                                        </span>

                                                        <div className="mt-2 small lh-1 text-primary">
                                                            {row.stock}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-2 col-md-2 col-lg-2">
                                                <span className="fw-bold text-danger">${row.priceDiscount}</span>
                                                <div className="text-decoration-line-through text-muted small">$ {row.price}</div>
                                            </div>
                                            <div className="col-3 text-lg-end text-start text-md-end col-md-3">
                                                <div className="input-group input-spinner">
                                                    <button type='submit' className="btn btn-primary btn-sm mb-2"
                                                        disabled={carts && carts.find(up => (up.productid === row.productid))}
                                                        onClick={() => {
                                                            let data = {
                                                                userId: user.id,
                                                                productid: row.productid,
                                                                quantity: 1
                                                            }
                                                            dispatch(createCart(data)).then((res) => {

                                                                dispatch(getAllUsers())
                                                                update()
                                                            })
                                                        }}
                                                    >
                                                        {carts && carts.find(c => c.productid === row.productid) ?
                                                            <><i className="bi bi-cart-check"></i> In Cart</>
                                                            : <><i className="bi bi-plus-lg"></i> Add Cart </>}
                                                    </button>
                                                    <Link className="text-decoration-none text-danger" onClick={() => {
                                                        dispatch(deleteWishlist(row.id)).then(() => {
                                                            dispatch(getAllUsers())
                                                            update()
                                                        })
                                                    }}>
                                                        <span className="me-1 align-text-bottom">
                                                            <i className="bi bi-trash3 me-1"></i>Remove
                                                        </span>
                                                    </Link>
                                                </div>

                                            </div>

                                        </div>

                                    </li>
                                })}


                            </ul>



                        </div>}
                    {!user && <div className="alert alert-danger text-center p-2" role="alert">
                        You must register now. Start <Link className="alert-link text-info" to={'/login'}>checkout now !</Link>
                    </div>}
                    {user && user.wishlist && user.wishlist.length <= 0 && <div className="alert alert-primary text-center p-2" role="alert">
                        Carts is Empty  : <Link className="alert-link text-info" to={'/shop'}>Continue Shopping</Link>
                    </div>}
                </div>
            </div>

            {/* Navbar Account */}
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasAccount" aria-labelledby="offcanvasAccountLabel">

                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasAccountLabel">Offcanvas</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="nav flex-column nav-pills nav-pills-dark">

                        <li className="nav-item">
                            <Link className={location.pathname === "/orders" ? "nav-link active" : "nav-link"} to="/orders">
                                <i className="bi bi-bag-dash me-2"></i>
                                Your Orders

                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/setting" ? "nav-link active" : "nav-link"} to="/setting"
                            >
                                <i className="bi bi-gear me-2"></i>
                                Settings

                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link className={location.pathname === "/payment" ? "nav-link active" : "nav-link"} to="/payment"
                            >
                                <i className="bi bi-credit-card me-2"></i>
                                Payment Method

                            </Link>

                        </li>


                    </ul>
                    <hr className="my-6 border" />
                    <div>

                        <ul className="nav flex-column nav-pills nav-pills-dark">

                            <li className="nav-item">
                                <Link className="nav-link" href="../index.html">
                                    <i className="feather-icon icon-log-out me-2"></i>
                                    Log out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Payment Account */}
            <div className="modal fade" id="paymentModal" tabIndex="-1" aria-labelledby="paymentModalLabel" style={{ display: "none" }} aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">

                        <div className="modal-header align-items-center d-flex">
                            <h5 className="modal-title" id="paymentModalLabel">Add New Payment Method</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <div>

                                <form className="row mb-4 needs-validation" noValidate="">
                                    <div className="mb-3 col-12 col-md-12 mb-4">
                                        <h5 className="mb-3">Credit / Debit card</h5>

                                        <div className="d-inline-flex">
                                            <div className="form-check me-2">
                                                <input type="radio" className="form-check-input" id="paymentRadioOne" name="paymentRadioOne" required="" />
                                                <label className="form-check-label" htmlFor="paymentRadioOne"><img src="../assets/images/payment/american-express.svg" alt="" /></label>
                                            </div>

                                            <div className="form-check me-2">
                                                <input type="radio" id="paymentRadioTwo" name="paymentRadioOne" className="form-check-input border" />
                                                <label className="form-check-label" htmlFor="paymentRadioTwo"><img src="../assets/images/payment/mastercard.svg" alt="" /></label>
                                            </div>


                                            <div className="form-check">
                                                <input type="radio" id="paymentRadioFour" name="paymentRadioOne" className="form-check-input border" />
                                                <label className="form-check-label" htmlFor="paymentRadioFour"><img src="../assets/images/payment/visa.svg" alt="" /></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-12 col-md-4">
                                        <label htmlFor="nameoncard" className="form-label">Name on card</label>
                                        <input id="nameoncard" type="text" className="form-control border" name="nameoncard" placeholder="Name" required="" />
                                        <div className="invalid-feedback">Please enter name.</div>
                                    </div>

                                    <div className="mb-3 col-12 col-md-4">
                                        <label htmlFor="validationCustomMonth" className="form-label">Month</label>
                                        <select className="form-select border" id="validationCustomMonth" required="">
                                            <option value="">Month</option>
                                            <option value="Jan">Jan</option>
                                            <option value="Feb">Feb</option>
                                            <option value="Mar">Mar</option>
                                            <option value="Apr">Apr</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="Aug">Aug</option>
                                            <option value="Sep">Sep</option>
                                            <option value="Oct">Oct</option>
                                            <option value="Nov">Nov</option>
                                            <option value="Dec">Dec</option>
                                        </select>
                                        <div className="invalid-feedback">Please select month.</div>
                                    </div>

                                    <div className="mb-3 col-12 col-md-4">
                                        <label htmlFor="validationCustomYear" className="form-label">Year</label>
                                        <select className="form-select border" id="validationCustomYear" required="">
                                            <option value="">Year</option>
                                            <option value="June">2022</option>
                                            <option value="July">2023</option>
                                            <option value="August">2024</option>
                                            <option value="Sep">2025</option>
                                            <option value="Oct">2026</option>
                                        </select>
                                        <div className="invalid-feedback">Please select year.</div>
                                    </div>

                                    <div className="mb-3 col-md-8 col-12">
                                        <label htmlFor="card-mask" className="form-label">Card Number</label>
                                        <input type="text" className="form-control border" id="card-mask" placeholder="xxxx-xxxx-xxxx-xxxx" required="" />
                                        <div className="invalid-feedback">Please enter card number.</div>
                                    </div>

                                    <div className="mb-3 col-md-4 col-12">
                                        <div className="mb-3">
                                            <label htmlFor="digit-mask" className="form-label">
                                                CVV Code
                                                <i className="fe fe-help-circle ms-1" data-bs-toggle="tooltip" data-placement="top" title="A 3 - digit number, typically printed on the back of a card."></i>
                                            </label>
                                            <input type="password" className="form-control border" name="cvv" id="digit-mask" placeholder="xxx" maxLength="3" required="" />
                                            <div className="invalid-feedback">Please enter cvv.</div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-12">
                                        <button className="btn btn-primary me-2" type="submit">Add New Card</button>
                                        <button className="btn btn-danger" type="submit" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </form>
                                <span>
                                    <strong>Note:</strong>
                                    that you can later remove your card at the account setting page.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const ViewProduct = ({ selectedProduct, update }) => {
    const { products, carts, user, wishlist } = useSelector((store) => store.data)
    const [selected, setSelected] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState(selectedProduct ? selectedProduct.color : "");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(singleProduct(selectedProduct && selectedProduct.id)).then((res) => {
            setSelected(res.payload && res.payload.result && res.payload.result[0])
        });
    }, [dispatch, selectedProduct]);

    const image = products ? products.filter((e) => e.id !== selected?.id &&
        e.brand === selected?.brand
        && e.device === selected?.device
    ) : []
    return <div className="modal fade" id="quickViewModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body p-8">
                    <div className="position-absolute top-0 end-0 me-3 mt-3">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Carousel showArrows={false} dynamicHeight={false} showIndicators={false} className='product'>
                                <div >
                                    <img src={selected && selected.image} alt='' />
                                </div>
                                {image && image.map((row) => {
                                    return <div className="thumbnails-img" key={row && row.id}>
                                        <img src={row && row.image} alt='' />
                                    </div >
                                })}

                            </Carousel>
                        </div>
                        <div className="col-md-6">
                            <div className="ps-lg-10 mt-6 mt-md-0">
                                <h1 className="mb-4">{selected && selected.name}</h1>
                                <Link to="#!" className="mb-4 d-block">{selected && selected.brand} && {selected && selected.device}</Link>
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
                                    <span className="fw-bold me-2">${selected && selected.priceDiscount}</span>
                                    <span className="text-decoration-line-through text-muted me-2">${selected && selected.price}</span>
                                    <span><small className="fs-6 ms-2 text-danger">26% Off</small></span>
                                </div>

                                <p className="mb-1">{selected && selected.description}</p>

                                <hr className="my-6 border" />
                                <div>
                                    <div className="row">
                                        <dt className="col-3">Availability:</dt>
                                        <dd className="col-9">{selected && selected.stock}</dd>

                                        <dt className="col-3">Color</dt>
                                        <dd className="col-9 text-capitalize">{selected && selected.color}</dd>

                                        <dt className="col-3">Brand</dt>
                                        <dd className="col-9">{selected && selected.brand}</dd>
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
                                            <option >Select</option>
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
                                            <button className="btn border" type="button"
                                                disabled={quantity > 1 ? false : true}
                                                onClick={() => setQuantity(quantity - 1)}>
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className="form-control form-control-sm text-center border pt-2">{quantity} </span>
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
                                            disabled={carts && carts.find(c => c.productid === selected?.id) && user && user.carts.find((c) => c.productid === selected?.id)}
                                            onClick={() => {
                                                if (!user) {
                                                    if (window.confirm("You Must login")) {
                                                        navigate('/login')
                                                    }
                                                } else {
                                                    let data = {
                                                        userId: user.id,
                                                        productid: selected.id,
                                                        quantity: 1
                                                    }
                                                    dispatch(createCart(data)).then((res) => {
                                                        dispatch(getAllUsers())
                                                        update()
                                                    })

                                                }
                                            }}
                                        >
                                            {carts && carts.find(c => c.productid === selected?.id) && user && user.carts.find((c) => c.productid === selected?.id) ?
                                                <><i className="bi bi-cart-check"></i> In Cart</>
                                                : <><i className="bi bi-plus-lg"></i> Add To Cart </>
                                            }
                                        </button>
                                    </div>
                                    <div className="col-md-4 col-4">
                                        <button className="btn active border"
                                            disabled={wishlist && wishlist.find(c => c.productid === selected?.id) && user && user.wishlist.find((c) => c.productid === selected?.id)}
                                            onClick={() => {
                                                if (!user) {
                                                    if (window.confirm("You Must login")) {
                                                        navigate('/login')
                                                    }
                                                } else {
                                                    let data = {
                                                        userId: user.id,
                                                        productid: selected.id
                                                    }
                                                    dispatch(createWishlist(data)).then((res) => {
                                                        dispatch(getAllUsers())
                                                        update()
                                                    })
                                                }
                                            }}>
                                            {wishlist && wishlist.find(c => c.productid === selected?.id) && user && user.wishlist.find((c) => c.productid === selected?.id) ?
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
            </div>
        </div>
    </div>
}
