import React, { useState } from 'react'
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import { editUser } from "../../../../redux/api/users"
import Typography from '@mui/joy/Typography/Typography';
import { useDispatch } from "react-redux"
export const Edit = ({ openEditUser, setEditOpenUser, user, update }) => {
  const [name, setName] = useState(user ? user.name : "")
  const [email, setEmail] = useState(user ? user.email : "")
  const [password, setPassword] = useState(user ? user.password : "")
  const [phone, setPhone] = useState(user ? user.phone : "")
  const [authorization, setAuthorization] = useState(user ? user.authorization : "")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleSubmit = () => {
    setLoading(true)
    const fromData = new FormData();
    fromData.append("id", user.id);
    fromData.append("name", name);
    fromData.append("email", email);
    fromData.append("phone", phone);
    fromData.append("authorization", authorization);
    if (image) {
      fromData.append("image", image, image.name);
    }
    dispatch(editUser(fromData))
      .then((res) => {
        const { status } = res.payload
        if (status === 200) {
          setEditOpenUser(false)
          update()
        } else {
          setEditOpenUser(true)
        }
        setLoading(false)
      })
  }
  return (
    <Modal
      open={openEditUser}
      onClose={() => setEditOpenUser(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          minWidth: 400,
          borderRadius: "sm",
          p: 2,
        }}
      >
        <Stack spacing={2}>
          <Typography component="h2">Edit User</Typography>
          <div className="mb-1">
            <input type="text" className="form-control bg-transparent" placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div className="mb-1">
            <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email'
              value={email} />
          </div>
          <div className="mb-1">
            <input type="password" name="email" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your Password'
              value={password} disabled />
          </div>
          <div className="mb-1">
            <input type="tel" className="form-control bg-transparent" placeholder="Enter Your Phone"
              onChange={(e) => setPhone(e.target.value)} value={phone} />
          </div>
          <div className="mb-1">
            <input type="file" className="form-control bg-transparent" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="mb-1">
            <select
              name="authorization"
              className="form-control"
              onChange={(e) => setAuthorization(e.target.value)}
              value={authorization}
            >
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
            <button type='submit' className="btn btn-primary" onClick={handleSubmit}>
              {!loading && <span className="indicator-label"> Save</span>}
              {loading && <span className="indicator-progress">Please wait...
                <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}
            </button>
            <button className="btn btn-danger" onClick={() => setEditOpenUser(false)}>Close</button>
          </Stack>
        </Stack>
      </Sheet>

    </Modal>
  )
}
