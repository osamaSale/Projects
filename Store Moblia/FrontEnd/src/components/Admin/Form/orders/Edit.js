import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editOrder } from '../../../../redux/api/orders';

export const Edit = ({ openEditOrder, setEditOpenOrder, order, update }) => {
    const { users } = useSelector((store) => store.data)
    const [userId, setUserId] = useState(order && order ? order.userId : 0)
    const [checkout, setcheckout] = useState( order ? order.checkout : null)
    const [total, setTotal] = useState(order ? order.total : null)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openEditOrder}
            onClose={() => setEditOpenOrder(false)}
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
                    <Typography component="h2">Edit Order</Typography>
                    <div className="mb-1">
                        <select
                            name="userId"
                            className="form-control"
                            onChange={(e) => setUserId(e.target.value)}
                            value={userId}
                            disabled
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
                            value={checkout}
                        >
                            <option value='Success'>Success</option>
                            <option value='Cancelled'>Cancelled</option>

                        </select>
                    </div>
                    <div className="mb-1">
                        <input type="text" className="form-control bg-transparent" placeholder="Enter Your Quantity"
                            onChange={(e) => setTotal(e.target.value)} value={total} />
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
                                    let data = {
                                        orderid: order.orderid,
                                        userId: userId,
                                        checkout: checkout,
                                        total: total,
                                    }
                                    dispatch(editOrder(data)).then((res) => {
                                        const { status } = res.payload
                                        if (status === 200) {
                                            setEditOpenOrder(false);
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
                                setEditOpenOrder(false);
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

