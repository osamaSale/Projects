import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Insert } from "../Form/carts/Insert"
import { Edit } from "../Form/carts/Edit"
import { deleteCart, searchCarts } from "../../../redux/api/carts"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { downloadExcel } from "react-export-table-to-excel";
import { PDFBrands } from '../PDF/PDFBrands';
export const Carts = ({ update }) => {
    const { carts } = useSelector((store) => store.data)
    // ================ Add Carts =======================// 
    const [openCart, setOpenCart] = useState(false);
    // ================ Edit Carts ====================== //
    const [openEditCart, setEditOpenCart] = useState(false)
    const [selectedEdit, setSelectedEdit] = useState(null);
    const [search, setSearch] = useState("")
    const header = ["ID", "Name"];

    function handleDownloadExcel() {
        downloadExcel({
            fileName: "react-export-table-to-excel -> downloadExcel method",
            sheet: "react-export-table-to-excel",
            tablePayload: {
                header,
                body: carts,
            },
        });
    }
    const dispatch = useDispatch()
    return (
        <section className="container">
        <div className="hstack gap-3 mb-4">
                <div className="">
                    <h4>Carts / <Link className="text-inherit"> {carts && carts.length > 0 ? carts.length : 0}</Link></h4>
                </div>

                <div className="ms-auto">
                    <div className="dropdown">
                        <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Download
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <PDFDownloadLink document={<PDFBrands carts={carts} />} fileName="somename.pdf" className="dropdown-item">
                                    {({ loading }) => (loading ? 'Loading document...' :
                                        <><i className="bi bi-filetype-pdf me-2"></i> PDF</>
                                    )}
                                </PDFDownloadLink>

                            </li>
                            <li>
                                <Link className="dropdown-item" onClick={handleDownloadExcel}>
                                    <i className="bi bi-file-earmark-excel me-2"></i> excel
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12 col-12 mb-5">
                    <div className="card h-100 card-lg">
                    <div className="px-2 py-6">
                            <div className="row d-flex justify-content-between">
                                <div className="col-md-10 col-md-6 col-12 mb-2 mb-lg-0">
                                    <div className="input-group">
                                        <input className="form-control border" type="search"
                                            placeholder="Search for Name"
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyUp={() => {
                                                if (search === "") {
                                                    update();
                                                } else {
                                                    dispatch(searchCarts(search))
                                                }
                                            }}
                                        />
                                        <button className="btn btn-primary" type="button" id="button-addon2"><i
                                            className="bi bi-search"></i></button>
                                    </div>
                                </div>

                                <div className='col-md'>
                                    <Link className="btn btn-primary w-100" onClick={() => setOpenCart(true)}><i className="bi bi-plus-lg me-2"></i>Add Cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0 px-2 py-5 main">
                            <section className="table__body">
                                {carts && carts.length > 0 ?
                                    <div className="table-responsive">
                                        <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                                            <thead className="bg-primary text-white">
                                                <tr>

                                                    <th scope="col">Image</th>
                                                    <th scope="col">userId</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Brand</th>
                                                    <th scope="col">Device</th>
                                                    <th scope="col">Color</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Discount</th>
                                                    <th scope="col">Stock</th>
                                                    <th scope="col">quantity</th>
                                                    <th scope="col">Total</th>
                                                    <th scope="col">Actions</th>
                                                    <th scope="col">Remove</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {carts && carts.map((row, index) => {
                                                    return <tr key={index} className='border'>
                                                        <td >
                                                            <img src={row && row.image} className="rounded-circle" alt="" height={35} width={35} />
                                                        </td>
                                                        <td >{row && row.userId}</td>
                                                        <td >{row && row.name}</td>
                                                        <td >{row && row.brand}</td>
                                                        <td >{row && row.device}</td>
                                                        <td >{row && row.color}</td>
                                                        <td >{row && row.price}</td>
                                                        <td >{row && row.priceDiscount}</td>
                                                        <td >{row && row.stock}</td>
                                                        <td >{row && row.quantity}</td>
                                                        <td >{row && row.total}</td>
                                                        <td >
                                                            <button type='submit' className="btn" onClick={() => {
                                                                setEditOpenCart(true);
                                                                setSelectedEdit(row)
                                                            }}>
                                                                <i className="fa-solid fa-pen-to-square text-primary"></i>
                                                            </button>
                                                        </td>
                                                        <td >
                                                            <button className="btn" onClick={() => {
                                                                if (window.confirm("Are you sure you want to delete this?")) {
                                                                    dispatch(deleteCart(row.id)).then(() => update())
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
                                        <h5 className='text-center'> Carts Is Empty </h5>
                                    </div>}
                                {openCart && (
                                    <Insert
                                        openCarts={openCart}
                                        setOpenCarts={setOpenCart}
                                        update={update}
                                    />
                                )}
                                {openEditCart && (
                                    <Edit
                                        openEditCart={openEditCart}
                                        setEditOpenCart={setEditOpenCart}
                                        cart={selectedEdit}
                                        update={update}
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

