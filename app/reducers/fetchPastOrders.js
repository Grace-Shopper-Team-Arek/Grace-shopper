import axios from "axios";

const FETCH_PAST_ORDERS = "FETCH_PAST_ORDERS";


const fetchPastOrders = (pastOrders) => {
    return {
        type: FETCH_PAST_ORDERS,
        pastOrders,
    };
    }

export const fetchPastOrdersThunk = (id) => {
    return async (dispatch) => {
        const token = window.localStorage.getItem("token");
    const response = await axios.get("/api/orders/past", {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: "FETCH_PAST_ORDERS", pastOrders: response.data });
  };
};

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

