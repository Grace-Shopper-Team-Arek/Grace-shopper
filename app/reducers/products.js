import axios from "axios";

const FETCH_PRODUCTS = "FETCH_PRODUCTS";

//action creators
const fetchProducts = (products) => {
  return {
    type: FETCH_PRODUCTS,
    products,
  };
};

//thunks
export const allProductsThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/products`);
      dispatch(fetchProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

//reducers
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
