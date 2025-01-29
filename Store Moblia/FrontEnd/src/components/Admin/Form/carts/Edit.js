import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { editCart } from '../../../../redux/api/carts';
import { getAllUsers } from '../../../../redux/api/users';
export const Edit = ({ openEditCart, setEditOpenCart, cart, update }) => {
    const { users, products } = useSelector((store) => store.data)
    const [userId, setUserId] = useState(cart ? cart.userId : null)
    const [productid, setProductid] = useState(cart ? cart.productid : null)
    const [quantity, setQuantity] = useState(cart ? cart.quantity : null)
    const [loading, setLoading] = useState(false);
    let dispatch = useDispatch()
    return (
        <Modal
            open={openEditCart}
            onClose={() => setEditOpenCart(false)}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Sheet
                sx={{
                    minWidth: 400,
                    borderRadius: "sm",
                    p: 3,
                }}
                variant="outlined"

            >
                <Stack spacing={2}>
                    <Typography component="h2">Edit Carts</Typography>
                    <div className="mb-1">
                        <select
                            name="userId"
                            className="form-control"
                            onChange={(e) => setUserId(e.target.value)}
                            value={userId}
                        >
                            <option >Select Users</option>
                            {users && users.map((row, index) => {
                                return <option key={index} value={row.id}>{row.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="mb-1">
                        <select
                            name="productid"
                            className="form-control"
                            onChange={(e) => setProductid(e.target.value)}
                            value={productid}
                        >
                            <option >Select Products</option>
                            {products && products.map((row, index) => {
                                return <option key={index} value={row.id}>{row.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="mb-1">
                        <input type="text" className="form-control bg-transparent" placeholder="Enter Your Quantity"
                            onChange={(e) => setQuantity(e.target.value)} value={quantity} />
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
                                let data = {
                                    id: cart.id,
                                    userId: userId,
                                    productid: productid,
                                    quantity: quantity
                                }
                                dispatch(editCart(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setEditOpenCart(false);
                                        dispatch(getAllUsers())
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
                            onClick={() => setEditOpenCart(false)}
                        >
                            Close
                        </button>
                    </Stack>
                </Stack>
            </Sheet>
        </Modal>
    );
}


