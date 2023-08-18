import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserProfileThunk } from "../reducers/fetchUserProfile";
import UpdateProfile from "./UpdateProfile";
import AddProduct from "./AddProduct";

const UserProfile = (props) => {
    const { id } = useParams(); 
    const { fetchUserProfile, userProfile } = props;

  useEffect(() => {
    fetchUserProfile(userProfile.id);
  }, [userProfile.id]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Profile</div>
        <div className="card-body">
          <h5 className="card-title">
            {userProfile?.username}
          </h5>
          <img src={userProfile?.imageUrl ? userProfile.imageUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} width="250px" />
          <p className="card-text">
            <strong>Email:</strong>{" "}
            {userProfile?.email}
          </p>
          <UpdateProfile />
        </div>
      </div>
      {userProfile.userType === "ADMIN" ? <AddProduct /> : ""}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.userProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: (id) => dispatch(fetchUserProfileThunk(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);