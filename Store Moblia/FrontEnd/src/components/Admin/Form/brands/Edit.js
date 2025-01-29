import Modal from '@mui/joy/Modal';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React, { useState } from 'react';
import { editBrand } from "../../../../redux/api/brands"
import { useDispatch } from 'react-redux';
export const Edit = ({ openEditBrand, setEditOpenBrand, brand, update }) => {
    const [name, setName] = useState(brand ? brand.name : "")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openEditBrand}
            onClose={() => setEditOpenBrand(false)}
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
                    <Typography component="h2">Edit Brand</Typography>
                    <div className="mb-1">
                        <input type="text" name="name" className="form-control bg-transparent" placeholder="Enter Your Name"
                            onChange={(e) => setName(e.target.value)} value={name} />
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
                                let data = {id : brand.id , name: name }
                                dispatch(editBrand(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setEditOpenBrand(false);
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
                                setEditOpenBrand(false);
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

