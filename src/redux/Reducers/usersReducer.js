export const GET_USER = 'GET_USER';
export const GET_ALL_USERS = 'GET_ALL_USERS';


const initialState = {
  user: {},
  users: [],
};



//==================== REDUCER FUNCTION ====================
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.users }
    case GET_USER:
      return { ...state, user: action.user }
    default:
      return state
  }
}