import React, { useState } from 'react';
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useDispatch } from 'react-redux';
import { createDevices } from "../../../../redux/api/devices";
export const Insert = ({ openDevice, setOpenDevice, update }) => {
    const [name, setName] = useState("")
  
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openDevice}
            onClose={() => setOpenDevice(false)}
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
                    <Typography component="h2">Add Device</Typography>
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
                                
                                dispatch(createDevices(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setOpenDevice(false);
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
                                setOpenDevice(false);
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

