import firebase from "../firebase.js";

//initial state
const initialState = {
  currentUser: {}
};

//action types
const GOT_USER = "GOT_USER";

//action creators

export const gotUser = () => {
  const newUser = firebase.auth().currentUser;
  console.log("Action User: ", newUser);
  return {
    type: GOT_USER,
    user: newUser
  };
};

//thunk creators
// export const getUser = () => {
//   return async dispatch => {
//     try {
//       const user = await firebase.auth().currentUser;
//       dispatch(gotUser(user));
//     } catch (err) {
//       console.error(err);
//     }
//   };
// };

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return {
        ...state,
        currentUser: action.user
      };
    default:
      return state;
  }
}
