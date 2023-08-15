import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./reducers/auth";
import cart from "./reducers/cart";
import userProfile from "./reducers/fetchUserProfile";
import products from "./reducers/products";
import product from "./reducers/product";
import updateUserProfile from "./reducers/updateUserProfile";
import reviews from "./reducers/reviews";

const reducer = combineReducers({
  reviews,
  auth,
  cart,
  userProfile,
  products,
  product,
  updateUserProfile,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./reducers/auth";
export * from "./reducers/cart";
