import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavbarVertical } from './NavbarVertical';
import { useSelector } from 'react-redux';
import { Products } from "../Admin/Form/orders/products"
export const Orders = ({ update }) => {
    const { user } = useSelector((store) => store.data)
    const [openOrderProduct, setOpenOrderProduct] = useState(false)
    const [selectedOrderProduct, setSelectedOrderProduct] = useState([])
    return (
        <section>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center d-md-none py-4">

                            <h3 className="fs-5 mb-0">Account Setting</h3>

                            <button className="btn btn-outline-gray-400 text-muted d-md-none btn-icon btn-sm ms-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAccount" aria-controls="offcanvasAccount">
                                <i className="bi bi-text-indent-left fs-3"></i>
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-4 col-12 border-end d-none d-md-block">
                        <NavbarVertical />
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                        <div className="py-6 p-md-6 p-lg-10">

                            <h2 className="mb-6">Your Orders</h2>

                            <div className="table-responsive-xxl border-0">

                                <table className="table mb-0 text-nowrap table-centered">

                                    <thead className='bg-primary text-light'>
                                        <tr>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Order</th>
                                            <th>Date</th>
                                            <th>Items</th>
                                            <th>Status</th>
                                            <th>Amount</th>
                                            <th>Products</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user && user.order && user.order.map((row, index) => {
                                            return <tr key={index}>
                                                <td className="align-middle border-top-0 w-0">
                                                    <Link to="#"><img src={user && user.image} alt="Ecommerce" className="rounded-circle" height={35} width={35} /></Link>
                                                </td>
                                                <td className="align-middle border-top-0">
                                                    <Link to="#" className="fw-semibold text-inherit">
                                                        <h6 className="mb-0">{user.name}</h6>
                                                    </Link>

                                                </td>
                                                <td className="align-middle border-top-0">
                                                    <Link to="#" className="text-inherit">#{row && row.orderid}</Link>
                                                </td>
                                                <td className="align-middle border-top-0">{row && row.date}</td>
                                                <td className="align-middle border-top-0">{row && row.products && row.products.length}</td>
                                                <td className="align-middle border-top-0">
                                                    <span className="badge bg-warning">{row && row.checkout}</span>
                                                </td>
                                                <td className="align-middle border-top-0">$ {row && row.total}</td>
                                                <td className="text-muted align-middle border-top-0 text-center">
                                                    <Link to="#" className="text-inherit" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="View"
                                                        onClick={() => {
                                                            setOpenOrderProduct(true);
                                                            setSelectedOrderProduct(row.products)
                                                        }}
                                                    >
                                                        {openOrderProduct === false ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                                    </Link>
                                                </td>

                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                                {!user && <div className="alert alert-danger text-center p-2" role="alert">
                                    You must register now. Start <Link className="alert-link text-info" to={'/login'}>checkout now !</Link>
                                </div>}
                                {user && user.order && user.order.length <= 0 && <div className="alert alert-primary text-center mt-4 p-2" role="alert">
                                    Orders is Empty  : <Link className="alert-link text-info" to={'/shop'}>Continue Shopping</Link>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openOrderProduct && (
                <Products
                    openOrderProduct={openOrderProduct}
                    setOpenOrderProduct={setOpenOrderProduct}
                    orders={selectedOrderProduct}
                />
            )}
        </section>

    );
}

