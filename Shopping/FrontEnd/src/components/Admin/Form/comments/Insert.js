import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useDispatch, useSelector } from "react-redux"
import { createComments } from "../../../../redux/api/comments";
export const Insert = ({ openComments, setOpenComments, update }) => {
    const { users  ,  products} = useSelector((store) => store.data)
    const [userId, setUserId] = useState(null)
    const [productid, setProductid] = useState(null)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openComments}
            onClose={() => setOpenComments(false)}
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
                    <Typography component="h2">Add Comments</Typography>
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
                        <textarea name="comment" className="form-control" onChange={(e) => setComment(e.target.value)} placeholder="Enter To Message" />
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
                                let data = { userId: userId, productid: productid, comment: comment }
                                dispatch(createComments(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setOpenComments(false);
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
                            onClick={() => { setOpenComments(false) }}
                        >
                            Close
                        </button>

                    </Stack>
                </Stack>
            </Sheet>
        </Modal>
    );
}


