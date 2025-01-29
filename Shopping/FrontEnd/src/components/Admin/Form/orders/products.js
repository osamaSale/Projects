import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import React from 'react';

export const Products = ({ openOrderProduct, setOpenOrderProduct, orders }) => {
    const getTotalPrice = () => {
        let totalPrice = 0;
        orders?.forEach((e) => {
            return totalPrice += e.total
        })
        return totalPrice
    };
    return (
        <Modal
            open={openOrderProduct}
            onClose={() => setOpenOrderProduct(false)}
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
                <p className='pb-2'>List Order Products</p>
                <div className="table-responsive">
                    <table className="table table-centered table-hover text-nowrap table-borderless mb-0 table-with-checkbox">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th scope="col">userId</th>
                                <th scope="col">Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Device</th>
                                <th scope="col">Color</th>
                                <th scope="col">Total</th>
                                <th scope="col">quantity</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders && orders.map((row, index) => {
                                return <tr key={index} className='border'>
                                    <td >{row && row.userId}</td>
                                    <td >{row && row.name}</td>
                                    <td >
                                        <img src={row && row.image} className="rounded-circle" alt="" height={35} width={35} />
                                    </td>
                                    <td >{row && row.brand}</td>
                                    <td >{row && row.device}</td>
                                    <td >{row && row.color}</td>
                                    <td >{row && row.total}</td>
                                    <td >{row && row.quantity}</td>
                                </tr>
                            })}
                        </tbody>

                        <caption className='text-end'>Result : ${getTotalPrice()}</caption>
                    </table>
                </div>
                <Stack
                    direction="row-reverse"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                    spacing={2}
                >
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            setOpenOrderProduct(false);
                        }}
                    >
                        Close
                    </button>
                </Stack>
            </Sheet>
        </Modal>
    );
}


