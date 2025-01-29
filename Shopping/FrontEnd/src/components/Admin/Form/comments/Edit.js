import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useDispatch, useSelector } from "react-redux"
import { editComments } from "../../../../redux/api/comments";
export const Edit = ({ openEditComments, setEditOpenComments, comments, update }) => {
    const { users  ,  products} = useSelector((store) => store.data)
    const [userId, setUserId] = useState(comments ? comments.userId : null)
    const [productid, setProductid] = useState(comments ? comments.productid : null)
    const [comment, setComment] = useState(comments ? comments.comment : "")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    return (
        <Modal
            open={openEditComments}
            onClose={() => setEditOpenComments(false)}
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
                    <Typography component="h2">Edit Comment</Typography>
                    <div className="mb-1">
                        <select
                            name="userId"
                            className="form-control"
                            onChange={(e) => setUserId(e.target.value)}
                            value={userId}
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
                            value={productid}
                        >
                            <option >Select Products</option>
                            {products && products.map((row, index) => {
                                return <option key={index} value={row.id}>{row.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="mb-1">
                        <textarea name="comment" className="form-control" onChange={(e) => setComment(e.target.value)} placeholder="Enter To Comment" value={comment} />
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
                                let data = { id: comments.id, userId: userId, productid: productid, comment: comment }
                                dispatch(editComments(data)).then((res) => {
                                    const { status } = res.payload
                                    if (status === 200) {
                                        setEditOpenComments(false);
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
                                setEditOpenComments(false);
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


