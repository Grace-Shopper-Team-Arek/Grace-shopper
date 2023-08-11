import React, { useEffect } from "react";

//components
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import GuestHome from "./GuestHome";
import UserProfile from "./UserProfile";
import Products from "./Products";
import NavBar from './Navbar';
import Register from "./Register";

//actions
import { fetchUserProfileThunk } from "../reducers/fetchUserProfile";

import { useSelector, useDispatch } from "react-redux";
import { loginWithToken, fetchCart } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUserProfileThunk(auth.id));
      dispatch(fetchCart());
    }
  }, [auth]);

  return (
    <div>
      <NavBar />
      <h1>Acme Shopping</h1>
      <Routes>
        <Route path="/" element={auth.id ? <Home /> : <GuestHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={auth.id ? <Home /> : <Login />} />
        {auth.id && (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/products" element={<Products />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
