import React from 'react';
import { Redirect } from 'react-router-dom';
import '../css/style.css';
import Loader from './loader';

export default class login extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    let loggedIn = true;

    if (token == null || ~this.props.loggedIn) {
      localStorage.removeItem('token');
      loggedIn = false;
    }
    this.state = {
      username: '',
      password: '',
      loggedIn,
      boderInput: null,
      boderInputPass: null,
      valid: '',
      invalid: '',
      validPass: '',
      invalidPass: '',
      loader: false,
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  emailValidator(e) {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (pattern.test(e.target.value)) {
      this.setState({ valid: 'valid' });
      this.setState({ boderInput: true });
    } else {
      this.setState({ invalid: 'invalid' });
      this.setState({ boderInput: false });
    }
  }

  passwordValidator(e) {
    if (e.target.value.length >= 4) {
      this.setState({ validPass: 'valid' });
      this.setState({ boderInputPass: true });
    } else {
      this.setState({ invalidPass: 'invalid' });
      this.setState({ boderInputPass: false });
    }
  }

  submitForm(e) {
    e.preventDefault();
    setTimeout((e) => {
      const { username, password } = this.state;
      if (username === 'franksooraj@gmail.com' && password === '1234') {
        localStorage.setItem('token', 'skfdjlkadjfakdladjf');
        this.setState({
          loggedIn: true,
          loader: true,
        });
      } else {
        if (username !== 'franksooraj@gmail.com') {
          this.setState({
            username: '',
            boderInput: false,
            invalid: 'enter valid email',
            loader: false,
          });
        }

        if (password !== '1234') {
          this.setState({
            password: '',
            boderInputPass: false,
            invalidPass: 'enter valid password',
            loader: false,
          });
        }
      }
    }, 3000);
    this.setState({ loader: true });
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="main-container">
        <div className="container">
          <h1>Login</h1>
          <form
            onSubmit={(e) => {
              this.submitForm(e);
            }}
          >
            <input
              className={`border-${
                this.state.boderInput == null
                  ? ''
                  : this.state.boderInput
                  ? 'green'
                  : 'red'
              }`}
              type="text"
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={(e) => {
                this.onChange(e);
                this.emailValidator(e);
              }}
            />
            <br />
            <span>
              {this.state.boderInput ? this.state.valid : this.state.invalid}
            </span>
            <br />
            <input
              className={`border-${
                this.state.boderInputPass == null
                  ? ''
                  : this.state.password.length >= 4
                  ? 'green'
                  : 'red'
              }`}
              type="password"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={(e) => {
                this.onChange(e);
                this.passwordValidator(e);
              }}
            />
            <br />
            <span>
              {this.state.password.length >= 4
                ? this.state.validPass
                : this.state.invalidPass}
            </span>
            <br />
            <input type="submit" />
          </form>
          <div className="loader"></div>
          <div className="login-loader">
            {this.state.loader ? (
              <>
                <Loader />
                <span id="loader">Waiting...</span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}
