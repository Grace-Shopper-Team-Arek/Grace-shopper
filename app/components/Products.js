import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { allProductsThunk } from "../reducers/products";
import { addToCart } from "../reducers/cart";

const Products = (props) => {
  const { fetchProducts, products } = props;

  useEffect(() => {
    fetchProducts();
  }, []); //only runs once with [] argument

  //Similar to using states -> want to listen to effect changes
  
  return (
    <div className="container mx-auto mt-4">
      <div className="row">
        <div className="col-md-4">
          {products.map((product) => (
            <div className="card">
              <img src={product.imageUrl} className="card-img-top" />
              <div className="card-body">
                <Link to={`/products/${product.id}`}>
                  <h5 className="card-title">{product?.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Price: ${product?.price}
                  </h6>
                </Link>
                <button onClick={() => props.addToCart(product, 1)}>
                  <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(allProductsThunk()),
    addToCart: (prod, quant) => dispatch(addToCart(prod, quant)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
