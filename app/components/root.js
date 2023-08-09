import React, { useEffect } from "react";

//components
import Home from "./Home";
import Login from "./Login";
import Cart from "./Cart";
import UserProfile from "./UserProfile";
import Products from "./Products";
import NavBar from './Navbar';

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
      {auth.id ? <Home /> : <Login />}
      {!!auth.id  && (
          <div>
            <main>
            <Routes>
              <Route path='/cart' element={ <Cart /> } />
              <Route path='/users/:id' element={ <UserProfile /> } />
              <Route path="/products" element={<Products />} />
            </Routes>
            </main>
          </div>
        )
      }
    </div>
  );
};

export default App;
