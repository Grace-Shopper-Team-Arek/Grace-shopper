import axios from 'axios';

const FETCH_USER_PROFILE = 'FETCH_USER_PROFILE';

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

const initialState = {};

//reducers

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_USER_PROFILE:
            return action.userProfile;
        default:
            return state;
    }
}


