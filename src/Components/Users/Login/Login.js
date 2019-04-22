import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormGroup, FormControl } from "@material-ui/core";
import FacebookIcon from "mdi-react/FacebookIcon";
import GoogleIcon from "mdi-react/GoogleIcon";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../actions/userActions";
import {withRouter} from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: "",
    email: ""
  };

  changePassword = event => {
    this.setState({ password: event.target.value });
  };

  changeEmail = event => {
    this.setState({ email: event.target.value });
  };

  onSubmitLogin = () => {
    let { email, password } = this.state;
    let credentials = {
      email: email,
      password: password
    };
    this.props.userActions.localLogin(credentials, this.redirectOnSuccess);
  };

  redirectOnSuccess = () => {
    console.log("Called");
    this.props.history.push("/dashboard");
  };

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;
    return (
      <div className="border-box center-box">
        <Typography
          variant="headline"
          component="h3"
          className="form-center center-text"
        >
          <b className="heading-form">Login to the app</b>
        </Typography>
        <div className="center-div-user">
          <form className={classes.container} noValidate autoComplete="off">
            <FormGroup className="form-center">
              <FormControl>
                <TextField
                  id="standard-required"
                  label="Email"
                  className={classes.textField + " textfield"}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => this.changeEmail(e)}
                />
              </FormControl>
              <FormControl>
                <TextField
                  required
                  id="standard-password-input"
                  label="Password"
                  className={classes.textField + " textfield"}
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => this.changePassword(e)}
                />
              </FormControl>
            </FormGroup>
          </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.onSubmitLogin}
          >
            Login with username
          </Button>
          <Divider />
          <SocialNetworkLogIn classes={classes} />
        </div>
      </div>
    );
  }
}

const SocialNetworkLogIn = props => (
  <div className="social-network-login">
    <Button
      variant="contained"
      color="primary"
      className={props.classes.button}
      onClick={() => alert("Please use google login for now")}
    >
      <FacebookIcon />
      Login with facebook
    </Button>
    <a href="/api/users/auth/google">
      <Button
        variant="contained"
        color="primary"
        className={props.classes.button}
      >
        <GoogleIcon />
        Login with google
      </Button>
    </a>
  </div>
);

/*This returns the divider ----OR---- */
const Divider = props => (
  <div className="section">
    <div className="divider">
      <span className="divider_content">OR</span>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    users: state.users.users
  };
};

const mapActionsToProps = dispatch => {
  return {
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(Login));
