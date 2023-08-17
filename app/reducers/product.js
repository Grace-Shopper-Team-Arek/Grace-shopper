import axios from "axios";

const FETCH_PRODUCT = "FETCH_PRODUCT";

//action creators
const fetchProduct = (product) => {
  return {
    type: FETCH_PRODUCT,
    product,
  };
};

//thunks
export const oneProductThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/products/${id}`);
      dispatch(fetchProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export function addProduct(product){
  return async () => {
    try {
      await axios.post("api/products", product, {headers: {authorization: window.localStorage.getItem("token")}});
    } catch (error) {
      console.log(error) 
    }
  }
}

const initialState = {};

//reducers
export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
