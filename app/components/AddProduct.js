import React from "react";
import { connect } from "react-redux";
// import Product from "../../server/db/Product";

function AddProduct(props){
    function handleSubmit(event){        

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
                    <label htmlFor="description">Description:</label>{"   "}
                    <input type="text" name="description" /> <small>(optional)</small>
                </div><div>
                    <label htmlFor="price">Price:</label>{"   "}
                    <input type="number" name="price"/>
                </div><div>
                    <label htmlFor="imageUrl">Image URL:</label>{"   "}
                    <input type="number" name="price"/> <small>(optional)</small>
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
    
}

export default connect(mapStateToProps)(AddProduct);