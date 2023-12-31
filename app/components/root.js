import React, { useEffect } from "react";

//components
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import GuestHome from "./GuestHome";
import UserProfile from "./UserProfile";
import Products from "./Products";
import NavBar from "./Navbar";
import Register from "./Register";
import Product from "./Product";
import Reviews from "./Reviews";
import PastOrders from "./PastOrders";

//actions
import { fetchUserProfileThunk } from "../reducers/fetchUserProfile";

import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth, cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUserProfileThunk(auth.id));
    }
  }, [auth]);

  // useEffect(() => {
  //   dispatch(fetchCart());
  // }, [auth]);

  return (
    <div>
      <NavBar />
      <h1>E-Card-merce: Buy & Sell Trading Cards</h1>
      <Routes>
        <Route path="/" element={auth.id ? <Home /> : <GuestHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={auth.id ? <Home /> : <Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />

        {auth.id && (
          <>
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/orders/past" element={<PastOrders />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
