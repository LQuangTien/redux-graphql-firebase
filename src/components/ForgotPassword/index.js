import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { auth } from './../../firebase/utils';
const initialState = {
  email: '',
  errors: []
};
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    const config = {
      url: 'http://localhost:3000/login'
    };
    try {
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push('/login');
        })
        .catch(() => {
          const err = ['Email not found, please try again'];
          this.setState({
            errors: err
          });
        });
    } catch (error) {
      console.log('cactch', error);
    }
  };
  render() {
    const { email, errors } = this.state;
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
          <form onSubmit={this.handleSubmit}>
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={this.handleChange}
            />
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

export default withRouter(ForgotPassword);
