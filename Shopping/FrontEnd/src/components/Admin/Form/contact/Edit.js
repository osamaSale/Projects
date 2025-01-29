import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useDispatch } from "react-redux"
import { editContact } from "../../../../redux/api/contact";
export const Edit = ({ openEditContact, setEditOpenContact, contact, update }) => {
    const [name, setName] = useState(contact ? contact.name : "")
    const [email, setEmail] = useState(contact ? contact.email : "")
    const [message, setMessage] = useState(contact ? contact.message : "")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openEditContact}
            onClose={() => setEditOpenContact(false)}
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
                    <Typography component="h2">Edit Contact</Typography>
                    <div className="mb-1">
                        <label className="mb-2">Name</label>
                        <input type="text" name="user_name" className="form-control" onChange={(e) => setName(e.target.value)} placeholder="Enter To Name" value={name} />
                    </div>
                    <div className="mb-1">
                        <label className="mb-2">Email</label>
                        <input type="email" name="user_email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Enter To Email" value={email} />
                    </div>
                    <div className="mb-1">
                        <label className="mb-2">Message</label>
                        <textarea name="message" className="form-control" onChange={(e) => setMessage(e.target.value)} placeholder="Enter To Message" value={message} />
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
                                let data = { id: contact.id, name: name, email: email, message: message }
                                dispatch(editContact(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setEditOpenContact(false);
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
                                setEditOpenContact(false);
                            }}
                        >
                            Close
                        </button>

                    </Stack>
                </Stack>
            </Sheet>
        </Modal >
    );
}


