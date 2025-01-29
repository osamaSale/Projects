import React, { useState } from 'react'
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from '@mui/joy/Typography/Typography';
import { editProducts } from "../../../../redux/api/products";
import { useDispatch, useSelector } from 'react-redux';
export const Edit = ({ openEditProduct, setOpenEditProduct, product, update }) => {
  const { brands, devices } = useSelector((store) => store.data)
  const [name, setName] = useState(product ? product.name : "");
  const [brand, setBrand] = useState(product ? product.brand : "");
  const [device, setDevice] = useState(product ? product.device : "");
  const [color, setColor] = useState(product ? product.color : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [priceDiscount, setPriceDiscount] = useState(product ? product.priceDiscount : "");
  const [description, setDescription] = useState(product ? product.description : null);
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(product ? product.stock : "");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  return (
    <Modal
      open={openEditProduct}
      onClose={() => setOpenEditProduct(false)}
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
              onChange={(e) => setName(e.target.value)} value={name} />
          </div>
          <div className="mb-1">
            <select
              name="brand"
              className="form-control"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
            >
              <option>Select Brands</option>
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
              value={device}
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
              value={color}
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
              onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>
          <div className="mb-1">
            <input type="number" name="priceDiscount" className="form-control bg-transparent" placeholder="Enter Your Price"
              onChange={(e) => setPriceDiscount(e.target.value)} value={priceDiscount} />
          </div>
          <div className="mb-1">
            <input type="text" name="description" className="form-control bg-transparent" placeholder="Enter Your description"
              onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>
          <div className="mb-1">
            <select
              name="stock"
              className="form-control"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
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
              type='button'
              className="btn btn-primary"
              onClick={() => {
                setLoading(true)
                const fromData = new FormData();
                fromData.append("id", product.id)
                fromData.append("name", name);
                fromData.append("brand", brand);
                fromData.append("device", device);
                fromData.append("color", color);
                fromData.append("price", price);
                fromData.append("priceDiscount", priceDiscount);
                fromData.append("description", description);
                fromData.append("stock", stock);
                if (image) {
                  fromData.append("image", image, image.name);
                }
                dispatch(editProducts(fromData))
                .then((res) => {
                  const { status } = res.payload
                  if (status === 200) {
                    setOpenEditProduct(false)
                    update()
                  } else {
                    setOpenEditProduct(true)
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
                setOpenEditProduct(false);
              }}
            >
              Close
            </button>
          </Stack>
        </Stack>
      </Sheet>
    </Modal>
  )
}
