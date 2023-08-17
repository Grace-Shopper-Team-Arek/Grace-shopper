import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { logout } from "../store";

//need to reset state with function to use multiple dispatches
//same check on addToCart thunk would be same for token

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  fullLogout = () => {
    this.setState({
      auth: {},
      userProfile: {},
      cart: { lineItems: [] },
      updateUserProfile: {},
    });
    this.props.logout();
  };

  render() {
    return (
      <div>
        <h1>Home</h1>
        <div>
          Welcome {this.props.state.auth.username}!!
          <button onClick={this.fullLogout}>Logout</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

// const Home = () => {
//   const { auth, cart, userProfile } = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const fullLogout = () => {
//     dispatch(logout());

//   };
// return (
//   <div>
//     <h1>Home</h1>
//     <div>
//       Welcome {auth.username}!!
//       <button onClick={fullLogout}>Logout</button>
//     </div>
//   </div>
// );
// };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
