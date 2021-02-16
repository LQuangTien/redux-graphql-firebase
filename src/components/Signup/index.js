import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { resetStateUser, signUpUser } from '../../redux/User/user.actions';
import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import './style.scss';
const mapState = ({ user }) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
});
const Signup = (props) => {
  const dispatch = useDispatch();
  const { signUpError, signUpSuccess } = useSelector(mapState);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (signUpSuccess) {
      resetForm();
      dispatch(resetStateUser());
      props.history.push('/');
    }
  }, [signUpSuccess]);
  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setErrors(signUpError);
    }
  }, [signUpError]);
  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ displayName, email, password, confirmPassword }));
  };

  return (
    <AuthWrapper headline="Register">
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleFormSubmit}>
          <Input
            name="displayName"
            value={displayName}
            placeholder="Full name"
            handleChange={(e) => setDisplayName(e.target.value)}
          />
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
          <Input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit"> Register </Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(Signup);
