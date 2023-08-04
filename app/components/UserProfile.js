import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../reducers/fetchUserProfile';

class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUserProfile(this.props.match.params.id);
    }

    render() {
        const { userProfile } = this.props;
        return (
            <div>
                <h1>{userProfile.username}</h1>
                <h2>{userProfile.email}</h2>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.userProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserProfile: (id) => dispatch(fetchUserProfile(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
