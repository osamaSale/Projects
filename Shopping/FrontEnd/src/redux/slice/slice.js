import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import { createUser, deleteUser, editUser, getAllUsers, login, searchUser, updatePassword } from "../api/users"
import { createBrand, deleteBrand, editBrand, getAllBrands, searchBrand } from "../api/brands";
import { createDevices, deleteDevices, editDevices, getAllDevices, searchDevices } from "../api/devices";
import { createProducts, deleteProducts, editProducts, getAllProducts, searchProducts } from "../api/products";
import { createContact, deleteContact, editContact, getAllContact, searchContact } from "../api/contact";
import { createNews, deleteNews, editNews, getAllNews, searchNews } from "../api/news";
import { createWishlist, deleteWishlist, editWishlist, getAllWishlist, searchWishlist } from "../api/wishlist";
import { createCart, deleteCart, editCart, getAllCarts, searchCarts } from "../api/carts";
import { createOrder, editOrder, getAllOrders, deleteOrder } from "../api/orders";
import { createComments, deleteComments, editComments, getAllComments, searchComments } from "../api/comments";


const initialState = {
    loading: false,
    users: [],
    brands: [],
    devices: [],
    products: [],
    contact: [],
    news: [],
    wishlist: [],
    carts: [],
    orders: [],
    comments: [],
    findProductBrand: [],
    user: null,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem("user")
            state.user = null
        },
        descending: (state, action) => {
            state.products = state.products.sort((a, b) =>
                a.name < b.name ? 1 : -1,
            );
        },
        ascending: (state, action) => {
            state.products = state.products.sort((a, b) =>
                a.name > b.name ? 1 : -1,
            );
        },
        lowestPrice: (state, action) => {
            state.products = state.products.sort((a, b) => (a.price > b.price) ? 1 : -1)
        },
        highestPrice: (state, action) => {

            state.products = state.products.sort((a, b) => (a.price < b.price) ? 1 : -1)
        },
    },

    extraReducers: builder => {

        /* ===================== Users ======================== */

        // Get All Users
       
        builder.addCase(getAllUsers.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.users = action.payload.result
            let user = JSON.parse(localStorage.getItem('user'));

            if (user) {
                state.user = state.users?.find((u) => u.id === user.id)
            } else {
                state.user = null
            }
            state.users?.forEach((order) => {
                order.order = state.orders ? state.orders.filter((u) => u.userId === parseInt(order.id)) : []
            })
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false
        })

        // Create User

        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.loading = false
        })

        // Edit User 

        builder.addCase(editUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editUser.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editUser.rejected, (state, action) => {
            state.loading = false
        })
        // update Password

        builder.addCase(updatePassword.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.loading = false
        })

        // Delete User

        builder.addCase(deleteUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
        })

        // Search User

        builder.addCase(searchUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchUser.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.users = action.payload.result
            } else {
                state.users = [...state.users]
            }
            state.loading = false
        })
        builder.addCase(searchUser.rejected, (state, action) => {
            state.loading = false
        })

        // Login 

        builder.addCase(login.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false
        })

        /* ===================== Brands ======================== */

        // Get All Brands

        builder.addCase(getAllBrands.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllBrands.fulfilled, (state, action) => {
            state.loading = false
            state.brands = action.payload.result
        })
        builder.addCase(getAllBrands.rejected, (state, action) => {

            state.loading = false
        })

        // Create Brand

        builder.addCase(createBrand.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createBrand.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createBrand.rejected, (state, action) => {
            state.loading = false
        })

        // Edit Brand 

        builder.addCase(editBrand.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editBrand.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editBrand.rejected, (state, action) => {
            state.loading = false
        })

        // Delete brand

        builder.addCase(deleteBrand.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteBrand.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteBrand.rejected, (state, action) => {
            state.loading = false
        })

        // Search brand

        builder.addCase(searchBrand.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchBrand.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.brands = action.payload.result
            } else {
                state.brands = [...state.brands]
            }
            state.loading = false
        })
        builder.addCase(searchBrand.rejected, (state, action) => {
            state.loading = false
        })

        /* ===================== Devices ======================== */

        // Get All Devices

        builder.addCase(getAllDevices.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllDevices.fulfilled, (state, action) => {
            state.loading = false
            state.devices = action.payload.result
        })
        builder.addCase(getAllDevices.rejected, (state, action) => {

            state.loading = false
        })

        // Create Devices

        builder.addCase(createDevices.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createDevices.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createDevices.rejected, (state, action) => {
            state.loading = false
        })

        // Edit Devices 

        builder.addCase(editDevices.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editDevices.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editDevices.rejected, (state, action) => {
            state.loading = false
        })

        // Delete Devices

        builder.addCase(deleteDevices.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteDevices.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteDevices.rejected, (state, action) => {
            state.loading = false
        })

        // Search Devices

        builder.addCase(searchDevices.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchDevices.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.devices = action.payload.result
            } else {
                state.devices = [...state.devices]
            }
            state.loading = false
        })
        builder.addCase(searchDevices.rejected, (state, action) => {
            state.loading = false
        })

        /* ===================== Products ======================== */

        // Get All Products

        builder.addCase(getAllProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllProducts.fulfilled, (state, action) => {

            state.loading = false
            state.products = action.payload.result
            state.findProductBrand =action.payload.result

        })
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false
        })

        // Create Products

        builder.addCase(createProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createProducts.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createProducts.rejected, (state, action) => {
            state.loading = false
        })

        // Edit Products 

        builder.addCase(editProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editProducts.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editProducts.rejected, (state, action) => {
            state.loading = false
        })

        // Delete Products

        builder.addCase(deleteProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteProducts.rejected, (state, action) => {
            state.loading = false
        })

        // Search Products

        builder.addCase(searchProducts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchProducts.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.products = action.payload.result
            } else {
                state.products = [...state.products]
            }
            state.loading = false
        })
        builder.addCase(searchProducts.rejected, (state, action) => {
            state.loading = false
        })

        /* ===================== Contact Us ======================== */

        // Get All Contact

        builder.addCase(getAllContact.pending, (state, action) => {
            state.loading = true
            state.contact = []
        })
        builder.addCase(getAllContact.fulfilled, (state, action) => {
            state.loading = false
            state.contact = action.payload.result
        })
        builder.addCase(getAllContact.rejected, (state, action) => {

            state.loading = false
        })

        // Create Contact

        builder.addCase(createContact.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createContact.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createContact.rejected, (state, action) => {
            state.loading = false
        })

        // Edit Contact 

        builder.addCase(editContact.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editContact.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editContact.rejected, (state, action) => {
            state.loading = false
        })

        // Delete Contact

        builder.addCase(deleteContact.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteContact.rejected, (state, action) => {
            state.loading = false
        })

        // Search Contact

        builder.addCase(searchContact.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchContact.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.contact = action.payload.result
            } else {
                state.contact = [...state.contact]
            }
            state.loading = false
        })
        builder.addCase(searchContact.rejected, (state, action) => {
            state.loading = false
        })

        /* ===================== News ======================== */

        // Get All News

        builder.addCase(getAllNews.pending, (state, action) => {
            state.loading = true
            state.news = []
        })
        builder.addCase(getAllNews.fulfilled, (state, action) => {
            state.loading = false
            state.news = action.payload.result
        })
        builder.addCase(getAllNews.rejected, (state, action) => {

            state.loading = false
        })

        // Create News

        builder.addCase(createNews.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createNews.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createNews.rejected, (state, action) => {
            state.loading = false
        })

        // Edit News 

        builder.addCase(editNews.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editNews.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editNews.rejected, (state, action) => {
            state.loading = false
        })

        // Delete News

        builder.addCase(deleteNews.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteNews.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteNews.rejected, (state, action) => {
            state.loading = false
        })

        // Search News

        builder.addCase(searchNews.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchNews.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.news = action.payload.result
            } else {
                state.news = [...state.news]
            }
            state.loading = false
        })
        builder.addCase(searchNews.rejected, (state, action) => {
            state.loading = false
        })

        /* ===================== Wishlist ======================== */

        // Get All Wishlist

        builder.addCase(getAllWishlist.pending, (state, action) => {
            state.loading = true
            state.wishlist = []
        })
        builder.addCase(getAllWishlist.fulfilled, (state, action) => {
            state.loading = false
            state.wishlist = action.payload.result
        })
        builder.addCase(getAllWishlist.rejected, (state, action) => {

            state.loading = false
        })

        // Create Wishlist

        builder.addCase(createWishlist.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createWishlist.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createWishlist.rejected, (state, action) => {
            state.loading = false
        })

        // Edit Wishlist 

        builder.addCase(editWishlist.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editWishlist.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editWishlist.rejected, (state, action) => {
            state.loading = false
        })

        // Delete Wishlist

        builder.addCase(deleteWishlist.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteWishlist.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteWishlist.rejected, (state, action) => {
            state.loading = false
        })

        // Search Wishlist

        builder.addCase(searchWishlist.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchWishlist.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.wishlist = action.payload.result
            } else {
                state.wishlist = [...state.wishlist]
            }
            state.loading = false
        })
        builder.addCase(searchWishlist.rejected, (state, action) => {
            state.loading = false
        })

        /* ===================== Carts ======================== */

        // Get All Carts

        builder.addCase(getAllCarts.pending, (state, action) => {
            state.loading = true
            state.carts = []
        })
        builder.addCase(getAllCarts.fulfilled, (state, action) => {
            state.loading = false
            state.carts = action.payload.result
        })
        builder.addCase(getAllCarts.rejected, (state, action) => {

            state.loading = false
        })

        // Create Carts

        builder.addCase(createCart.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createCart.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createCart.rejected, (state, action) => {
            state.loading = false
        })

        // Edit Carts 

        builder.addCase(editCart.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editCart.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                /*  toast.error(massage) */
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editCart.rejected, (state, action) => {
            state.loading = false
        })

        // Delete Carts

        builder.addCase(deleteCart.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteCart.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteCart.rejected, (state, action) => {
            state.loading = false
        })

        // Search Carts

        builder.addCase(searchCarts.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchCarts.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.carts = action.payload.result
            } else {
                state.carts = [...state.carts]
            }
            state.loading = false
        })
        builder.addCase(searchCarts.rejected, (state, action) => {
            state.loading = false
        })
        /* ===================== Orders ======================== */

        // Get All Orders

        builder.addCase(getAllOrders.pending, (state, action) => {
            state.loading = true
            state.orders = []
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload.result
        })
        builder.addCase(getAllOrders.rejected, (state, action) => {

            state.loading = false
        })

        // Create Orders

        builder.addCase(createOrder.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false
        })

        // Edit Orders 

        builder.addCase(editOrder.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editOrder.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editOrder.rejected, (state, action) => {
            state.loading = false
        })

        // Delete Order

        builder.addCase(deleteOrder.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false
        })

        /* ===================== comments ======================== */

        // Get All comments

        builder.addCase(getAllComments.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getAllComments.fulfilled, (state, action) => {
            state.loading = false
            state.comments = action.payload.result
        })
        builder.addCase(getAllComments.rejected, (state, action) => {

            state.loading = false
        })

        // Create comments

        builder.addCase(createComments.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(createComments.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(createComments.rejected, (state, action) => {
            state.loading = false
        })

        // Edit comments 

        builder.addCase(editComments.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(editComments.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(editComments.rejected, (state, action) => {
            state.loading = false
        })

        // Delete comments

        builder.addCase(deleteComments.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(deleteComments.fulfilled, (state, action) => {
            const { status, massage } = action.payload
            if (status === 200) {
                toast.error(massage)
            } else {
                toast.error(massage)
            }
            state.loading = false
        })
        builder.addCase(deleteComments.rejected, (state, action) => {
            state.loading = false
        })

        // Search comments

        builder.addCase(searchComments.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(searchComments.fulfilled, (state, action) => {
            let { status } = action.payload
            if (status === 200) {
                state.comments = action.payload.result
            } else {
                state.comments = [...state.comments]
            }
            state.loading = false
        })
        builder.addCase(searchComments.rejected, (state, action) => {
            state.loading = false
        })
    }
})

export const { logout, descending, ascending, lowestPrice, highestPrice } = dataSlice.actions;
export default dataSlice.reducer