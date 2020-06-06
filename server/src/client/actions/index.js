//action cretors
// import axios from "axios";
// note: if you want to hit a route that's not on /api/, import normal axios and use it normally. this 'api' third argument is just for this particular api.

//action type; usually separated out, but kept here for this project cuz there's only a couple of them.
//the async function gets automatically called by redux-thunk. 'api' argument is the axios instance.
export const FETCH_USERS = "fetch_users";
// export const fetchUsers = () => async (dispatch) => {
//   const res = await axios.get("http://react-ssr-api.herokuapp.com/users");

//   dispatch({
//     //action goes here
//     type: FETCH_USERS,
//     payload: res,
//   });
// };
export const fetchUsers = () => async (dispatch, getState, api) => {
  const res = await api.get("/users");
  dispatch({
    type: FETCH_USERS,
    payload: res,
  });
};

export const FETCH_CURRENT_USER = "fetch_current_user";
//first function is the actual action creator function. the second function is the inner function that is called by redux thunk.
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  //the actual api call to get the current user by hitting /api/current_user
  const res = await api.get("/current_user");

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res,
  });
};

export const FETCH_ADMINS = "fetch_admins";
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get("/admins");

  dispatch({
    type: FETCH_ADMINS,
    payload: res,
  });
};
