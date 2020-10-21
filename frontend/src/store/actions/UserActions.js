
import UserService from '../../services/userService';

export function loadUsers() {
  return async (dispatch) => {
    try {
      const users = await UserService.getUsers();
      dispatch(setUsers(users));
    } catch (err) {
      console.log('Error in Loading Users', err);
    }
  };
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await UserService.remove(userId);
      dispatch(_removeUser(userId));
    } catch (err) {
      console.log('Error in remove User', err);
    }
  };
}

export function login(userCreds) {
  return async (dispatch) => {
    const user = await UserService.login(userCreds);
    dispatch(setUser(user));
  };
}
export function signup(userCreds) {
  return async (dispatch) => {
    const user = await UserService.signup(userCreds);
    dispatch(setUser(user));
  };
}
export function logout() {
  return async (dispatch) => {
    await UserService.logout();
    dispatch(setUser(null));
  };
}

export function setUser(user) {
  return {
    type: 'SET_USER',
    user,
  };
}
function setUsers(users) {
  return {
    type: 'SET_USERS',
    users,
  };
}

function _removeUser(userId) {
  return {
    type: 'USER_REMOVE',
    userId,
  };
}
