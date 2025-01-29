import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Insert } from "../Form/brands/Insert"
import { Edit } from "../Form/brands/Edit"
import { deleteBrand , searchBrand} from "../../../redux/api/brands"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { downloadExcel } from "react-export-table-to-excel";
import { PDFBrands } from '../PDF/PDFBrands';
export const Brands = ({ update }) => {
    const { brands } = useSelector((store) => store.data)
    // ================ Add Brands =======================// 
    const [openBrand, setOpenBrand] = useState(false);
    // ================ Edit Brands ====================== //
    const [openEditBrand, setEditOpenBrand] = useState(false)
    const [selectedEdit, setSelectedEdit] = useState(null);
    const [search, setSearch] = useState("")
    const header = ["ID", "Name"];

    function handleDownloadExcel() {
        downloadExcel({
            fileName: "react-export-table-to-excel -> downloadExcel method",
            sheet: "react-export-table-to-excel",
            tablePayload: {
                header,
                body: brands,
            },
        });
    }
    let dispatch = useDispatch()
    return (
        <section className="container">
            <div className="hstack gap-3 mb-4">
                <div className="">
                    <h4>Brands / <Link className="text-inherit"> {brands && brands.length > 0 ? brands.length : 0}</Link></h4>
                </div>

                <div className="ms-auto">
                    <div className="dropdown">
                        <button className="btn border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Download
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <PDFDownloadLink document={<PDFBrands brands={brands} />} fileName="somename.pdf" className="dropdown-item">
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
                                                    dispatch(searchBrand(search))
                                                }
                                            }}
                                        />
                                        <button className="btn btn-primary" type="button" id="button-addon2"><i
                                            className="bi bi-search"></i></button>
                                    </div>
                                </div>

                                <div className='col-md'>
                                    <Link className="btn btn-primary w-100" onClick={() => setOpenBrand(true)}><i className="bi bi-plus-lg me-2"></i>Add Brand</Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body p-0 px-2 py-5 main">
                            <section className="table__body">
                                {brands && brands.length > 0 ?
                                    <div className="table-responsive">
                                        <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                                            <thead className="bg-primary text-white">
                                                <tr>
                                                    <th scope="col">Id</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Actions</th>
                                                    <th scope="col">Remove</th>
                                                </tr>

                                            </thead>
                                            <tbody>
                                                {brands && brands.map((row, index) => {
                                                    return <tr key={index} className='border'>
                                                        <td >{row && row.id}</td>
                                                        <td >{row && row.name}</td>
                                                        <td >
                                                            <button type='submit' className="btn" onClick={() => {
                                                                setEditOpenBrand(true);
                                                                setSelectedEdit(row)
                                                            }}>
                                                                <i className="fa-solid fa-pen-to-square text-primary"></i>
                                                            </button>
                                                        </td>
                                                        <td >
                                                            <button className="btn" onClick={() => {
                                                                if (window.confirm("Are you sure you want to delete this?")) {
                                                                    dispatch(deleteBrand(row.id)).then(() => update())
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
                                        <h5 className='text-center'> Brands Is Empty </h5>
                                    </div>}
                            </section>
                        </div>

                    </div>

                </div>

            </div>
            {openBrand && (
                <Insert
                    openBrand={openBrand}
                    setOpenBrand={setOpenBrand}
                    update={update}
                />
            )}
            {openEditBrand && (
                <Edit
                    openEditBrand={openEditBrand}
                    setEditOpenBrand={setEditOpenBrand}
                    brand={selectedEdit}
                    update={update}
                />
            )}
        </section>
    );
}

