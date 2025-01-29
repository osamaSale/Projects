import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllUsers, login } from '../redux/api/users';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSocialGoogle } from 'reactjs-social-login'
import { Error } from './Error';
import { Loading } from './Loading';
export const Signin = ({ update }) => {
    const { user, loading } = useSelector((store) => store.data)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);
    const [loading1, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginGoogle = async ({ provider, data }) => {
        let data1 = { email: data.email, password: "12345" }
        dispatch(login({ email: data1.email, password: data1.password })).then((res) => {
            if (res.payload.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.payload.result))
                dispatch(getAllUsers())
                navigate('/chat')
                update()
            }
        })
    }
    return (
        <>
            {loading ? <Loading /> :
                <>
                    {!user && <div className="container-fluid">
                        <div className="row  align-items-center justify-content-center min-vh-100 gx-0">
                            <div className="col-12 col-md-5 col-lg-4">
                                <div className="card card-shadow border-0">
                                    <div className="card-body">
                                        <div className="row g-6">
                                            <div className="col-12">
                                                <div className="text-center">
                                                    <h3 className="fw-bold mb-2">Sign In</h3>
                                                    <p>Login to your account</p>
                                                </div>
                                            </div>
                                            <div className="col-12 ">
                                                <div className="col-12">
                                                    <LoginSocialGoogle
                                                        client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                                        onResolve={loginGoogle}
                                                        onReject={(err) => {
                                                            console.log(err)
                                                        }}>
                                                        <div className="d-grid">
                                                            <Link className="btn btn-dark">
                                                                <img alt="Logo" src={'https://mobile-store1234.netlify.app/static/media/google.e12914ad8afda3f6f2e8.png'} className="h-15px me-3" width={20} height={20} />
                                                                Sign in Google
                                                            </Link>
                                                        </div>
                                                    </LoginSocialGoogle>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <input type="email" name='email' className="form-control" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                                    <label htmlFor="signin-email">Email</label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-floating">
                                                    <input type={passwordShown ? "text" : "password"} name='password' className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                                    <span onClick={() => { passwordShown === true ? setPasswordShown(false) : setPasswordShown(true) }}>
                                                        {
                                                            passwordShown === true ? <i id="passwordToggler" className="bi bi-eye"></i>
                                                                : <i id="passwordToggler" className="bi bi-eye-slash"></i>
                                                        }
                                                    </span>
                                                    <label htmlFor="signin-password">Password</label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <button className="btn btn-block btn-lg btn-primary w-100 mb-4" type="submit"
                                                    onClick={() => {
                                                        setLoading(true)
                                                        setTimeout(() => {
                                                            dispatch(login({ email: email, password: password })).then((res) => {
                                                                if (res.payload?.status === 200) {
                                                                    localStorage.setItem("user", JSON.stringify(res.payload.result))
                                                                    dispatch(getAllUsers())
                                                                    navigate('/chat')
                                                                    update()
                                                                }
                                                            })

                                                            setLoading(false)
                                                        }, 2000);
                                                    }}

                                                >
                                                    {loading1 &&
                                                        <>
                                                            <div className="spinner-border spinner-border-sm" role="status">
                                                            </div> Please wait...
                                                        </>
                                                    }
                                                    {!loading1 &&
                                                        <span className="indicator-label"> Sign In </span>
                                                    }
                                                </button>
                                                <button className="btn btn-block btn-lg btn-primary w-100" type="submit"
                                                    onClick={() => {
                                                        setLoading2(true)
                                                        setTimeout(() => {

                                                            dispatch(login({ email: "osama@gmail.com", password: "12345" })).then((res) => {
                                                                if (res.payload?.status === 200) {
                                                                    localStorage.setItem("user", JSON.stringify(res.payload.result))
                                                                    dispatch(getAllUsers())
                                                                    navigate('/chat')
                                                                    update()
                                                                }
                                                            })

                                                            setLoading2(false)
                                                        }, 2000);
                                                    }}

                                                >
                                                    {loading2 &&
                                                        <>
                                                            <div className="spinner-border spinner-border-sm" role="status">
                                                            </div> Please wait...
                                                        </>
                                                    }
                                                    {!loading2 &&
                                                        <span className="indicator-label"> Continue</span>
                                                    }
                                                </button>
                                            </div>
                                            <div className="text-center mt-8">
                                                <p>Don't have an account yet? <Link to="/signup">Sign up</Link></p>
                                                <p><Link to="/passwordReset">Forgot Password?</Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {user &&
                        <Error />
                    }
                </>
            }


        </>
    );
}


