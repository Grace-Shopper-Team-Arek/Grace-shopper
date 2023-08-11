import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { allProductsThunk } from "../reducers/products";

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
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrl} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product?.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Price: ${product?.price}
                  </h6>
                  <button>
                    <i className="fas fa-link"></i>Add to Cart
                  </button>
                </div>
              </Link>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: () => dispatch(allProductsThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
