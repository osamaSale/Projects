import React, { useEffect } from 'react';
import './App.css'
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllUsers } from './redux/api/users';
import { getAllBrands } from './redux/api/brands';
import { getAllDevices } from './redux/api/devices';
import { getAllProducts } from './redux/api/products';
import { getAllOrders } from './redux/api/orders';
import { getAllCarts } from './redux/api/carts';
import { getAllContact } from './redux/api/contact';
import { getAllNews } from './redux/api/news';
import { getAllWishlist } from './redux/api/wishlist';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Admin } from './components/Admin/Admin';
import { Home } from './components/Home';
import { Footer } from './components/Footer';
import { Register } from './components/Register';
import { Contact } from './components/Contact';
import { About } from './components/About';
import { ShopCarts } from './components/Shop/ShopCarts'
import { WishlistShop } from './components/Shop/WishlistShop';
import { ShopWide } from './components/Shop/ShopWide';
import { ShopSingle } from './components/Shop/ShopSingle';
import { getAllComments } from './redux/api/comments';
import { Shop } from './components/Shop/Shop';
import { Orders } from './components/Account/Orders';
import { Setting } from './components/Account/Setting';
import { Payment } from './components/Account/Payment';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // other code
    update()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const update = () => {
    dispatch(getAllUsers())
    dispatch(getAllBrands())
    dispatch(getAllDevices())
    dispatch(getAllProducts())
    dispatch(getAllContact())
    dispatch(getAllNews())
    dispatch(getAllWishlist())
    dispatch(getAllCarts())
    dispatch(getAllOrders())
    dispatch(getAllComments())
  }

  return (
    <div className=''>
      <ToastContainer />
      <Navbar update={update} />
      <main>
        <Routes>
          <Route path='/' element={<Home update={update} />} />
          <Route path='/about' element={<About update={update} />} />
          <Route path='/contact' element={<Contact update={update} />} />
          <Route path='/login' element={<Login update={update} />} />
          <Route path='/register' element={<Register update={update} />} />
          <Route path='/orders' element={<Orders update={update} />} />
          <Route path='/setting' element={<Setting update={update} />} />
          <Route path='/payment' element={<Payment update={update} />} />
          <Route path='/carts' element={<ShopCarts update={update} />} />
          <Route path='/wishlist' element={<WishlistShop update={update} />} />
          <Route path='/shop' element={<Shop update={update} />} />
          <Route path='/shop-wide' element={<ShopWide update={update} />} />
          <Route path='/shop-single/:id' element={<ShopSingle update={update} />} />
          <Route path='/admin' element={<Admin update={update} />} />
        </Routes>
      </main>
      <Footer update={update} />
    </div>
  );
}

export default App;

