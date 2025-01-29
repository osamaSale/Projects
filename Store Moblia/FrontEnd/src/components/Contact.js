import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { createContact } from "../redux/api/contact";
export const Contact = ({ update }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <div>
            <section className="my-lg-15 my-8">
                <div className="container-fluid">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                            <img src="../assets/images/svg-graphics/contact.svg" alt="" className="img-fluid" />
                        </div>
                        <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                            <div className="mb-lg-9 mb-5">
                                <h1 className="mb-1 h2 fw-bold">Contact Us</h1>
                                <p>Do you have any questions? Please do not hesitate to contact us directly. </p>
                            </div>
                            <div className="row g-4">

                                <div className="col-12">
                                    <input type="text" className="form-control border" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <input type="email" className="form-control border" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <input type="text" className="form-control border" placeholder="meassage" onChange={(e) => setMessage(e.target.value)} />
                                </div>

                                <div className="col-12 d-grid"> <button type="submit" className="btn btn-primary"
                                    onClick={() => {
                                        setLoading(true)
                                        let data = { name: name, email: email, message: message }
                                        dispatch(createContact(data)).then((res) => { update() })
                                        setLoading(false)
                                    }}
                                >
                                    {!loading && <span className="indicator-label"> Send</span>}
                                    {loading && <span className="indicator-progress">Please wait...
                                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}
                                </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

