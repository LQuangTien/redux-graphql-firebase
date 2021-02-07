import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { auth } from './../../firebase/utils';
const initialState = {
  email: '',
  errors: []
};
const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: 'http://localhost:3000/login'
    };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push('/login');
        })
        .catch(() => {
          const err = ['Email not found, please try again'];
          setErrors(err);
        });
    } catch (error) {
      console.log('cactch', error);
    }
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
