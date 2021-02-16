import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  forgotPasswordUser,
  resetStateUser
} from '../../redux/User/user.actions';
import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
const mapState = ({ user }) => ({
  forgotPasswordSuccess: user.forgotPasswordSuccess,
  forgotPasswordError: user.forgotPasswordError
});
const ForgotPassword = (props) => {
  const { forgotPasswordSuccess, forgotPasswordError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    if (forgotPasswordSuccess) {
      dispatch(resetStateUser());
      props.history.push('/login');
    }
  }, [forgotPasswordSuccess]);
  useEffect(() => {
    if (Array.isArray(forgotPasswordError) && forgotPasswordError.length > 0) {
      setErrors(forgotPasswordError);
    }
  }, [forgotPasswordError]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordUser({ email }));
  };
  return (
    <AuthWrapper headline="Forgot Password">
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(ForgotPassword);
