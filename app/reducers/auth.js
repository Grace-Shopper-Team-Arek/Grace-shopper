import axios from "axios";

const auth = (state = {}, action) => {
  if (action.type === "SET_AUTH") {
    return action.auth;
  }
  if (action.type === "LOG_OUT") {
    console.log(action);
    return action.auth;
  }
  return state;
};

export const logout = () => {
  console.log(window.localStorage);
  window.localStorage.removeItem("token");
  console.log("HERE WE ARE TESTING THE UPDATE");
  return {
    type: "LOG_OUT",
    auth: {},
  };
};

export const loginWithToken = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token === "guest") {
      dispatch({ type: "SET_AUTH", auth: {} });
    } else if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: "SET_AUTH", auth: response.data });
    }
  };
};

export const attemptLogin = (credentials) => {
  return async (dispatch) => {
    const response = await axios.post("/api/auth", credentials);
    window.localStorage.setItem("token", response.data);
    dispatch(loginWithToken());
  };
};

export const attemptRegister = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/auth/register", credentials);
      window.localStorage.setItem("token", response.data);
      dispatch(loginWithToken());
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      throw error;
    }
  };
};

export default auth;
