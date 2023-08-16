import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserProfileThunk } from "../reducers/fetchUserProfile";
import UpdateProfile from "./UpdateProfile";

const UserProfile = (props) => {
    const { id } = useParams(); 
    const { fetchUserProfile, userProfile, updateUserProfile } = props;

  useEffect(() => {
    fetchUserProfile(userProfile.id);
  }, [userProfile.id]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Profile</div>
        <div className="card-body">
          {/* More react-redux weirdness while I get a handle on it; updating 
                    a user profile has a different reducer from fetching the profile, 
                    which I guess makes react put the updated data in a different spot
                    in the state (state.updateUserProfile versus state.userProfile), so
                    rather than figuring out how to untangle that mess I added more logic
                    to this component to check if there's updated user data and preferentially
                    display that instead of the starting data*/}
          <h5 className="card-title">
            {updateUserProfile?.userProfile?.username
              ? updateUserProfile.userProfile.username
              : userProfile?.username}
          </h5>
          <p className="card-text">
            <strong>Email:</strong>{" "}
            {updateUserProfile?.userProfile?.email
              ? updateUserProfile.userProfile.email
              : userProfile?.email}
          </p>
          <UpdateProfile />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
    updateUserProfile: state.updateUserProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: (id) => dispatch(fetchUserProfileThunk(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
