import axios from "axios";

const FETCH_PAST_ORDERS = "FETCH_PAST_ORDERS";

//action creators

const fetchPastOrders = (pastOrders) => {
    return {
        type: FETCH_PAST_ORDERS,
        pastOrders,
    };
    }

//thunks

export const fetchPastOrdersThunk = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/orders/past`);
            dispatch(fetchPastOrders(data));
        } catch (err) {
            console.log(err);
        }
    };
}

const initialState = {
    pastOrders: []
};

//reducers

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_PAST_ORDERS:
            return action.pastOrders;
        default:
            return state;
    }
}

