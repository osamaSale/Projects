import React, { useState } from "react";
import Modal from "@mui/joy/Modal";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { createProducts } from "../../../../redux/api/products";
import { useDispatch, useSelector } from "react-redux";
export function Insert({ openProduct, setOpenProduct, update }) {
  const { brands, devices } = useSelector((store) => store.data)
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [device, setDevice] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [priceDiscount, setPriceDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  return (
    <Modal
      open={openProduct}
      onClose={() => setOpenProduct(false)}
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
          <Typography component="h2">Add Product</Typography>
          <div className="mb-1">
            <input type="text" name="name" className="form-control bg-transparent" placeholder="Enter Your Name"
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-1">
            <select
              name="brands"
              className="form-control"
              onChange={(e) => setBrand(e.target.value)}
            >
              <option >Select Brands</option>
              {brands && brands.map((row, index) => {
                return <option key={index} value={row.name}>{row.name}</option>
              })}
            </select>
          </div>
          <div className="mb-1">
            <select
              name="device"
              className="form-control"
              onChange={(e) => setDevice(e.target.value)}
            >
              <option >Select Devices</option>
              {devices && devices.map((row, index) => {
                return <option key={index} value={row.name}>{row.name}</option>
              })}
            </select>
          </div>
          <div className="mb-1">
            <select
              name="color"
              className="form-control"
              onChange={(e) => setColor(e.target.value)}
            >
              <option >Select Color</option>
              <option value={"black"}>Black</option>
              <option value={"yellow"}>Yellow</option>
              <option value={"red"}>Red</option>
              <option value={"silver"}>Silver</option>
              <option value={"blue"}>Blue</option>
              <option value={"green"}>Green</option>
            </select>
          </div>
          <div className="mb-1">
            <input type="number" name="price" className="form-control bg-transparent" placeholder="Enter Your Price"
              onChange={(e) => setPrice(e.target.value)} />
          </div>
          <div className="mb-1">
            <input type="number" name="priceDiscount" className="form-control bg-transparent" placeholder="Enter Your Discount"
              onChange={(e) => setPriceDiscount(e.target.value)} />
          </div>
          <div className="mb-1">
            <input type="text" name="description" className="form-control bg-transparent" placeholder="Enter Your description"
              onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-1">
            <select
              name="stock"
              className="form-control"
              onChange={(e) => setStock(e.target.value)}
            >
              <option >Select Stock</option>
              <option value={"In Stock"}>In Stock</option>
              <option value={"No Stock"}>No Stock</option>
            </select>
          </div>
          <div className="mb-1">
            <input type="file" className="form-control bg-transparent" onChange={(e) => setImage(e.target.files[0])} />
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
                const fromData = new FormData();
                fromData.append("name", name);
                fromData.append("brand", brand);
                fromData.append("device", device);
                fromData.append("color", color);
                fromData.append("price", price);
                fromData.append("priceDiscount", priceDiscount);
                fromData.append("description", description);
                fromData.append("stock", stock);

                if (image !== null) {
                  fromData.append("image", image, image?.name);
                } else {
                  fromData.append("image", image);
                }
                dispatch(createProducts(fromData)).then((res) => {
                  const { status } = res.payload
                  if (status === 200) {
                    setOpenProduct(false);
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
                setOpenProduct(false);
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
