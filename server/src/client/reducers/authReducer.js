import { FETCH_CURRENT_USER } from "../actions";

//state starts at null because we dont yet know if the user is authenticated
//null is "we dont know if user is authenticated", false is "user is not authenticated", object of action.payload.data if they are authenticated
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER:
      //if user is authenticated action.payload.data is defined. if not auth, then explicitly declare that user is not signed in 'false'
      return action.payload.data || false;
    default:
      return state;
  }
}
