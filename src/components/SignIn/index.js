import React, { Component } from 'react';
import { auth, signInWithGoogle } from '../../firebase/utils';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import './style.scss';
const initialState = {
  email: '',
  password: '',
  errors: []
};
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="signin">
        <div className="wrap">
          <h2>Login</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
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
              <Button type="submit"> Login </Button>

              <div className="socialSignin">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
