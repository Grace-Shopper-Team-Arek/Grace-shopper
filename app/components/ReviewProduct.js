import React from "react";
import { connect } from 'react-redux';
import { addNewReview, updateReview } from "../reducers/reviews";

function findRating(anArray){
    for(let i = 0; i < anArray.length -1; i++){
        if(anArray[i].checked) return anArray[i].value;
    }
}

function ReviewProduct(props){
    //find if the logged-in user has already reviewed product
    const existingReview = Array.from(props.reviews).filter(x => x.userId === props.userId)
    const alreadyReviewed = existingReview.length > 0;

    function handleSubmit(event){
        //stop the page from refreshing
        event.preventDefault();
    
        //grab the data
        const dataPackage = {
            productId: props.productId,
            userId: props.userId,
            username: props.username,
        };
    
        dataPackage.reviewText = event.target[5].value;
        dataPackage.reviewScore = findRating(event.target);
        if(alreadyReviewed) dataPackage.reviewId = existingReview[0].id;
    
        //clear the form
        event.target[0].checked = false;
        event.target[1].checked = false;
        event.target[2].checked = false;
        event.target[3].checked = false;
        event.target[4].checked = false;
        event.target[5].value = "";
    
        //send the data to be updated
        alreadyReviewed ? props.updateReview(dataPackage) : props.addNewReview(dataPackage);
    }

    return <div>
        <h3>{alreadyReviewed ? "Update your review of this product?": "Submit a Review for this product:"}</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <input type="radio" id="star1" name="rating" value="1" />
                <input type="radio" id="star2" name="rating" value="2" />
                <input type="radio" id="star3" name="rating" value="3" />
                <input type="radio" id="star4" name="rating" value="4" />
                <input type="radio" id="star5" name="rating" value="5" />
            </div>
            <div>
                <textarea type="review" placeholder="Enter your review here!" style={{width: 500, height: 250}} />
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
}

function mapStateToProps(state){
    return {
        userId: state.userProfile.id,
        username: state.userProfile.username,
        productId: state.product.id,
        reviews: state.reviews,
    }
}

function mapDispatchToProps(dispatch){
    return {
        addNewReview: (review) => dispatch(addNewReview(review)),
        updateReview: (review) => dispatch(updateReview(review)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ReviewProduct);