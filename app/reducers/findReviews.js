import axios from "axios";

//thunk
export function allReviewsOneProductThunk(productId){
    return async dispatch => {
        try {
            const { data } = await axios.get(`api/reviews/${id}`);
            dispatch()
        } catch (error) {
            console.log(error);
        }
    }
}