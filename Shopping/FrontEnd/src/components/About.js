import React from 'react';
import Slider from "react-slick";
export const About = () => {
    function SampleNextArrow1(props) {
        const { onClick } = props;
        return <span onClick={onClick} className="slick-prev border"><i className="fa fa-arrow-left"></i></span>
    }

    function SamplePrevArrow1(props) {
        const { onClick } = props;
        return <span className="slick-next border" onClick={onClick}><i className="fa fa-arrow-right"></i></span>
    }
    const settings = {
        infinite: !0,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: !0,
        dots: !1,
        arrows: !0,
        speed: 1e3,
        loop: !0,
        adaptiveHeight: !0,
        responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        }, {
            breakpoint: 990,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }],
        nextArrow: <SampleNextArrow1 />,
        prevArrow: <SamplePrevArrow1 />,

    };
    return (
        <div>
            <section className='mt-lg-12 mb-lg-14 mb-8 mt-8'>
                <div className='container-fluid'>
                    <div className='row align-items-center'>
                        <div className='col-md-6 mb-2 '>
                            <h1 className="mb-6">Who Are We ?</h1>
                            <p className='lh-lg pb-4'>
                                is a form of electronic commerce which allows consumers to
                                directly buy goods or services from a seller over the Internet
                                using a web browser or a mobile app. Consumers find a product of
                                interest by visiting the website of the retailer directly or by
                                searching among alternative vendors using a shopping search
                                engine, which displays the same product's availability and pricing
                                at different e-retailers. As of 2020, customers can shop online
                                using a range of different computers and devices, including
                                desktop computers, laptops, tablet computers and smartphones.
                            </p>
                            <div className="hstack gap-2">
                                <button className='btn btn-outline-danger'><i className="bi bi-google-play me-2"></i>Google Play</button>
                                <button className='btn btn-outline-primary'><i className="bi bi-apple me-2 "></i>App Store</button>
                            </div>
                        </div>
                        <div className='col-md-6 pb-3'>
                            <img src="./assets/images/about/about-img.jpg" className="img-fluid rounded float-end" alt='' />
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-lg-12 mb-lg-14 mb-8 mt-8">
                <div className="container-fluid ">
                    <div className="row align-items-center mb-6">
                        <div className="col-lg-10 col-9">
                            <div className="d-xl-flex justify-content-between align-items-center">

                                <div className="d-flex">
                                    <div className="mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" className="feather feather-shopping-bag text-primary">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                            <line x1="3" y1="6" x2="21" y2="6"></line>
                                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                                        </svg>
                                    </div>
                                    <div className="ms-3">
                                        <h3 className=" mb-0">Our clients</h3>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-3">
                            <div className="slider-arrow " id="slider-third-arrows"></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="product-slider-second " id="slider-third">
                                <Slider  {...settings}>
                                    <div className="item ">
                                        <div className="card ">
                                            <div className="card-body ">
                                                <div className="d-flex justify-content-center mb-4">
                                                    <img src="./assets/images/about/team-1.png"
                                                        className="rounded-circle shadow" width="100" height="100" alt='' />
                                                </div>
                                                <h5 className="font-weight-bold text-center">Heidi J. Cobb</h5>
                                                <h6 className="font-weight-bold my-3 text-center">Customer</h6>
                                                <ul className="list-unstyled d-flex justify-content-center">
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star-half-alt fa-sm text-info"></i>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="item ">
                                        <div className="card ">
                                            <div className="card-body ">
                                                <div className="d-flex justify-content-center mb-4">
                                                    <img src="./assets/images/about/team-2.png"
                                                        className="rounded-circle shadow" width="100" height="100" alt='' />
                                                </div>
                                                <h5 className="font-weight-bold text-center">Heidi J. Cobb</h5>
                                                <h6 className="font-weight-bold my-3 text-center">Customer</h6>
                                                <ul className="list-unstyled d-flex justify-content-center">
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star-half-alt fa-sm text-info"></i>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="item ">
                                        <div className="card">
                                            <div className="card-body ">
                                                <div className="d-flex justify-content-center mb-4">
                                                    <img src="./assets/images/about/team-3.png"
                                                        className="rounded-circle shadow" width="100" height="100" alt='' />
                                                </div>
                                                <h5 className="font-weight-bold text-center">Heidi J. Cobb</h5>
                                                <h6 className="font-weight-bold my-3 text-center">Customer</h6>
                                                <ul className="list-unstyled d-flex justify-content-center">
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star-half-alt fa-sm text-info"></i>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="item ">
                                        <div className="card ">
                                            <div className="card-body ">
                                                <div className="d-flex justify-content-center mb-4">
                                                    <img src="./assets/images/about/team-4.png"
                                                        className="rounded-circle shadow" width="100" height="100" alt='' />
                                                </div>
                                                <h5 className="font-weight-bold text-center">Heidi J. Cobb</h5>
                                                <h6 className="font-weight-bold my-3 text-center">Customer</h6>
                                                <ul className="list-unstyled d-flex justify-content-center">
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star-half-alt fa-sm text-info"></i>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="item ">
                                        <div className="card">
                                            <div className="card-body ">
                                                <div className="d-flex justify-content-center mb-4">
                                                    <img src="./assets/images/about/team-5.png"
                                                        className="rounded-circle shadow" width="100" height="100" alt='' />
                                                </div>
                                                <h5 className="font-weight-bold text-center">Heidi J. Cobb</h5>
                                                <h6 className="font-weight-bold my-3 text-center">Customer</h6>
                                                <ul className="list-unstyled d-flex justify-content-center">
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star fa-sm text-info"></i>
                                                    </li>
                                                    <li>
                                                        <i className="fas fa-star-half-alt fa-sm text-info"></i>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </div>


                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <section className="mt-lg-12 mb-lg-14 mb-8 mt-8">
                <div className="container-fluid ">
                    <div className="row align-items-center mb-6">
                        <div className="col-lg-10 col-9">
                            <div className="d-xl-flex justify-content-between align-items-center">

                                <div className="d-flex">
                                    <div className="mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" className="feather feather-shopping-bag text-primary">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                            <line x1="3" y1="6" x2="21" y2="6"></line>
                                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                                        </svg>
                                    </div>
                                    <div className="ms-3">
                                        <h3 className=" mb-0">Services</h3>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-3">
                            <div className="slider-arrow " id="slider-third-arrows"></div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md pb-3'>
                            <div className="card" >
                                <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWxmxWzttCTlvUN3pT_kqbcoVki86oDkaq9A&usqp=CAU"} className="card-img-top" alt="..." height={250} />
                                <div className="card-body">
                                    <p className="card-text text-center">Support Your Community</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md pb-3'>
                            <div className="card" >
                                <img src={"https://www.statcan.gc.ca/o1/sites/default/files/2021-11/shopping_2.jpg"} className="card-img-top" alt="..." height={250} />
                                <div className="card-body">
                                    <p className="card-text text-center">Delivery to your address</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md pb-3'>
                            <div className="card" >
                                <img src={"https://miro.medium.com/v2/resize:fit:1018/1*iAu65xDmvpVdBJgps6EDEw.png"}
                                    className="card-img-top" alt="..." height={250} />
                                <div className="card-body">
                                    <p className="card-text text-center">Registry, Lists, & Gifts</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

        </div>
    );
}

