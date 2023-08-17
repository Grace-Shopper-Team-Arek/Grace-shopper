import React from "react";
import { connect } from 'react-redux';
import { addNewReview, updateReview } from "../reducers/reviews";

function ReviewProduct(props){
    //find if the logged-in user has already reviewed product
    const existingReview = Array.from(props.reviews).filter(x => x.userId === props.userId)
    const alreadyReviewed = existingReview.length > 0;
    console.log(existingReview)
    let rating = parseInt(existingReview[0]?.rating);

    function handleSubmit(event){
        //stop the page from refreshing
        event.preventDefault();
    
        //grab the data
        const dataPackage = {
            productId: props.productId,
            userId: props.userId,
            username: props.username,
        };
    
        dataPackage.reviewText = event.target[0].value;

        //Just set the rating to 1 if the user hasn't clicked any stars yet, I do not have the werewithal for something more elegant
        dataPackage.reviewScore = rating ? rating : 1;

        if(alreadyReviewed) dataPackage.reviewId = existingReview[0].id;
    
        //clear the form
        event.target[0].value = "";
    
        //send the data to be updated
        alreadyReviewed ? props.updateReview(dataPackage) : props.addNewReview(dataPackage);
    }

    class Stars extends React.Component{
        constructor(){
            super()
            this.state = {rating: rating}
            this.handleStars = this.handleStars.bind(this);
        }

        handleStars(event){
            const starRating = parseInt(event.target.attributes.value.value);
            this.setState({rating: starRating});
            rating = starRating;
        }

        render(){
            let stars = [];
            for(let i = 1; i < 6; i++){
                stars.push(<label key={`${"ratingStar" + i}`}><i className="fa fa-fw fa-star"
                        value={i} 
                        style={{color: `${this.state.rating >= i ? "#ff0" : "#000"}`, "fontSize": "20pt", "WebkitTextStrokeWidth": "2px", "WebkitTextStrokeColor": "black"}} 
                        onClick={this.handleStars}
                    />
                </label>)
            }
            return <div>
            <label style={{"fontSize": "15pt"}}>Your rating:</label>{"   "}
                {stars}
            </div>
        }
    }

    return <div>
        <h3>{alreadyReviewed ? "Update your review of this product?": "Submit a Review for this product:"}</h3>
        <form onSubmit={handleSubmit}>
            <Stars />
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