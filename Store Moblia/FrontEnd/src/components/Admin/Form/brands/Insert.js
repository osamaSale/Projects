import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React, { useState } from 'react';
import {createBrand} from "../../../../redux/api/brands"
import { useDispatch } from 'react-redux';

export const Insert = ({ openBrand, setOpenBrand, update }) => {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openBrand}
            onClose={() => setOpenBrand(false)}
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
            >
                <Stack spacing={2}>
                    <Typography component="h2">Add Brand</Typography>
                    <div className="mb-1">
                        <input type="text" className="form-control bg-transparent" placeholder="Enter Your Name"
                            onChange={(e) => setName(e.target.value)} />
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
                                let data = { name: name }
                                dispatch(createBrand(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setOpenBrand(false);
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
                                setOpenBrand(false);
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

