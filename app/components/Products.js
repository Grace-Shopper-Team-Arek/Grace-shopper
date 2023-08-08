import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { allProductsThunk } from "../reducers/products";

const Products = (props) => {
  const { fetchProducts, products } = props;
  console.log(props);

  useEffect(() => {
    fetchProducts();
  }, [products]); //only runs once with [] argument

  //Similar to using states -> want to listen to effect changes

  return (
    <div>
      <ul>
        {products.map((product, id) => (
          <div key={id}>
            <li>{product.name}</li>
            <li>{product.description}</li>
            <li>{product.imageUrl}</li>
          </div>
        ))}
      </ul>
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
