import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";
import { Link } from "react-router-dom";
import { removeFromCart } from "../reducers/cart";
import { connect } from "react-redux";

const Cart = (props) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  //calculate total price
  var totalPrice = cart.lineItems.reduce(
    (acc, currVal) => acc + currVal.product.price * currVal.quantity,
    0
  );

  return (
    <div class="container mt-5 p-3 rounded cart">
      <div class="row no-gutters">
        <div class="col-md-8">
          <div class="product-details mr-2">
            <div class="d-flex flex-row align-items-center">
              <i class="fa fa-long-arrow-left"></i>
              <Link to={`/products/`}>
                <span class="ml-2">Continue Shopping</span>
              </Link>
            </div>
            <hr />
            <h3 class="mb-0">Shopping Cart: {cart.lineItems.length} item(s)</h3>
            <hr />
            <div class="d-flex justify-content-between">
              <span> Item Details </span>
              <span> Quantity </span>
              <span> Price </span>
              <span> Remove</span>
            </div>
            {cart.lineItems.map((lineItem) => (
              <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                <div class="d-flex flex-row">
                  <img
                    class="rounded"
                    src={lineItem.product.imageUrl}
                    width="100"
                  />
                  <div class="ml-2">
                    {/* <span class="font-weight-bold d-block" >
                      {lineItem.product.name}
                    </span> */}
                    <div
                      className="fw-bolder text-wrap"
                      style={{ width: "8rem" }}
                    >
                      {lineItem.product.name}
                    </div>
                  </div>
                </div>
                <span class="d-block">{lineItem.quantity}</span>
                <span class="d-block ml-5 font-weight-bold">
                  ${lineItem.product.price}
                </span>
                <button
                  onClick={() => props.removeFromCart(lineItem.product, 1)}
                >
                  <i class="fa-regular fa-trash-can"></i>
                </button>
              </div>
            ))}
            <hr />
          </div>
        </div>
        <div class="col-md-4">
          <div class="payment-info">
            <div class="d-flex justify-content-between align-items-center">
              <span>Card details</span>
              <img
                class="rounded"
                src="https://i.imgur.com/WU501C8.jpg"
                width="30"
              />
            </div>
            <span class="type d-block mt-3 mb-1">Card type</span>
            <label class="radio">
              {" "}
              <input type="radio" name="card" value="payment" checked />{" "}
              <span>
                <img
                  width="30"
                  src="https://img.icons8.com/color/48/000000/mastercard.png"
                />
              </span>{" "}
            </label>

            <label class="radio">
              {" "}
              <input type="radio" name="card" value="payment" />{" "}
              <span>
                <img
                  width="30"
                  src="https://img.icons8.com/officel/48/000000/visa.png"
                />
              </span>{" "}
            </label>

            <label class="radio">
              {" "}
              <input type="radio" name="card" value="payment" />{" "}
              <span>
                <img
                  width="30"
                  src="https://img.icons8.com/ultraviolet/48/000000/amex.png"
                />
              </span>{" "}
            </label>

            <label class="radio">
              {" "}
              <input type="radio" name="card" value="payment" />{" "}
              <span>
                <img
                  width="30"
                  src="https://img.icons8.com/officel/48/000000/paypal.png"
                />
              </span>{" "}
            </label>
            <div>
              <label class="credit-card-label">Name on card</label>
              <input
                type="text"
                class="form-control credit-inputs"
                placeholder="Name"
              />
            </div>
            <div>
              <label class="credit-card-label">Card number</label>
              <input
                type="text"
                class="form-control credit-inputs"
                placeholder="0000 0000 0000 0000"
              />
            </div>
            <div class="row">
              <div class="col-md-6">
                <label class="credit-card-label">Date</label>
                <input
                  type="text"
                  class="form-control credit-inputs"
                  placeholder="12/24"
                />
              </div>
              <div class="col-md-6">
                <label class="credit-card-label">CVV</label>
                <input
                  type="text"
                  class="form-control credit-inputs"
                  placeholder="342"
                />
              </div>
            </div>
            <hr class="line" />
            <div class="d-flex justify-content-between information">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div class="d-flex justify-content-between information">
              <span>Shipping</span>
              <span>$20</span>
            </div>
            <div class="d-flex justify-content-between information">
              <span>Total(Incl. taxes)</span>
              <span>${totalPrice + 20}</span>
            </div>
            <button
              class="btn btn-primary btn-block d-flex justify-content-between mt-3"
              type="button"
            >
              <span>${totalPrice + 20}</span>
              <span>
                Checkout<i class="fa fa-long-arrow-right ml-1"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (prod, quant) => dispatch(removeFromCart(prod, quant)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

{
  /* <h1>Cart</h1>
      <pre>
        {
          JSON.stringify(cart, null, 2)
        }
      </pre> */
}
