import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { fetchUserProfileThunk } from '../reducers/fetchUserProfile';

const UserProfile = (props) => {
    const { id } = useParams(); 
    console.log(id)
    const { fetchUserProfile, userProfile } = props;
    console.log(props)

    useEffect(() => {
        fetchUserProfile(id); 
    }, [id]); 

    return (
        <div>
            <h1>{userProfile?.username}</h1>
            <h2>{userProfile?.email}</h2>
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
        fetchUserProfile: (id) => dispatch(fetchUserProfileThunk(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);