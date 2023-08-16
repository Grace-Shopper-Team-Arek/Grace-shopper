import axios from 'axios';

const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';
const UPDATE_USER_PROFILE = "UPDATE USER PROFILE";

//action creators

const fetchUserProfile = (userProfile) => {
    return {
        type: FETCH_USER_PROFILE,
        userProfile
    }
}

//thunks

export const fetchUserProfileThunk = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`/api/users/${id}`);
            dispatch(fetchUserProfile(data));
        } catch (err) {
            console.log(err);
        }
    }
}

export function updateUserProfileThunk(id, update){
    return async dispatch => {
        try {
            const user = await axios.put(`api/users/:${id}`, update);
            dispatch({type: UPDATE_USER_PROFILE, update})
        } catch (error) {
            console.log("Invalid");
        }
    }
}

const initialState = {};

//reducers

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_PROFILE:
            return action.userProfile;
        case UPDATE_USER_PROFILE:
            return {...state, ...action.update};
        default:
            return state;
    }
}


