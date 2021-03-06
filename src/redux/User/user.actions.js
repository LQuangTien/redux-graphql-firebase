import { auth, handleUserProfile, GoogleProvider } from '../../firebase/utils';
import userTypes from './user.type';
export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});
export const resetStateUser = () => ({
  type: userTypes.RESET_STATE
});
export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true
    });
  } catch (error) {}
};
export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
      });
    });
  } catch (error) {}
};
export const signUpUser = ({
  displayName,
  email,
  password,
  confirmPassword
}) => async (dispatch) => {
  if (password !== confirmPassword) {
    const err = ['Password not match'];
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: err
    });
    return;
  }
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    await handleUserProfile(user, { displayName });
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true
    });
  } catch (error) {
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: [error.message]
    });
    return;
  }
};
export const forgotPasswordUser = ({ email }) => async (dispatch) => {
  const config = {
    url: 'http://localhost:3000/login'
  };
  try {
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        dispatch({
          type: userTypes.FORGOT_PASSWORD_SUCCESS,
          payload: true
        });
      })
      .catch(() => {
        const err = ['Email not found, please try again'];
        dispatch({
          type: userTypes.FORGOT_PASSWORD_ERROR,
          payload: err
        });
        return;
      });
  } catch (error) {
    console.log('cactch', error);
  }
};
