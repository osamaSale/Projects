import React from 'react';
import { useSelector } from 'react-redux';
export const Dashboard = () => {
    const { users, brands, products, devices, contact, news, wishlist, carts, orders } = useSelector((store) => store.data)
    return (
        <section className="container">
            <div className="row mb-8">
                <div className="col-md-12">
                    <div className="card bg-light border-0 rounded-2"
                        style={{ backgroundImage: 'url(assets/images/slider/slider-3.jpg)', backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "right" }}>
                        <div className="card-body text-secondary p-lg-12">
                            <h1 className='text-dark'>Welcome back! Store Mobile</h1>
                            <p>Store Mobile is simple & clean design for developer and designer.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-8">
                <div className="col-lg-4 col-12 mb-6">
                    <div className="card h-100 card-lg">
                        <div className="card-body p-6">
                            <div className="d-flex justify-content-between align-items-center mb-6">
                                <div>
                                    <h4 className="mb-0 fs-5">Customer</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-info text-dark-info rounded-circle">
                                    <i className="bi bi-people fs-5"></i>
                                </div>
                            </div>

                            <div className="lh-1">
                                <h1 className=" mb-2 fw-bold fs-2">{users && users.length > 0 ? users.length : 0}</h1>
                                <span><span className=" me-1">30+</span>new in 2 days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-6">
                    <div className="card h-100 card-lg">
                        <div className="card-body p-6">
                            <div className="d-flex justify-content-between align-items-center mb-6">
                                <div>
                                    <h4 className="mb-0 fs-5">Brands</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-danger text-dark-danger rounded-circle">
                                    <i className="fa-brands fa-product-hunt fs-5"></i>
                                </div>
                            </div>

                            <div className="lh-1">
                                <h1 className=" mb-2 fw-bold fs-2">{brands && brands.length > 0 ? brands.length : 0}</h1>
                                <span><span className=" me-1">30+</span>new in 2 days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-6">
                    <div className="card h-100 card-lg">
                        <div className="card-body p-6">
                            <div className="d-flex justify-content-between align-items-center mb-6">
                                <div>
                                    <h4 className="mb-0 fs-5">Devices</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-warning text-dark-warning rounded-circle">
                                    <i className="fa-solid fa-laptop fs-5"></i>
                                </div>
                            </div>

                            <div className="lh-1">
                                <h1 className=" mb-2 fw-bold fs-2">{devices && devices.length > 0 ? devices.length : 0}</h1>
                                <span><span className=" me-1">30+</span>new in 2 days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-6">
                    <div className="card h-100 card-lg">
                        <div className="card-body p-6">
                            <div className="d-flex justify-content-between align-items-center mb-6">
                                <div>
                                    <h4 className="mb-0 fs-5">Products</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-success text-dark-success rounded-circle">
                                    <i className="bi bi-cart fs-5"></i>
                                </div>
                            </div>

                            <div className="lh-1">
                                <h1 className=" mb-2 fw-bold fs-2">{products && products.length > 0 ? products.length : 0}</h1>
                                <span><span className=" me-1">30+</span>new in 2 days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-6">
                    <div className="card h-100 card-lg">
                        <div className="card-body p-6">
                            <div className="d-flex justify-content-between align-items-center mb-6">
                                <div>
                                    <h4 className="mb-0 fs-5">Contact</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-secondary text-dark-secondary rounded-circle">
                                    <i className="bi bi-person-lines-fill fs-5"></i>
                                </div>
                            </div>

                            <div className="lh-1">
                                <h1 className=" mb-2 fw-bold fs-2">{contact && contact.length > 0 ? contact.length : 0}</h1>
                                <span><span className=" me-1">30+</span>new in 2 days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-6">
                    <div className="card h-100 card-lg">
                        <div className="card-body p-6">
                            <div className="d-flex justify-content-between align-items-center mb-6">
                                <div>
                                    <h4 className="mb-0 fs-5">News</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-primary text-dark-primary rounded-circle">
                                    <i className="bi bi-newspaper fs-5"></i>
                                </div>
                            </div>

                            <div className="lh-1">
                                <h1 className=" mb-2 fw-bold fs-2">{news && news.length > 0 ? news.length : 0}</h1>
                                <span><span className=" me-1">30+</span>new in 2 days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-6">
                    <div className="card h-100 card-lg">
                        <div className="card-body p-6">
                            <div className="d-flex justify-content-between align-items-center mb-6">
                                <div>
                                    <h4 className="mb-0 fs-5">Wishlist</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-danger text-dark-danger rounded-circle">
                                    <i className="bi bi-bookmark-heart fs-5"></i>
                                </div>
                            </div>

                            <div className="lh-1">
                                <h1 className=" mb-2 fw-bold fs-2">{wishlist && wishlist.length > 0 ? wishlist.length : 0}</h1>
                                <span><span className=" me-1">30+</span>new in 2 days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-6">
                    <div className="card h-100 card-lg">
                        <div className="card-body p-6">
                            <div className="d-flex justify-content-between align-items-center mb-6">
                                <div>
                                    <h4 className="mb-0 fs-5">Carts</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-warning text-dark-warning rounded-circle">
                                    <i className="bi bi-cart2 fs-5"></i>
                                </div>
                            </div>
                            <div className="lh-1">
                                <h1 className=" mb-2 fw-bold fs-2">{carts && carts.length > 0 ? carts.length : 0}</h1>
                                <span><span className=" me-1">30+</span>new in 2 days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-12 mb-6">
                    <div className="card h-100 card-lg">
                        <div className="card-body p-6">
                            <div className="d-flex justify-content-between align-items-center mb-6">
                                <div>
                                    <h4 className="mb-0 fs-5">Orders</h4>
                                </div>
                                <div className="icon-shape icon-md bg-light-warning text-dark-warning rounded-circle">
                                    <i className="bi bi-archive fs-5"></i>
                                </div>
                            </div>
                            <div className="lh-1">
                                <h1 className=" mb-2 fw-bold fs-2">{orders && orders.length > 0 ? orders.length : 0}</h1>
                                <span><span className=" me-1">30+</span>new in 2 days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-8">
                <div className="card mb-4">
                    <div className=" text-center py-6">
                        <h5 className="mb-0 text-center">
                            <strong>Sales Performance KPIs</strong>
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Product Detail Views</th>
                                        <th scope="col">Unique Purchases</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Product Revenue</th>
                                        <th scope="col">Avg. Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Value</th>
                                        <td>18,492</td>
                                        <td>228</td>
                                        <td>350</td>
                                        <td>$4,787.64</td>
                                        <td>$13.68</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Percentage change</th>
                                        <td>
                                            <span className="text-danger">
                                                <i className="fas fa-caret-down me-1"></i
                                                ><span>-48.8%%</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-success">
                                                <i className="fas fa-caret-up me-1"></i><span>14.0%</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-success">
                                                <i className="fas fa-caret-up me-1"></i><span>46.4%</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-success">
                                                <i className="fas fa-caret-up me-1"></i><span>29.6%</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                <i className="fas fa-caret-down me-1"></i
                                                ><span>-11.5%</span>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Absolute change</th>
                                        <td>
                                            <span className="text-danger">
                                                <i className="fas fa-caret-down me-1"></i
                                                ><span>-17,654</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-success">
                                                <i className="fas fa-caret-up me-1"></i><span>28</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-success">
                                                <i className="fas fa-caret-up me-1"></i><span>111</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-success">
                                                <i className="fas fa-caret-up me-1"></i
                                                ><span>$1,092.72</span>
                                            </span>
                                        </td>
                                        <td>
                                            <span className="text-danger">
                                                <i className="fas fa-caret-down me-1"></i
                                                ><span>$-1.78</span>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

