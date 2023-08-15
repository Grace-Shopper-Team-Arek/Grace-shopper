import axios from "axios";

const GET_ALL_REVIEWS = "GET ALL REVIEWS";
const ADD_NEW_REVIEW = "ADD NEW REVIEW";

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

export async function addNewReview(review){
    
    console.log("HEHREHEHEHEHEHEHSHJUEHEHRE");
    return async dispatch => {
        try {
            const newReview = await axios.post("api/reviews", review);
            dispatch({type: ADD_NEW_REVIEW, newReview});
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
            return state;
        default:
            return state;
    }
}