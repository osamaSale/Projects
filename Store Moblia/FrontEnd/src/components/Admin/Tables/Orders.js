import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Insert } from "../Form/orders/Insert"
import { Edit } from "../Form/orders/Edit"
import { Products } from "../Form/orders/products"
import { deleteOrder } from "../../../redux/api/orders"

export const Orders = ({ update }) => {
    const { orders } = useSelector((store) => store.data)
    // ================ Add Order =======================// 
    const [openOrder, setOpenOrder] = useState(false);
    // ================ Edit Carts ====================== //
    const [openEditOrder, setEditOpenOrder] = useState(false)
    const [selectedEdit, setSelectedEdit] = useState(null);
    // ================ Order Products ======================== //
    const [openOrderProduct, setOpenOrderProduct] = useState(false)
    const [selectedOrderProduct, setSelectedOrderProduct] = useState([])
    const dispatch = useDispatch()
    return (
        <section className="container">
            <div className="row mb-5">
                <div className="col-md-12">
                    <div className="d-md-flex justify-content-between ">
                        <div className="mb-1">
                            <h4>Orders</h4>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0">
                                    <li className="breadcrumb-item">
                                        <Link className="text-inherit">Number</Link>
                                    </li>
                                    <li className="breadcrumb-item ">{orders && orders.length > 0 ? orders.length : 0}</li>
                                </ol>
                            </nav>
                        </div>
                        <div>
                            <div className="col-md d-flex justify-content-end">
                                <Link className="btn btn-primary w-100" onClick={() => setOpenOrder(true)}><i className="bi bi-plus me-2"></i>Add Order</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12 col-12 mb-5">
                    <div className="card h-100 card-lg">
                        <div className="px-2 py-6">
                            <div className="row d-flex justify-content-between">
                                <div className="col-lg-5 col-md-6 col-12  mb-lg-0">
                                    <div className="input-group">
                                        <input className="form-control border" type="search"
                                            placeholder="Search for products" />
                                        <button className="btn btn-primary" type="button" id="button-addon2"><i
                                            className="bi bi-search"></i></button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="card-body p-0 px-2 py-5 main">
                            <section className="table__body">
                                {orders && orders.length > 0 ?
                                    <div className="table-responsive">
                                        <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th scope="col">orderid</th>
                                                    <th scope="col">userId</th>
                                                    <th scope="col">Checkout</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Products</th>
                                                    <th scope="col">Actions</th>
                                                    <th scope="col">Remove</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {orders && orders.map((row, index) => {
                                                    return <tr key={index} className='border'>
                                                        <td >{row && row.orderid}</td>
                                                        <td >{row && row.userId}</td>
                                                        <td >{row && row.checkout}</td>
                                                        <td >{row && row.date}</td>
                                                        <td >{row && row.total}</td>
                                                        <td >
                                                            <button type='submit' className="btn" onClick={() => {
                                                                setOpenOrderProduct(true);
                                                                setSelectedOrderProduct(row.products)
                                                            }}>
                                                                <i className="bi bi-basket text-info"></i>
                                                            </button>
                                                        </td>
                                                        <td >
                                                            <button type='submit' className="btn" onClick={() => {
                                                                setEditOpenOrder(true);
                                                                setSelectedEdit(row)
                                                            }}>
                                                                <i className="fa-solid fa-pen-to-square text-primary"></i>
                                                            </button>
                                                        </td>
                                                        <td >
                                                            <button className="btn" onClick={() => {
                                                                if (window.confirm("Are you sure you want to delete this?")) {
                                                                    dispatch(deleteOrder(row.orderid)).then(() => update())
                                                                }
                                                            }}>
                                                                <i className="fa-solid fa-trash icon-trash-2 text-danger"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                })}
                                            </tbody>
                                        </table>
                                    </div> :
                                    <div className="justify-content-md-center pt-4 pb-4">
                                        <h5 className='text-center'> Orders Is Empty </h5>
                                    </div>}
                                {openOrder && (
                                    <Insert
                                        openOrder={openOrder}
                                        setOpenOrder={setOpenOrder}
                                        update={update}
                                    />
                                )}
                                {openEditOrder && (
                                    <Edit
                                        openEditOrder={openEditOrder}
                                        setEditOpenOrder={setEditOpenOrder}
                                        order={selectedEdit}
                                        update={update}
                                    />
                                )}
                                {openOrderProduct && (
                                    <Products
                                        openOrderProduct={openOrderProduct}
                                        setOpenOrderProduct={setOpenOrderProduct}
                                        orders={selectedOrderProduct}
                                    />
                                )}
                            </section>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
