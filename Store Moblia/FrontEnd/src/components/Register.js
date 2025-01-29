import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginSocialGoogle } from 'reactjs-social-login'
import { createUser } from "../redux/api/users"

export const Register = ({ update }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerGoogle = async ({ provider, data }) => {
        let data1 = {
            name: data.name,
            email: data.email,
            image: data.picture,
            password: "12345",
            phone: "null",
            authorization: "user"
        }
        dispatch(createUser(data1)).then((res) => {
            if (res.payload.status === 200) {
                update()
                navigate('/login')
            }
        })
    }
    return (
        <section className="my-lg-15 my-8">
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                    <img src="./assets/images/svg-graphics/signup-g.svg" alt="" className="img-fluid" />
                </div>
                <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                    <div className="mb-lg-9 mb-5">
                        <h1 className="mb-1 h2 fw-bold">Get Start Shopping</h1>
                        <p>Welcome to Store Mobile! Enter your email to get started.</p>
                    </div>

                    <div className="row g-4">
                        <div className="col-12">
                            <LoginSocialGoogle
                                client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                onResolve={registerGoogle}
                                onReject={(err) => {
                                    console.log(err)
                                }}>
                                <div className="d-grid">
                                    <Link className="btn  border">
                                        <img alt="Logo" src={'https://mobile-store1234.netlify.app/static/media/google.e12914ad8afda3f6f2e8.png'} className="h-15px me-3" width={20} height={20} />
                                        Sign in Google
                                    </Link>
                                </div>
                            </LoginSocialGoogle>
                        </div>
                        <div className="col-12">
                            <input type="text" className="form-control border" name='name' placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <input type="email" className="form-control border" name='email' placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <div className="password-field position-relative">
                                <input type={passwordShown ? "text" : "password"} name='password' placeholder="Enter Password" className="form-control border" onChange={(e) => setPassword(e.target.value)} />

                                <span onClick={() => { passwordShown === true ? setPasswordShown(false) : setPasswordShown(true) }}>
                                    {
                                        passwordShown === true ? <i id="passwordToggler" className="bi bi-eye"></i>
                                            : <i id="passwordToggler" className="bi bi-eye-slash"></i>
                                    }
                                </span>
                            </div>

                        </div>
                        <div className="col-12">
                            <input type="tel" className="form-control border" name='phone' placeholder="Enter Phone" onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="col-12">
                            <input type="file" className="form-control border" name='image' onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <div className="col-12 d-grid">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setLoading(true)
                                    const fromData = new FormData();
                                    fromData.append("name", name);
                                    fromData.append("email", email);
                                    fromData.append("password", password);
                                    fromData.append("phone", phone);
                                    if (image !== null) {
                                        fromData.append("image", image, image?.name);
                                    } else {
                                        fromData.append("image", image);
                                    }
                                    dispatch(createUser(fromData)).then((res) => {

                                        if (res.payload.status === 200) {
                                            update()
                                            navigate('/login')
                                        }
                                    })
                                    setLoading(false)
                                }}>
                                {loading === true ?
                                    <>
                                        <div className="spinner-border spinner-border-sm" role="status">
                                        </div> Please wait...
                                    </> :
                                    <span className="indicator-label"> Register</span>
                                }
                            </button>
                        </div>
                        <span>
                            Already have an account? <Link to="/login">Sign in</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}

