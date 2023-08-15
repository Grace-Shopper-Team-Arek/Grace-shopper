import axios from "axios";

const ADD_REVIEW = "ADD REVIEW";

export default async function(review){
    try {
        //check that a review for this product by this user doesn't already exist
        //this part's not ready yet
        // const findReview = (await axios.get("api/reviews"));
        // console.log("findReview in addReview reducer: ", findReview.data);
        await axios.post("api/reviews", review);
    } catch (error) {
        console.log(error)
    }
}