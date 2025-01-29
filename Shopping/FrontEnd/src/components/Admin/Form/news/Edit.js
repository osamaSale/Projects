import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useDispatch } from "react-redux"
import { editNews } from "../../../../redux/api/news";
export const Edit = ({ openEditNews, setEditOpenNews, news, update }) => {
    const [email, setEmail] = useState(news ? news.email : "")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openEditNews}
            onClose={() => setEditOpenNews(false)}
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
                    <Typography component="h2">Edit News</Typography>

                    <div className="mb-1">
                        <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' value={email}/>
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
                                let data = {id : news.id ,  email: email }
                                dispatch(editNews(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setEditOpenNews(false);
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
                                setEditOpenNews(false);
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


