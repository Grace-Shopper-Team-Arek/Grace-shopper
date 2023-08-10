import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { fetchUserProfileThunk } from '../reducers/fetchUserProfile';

const UserProfile = (props) => {
    const { id } = useParams(); 
    const { fetchUserProfile, userProfile } = props;

    useEffect(() => {
        fetchUserProfile(id); 
    }, [id]); 

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    Profile
                </div>
                <div className="card-body">
                    <h5 className="card-title">{userProfile?.username}</h5>
                    <p className="card-text">
                        <strong>Email:</strong> {userProfile?.email}
                    </p>
                </div>
            </div>
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