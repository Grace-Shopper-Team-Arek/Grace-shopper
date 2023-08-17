import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { oneProductThunk } from "../reducers/product";
import { allReviewsOneProductThunk } from "../reducers/reviews";
import ReviewProduct from "./ReviewProduct";
import Reviews from "./Reviews";
import { addToCart } from "../reducers/cart";

const Product = (props) => {
  const { id } = useParams();

  const { fetchProduct, product, fetchReviews } = props;
  useEffect(() => {
    fetchProduct(id);
    fetchReviews(id);
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
              <button onClick={() => props.addToCart(product, 1)}>
                <i className="fa-solid fa-cart-plus"></i> Add to Cart
              </button>
              <Link to={`/products`}>
                <button>Back to Full Products Page</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {window.localStorage.token ? <ReviewProduct /> : ""}
      <Reviews />
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
    fetchReviews: id => dispatch(allReviewsOneProductThunk(id)),
    addToCart: (prod, quant) => dispatch(addToCart(prod, quant)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
