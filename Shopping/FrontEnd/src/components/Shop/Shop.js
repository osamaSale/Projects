import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProducts } from '../../redux/api/products';
import { ShopCard1, ShopCard2, ShopCard3 } from './ShopCard';
import { ascending, descending, highestPrice, lowestPrice } from '../../redux/slice/slice';


export const Shop = ({ update }) => {
    const { products, devices ,findProductBrand } = useSelector((store => store.data))
    const [selectedBrand, setSelectedBrand] = useState("")
    const brand = (findProductBrand || []).filter((b) => b.brand === selectedBrand)
    console.log(brand)
    const [selected, setSelected] = useState(false)
    const [search, setSearch] = useState("")
    const [toggleState, settoggleState] = useState(1)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const dispatch = useDispatch()

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);



    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="mt-8 mb-lg-14 mb-8">
            <div className="container-fluid">
                <div className="row mt-8">
                    <div className="col-12">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Shop Wide</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="row gx-10 mt-8">
                    <div className="col-lg-3 col-md-4 mt-8">
                        <div className="offcanvas offcanvas-start offcanvas-collapse w-md-50 " tabIndex="-1" id="offcanvasCategory" aria-labelledby="offcanvasCategoryLabel">
                            <div className="offcanvas-header d-lg-none">
                                <h5 className="offcanvas-title" id="offcanvasCategoryLabel">Filter</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>

                            <div className="offcanvas-body ps-lg-2 pt-lg-0">
                                <div className="mb-8">
                                    <h5 className="mb-4">Filters</h5>

                                    <input className="form-control border" type="text" placeholder="Search for products"
                                        onChange={(e) => { setSearch(e.target.value) }}
                                        onKeyUp={() => {
                                            if (search === "") {
                                                update();
                                            } else {
                                                dispatch(searchProducts(search))
                                            }
                                        }} />


                                </div>
                                <div className="mb-8">
                                    <h5 className="mb-3">Brands</h5>

                                    <ul className="nav nav-category" id="categoryCollapseMenu">

                                        <li className="nav-item border-bottom w-100 " >
                                            <Link to="#" className="nav-link " onClick={() => update()}>

                                                <span className="d-flex align-items-center">
                                                    <img src='assets/images/brands/phone.svg' alt='' />
                                                    <span className="ms-2">All Products</span>
                                                </span><i className="fa fa-arrow-right"></i>
                                            </Link>


                                        </li>
                                       
                                        <li className="nav-item border-bottom w-100 " >
                                            <Link to="#" className="nav-link collapsed" data-bs-toggle="collapse"
                                                data-bs-target="#categoryFlushOne" aria-expanded="false" aria-controls="categoryFlushOne" onClick={() => {setSelectedBrand("Apple")
                                              }
                                                }>

                                                <span className="d-flex align-items-center">
                                                    <img src='assets/images/brands/apple.svg' alt='' />
                                                    <span className="ms-2">Apple</span>
                                                </span><i className="fa fa-arrow-right"></i>
                                            </Link>

                                            <div id="categoryFlushOne" className="accordion-collapse collapse" data-bs-parent="#categoryCollapseMenu">
                                                <div>
                                                    <ul className="nav flex-column ms-3">

                                                        {brand && brand.map((row) => {
                                                            return <li key={row.id} className="nav-item">
                                                                <button className="nav-link"
                                                                    onClick={() => {
                                                                        console.log("dcvmznv")
                                                                        dispatch(
                                                                            searchProducts(row.name)).then((res) => {
                                                                                console.log(res)
                                                                            })
                                                                    }}
                                                                >{row.name}</button>
                                                            </li>
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>

                                        </li>
                                        <li className="nav-item border-bottom w-100 " >
                                            <Link to="#" className="nav-link collapsed" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree" onClick={() => setSelectedBrand("Samsung")}>
                                                <span className="d-flex align-items-center">
                                                    <img src='assets/images/brands/samsung.svg' alt='' />
                                                    <span className="ms-2">Samsung</span>
                                                </span>
                                                <i className="fa fa-arrow-right"></i>
                                            </Link>


                                            <div id="flush-collapseThree" className="accordion-collapse collapse"
                                                data-bs-parent="#categoryCollapseMenu">
                                                <div>

                                                    <ul className="nav flex-column ms-3">
                                                        {brand && brand.map((row) => {
                                                            return <li key={row.id} className="nav-item"><Link className="nav-link"
                                                                onClick={() => { dispatch(searchProducts(row.name)) }}>{row.name}</Link>
                                                            </li>
                                                        })}

                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item border-bottom w-100 ">
                                            <Link to="#" className="nav-link collapsed" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour" onClick={() => setSelectedBrand("Huawei")}>
                                                <span className="d-flex align-items-center">
                                                    <img src='assets/images/brands/huawei.svg' alt='' />
                                                    <span className="ms-2"> Huawei  </span>
                                                </span>
                                                <i className="fa fa-arrow-right"></i>
                                            </Link>


                                            <div id="flush-collapseFour" className="accordion-collapse collapse"
                                                data-bs-parent="#categoryCollapseMenu">
                                                <div>
                                                    <ul className="nav flex-column ms-3">
                                                        {brand && brand.map((row) => {
                                                            return <li key={row.id} className="nav-item"><Link className="nav-link"
                                                                onClick={() => { dispatch(searchProducts(row.name)) }}>{row.name}</Link>
                                                            </li>
                                                        })}

                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item border-bottom w-100 " >
                                            <Link to="#" className="nav-link collapsed" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive" onClick={() => setSelectedBrand("Infinix")}>
                                                <span className="d-flex align-items-center" onClick={() => setSelectedBrand("Infinix")}>
                                                    <img src='assets/images/brands/Infinix.svg' alt='' />
                                                    <span className="ms-2">Infinix </span>
                                                </span>
                                                <i className="fa fa-arrow-right"></i>
                                            </Link>


                                            <div id="flush-collapseFive" className="accordion-collapse collapse"
                                                data-bs-parent="#categoryCollapseMenu">
                                                <div>

                                                    <ul className="nav flex-column ms-3">

                                                        {brand && brand.map((row) => {
                                                            return <li key={row.id} className="nav-item"><Link className="nav-link"
                                                                onClick={() => { dispatch(searchProducts(row.name)) }}>{row.name}</Link>
                                                            </li>
                                                        })}
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item border-bottom w-100 " >
                                            <Link to="#" className="nav-link collapsed" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix" onClick={() => setSelectedBrand("Vivo")}>
                                                <span className="d-flex align-items-center">
                                                    <img src='assets/images/brands/vivo.svg' alt='' />
                                                    <span className="ms-2">Vivo</span>
                                                </span>
                                                <i className="fa fa-arrow-right"></i>
                                            </Link>


                                            <div id="flush-collapseSix" className="accordion-collapse collapse"
                                                data-bs-parent="#categoryCollapseMenu">
                                                <div>

                                                    <ul className="nav flex-column ms-3">
                                                        {brand && brand.map((row) => {
                                                            return <li key={row.id} className="nav-item"><Link className="nav-link" onClick={() => { dispatch(searchProducts(row.name)) }}>{row.name}</Link>
                                                            </li>
                                                        })}
                                                    </ul>

                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item border-bottom w-100 " >
                                            <Link to="#" className="nav-link collapsed" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven" onClick={() => setSelectedBrand("Honor")}>
                                                <span className="d-flex align-items-center" >

                                                    <img src='assets/images/brands/honor.svg' alt='' />
                                                    <span className="ms-2">Honor</span>
                                                </span>
                                                <i className="fa fa-arrow-right"></i>
                                            </Link>


                                            <div id="flush-collapseSeven" className="accordion-collapse collapse"
                                                data-bs-parent="#categoryCollapseMenu">
                                                <div>

                                                    <ul className="nav flex-column ms-3">
                                                        {brand && brand.map((row) => {
                                                            return <li key={row.id} className="nav-item"><Link className="nav-link" onClick={() => { dispatch(searchProducts(row.name)) }}>{row.name}</Link>
                                                            </li>
                                                        })}

                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item border-bottom w-100 ">
                                            <Link className="nav-link" data-bs-toggle="collapse"
                                                data-bs-target="#flush-collapseEigth" aria-expanded="false"
                                                aria-controls="flush-collapseEigth" onClick={() => setSelectedBrand("Nokia")}>
                                                <span className="d-flex align-items-center">
                                                    <img src='assets/images/brands/nokia.svg' alt='' />
                                                    <span className="ms-2"> Nokia</span>
                                                </span>
                                                <i className="fa fa-arrow-right"></i></Link>


                                            <div id="flush-collapseEigth"
                                                className="accordion-collapse collapse"
                                                data-bs-parent="#categoryCollapseMenu">
                                                <div>

                                                    <ul className="nav flex-column ms-8">

                                                        {brand && brand.map((row) => {
                                                            return <li key={row.id} className="nav-item"><Link className="nav-link" onClick={() => { dispatch(searchProducts(row.name)) }}>{row.name}</Link>
                                                            </li>
                                                        })}

                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mb-8">
                                    <h5 className="mb-3">Devices</h5>
                                    {devices && devices.map((row) => {
                                        return <div className="form-check mb-2 my-4" key={row.id}>
                                            <input className="form-check-input" type="checkbox"
                                                onClick={() => {
                                                    if (selected === false) {
                                                        setSelected(true)
                                                        dispatch(searchProducts(row.name))
                                                    } else {
                                                        setSelected(false)
                                                        update()
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label">
                                                {row.name}
                                            </label>
                                        </div>
                                    })}
                                </div>


                                <div className="mb-8 position-relative">

                                    <img src="assets/images/slider/slider-4.jpg" alt=""
                                        className="img-fluid rounded " />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-12 ">
                        <div className="d-lg-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-lg-0">
                                <p className="mb-0"> <span>{products && products.length > 0 ? products.length : 0} </span> Products found </p>
                            </div>


                            <div className="d-md-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>

                                        <Link onClick={() => settoggleState(1)} className={toggleState === 1 ? "me-3 active" : "text-muted me-3"}><i className="bi bi-list-ul"></i></Link>
                                        <Link onClick={() => settoggleState(2)} className={toggleState === 2 ? "me-3 active" : "text-muted me-3"}><i className="bi bi-grid"></i></Link>
                                        <Link onClick={() => settoggleState(3)} className={toggleState === 3 ? "me-3 active" : "text-muted me-3"}><i className="bi bi-grid-3x3-gap"></i></Link>
                                    </div>
                                    <div className="ms-2 d-lg-none">
                                        <Link className="btn btn-outline-gray-400 text-muted border" data-bs-toggle="offcanvas" to="#offcanvasCategory" role="button" aria-controls="offcanvasCategory">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                className="feather feather-filter me-2">
                                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                                            </svg>
                                            Filters
                                        </Link>
                                    </div>
                                </div>

                                <div className="d-flex mt-2 mt-lg-0">
                                    <div className="me-2 flex-grow-1">

                                        <select className="form-select border"
                                            onClick={(e) => {
                                                if (e.target.value === "1") {
                                                    dispatch(highestPrice())
                                                } else if (e.target.value === "2") {
                                                    dispatch(lowestPrice())
                                                } else if (e.target.value === "3") {
                                                    dispatch(ascending())
                                                } else if (e.target.value === "4") {
                                                    dispatch(descending())
                                                } else {
                                                    update()
                                                }

                                            }}>
                                            <option value="0">Sort By</option>
                                            <option value="1">Highest Price</option>
                                            <option value="2">Lowest Price</option>
                                            <option value="3">Ascending (A - Z)</option>
                                            <option value="4">Descending (Z - A)</option>
                                        </select>
                                    </div>


                                </div>

                            </div>
                        </div>
                        {toggleState === 1 ? <ShopCard1 currentPosts={currentPosts} update={update} /> :
                            toggleState === 2 ? <ShopCard2 currentPosts={currentPosts} update={update} /> :
                                toggleState === 3 ? <ShopCard3 currentPosts={currentPosts} update={update} /> :
                                    null}

                        <div className="row mt-8">
                            <div className="col">

                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item disabled">
                                            <Link className="page-link border  mx-1" to="#" aria-label="Previous"
                                                onClick={() => {
                                                    if (currentPage !== 1) {
                                                        setCurrentPage(currentPage - 1)
                                                    }

                                                }}
                                            >
                                                <i className="bi bi-arrow-left"></i>
                                            </Link>
                                        </li>
                                        {pageNumbers.map(number => (
                                            <li key={number} onClick={() => paginate(number)} className={number === currentPage ? "page-item active" : "page-item"}>
                                                <Link className="page-link" to={'/shop'}>  {number}</Link>
                                            </li>

                                        ))}

                                        <li className="page-item">
                                            <Link className="page-link mx-1" to="#" aria-label="Next"
                                                onClick={() => {

                                                    if (indexOfLastPost === 9) {
                                                        setCurrentPage(currentPage + 1)
                                                    }

                                                }}
                                            >
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

