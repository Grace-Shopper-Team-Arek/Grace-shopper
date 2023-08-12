import axios from "axios";

const UPDATE_USER_PROFILE = "UPDATE USER PROFILE";

//action creators

function updateUserProfile(profile){
    return {
        type: UPDATE_USER_PROFILE,
        profile
    }
}

//thunk
export function updateUserProfileThunk(id, update){
    console.log(update);
    return async dispatch => {
        try {
            await axios.put(`api/users/:${id}`, update);
            dispatch({type: UPDATE_USER_PROFILE, user: update})
        } catch (error) {
            console.log("Invalid");
        }
    }
}

const initialState = [];

//reducer
export default function (state = initialState, action){
    switch (action.type) {
      case UPDATE_USER_PROFILE:
        return action.products;
      default:
        return state;
    }
}