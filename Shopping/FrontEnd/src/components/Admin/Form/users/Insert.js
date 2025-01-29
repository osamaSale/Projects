import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { createUser } from "../../../../redux/api/users"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"
import { LoginSocialGoogle } from 'reactjs-social-login'
export function Insert({ openUser, setOpenAdd, update }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordShown, setPasswordShown] = useState(false);
  const [phone, setPhone] = useState("")
  const [image, setImage] = useState(null)
  const [authorization, setAuthorization] = useState(null)
  const [loading, setLoading] = useState(false);
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
      const { status } = res.payload
      if (status === 200) {
        setOpenAdd(false)
        update()
      }
    })

  }

  return (
    <Modal
      open={openUser}
      onClose={() => setOpenAdd(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="MuiSheet-root">
        <Sheet
          sx={{
            minWidth: 400,
            borderRadius: "sm",
            p: 3,

          }}
          variant="outlined"

        >
          <Stack spacing={2}>
            <Typography component="h2">Add User</Typography>
            <div className="mb-1">
              <LoginSocialGoogle
                client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onResolve={registerGoogle}
                onReject={(err) => {
                  console.log(err)
                }}>
                <div className="d-grid">
                  <Link className="btn btu-sm active border border-secondary">
                    <img alt="Logo" src={'https://mobile-store1234.netlify.app/static/media/google.e12914ad8afda3f6f2e8.png'} className="h-15px me-3" width={20} height={20} />
                    Sign in Google
                  </Link>
                </div>
              </LoginSocialGoogle>
            </div>
            <div className="mb-1">
              <input type="text" className="form-control" placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-1">
              <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
            </div>
            <div className="mb-1">
              <div className='input-group'>
                <input type={passwordShown ? "text" : "password"} name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password' value={password} />
                <button className='btn btn-outline-primary' onClick={() => { passwordShown === true ? setPasswordShown(false) : setPasswordShown(true) }}>
                  {passwordShown === true ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash" ></i>}
                </button>
              </div>
            </div>
            <div className="mb-1">
              <input type="tel" className="form-control " placeholder="Enter Your Phone"
                onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-1">
              <input type="file" className="form-control " onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="mb-1">
              <select
                name="authorization"
                className="form-control "
                onChange={(e) => setAuthorization(e.target.value)}
              >
                <option >Select Authorization</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <Stack
              direction="row-reverse"
              justifyContent="flex-start"
              alignItems="flex-end"
              spacing={2}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  setLoading(true)
                  const fromData = new FormData();
                  fromData.append("name", name);
                  fromData.append("email", email);
                  fromData.append("password", password);
                  fromData.append("phone", phone);
                  fromData.append("authorization", authorization);
                  if (image !== null) {
                    fromData.append("image", image, image?.name);
                  } else {
                    fromData.append("image", image);
                  }
                  dispatch(createUser(fromData)).then((res) => {
                    const { status } = res.payload
                    if (status === 200) {
                      setOpenAdd(false);
                      update()
                    }
                    setLoading(false)
                  })
                }}
              >
                {!loading && <span className="indicator-label"> Save</span>}
                {loading && <span className="indicator-progress">Please wait...
                  <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setOpenAdd(false);
                }}
              >
                Close
              </button>
            </Stack>
          </Stack>
        </Sheet>
      </div>
    </Modal>
  );
}
