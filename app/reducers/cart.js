import axios from "axios";
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  }
  if (action.type === "ADD_TO_CART") {
    return action.cart;
  }
  return state;
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    console.log("INSIDE THE REDUCER - WINDOW.LOCAL.STORAGE");
    console.log(token);
    const response = await axios.get("/api/orders/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

export const addToCart = (product, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    console.log("INSIDE THE REDUCER - WINDOW.LOCAL.STORAGE");
    console.log(token);
    const response = await axios.put(`/api/orders/cart`, {
      headers: {
        authorization: token,
      },
      body: {
        product,
        quantity,
      },
    });
    dispatch({ type: "ADD_TO_CART", cart: response.data });
  };
};

export default cart;
