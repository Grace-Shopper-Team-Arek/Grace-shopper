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
    return async dispatch => {
        try {
            const user = await axios.put(`api/users/:${id}`, update);
            console.log(user.data);
            dispatch({type: UPDATE_USER_PROFILE, update})
        } catch (error) {
            console.log("Invalid");
        }
    }
}

const initialState = {};

//reducer
export default function (state = initialState, action){
    // console.log(action);
    switch (action.type) {
      case UPDATE_USER_PROFILE:
        return {userProfile: action.update};
      default:
        return state;
    }
}