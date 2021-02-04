import React, { Component } from 'react';
import { signInWithGoogle } from '../../firebase/utils';
import Button from '../Forms/Button';
import './style.scss';
class SignIn extends Component {
  handleSubmit = async (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="signin">
        <div className="wrap">
          <h2>Login</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
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
