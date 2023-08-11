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
    const response = await axios.get("/api/orders/cart", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "SET_CART", cart: response.data });
  };
};

// export const addToCart = (product, quantity = 1) => {
//   return async (dispatch) => {
//     const token = window.localStorage.getItem("token");
//     const { data: updated } = await axios.put(`/api/orders/cart`, product, quantity);
//     dispatch({ type: "ADD_TO_CART", cart: updated });
//   };
// };

export default cart;
