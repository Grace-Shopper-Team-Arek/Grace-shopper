import axios from "axios";
const cart = (state = { lineItems: [] }, action) => {
  if (action.type === "SET_CART") {
    return action.cart;
  }
  if (action.type === "ADD_TO_CART") {
    return action.cart;
  }
  if (action.type === "REMOVE_FROM_CART") {
    return action.cart;
  }
  return state;
};

//state of cart passed through (if token is null, pass through empty state of cart for non-logged-in user)
export const fetchCart = (cart) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    console.log("HERE IS THE LOCAL STORAGE TOKEN FROM fetchCart");
    console.log(token);
    if (token === null) {
      window.localStorage.setItem("token", "guest");
      window.localStorage.setItem("cart", JSON.stringify({ lineItems: [] }));
      const cartdata = JSON.parse(window.localStorage.getItem("cart"));
      dispatch({ type: "SET_CART", cart: cartdata });
    } else if (token === "guest") {
      const cartdata = JSON.parse(window.localStorage.getItem("cart"));
      dispatch({ type: "SET_CART", cart: cartdata });
    } else {
      const response = await axios.get("/api/orders/cart", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_CART", cart: response.data });
    }
  };
};

export const addToCart = (product, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token === "guest") {
      const cart = JSON.parse(window.localStorage.getItem("cart"));
      cart.lineItems.push({ product, quantity });
      window.localStorage.setItem("cart", cart);
      dispatch({ type: "ADD_TO_CART", cart: cart });
    } else {
      const response = await axios.post(
        `/api/orders/cart`,
        {
          product,
          quantity,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch({ type: "ADD_TO_CART", cart: response.data });
    }
  };
};

export const removeFromCart = (product, quantityToRemove) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    const response = await axios.put(
      `/api/orders/cart`,
      {
        product,
        quantityToRemove,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: "REMOVE_FROM_CART", cart: response.data });
  };
};

export default cart;
