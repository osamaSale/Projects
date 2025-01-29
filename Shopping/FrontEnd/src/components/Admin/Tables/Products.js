import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProducts , searchProducts} from '../../../redux/api/products';
import { Insert } from "../Form/products/Insert"
import { Edit } from "../Form/products/Edit"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { downloadExcel } from "react-export-table-to-excel";
import { PDFBrands } from '../PDF/PDFBrands';
export const Products = ({ update }) => {
    const { products } = useSelector((store) => store.data)
    // ================ Add User =======================// 
    const [openProduct, setOpenProduct] = useState(false);
    const [openEditProduct, setOpenEditProduct] = useState(false)
    const [selectedEdit, setSelectedEdit] = useState(null);
    const [search, setSearch] = useState("")
    const header = ["ID", "Name"];

    function handleDownloadExcel() {
        downloadExcel({
            fileName: "react-export-table-to-excel -> downloadExcel method",
            sheet: "react-export-table-to-excel",
            tablePayload: {
                header,
                body: products,
            },
        });
    }
    const dispatch = useDispatch()
    return (
        <section className="container">
            <div className="hstack gap-3 mb-4">
                <div className="">
                    <h4>Products / <Link className="text-inherit"> {products && products.length > 0 ? products.length : 0}</Link></h4>
                </div>

                <div className="ms-auto">
                    <div className="dropdown">
                        <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Download
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <PDFDownloadLink document={<PDFBrands products={products} />} fileName="somename.pdf" className="dropdown-item">
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
                <div className="col-xl-12 col-12">
                    <div className="card h-100 card-lg">
                    <div className="px-2 py-6">
                            <div className="row d-flex justify-content-between">
                                <div className="col-md-10 col-md-6 col-12 mb-2 mb-lg-0">
                                    <div className="input-group">
                                        <input className="form-control border" type="search"
                                            placeholder="Search for user"
                                            onChange={(e) => setSearch(e.target.value)}
                                            onKeyUp={() => {
                                                if (search === "") {
                                                    update();
                                                } else {
                                                    dispatch(searchProducts(search))
                                                }
                                            }}
                                        />
                                        <button className="btn btn-primary" type="button" id="button-addon2"><i
                                            className="bi bi-search"></i></button>
                                    </div>
                                </div>

                                <div className='col-md'>
                                    <Link className="btn btn-primary w-100" onClick={() => setOpenProduct(true)}><i className="bi bi-plus-lg me-2"></i>Add Product</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0 px-2 py-5 main">
                            <section className="table__body">
                                {products && products.length > 0 ?
                                    <div className="table-responsive">
                                        <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                                            <thead className="bg-primary text-white">
                                                <tr>

                                                    <th scope="col">Image</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Brand</th>
                                                    <th scope="col">Device</th>
                                                    <th scope="col">Color</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Discount</th>
                                                    <th scope="col">Stock</th>
                                                    <th scope="col">Actions</th>
                                                    <th scope="col">Remove</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {products && products.map((row, index) => {
                                                    return <tr key={index} className='border'>

                                                        <td >
                                                            <img src={row && row.image} className="rounded-circle" alt="" height={35} width={35} />
                                                        </td>
                                                        <td >{row && row.name}</td>
                                                        <td >{row && row.brand}</td>
                                                        <td >{row && row.device}</td>
                                                        <td >{row && row.color}</td>
                                                        <td >{row && row.price}</td>
                                                        <td >{row && row.priceDiscount}</td>
                                                        <td >{row && row.stock}</td>
                                                        <td >
                                                            <button type='submit' className="btn" onClick={() => {
                                                                setOpenEditProduct(true);
                                                                setSelectedEdit(row)
                                                            }}>
                                                                <i className="fa-solid fa-pen-to-square text-primary"></i>
                                                            </button>
                                                        </td>
                                                        <td >
                                                            <button className="btn" onClick={() => {
                                                                if (window.confirm("Are you sure you want to delete this?")) {
                                                                    dispatch(deleteProducts(row.id)).then(() => update())
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
                                        <h5 className='text-center'> Products Is Empty </h5>
                                    </div>}
                            </section>
                        </div>

                    </div>

                </div>

            </div>
            {openProduct && (
                <Insert
                    openProduct={openProduct}
                    setOpenProduct={setOpenProduct}
                    update={update}
                />
            )}
            {openEditProduct &&
                <Edit
                    openEditProduct={openEditProduct}
                    setOpenEditProduct={setOpenEditProduct}
                    product={selectedEdit}
                    update={update}
                />
            }
        </section>
    );
}

