import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { createCart } from '../../../../redux/api/carts';
import { getAllUsers } from '../../../../redux/api/users';
export const Insert = ({ openCarts, setOpenCarts, update }) => {
    const { users, products } = useSelector((store) => store.data)
    const [userId, setUserId] = useState(null)
    const [productid, setProductid] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openCarts}
            onClose={() => setOpenCarts(false)}
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
                    <Typography component="h2">Add Carts</Typography>
                    <div className="mb-1">
                        <select
                            name="userId"
                            className="form-control"
                            onChange={(e) => setUserId(e.target.value)}
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
                                    userId: userId,
                                    productid: productid,
                                    quantity: quantity
                                }
                                dispatch(createCart(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setOpenCarts(false);
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
                            onClick={() => setOpenCarts(false)}
                        >
                            Close
                        </button>
                    </Stack>
                </Stack>
            </Sheet>
        </Modal>
    );
}


