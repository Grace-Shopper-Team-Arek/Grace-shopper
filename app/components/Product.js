import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { oneProductThunk } from "../reducers/product";
import { addToCart } from "../reducers/cart";

const Product = (props) => {
  const { id } = useParams();

  console.log("HERE IS THE PRODUCT ID");
  console.log(id);

  const { fetchProduct, product } = props;

  console.log("HERE ARE THE PRODUCT PROPS");
  console.log(props);

  console.log("HERE IS THE LOCAL STORAGE TOKEN");
  console.log(window.localStorage.getItem("token"));

  useEffect(() => {
    fetchProduct(id);
  }, [id]); //only runs once with [id] argument

  //Similar to using states -> want to listen to effect changes

  return (
    <div className="container mx-auto mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <img src={product.imageUrl} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{product?.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Price: ${product?.price}
              </h6>
              <p className="card-text">{product?.description}</p>
              <button
                onClick={({ product }, qty = 1) =>
                  props.addToCart(product, qty)
                }
              >
                <i className="fas fa-link"></i>Add to Cart
              </button>
              <Link to={`/products`}>
                <button>Back to Full Products Page</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.product,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(oneProductThunk(id)),
    addToCart: (prod, quant) => dispatch(addToCart(prod, quant)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
