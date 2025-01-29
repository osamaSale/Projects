import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { createOrder } from "../../../../redux/api/orders"

export const Insert = ({ openOrder, setOpenOrder, update }) => {
    const { users, carts } = useSelector((store) => store.data)
    const [userId, setUserId] = useState(null)
    const [checkout, setcheckout] = useState("")
    const [total, setTotal] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openOrder}
            onClose={() => setOpenOrder(false)}
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
                    <Typography component="h2">Add Order</Typography>
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
                            name="checkout"
                            className="form-control"
                            onChange={(e) => setcheckout(e.target.value)}
                        >
                            <option >Select Checkout</option>
                            <option value='Success'>Success</option>
                            <option value='Cancelled'>Cancelled</option>

                        </select>
                    </div>
                    <div className="mb-1">
                        <input type="number" className="form-control bg-transparent" placeholder="Enter Your Total"
                            onChange={(e) => setTotal(e.target.value)} />
                    </div>

                    <Stack
                        direction="row-reverse"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                        spacing={2}
                    >
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={() => {
                                setLoading(true)
                                const findCartsUser = (carts || []).filter((u) => parseInt(u.userId) === parseInt(userId))
                                if (findCartsUser.length > 0) {
                                    let data = { userId: userId, checkout: checkout, total: total }
                                    dispatch(createOrder(data)).then((res) => {
                                        const { status } = res.payload
                                        if (status === 200) {
                                            setOpenOrder(false);
                                            update()
                                        }
                                    })
                                } else {
                                    toast.error("Cart Is Empty")
                                }
                                setLoading(false)
                            }}
                        >
                            {!loading && <span className="indicator-label"> Save</span>}
                            {loading && <span className="indicator-progress">Please wait...
                                <span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>}
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                setOpenOrder(false);
                            }}
                        >
                            Close
                        </button>
                    </Stack>
                </Stack>
            </Sheet>
        </Modal>
    );
}


