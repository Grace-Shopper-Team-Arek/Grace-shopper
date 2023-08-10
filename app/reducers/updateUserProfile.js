import axios from "axios";

const UPDATE_USER_PROFILE = "UPDATE USER PROFILE";

//action creators

function updateUserProfile(profile){
    return {
        type: UPDATE_USER_PROFILE,
        profile
    }
}

export function updateUserProfileThunk(id, update){
    return async dispatch => {
        try {
            await axios.put(`api/users/:${id}`, update);
            dispatch({type: UPDATE_USER_PROFILE, user: update})
        } catch (error) {
            console.log("Invalid");
        }
    }
}