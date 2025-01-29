import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllUsers, updatePassword } from '../redux/api/users';
export const PasswordVerify = ({ update, number }) => {
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState(0)
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
                                        <input type="password" className="form-control" placeholder="New password" onChange={(e) => setPassword(e.target.value)} />
                                        <label htmlFor="profile-new-password">New password</label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <input type="password" className="form-control" placeholder="Verify Password" onChange={(e) => setVerifyPassword(e.target.value)} />
                                        <label htmlFor="profile-verify-password">Verify Password</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button className="btn btn-block btn-lg btn-primary w-100" type="submit"
                                        onClick={() => {
                                            setLoading(true)
                                            setTimeout(() => {
                                                if (verifyPassword === number || verifyPassword === 0) {
                                                    toast('Error Verify Password')
                                                } else {
                                                    const email = localStorage.getItem("email")
                                                    let data = { email: email, password: password }
                                                    dispatch(updatePassword(data)).then((res) => {
                                                        if (res.payload.status === 200) {
                                                            dispatch(getAllUsers())
                                                            update()
                                                            navigate('/')
                                                        }
                                                    })
                                                }
                                                setLoading(false)
                                            }, 2000);
                                        }}
                                    >
                                        {!loading1&& <span className="indicator-label"> Send Reset Link</span>}
                                        {loading1 && <span className="indicator-progress">Please wait...
                                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}

                                    </button>
                                    <div className="text-center mt-8">
                                        <p>Return verify Email ? <Link to="/passwordReset">Verify Email</Link></p>
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

