import React, { Component } from 'react';
import { auth, handleUserProfile } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import './style.scss';
const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: []
};
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      const err = ['Password not match'];
      this.setState({
        errors: err
      });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await handleUserProfile(user, { displayName });
      this.setState({
        ...initialState
      });
    } catch (error) {
      this.setState({
        errors: [error.message]
      });
    }
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors
    } = this.state;
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
          <form onSubmit={this.handleFormSubmit}>
            <Input
              name="displayName"
              value={displayName}
              placeholder="Full name"
              onChange={this.handleChange}
            />
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <Input
              name="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={this.handleChange}
            />
            <Input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={this.handleChange}
            />
            <Button type="submit"> Register </Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default Signup;
