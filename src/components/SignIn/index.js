import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  resetStateUser,
  signInUser,
  signInWithGoogle
} from '../../redux/User/user.actions';
import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import './style.scss';
const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess
});
const SignIn = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetStateUser());
      props.history.push('/');
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setPassword('');
    setEmail('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };
  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };
  return (
    <AuthWrapper headline="Login">
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit"> Login </Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>
          <div className="forgotpassword">
            <Link to="/forgotpassword">Forgot password ?</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
