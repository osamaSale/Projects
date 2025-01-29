import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../redux/api/users';
import { createCart } from '../../redux/api/carts';
import { deleteWishlist } from '../../redux/api/wishlist';

export const WishlistShop = ({ update }) => {
    const { user, carts } = useSelector((store => store.data))
    const dispatch = useDispatch()
    return (
        <section className="mt-8 mb-14">
            <div className="container-fluid">
            <div className="row mt-8">
                    <div className="col-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/shop-wide">Shop Wide</Link></li>

                                <li className="breadcrumb-item active" aria-current="page">Shop Wishlist</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-8">
                    <div className="card py-1 border-0 mb-8">
                        <div>
                            <h2 className="fw-bold">My Wishlist</h2>
                            <p className="mb-0">There are {user && user.wishlist && user.wishlist.length > 0 ? user && user.carts && user.carts.length : 0} in this wishlist.</p>
                        </div>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-lg-12">


                        <div className="table-responsive">
                            <table className="table text-nowrap table-with-checkbox">
                                <thead className="table-light">
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Brand</th>
                                        <th>Discount</th>
                                        <th>Color</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user && user.wishlist.map((row) => {
                                        return <tr>
                                            <td className="align-middle">
                                                <Link to="#"><img src={row.image} className="icon-shape icon-xxl" alt="" /></Link>
                                            </td>
                                            <td className="align-middle">
                                                <div>
                                                    <h5 className="fs-6 mb-0"><Link to={`/shop-single/${row.id}`} className="text-inherit">{row.name}</Link></h5>
                                                    <small className="text-muted me-1"> {row.device}</small>
                                                </div>
                                            </td>
                                            <td className="align-middle">{row.brand}</td>
                                            <td className="align-middle">${row.priceDiscount}</td>
                                            <td className="align-middle">{row.color}</td>
                                            <td className="align-middle"><span className="badge bg-success">{row.stock}</span></td>

                                            <td className="align-middle">
                                                <button className="btn btn-primary btn-sm"
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
                                            </td>
                                            <td className="align-middle">
                                                <Link
                                                    disabled={carts && carts.find(up => (up.productid === row.productid))}
                                                    className=" text-decoration-none text-danger" onClick={() => {
                                                        dispatch(deleteWishlist(row.id)).then(() => {
                                                            dispatch(getAllUsers())
                                                            update()
                                                        })
                                                    }}>
                                                    <i className="bi bi-trash3 me-1"></i>Remove
                                                </Link>
                                            </td>
                                        </tr>
                                    })}


                                </tbody>
                            </table>
                            {!user && <div className="alert alert-danger text-center p-2" role="alert">
                                You must register now. Start <Link className="alert-link text-info" to={'/login'}>checkout now !</Link>
                            </div>}
                            {user && user.wishlist && user.wishlist.length <= 0 && <div className="alert alert-primary text-center p-2" role="alert">
                                Carts is Empty  : <Link className="alert-link text-info" to={'/shop'}>Continue Shopping</Link>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

