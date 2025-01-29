import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from "../redux/api/users"
import { LoginSocialGoogle } from 'reactjs-social-login'
import { Error } from './Error';
import { Loading } from './Loading';

export const Signup = ({ update }) => {
    const { user, loading } = useSelector((store) => store.data)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState(null)
    const [loading1, setLoading] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerGoogle = async ({ provider, data }) => {
        let data1 = {
            name: data.name,
            email: data.email,
            image: data.picture,
            password: "12345",
            phone: "null"
        }
        dispatch(createUser(data1)).then((res) => {
            if (res.payload.status === 200) {
                update()
                navigate('/')
            }
        })
    }
  
    return (
        <>
            {loading ? <Loading /> :
                <>
                    {!user &&
                        <div className="container-fluid ">
                            <div className="row align-items-center justify-content-center min-vh-100 gx-0">
                                <div className="col-12 col-md-5 col-lg-4">
                                    <div className="card card-shadow border-0">
                                        <div className="card-body">
                                            <div className="row g-6">
                                                <div className="col-12">
                                                    <div className="text-center">
                                                        <h3 className="fw-bold mb-2">Sign Up</h3>
                                                        <p>Follow the easy steps</p>
                                                    </div>
                                                </div>
                                                <div className="col-12 ">
                                                    <LoginSocialGoogle
                                                        client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                                        onResolve={registerGoogle}
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
                                                <div className="col-12">
                                                    <input type="text" className="form-control " name='name' placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                                                </div>
                                                <div className="col-12">
                                                    <input type="email" className="form-control " name='email' placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                                <div className="col-12">
                                                    <div className="password-field position-relative">
                                                        <input type={passwordShown ? "text" : "password"} name='password' placeholder="Enter Password" className="form-control " onChange={(e) => setPassword(e.target.value)} />

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
                                                <div className="col-12">
                                                    <button className="btn btn-block btn-lg btn-primary w-100" type="submit"
                                                        onClick={() => {
                                                            setLoading(true)
                                                            setTimeout(() => {
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
                                                                        navigate('/')
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
                                                            <span className="indicator-label"> Create Account </span>
                                                        }</button>
                                                </div>
                                                <div className="text-center mt-8">
                                                    <p>Already have an account? <Link to="/">Sign in</Link></p>
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
                </>}
        </>
    );
}

