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
  if (action.type === "CHECKOUT_CART") {
    return action.cart;
  }
  return state;
};

//If token is null, create temp cart within local storage and set token to "guest"
export const fetchCart = (cart) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
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

//If token is guest, update local storage cart and check local cart state for product in lineItems
export const addToCart = (product, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      window.localStorage.setItem("token", "guest");
      window.localStorage.setItem(
        "cart",
        JSON.stringify({ lineItems: [{ product, quantity }] })
      );
      const cartdata = JSON.parse(window.localStorage.getItem("cart"));
      dispatch({ type: "ADD_TO_CART", cart: cartdata });
    } else if (token === "guest") {
      let cartdata = JSON.parse(window.localStorage.getItem("cart"));
      const prodCheck = cartdata.lineItems.filter(
        (lineItem) => lineItem.product.id === product.id
      );
      if (prodCheck.length === 0) {
        cartdata.lineItems.push({ product, quantity });
        window.localStorage.setItem("cart", JSON.stringify(cartdata));
        dispatch({ type: "ADD_TO_CART", cart: cartdata });
      } else {
        const updatedCart = cartdata.lineItems.map(function (item) {
          if (item.product.id === product.id) {
            item.quantity++;
          }
          return item;
        });
        window.localStorage.setItem(
          "cart",
          JSON.stringify({ lineItems: updatedCart })
        );
        dispatch({ type: "ADD_TO_CART", cart: { lineItems: updatedCart } });
      }
    } else {
      console.log("HERE IS THE PRODUCT DETAILS, WITHIN ADD_TO_CART", product);
      console.log("TESTING TESTING TESTING");
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

//Remove from cart reducer. If token = 'guest', update local cart in storage
export const removeFromCart = (product, quantityToRemove) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token === "guest") {
      let cartdata = JSON.parse(window.localStorage.getItem("cart"));

      const reducedCart = cartdata.lineItems.map(function (item) {
        if (item.product.id === product.id) {
          item.quantity--;
        }
        return item;
      });
      const updatedCart = reducedCart.filter((item) => item.quantity !== 0);
      window.localStorage.setItem(
        "cart",
        JSON.stringify({ lineItems: updatedCart })
      );
      dispatch({ type: "REMOVE_FROM_CART", cart: { lineItems: updatedCart } });
    } else {
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
    }
  };
};

//Checkout order (put to orders endpoint)
export const checkout = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    console.log("HERE IS THE TOKEN FROM CHECKOUT()", token);
    const response = await axios.put(
      "/api/orders",
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch({ type: "CHECKOUT_CART", cart: response.data });
  };
};

export default cart;
