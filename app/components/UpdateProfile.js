import React from "react";
import { connect } from 'react-redux';
import { updateUserProfileThunk } from "../reducers/updateUserProfile";

function UpdateProfile(props){
// console.log(props);
    function handleSubmit(event){
        //stop the page from refreshing
        event.preventDefault();

        //grab the updated data
        const update = {
            updatedName: event.target[0].value,
            updatedEmail: event.target[1].value,
            updatedPW: event.target[2].value,
            confirmUpdPW: event.target[3].value,
        }

        //clear the input fields
        event.target[0].value = "";
        event.target[1].value = "";
        event.target[2].value = "";
        event.target[3].value = "";
        
        const dataPackage = {};

        //verify data
        if(update.updatedName && update.updatedName.length > 0){
            dataPackage.username = update.updatedName;
        }

        if(update.updatedEmail && update.updatedEmail.length > 0){
            dataPackage.email = update.updatedEmail;
        }

        if(update.updatedPW && update.updatedPW.length > 0 && (update.updatedPW === update.confirmUpdPW)){
            dataPackage.password = update.updatedPW ;
        }

        //send the update along to be implemented
        props.updateUserProfileThunk(props.userProfile.id, dataPackage);
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Update name: </label>
                <input type="text" name="name" placeholder={props.updateUserProfile?.userProfile?.username ? props.updateUserProfile.userProfile.username : props.userProfile?.username}/>
            </div><div>
                <label htmlFor="email">Update email: </label>
                <input type="text" name="email" placeholder={props.updateUserProfile?.userProfile?.email ? props.updateUserProfile.userProfile.email : props.userProfile?.email}/>
            </div><div>
                <label htmlFor="password">Update password: </label>
                <input type="text" name="password"/>
            </div><div>  
                <label htmlFor="confirm-password">Retype updated password: </label>
                <input type="text" name="password"/>
                {/* For security reasons the "name" prop for the password input fields 
                should be omitted (it lets the browser do a dropdown list of previous inputs), 
                and the type should ="password" (hides the typed input) but they make it 
                easier to test for now*/}
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.userProfile,
        updateUserProfile: state.updateUserProfile,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUserProfileThunk: (id, update) => dispatch(updateUserProfileThunk(id, update)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);