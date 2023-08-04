import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfileThunk } from '../reducers/fetchUserProfile';

const UserProfile = (props) => {
    const { fetchUserProfile, userProfile, match } = props;

    useEffect(() => {
        fetchUserProfile(match.params.id);
    }, [fetchUserProfile, match.params.id]);

    return (
        <div>
            <h1>{userProfile.username}</h1>
            <h2>{userProfile.email}</h2>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.userProfile,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserProfile: (id) => dispatch(fetchUserProfile(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

