import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useDispatch } from "react-redux"
import { createContact } from "../../../../redux/api/contact";
export const Insert = ({ openContact, setOpenContact, update }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openContact}
            onClose={() => setOpenContact(false)}
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
                    <Typography component="h2">Add Contact</Typography>
                    <div className="mb-1">

                        <input type="text" name="user_name" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter To Name" />
                    </div>
                    <div className="mb-1">

                        <input type="email" name="user_email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter To Email" />
                    </div>
                    <div className="mb-1">
                        <textarea name="message" className="form-control" onChange={(e) => setMessage(e.target.value)} placeholder="Enter To Message" />
                    </div>

                    <Stack
                        direction="row-reverse"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                        spacing={2}
                    >
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={() => {
                                setLoading(true)
                                let data = { name: name, email: email, message: message }
                                dispatch(createContact(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setOpenContact(false);
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
                                setOpenContact(false);
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


