import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { attemptRegister, addToCart, attemptLogin } from "../store";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.password !== state.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await dispatch(
        attemptRegister({
          username: state.username,
          email: state.email,
          password: state.password,
        })
      );
      await dispatch(
        attemptLogin({ username: state.username, password: state.password })
      );
      console.log(
        "ASYNC TEST 1, testing for token:",
        window.localStorage.getItem("token")
      );
      const localCart = await JSON.parse(window.localStorage.getItem("cart"));
      console.log("ASYNC TEST 2, testing for localCart:", localCart);
      if (localCart) {
        localCart.lineItems.forEach((item) =>
          dispatch(addToCart(item.product, item.quantity))
        );
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={state.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
