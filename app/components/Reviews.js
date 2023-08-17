import React from "react";
import { allReviewsOneProductThunk } from "../reducers/reviews";
import { connect } from 'react-redux';

function stars(starCount){
    let rating = [];
    for(let i = 1; i < 6; i++){
        rating.push(<i key={`${"star" + i}`} className="fa fa-fw fa-star" style={{color: `${starCount >= i ? "#ff0" : "#000"}`, "fontSize": "12pt", "WebkitTextStrokeWidth": "1px", "WebkitTextStrokeColor": "black"}}/>)
    }
    return rating;
}

function Reviews(props){
    const reviews = Array.from(props.reviews);

    return <div>
        {reviews.map( x => {
            return <div key={`${x.id}`} className="card">
                <h6>{`${x.user.username}`} says: </h6>
                <h5>{`${x.review}`}</h5>
                <h4>{stars(parseInt(x.rating))}</h4>
            </div>
        })}
    </div>
}


function mapStateToProps(state){
    return {
        reviews: state.reviews,
    }
}

function mapDispatchToProps(dispatch){
    return {
        allReviewsOneProductThunk: id => dispatch( allReviewsOneProductThunk(id) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);