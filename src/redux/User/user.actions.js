import userTypes from './user.type';
export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});
