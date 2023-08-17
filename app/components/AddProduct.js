import React from "react";
import { connect } from "react-redux";
// import Product from "../../server/db/Product";
import { addProduct } from "../reducers/product";

function AddProduct(props){
    function handleSubmit(event){
        //stop the page form refreshing
        event.preventDefault();

        //grab the data
        const newProduct = {
            name: event.target[0].value,
            price: event.target[1].value,
            description: event.target[2].value,
            imageUrl: event.target[3].value,
        }

        //validate the data
        const dataPackage = {};

        if(newProduct?.name) dataPackage.name = newProduct.name;
        else return "bad data";

        if(newProduct?.price) dataPackage.price = newProduct.price;
        else return "bad data";

        if(newProduct?.description) dataPackage.description = newProduct.description;
        if(newProduct?.imageUrl) dataPackage.imageUrl = newProduct.imageUrl;

        props.addProduct(dataPackage);
    }

return <div className="card">
        <div className="card-header">Admin functions</div>
        <div className="card-body">
          <h5 className="card-title">
            Add a new product
          </h5>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Product name:</label>{"   "}
                    <input type="text" name="name" />
                </div><div>
                    <label htmlFor="price">Price:</label>{"   "}
                    <input type="number" name="price"/>
                </div><div>
                    <label htmlFor="description">Description:</label>{"   "}
                    <input type="text" name="description" /> <small>(optional)</small>
                </div><div>
                    <label htmlFor="imageUrl">Image URL:</label>{"   "}
                    <input type="text" name="imageUrl"/> <small>(optional)</small>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
      </div>
}

const mapStateToProps = (state) => {
    return {
      userProfile: state.userProfile,
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product) => dispatch(addProduct(product)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddProduct);