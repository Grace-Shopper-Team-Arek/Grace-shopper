import axios from "axios";

const GET_ALL_REVIEWS = "GET ALL REVIEWS";
const ADD_NEW_REVIEW = "ADD NEW REVIEW";
const UPDATE_REVIEW = "UPDATE REVIEW";

//thunks
export function allReviewsOneProductThunk(productId){
    return async dispatch => {
        try {
            const data = await axios.get(`api/reviews/${productId}`);
            dispatch({type: GET_ALL_REVIEWS, reviews: data});
        } catch (error) {
            console.log(error);
        }
    }
}

export function addNewReview(review){
    
    return async dispatch => {
        try {
            const newReview = await axios.post("api/reviews", review);
            //pass the username into the new review object
            newReview.username = review.username;
            dispatch({type: ADD_NEW_REVIEW, newReview});
        } catch (error) {
            console.log(error);
        }
    }
}

export function updateReview(dataPackage){
    return async dispatch => {
        try {
            const updatedReview = axios.put(`api/reviews/${dataPackage.productId}`, dataPackage);
            dispatch({type:UPDATE_REVIEW, dataPackage})
        } catch (error) {
            console.log(error);
        }
    }
}

// reducer
export default function (state = {}, action){
    switch (action.type){
        case GET_ALL_REVIEWS:
            return action.reviews.data;
        case ADD_NEW_REVIEW:
            //move the username into the new review object
            action.newReview.data.user = {username: action.newReview.username};

            //push the new review into the array of reviews
            const update = Array.from(state);
            update.push(action.newReview.data);
            return update;
        case UPDATE_REVIEW:
            const reviewArray = Array.from(state);
            const existingReview = reviewArray.find( x => x.id === action.dataPackage.reviewId)
            existingReview.rating = action.dataPackage.reviewScore;
            existingReview.review = action.dataPackage.reviewText;
            return reviewArray;
        default:
            return state;
    }
}