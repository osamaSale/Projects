import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers, findUserEmail } from '../redux/api/users';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export const PasswordReset = ({ update, number }) => {
 
    const [email, setEmail] = useState("")
    const [loading1, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading } = useSelector((store) => store.data)
    if (loading) {
        return <div className="container-fluid">
            <div className="row align-items-center justify-content-center min-vh-100 gx-0">
                <div className="spinner-border spinner-border me-5" role="status" >
                </div> Please wait...
            </div>
        </div>
    }
    return (
        <div className="container-fluid">
            <div className="row align-items-center justify-content-center min-vh-100 gx-0">
                <div className="col-12 col-md-5 col-lg-4">
                    <div className="card card-shadow border-0">
                        <div className="card-body">
                            <div className="row g-6">
                                <div className="col-12">
                                    <div className="text-center">
                                        <h3 className="fw-bold mb-2">Password Reset</h3>
                                        <p>Enter your email to reset password</p>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="email" className="form-control" name='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                        <label htmlFor="resetpassword-email">Email</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-block btn-lg btn-primary w-100"
                                        type="submit"
                                        onClick={() => {
                                            setLoading(true)
                                            setTimeout(() => {

                                                dispatch(findUserEmail({ email })).then((res) => {
                                                    if (res.payload.status === 200) {
                                                        dispatch(getAllUsers())
                                                        update()
                                                        let data1 = { user_name: "Osama", user_email: email, message: `VerifyPassword : ${number}` }
                                                     
                                                        emailjs.send('service_pyguoec', 'template_airpmzr', data1, 'DUOrlJz1ktRqkBB2k')
                                                            .then(function (response) {
                                                                console.log(response)
                                                                toast(`Send Email ${email}`)
                                                                localStorage.setItem("email", email)
                                                                navigate('/verifyPassword')

                                                            }, function (err) {
                                                                console.log('FAILED...', err);
                                                            });
                                                    }
                                                })
                                                setLoading(false)
                                            }, 2000);
                                        }}
                                    >
                                        {!loading1 && <span className="indicator-label"> Send Reset Link</span>}
                                        {loading1 && <span className="indicator-progress">Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}

                                    </button>
                                    <div className="text-center mt-8">
                                        <p>Already have an account? <Link to="/">Sign in</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

