import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavbarVertical } from './NavbarVertical';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUser, getAllUsers, updatePassword } from '../../redux/api/users';
export const Setting = ({ update }) => {
   const { user } = useSelector((store) => store.data)
   const [name, setName] = useState(user ? user.name : "")
   const [email, setEmail] = useState(user ? user.email : "")
   const [currentPassword, setCurrentPassword] = useState("")
   const [password, setPassword] = useState(user ? user.password : "")
   const [phone, setPhone] = useState(user ? user.phone : "")
   const [image, setImage] = useState(null)
   const [loading, setLoading] = useState(false)
   const [loading1, setLoading1] = useState(false)
   const dispatch = useDispatch()
   let navigate = useNavigate()
   const handleSubmit = () => {
      setLoading(true)
      const fromData = new FormData();
      fromData.append("id", user.id);
      fromData.append("name", name);
      fromData.append("email", email);
      fromData.append("phone", phone);
      if (image) {
         fromData.append("image", image, image.name);
      }
      dispatch(editUser(fromData))
         .then((res) => {
            const { status } = res.payload
            if (status === 200) {
               dispatch(getAllUsers())
               update()
            }
            setLoading(false)
         })
   }
   return (
      <section>
         <div className="container-fluid">
            <div className="row">
               <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center d-md-none py-4">

                     <h3 className="fs-5 mb-0">Account Setting</h3>

                     <button className="btn btn-outline-gray-400 text-muted d-md-none btn-icon btn-sm ms-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAccount" aria-controls="offcanvasAccount">
                        <i className="bi bi-text-indent-left fs-3"></i>
                     </button>
                  </div>
               </div>

               <div className="col-lg-3 col-md-4 col-12 border-end d-none d-md-block">
                  <NavbarVertical />
               </div>
               <div className="col-lg-9 col-md-8 col-12">
                  <div className="py-6 p-md-6 p-lg-10">
                     <div className="mb-6">

                        <h2 className="mb-0">Account Setting</h2>
                     </div>
                     <div>

                        <h5 className="mb-4">Account details</h5>
                        <div className="row">
                           <div className="col-lg-5">

                              <div className="mb-3">
                                 <label className="form-label">Name</label>
                                 <input type="text" className="form-control border" placeholder="Enter Your Name"
                                    onChange={(e) => setName(e.target.value)} value={name} />
                              </div>

                              <div className="mb-3">
                                 <label className="form-label">Email</label>
                                 <input type="email" name="email" className="form-control border" placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                              </div>

                              <div className="mb-5">
                                 <label className="form-label">Phone</label>
                                 <input type="tel" className="form-control border" placeholder="Enter Your Phone"
                                    onChange={(e) => setPhone(e.target.value)} value={phone} />
                              </div>

                              <div className="mb-3">
                                 <label className="form-label">Image</label>
                                 <input type="file" className="form-control border" onChange={(e) => setImage(e.target.files[0])} />
                              </div>
                              <div className="mb-3">
                                 <button className="btn btn-primary" onClick={handleSubmit}>
                                    {!loading && <span className="indicator-label"> Save Details</span>}
                                    {loading && <span className="indicator-progress">Please wait...
                                       <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}
                                 </button>
                              </div>
                           </div>


                        </div>
                     </div>
                     <hr className="my-10 border" />
                     <div className="pe-lg-14">

                        <h5 className="mb-4">Password</h5>
                        <form className="row row-cols-1 row-cols-lg-2">

                           <div className="mb-3 col">
                              <label className="form-label">New Password</label>
                              <input type="password" className="form-control border" placeholder="**********" onChange={(e) => setPassword(e.target.value)} />
                           </div>

                           <div className="mb-3 col">
                              <label className="form-label">Current Password</label>
                              <input type="password" className="form-control border" placeholder="**********" onChange={(e) => setCurrentPassword(e.target.value)} />
                           </div>

                           <div className="col-12">
                              <p className="mb-4">
                                 Can’t remember your current password?
                                 <Link to="#" className='me-2'>Reset your password.</Link>
                              </p>
                              <Link className="btn btn-primary"
                                 onClick={() => {
                                    setLoading1(true)
                                    if (!user) {
                                       if (window.confirm("You Must login")) { }
                                    } else {
                                       let data = { id: user.id, currentPassword: currentPassword, password: password }
                                       dispatch(updatePassword(data)).then((res) => {
                                          if (res.payload.result === 200) {
                                             dispatch(getAllUsers())
                                             update()
                                          }
                                       })
                                    }
                                    setLoading1(false)
                                 }}
                              >
                                 {!loading1 && <span className="indicator-label"> Save Password</span>}
                                 {loading1 && <span className="indicator-progress">Please wait...
                                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}
                              </Link>
                           </div>
                        </form>
                     </div>
                     <hr className="my-10 border" />
                     <div>

                        <h5 className="mb-4">Delete Account</h5>
                        <p className="mb-2">Would you like to delete your account?</p>
                        <p className="mb-5">This account contain 12 orders, Deleting your account will remove all the order details associated with it.</p>

                        <Link className="btn btn-outline-danger"
                           onClick={() => {
                              if (user && user.carts && user.carts.length > 0) {
                                 if (window.confirm("You must delete all Cart?")) { }
                              } else if (user && user.wishlist && user.wishlist.length > 0) {
                                 if (window.confirm("You must delete all Wishlist?")) { }
                              } else {
                                 if (window.confirm("Are you sure you want to delete this?")) {
                                    dispatch(deleteUser(user.id)).then((res) => {
                                       if (res.payload.status === 200)
                                          localStorage.removeItem('user')
                                       navigate("/")
                                       update()
                                    })
                                 }
                              }
                           }}
                        >I want to delete my account</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

