import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { auth, handleUserProfile } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import './style.scss';

const Signup = (props) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const err = ['Password not match'];
      setErrors(err);
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      resetForm();
      props.history.push('/');
    } catch (error) {
      this.setState({
        errors: [error.message]
      });
    }
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
