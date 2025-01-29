import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slice/slice';
import { useDispatch } from 'react-redux';

export const NavbarVertical = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    let navigate = useNavigate()
    return (
        <div className="pt-10 pe-lg-10">

            <ul className="nav flex-column nav-pills nav-pills-dark">

                <li className="nav-item">
                    <Link  className={location.pathname === "/orders" ?"nav-link active" : "nav-link"}  to="/orders">

                        <i className="bi bi-bag-dash me-2"></i>
                        Your Orders
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className={location.pathname === "/setting" ?"nav-link active" : "nav-link"} to="/setting">

                        <i className="bi bi-gear me-2"></i>
                        Settings
                    </Link>
                </li>

               

                <li className="nav-item">
                    <Link className={location.pathname === "/payment" ?"nav-link active" : "nav-link"} to="/payment">
                        <i className="bi bi-credit-card me-2"></i>
                        Payment Method
                    </Link>
                </li>

                

                <li className="nav-item">
                    <hr className='border'/>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" onClick={()=>{
                        if (window.confirm("Do you want to Exit")) {
                            dispatch(logout())
                            navigate('/')
                        }
                    }}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Log out
                    </Link>
                </li>
            </ul>
        </div>
    );
}

